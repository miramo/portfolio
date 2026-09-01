import { Period } from "./lib/period";
import { MONTHS_PER_YEAR, type YearMonth } from "./lib/year-month";

export { YearMonth } from "./lib/year-month";

export interface CareerEntry {
  start: string;
  end?: string;
  internship?: boolean;
}

export type TimelineEntry<T extends CareerEntry> = T & { period: string };

export function withPeriod<T extends CareerEntry>(entry: T): TimelineEntry<T> {
  return { ...entry, period: Period.of(entry.start, entry.end).toString() };
}

export function timeline<T extends CareerEntry>(entries: T[]): TimelineEntry<T>[] {
  return [...entries]
    .sort((a, b) => Period.byMostRecent(Period.of(a.start, a.end), Period.of(b.start, b.end)))
    .map(withPeriod);
}

export function totalYearsOfExperience(entries: CareerEntry[], asOf: YearMonth): number {
  const months = entries
    .filter((entry) => !entry.internship)
    .reduce((total, entry) => total + Period.of(entry.start, entry.end).monthsWorked(asOf), 0);

  return Math.floor(months / MONTHS_PER_YEAR);
}
