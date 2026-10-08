'use server';

import { open, readFile, appendFile, unlink } from 'fs/promises';
import type { FileHandle } from 'fs/promises';
import path from 'path';

type SignupState = {
    status: "idle" | "success" | "error";
    message: string;
};

const isValidEmail = (email: string): boolean =>
    email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

async function acquireLock(lockPath: string): Promise<FileHandle> {
    for (let attempt = 0; attempt < 40; attempt += 1) {
        try {
            return await open(lockPath, "wx");
        } catch (error) {
            if (!(error instanceof Error) || !("code" in error) || error.code !== "EEXIST") {
                throw error;
            }
            await new Promise((resolve) => setTimeout(resolve, 50));
        }
    }

    throw new Error("SIGNUP_LOCK_TIMEOUT");
}

export async function exportValidEmail(
    _previousState: SignupState,
    formData: FormData
): Promise<SignupState> {
    const submittedEmail = formData.get("email");
    if (typeof submittedEmail !== "string") {
        return { status: "error", message: "Please enter a valid email address." };
    }

    const email = submittedEmail.trim().toLowerCase();
    if (!isValidEmail(email)) {
        return { status: "error", message: "Please enter a valid email address." };
    }

    const filePath = path.join(process.cwd(), "validEmails.txt");
    const lockPath = `${filePath}.lock`;
    try {
        const lock = await acquireLock(lockPath);
        try {
            let savedEmails: string;
            try {
                savedEmails = await readFile(filePath, "utf-8");
            } catch (error) {
                if (error instanceof Error && "code" in error && error.code === "ENOENT") {
                    savedEmails = "";
                } else {
                    throw error;
                }
            }

            const alreadyRegistered = savedEmails
                .split(/\r?\n/)
                .some((savedEmail) => savedEmail.trim().toLowerCase() === email);

            if (alreadyRegistered) {
                return { status: "error", message: "This email is already signed up." };
            }

            await appendFile(filePath, `${email}\n`, "utf-8");
            return { status: "success", message: "Thank you for signing up!" };
        } finally {
            await lock.close();
            await unlink(lockPath);
        }
    } catch (error) {
        if (error instanceof Error && error.message === "SIGNUP_LOCK_TIMEOUT") {
            return { status: "error", message: "Signups are busy right now. Please try again." };
        }
        return { status: "error", message: "We couldn't save your signup. Please try again." };
    }
}