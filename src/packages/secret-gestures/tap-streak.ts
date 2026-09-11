const TAPS_TO_UNLOCK = 7;
const LONGEST_GAP_MS = 600;

export class TapStreak {
  private constructor(
    private readonly count: number,
    private readonly lastTapAt: number
  ) {}

  static idle(): TapStreak {
    return new TapStreak(0, Number.NEGATIVE_INFINITY);
  }

  tap(at: number): TapStreak {
    const continues = at - this.lastTapAt <= LONGEST_GAP_MS;

    return new TapStreak(continues ? this.count + 1 : 1, at);
  }

  get unlocked(): boolean {
    return this.count === TAPS_TO_UNLOCK;
  }
}
