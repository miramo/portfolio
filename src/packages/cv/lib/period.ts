import { YearMonth } from "./year-month";

export class Period {
  private constructor(
    private readonly start: YearMonth,
    private readonly end?: YearMonth
  ) {}

  static of(start: string, end?: string): Period {
    const from = YearMonth.parse(start);
    if (end === undefined) return new Period(from);

    const to = YearMonth.parse(end);
    if (to.isBefore(from)) {
      throw new RangeError(`period ends before it starts: ${start} to ${end}`);
    }

    return new Period(from, to);
  }

  static byMostRecent(a: Period, b: Period): number {
    return b.start.monthsSince(a.start);
  }

  monthsWorked(asOf: YearMonth): number {
    return (this.end ?? asOf).monthsSince(this.start) + 1;
  }

  toString(): string {
    return `${this.start} — ${this.end ?? "Present"}`;
  }
}
