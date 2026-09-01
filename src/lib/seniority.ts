import "server-only";

import { experiences } from "@/data/experience";
import { totalYearsOfExperience, YearMonth } from "@/packages/cv";

const years = totalYearsOfExperience(experiences, YearMonth.from(new Date()));

export function withYears(text: string): string {
  return text.replaceAll("{years}", String(years));
}
