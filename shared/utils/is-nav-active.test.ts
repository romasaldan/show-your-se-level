import { describe, expect, it } from "vitest";
import { isNavActive } from "./is-nav-active";

describe("isNavActive", () => {
  describe('href "/"', () => {
    it("is active only for exact root path", () => {
      expect(isNavActive("/", "/")).toBe(true);
    });

    it("is not active for other top-level routes", () => {
      expect(isNavActive("/quiz", "/")).toBe(false);
      expect(isNavActive("/auth", "/")).toBe(false);
      expect(isNavActive("/profile", "/")).toBe(false);
    });

    it("is not active for nested paths under other segments", () => {
      expect(isNavActive("/quiz/1", "/")).toBe(false);
    });
  });

  describe("non-root href", () => {
    it("matches exact path", () => {
      expect(isNavActive("/quiz", "/quiz")).toBe(true);
      expect(isNavActive("/auth", "/auth")).toBe(true);
    });

    it("matches nested segments", () => {
      expect(isNavActive("/quiz/results", "/quiz")).toBe(true);
      expect(isNavActive("/auth/callback", "/auth")).toBe(true);
    });

    it("does not match unrelated paths", () => {
      expect(isNavActive("/", "/quiz")).toBe(false);
      expect(isNavActive("/profile", "/auth")).toBe(false);
    });

    it("does not treat similar prefixes as a match", () => {
      expect(isNavActive("/quiz-extra", "/quiz")).toBe(false);
      expect(isNavActive("/authentication", "/auth")).toBe(false);
    });
  });
});
