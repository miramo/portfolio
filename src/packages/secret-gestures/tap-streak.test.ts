import { describe, expect, it } from "vitest";

import { TapStreak } from "./index";

const tapping = (instants: number[]): TapStreak =>
  instants.reduce((streak, at) => streak.tap(at), TapStreak.idle());

describe("Secret tap streak", () => {
  describe("Given a visitor tapping the avatar in quick succession", () => {
    describe("When the seventh tap lands", () => {
      it("unlocks", () => {
        const seven = [0, 200, 400, 600, 800, 1000, 1200];

        expect(tapping(seven).unlocked).toBe(true);
      });
    });
  });

  describe("Given a visitor who pauses in the middle of the streak", () => {
    describe("When they resume more than 600 ms later", () => {
      it("counts from the resuming tap, so the seventh one does not unlock", () => {
        const withAPause = [0, 200, 400, 1201, 1400, 1600, 1800];

        expect(tapping(withAPause).unlocked).toBe(false);
      });
    });
  });

  describe("Given a visitor tapping exactly 600 ms apart", () => {
    describe("When the seventh tap lands", () => {
      it("unlocks, because the streak breaks only beyond that gap", () => {
        const onTheLimit = [0, 600, 1200, 1800, 2400, 3000, 3600];

        expect(tapping(onTheLimit).unlocked).toBe(true);
      });
    });
  });
});
