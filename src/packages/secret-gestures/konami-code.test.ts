import { describe, expect, it } from "vitest";

import { KonamiCode } from "./index";

const typing = (keys: string[]): KonamiCode =>
  keys.reduce((code, key) => code.press(key), KonamiCode.idle());

const THE_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

describe("Konami code", () => {
  describe("Given a visitor who knows the code", () => {
    describe("When they type it from the first key to the last", () => {
      it("unlocks", () => {
        expect(typing(THE_CODE).unlocked).toBe(true);
      });
    });
  });

  describe("Given a visitor who slips a stray key into the code", () => {
    describe("When they finish the rest of it correctly", () => {
      it("stays locked, because the run was broken", () => {
        const fumbled = [...THE_CODE.slice(0, 9), "x", "a"];

        expect(typing(fumbled).unlocked).toBe(false);
      });
    });
  });

  describe("Given a visitor who presses up one time too many", () => {
    describe("When they carry on with the rest of the code", () => {
      it("unlocks, because the surplus press opens a fresh run", () => {
        const hesitant = ["ArrowUp", ...THE_CODE];

        expect(typing(hesitant).unlocked).toBe(true);
      });
    });
  });

  describe("Given a visitor typing with caps lock on", () => {
    describe("When they type the code", () => {
      it("unlocks all the same", () => {
        const shouted = [...THE_CODE.slice(0, 8), "B", "A"];

        expect(typing(shouted).unlocked).toBe(true);
      });
    });
  });

  describe("Given a visitor who stops halfway through the code", () => {
    describe("When they type nothing more", () => {
      it("stays locked", () => {
        expect(typing(THE_CODE.slice(0, 5)).unlocked).toBe(false);
      });
    });
  });
});
