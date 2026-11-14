import { type CareerEntry } from "@/packages/cv";

export const profile = {
  firstName: "Maxime",
  lastName: "Miramond",
  role: "Senior Software Engineer",
  city: "Aix-en-Provence",
  country: "France",
  countryCode: "FR",
  signatureStack: ["TypeScript", "NestJS", "PostgreSQL", "GCP"],
} as const;

export const fullName = `${profile.firstName} ${profile.lastName}`;

export interface Schooling extends CareerEntry {
  school: string;
  city?: string;
  degree?: string;
  note?: string;
}

export const education: Schooling[] = [
  {
    school: "EPITECH",
    degree: "Expert en Technologies de l’Information",
    start: "2011",
    end: "2016",
  },
  { school: "Université Laval", city: "Québec", note: "exchange", start: "2014", end: "2015" },
];

export const languages = [
  { name: "French", level: "Native" },
  { name: "English", level: "Professional" },
] as const;

export const otherCredentials = [{ name: "Driving license", level: "B" }] as const;
