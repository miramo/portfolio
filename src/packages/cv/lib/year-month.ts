import { differenceInCalendarMonths, format, isBefore, parse } from "date-fns";

export const MONTHS_PER_YEAR = 12;

export class YearMonth {
  private constructor(
    private readonly firstDay: Date,
    private readonly yearOnly: boolean
  ) {}

  static parse(value: string): YearMonth {
    const yearOnly = !value.includes("-");

    return new YearMonth(parse(value, yearOnly ? "yyyy" : "yyyy-MM", new Date()), yearOnly);
  }

  static from(date: Date): YearMonth {
    return YearMonth.parse(format(date, "yyyy-MM"));
  }

  isBefore(other: YearMonth): boolean {
    return isBefore(this.firstDay, other.firstDay);
  }

  monthsSince(other: YearMonth): number {
    return differenceInCalendarMonths(this.firstDay, other.firstDay);
  }

  toString(): string {
    return format(this.firstDay, this.yearOnly ? "yyyy" : "MMM yyyy");
  }
}
