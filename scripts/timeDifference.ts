const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

function getDaysBetween(today: Date, articleDate: Date): number {
  const todayUtc = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  );
  const articleUtc = Date.UTC(
    articleDate.getUTCFullYear(),
    articleDate.getUTCMonth(),
    articleDate.getUTCDate(),
  );

  return Math.round((todayUtc - articleUtc) / MILLISECONDS_PER_DAY);
}

function formatDaysAgo(days: number): string {
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days === -1) return "tomorrow";
  if (days > 1) return `${days} days ago`;
  return `in ${-days} days`;
}

export default function calculateTimeDifference(articleDate: string): string {
  const parsedArticleDate = new Date(articleDate);

  if (Number.isNaN(parsedArticleDate.getTime())) {
    throw new RangeError(`Invalid article date: ${articleDate}`);
  }

  return formatDaysAgo(getDaysBetween(new Date(), parsedArticleDate));
}

export function formatDate(dateTime: string): string {
  const [date] = dateTime.split("T");
  return date ?? dateTime;
}
