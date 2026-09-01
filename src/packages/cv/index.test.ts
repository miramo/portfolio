import { describe, expect, it } from "vitest";

import { type CareerEntry, timeline, totalYearsOfExperience, withPeriod, YearMonth } from "./index";

const aRole = (start: string, end: string): CareerEntry => ({ start, end });
const anOngoingRole = (start: string): CareerEntry => ({ start });
const anInternship = (start: string, end: string): CareerEntry => ({
  start,
  end,
  internship: true,
});

const SEPTEMBER_2026 = YearMonth.parse("2026-09");

describe("Career timeline", () => {
  describe("Given a role that has already ended", () => {
    describe("When a recruiter reads the experience section", () => {
      it("shows the role running from its first month to its last", () => {
        const [role] = timeline([aRole("2016-04", "2016-10")]);

        expect(role.period).toBe("Apr 2016 — Oct 2016");
      });
    });
  });

  describe("Given the role currently held, recorded without an end date", () => {
    describe("When a recruiter reads the experience section", () => {
      it("shows the role as still running today", () => {
        const [role] = timeline([anOngoingRole("2017")]);

        expect(role.period).toBe("2017 — Present");
      });
    });
  });

  describe("Given a role that started and ended within the same month", () => {
    describe("When a recruiter reads the experience section", () => {
      it("accepts the role and shows that month at both ends", () => {
        const [role] = timeline([aRole("2016-04", "2016-04")]);

        expect(role.period).toBe("Apr 2016 — Apr 2016");
      });
    });
  });

  describe("Given the single role the page highlights above the others", () => {
    describe("When a recruiter reads the experience section", () => {
      it("labels that role on its own, outside any list", () => {
        const role = withPeriod(anOngoingRole("2017"));

        expect(role.period).toBe("2017 — Present");
      });
    });
  });

  describe("Given roles entered oldest first", () => {
    describe("When a recruiter reads the experience section", () => {
      it("lists the most recent role first", () => {
        const roles = timeline([
          aRole("2014-03", "2014-07"),
          anOngoingRole("2017"),
          aRole("2016-04", "2016-10"),
        ]);

        expect(roles.map(({ start }) => start)).toEqual(["2017", "2016-04", "2014-03"]);
      });
    });
  });

  describe("Given a role whose end date precedes its start date", () => {
    describe("When the timeline is built", () => {
      it("refuses to publish the CV and names the impossible role", () => {
        expect(() => timeline([aRole("2017-06", "2016-01")])).toThrow(
          "period ends before it starts: 2017-06 to 2016-01"
        );
      });
    });
  });
});

describe("Total years of experience", () => {
  describe("Given two roles that have ended", () => {
    describe("When a recruiter reads the seniority line", () => {
      it("counts every month worked, first and last month included", () => {
        const years = totalYearsOfExperience(
          [aRole("2014-01", "2014-12"), aRole("2016-01", "2016-12")],
          SEPTEMBER_2026
        );

        expect(years).toBe(2);
      });
    });
  });

  describe("Given the role currently held, recorded without an end date", () => {
    describe("When a recruiter reads the seniority line", () => {
      it("counts the role up to today, so the figure ages on its own", () => {
        const years = totalYearsOfExperience([anOngoingRole("2025-09")], SEPTEMBER_2026);

        expect(years).toBe(1);
      });
    });
  });

  describe("Given an ongoing role that reaches exactly one year this month", () => {
    describe("When a recruiter reads the seniority line", () => {
      it("counts the current month, so the figure turns over on time", () => {
        const years = totalYearsOfExperience([anOngoingRole("2025-10")], SEPTEMBER_2026);

        expect(years).toBe(1);
      });
    });
  });

  describe("Given a role marked as an internship", () => {
    describe("When a recruiter reads the seniority line", () => {
      it("leaves the internship out of the professional total", () => {
        const years = totalYearsOfExperience(
          [aRole("2020-01", "2021-12"), anInternship("2014-01", "2014-12")],
          SEPTEMBER_2026
        );

        expect(years).toBe(2);
      });
    });
  });
});

describe("The month the CV is read in", () => {
  describe("Given a machine clock, whatever timezone it is set to", () => {
    describe("When the CV works out which month it is", () => {
      it("takes the local calendar month, even on the last evening of a month", () => {
        expect(YearMonth.from(new Date("2026-09-30T23:00:00")).toString()).toBe("Sep 2026");
      });
    });
  });
});
