const SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

export class KonamiCode {
  private constructor(private readonly recent: readonly string[]) {}

  static idle(): KonamiCode {
    // Stryker disable next-line ArrayDeclaration: a seeded window is evicted by the tenth press, so no seed is observable through `unlocked`.
    return new KonamiCode([]);
  }

  press(key: string): KonamiCode {
    return new KonamiCode([...this.recent, key.toLowerCase()].slice(-SEQUENCE.length));
  }

  get unlocked(): boolean {
    return SEQUENCE.every((key, i) => this.recent[i] === key);
  }
}
