"use server";

import { appendFile, open, readFile, stat, unlink } from "fs/promises";
import type { FileHandle } from "fs/promises";
import path from "path";

type SignupState = {
  status: "idle" | "success" | "error";
  message: string;
};

const LOCK_MAX_AGE_MS = 60_000;
const LOCK_ATTEMPTS = 40;
const LOCK_RETRY_DELAY_MS = 50;

const isValidEmail = (email: string): boolean =>
  email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function isSystemError(error: unknown, code: string): boolean {
  return (
    error instanceof Error &&
    "code" in error &&
    error.code === code
  );
}

async function readSavedEmails(filePath: string): Promise<string> {
  try {
    return await readFile(filePath, "utf-8");
  } catch (error) {
    if (isSystemError(error, "ENOENT")) return "";
    throw error;
  }
}

function isEmailRegistered(savedEmails: string, email: string): boolean {
  return savedEmails
    .split(/\r?\n/)
    .some((savedEmail) => savedEmail.trim().toLowerCase() === email);
}

async function appendEmail(filePath: string, email: string): Promise<void> {
  await appendFile(filePath, `${email}\n`, "utf-8");
}

async function isStaleLock(lockPath: string): Promise<boolean> {
  try {
    const lockStats = await stat(lockPath);
    return Date.now() - lockStats.mtimeMs > LOCK_MAX_AGE_MS;
  } catch (error) {
    if (isSystemError(error, "ENOENT")) return true;
    throw error;
  }
}

async function removeLock(lockPath: string): Promise<void> {
  try {
    await unlink(lockPath);
  } catch (error) {
    if (!isSystemError(error, "ENOENT")) throw error;
  }
}

async function acquireLock(lockPath: string): Promise<FileHandle> {
  for (let attempt = 0; attempt < LOCK_ATTEMPTS; attempt += 1) {
    try {
      return await open(lockPath, "wx");
    } catch (error) {
      if (!isSystemError(error, "EEXIST")) throw error;
      if (await isStaleLock(lockPath)) {
        await removeLock(lockPath);
        continue;
      }
      await new Promise((resolve) => setTimeout(resolve, LOCK_RETRY_DELAY_MS));
    }
  }

  throw new Error("SIGNUP_LOCK_TIMEOUT");
}

async function saveEmail(email: string): Promise<SignupState> {
  const filePath = path.join(process.cwd(), "validEmails.txt");
  const lockPath = `${filePath}.lock`;
  const lock = await acquireLock(lockPath);

  try {
    const savedEmails = await readSavedEmails(filePath);
    if (isEmailRegistered(savedEmails, email)) {
      return { status: "error", message: "This email is already signed up." };
    }

    await appendEmail(filePath, email);
    return { status: "success", message: "Thank you for signing up!" };
  } finally {
    await lock.close();
    await removeLock(lockPath);
  }
}

export async function exportValidEmail(
  _previousState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const submittedEmail = formData.get("email");
  if (typeof submittedEmail !== "string") {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const email = submittedEmail.trim().toLowerCase();
  if (!isValidEmail(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    return await saveEmail(email);
  } catch (error) {
    if (error instanceof Error && error.message === "SIGNUP_LOCK_TIMEOUT") {
      return { status: "error", message: "Signups are busy right now. Please try again." };
    }
    console.error("Failed to save signup email.", error);
    return { status: "error", message: "We couldn't save your signup. Please try again." };
  }
}
