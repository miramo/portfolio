import { type CareerEntry } from "@/packages/cv";

export interface Experience extends CareerEntry {
  company: string;
  role: string;
  location: string;
  description: string;
  achievements?: string[];
  tags: string[];
  featured?: boolean;
}

export const experienceSectionContent = {
  section: {
    eyebrow: "Experience",
    titleLead: "Where I've",
    titleHighlight: "been building.",
  },
} as const;

export const featuredExperience: Experience = {
  company: "Gojob",
  role: "Senior Software Engineer",
  start: "2017",
  location: "Aix-en-Provence, France",
  description:
    "One of the first ten engineers on a platform that industrialized candidate sourcing and qualification at scale — now a 200+ person company across France and the US. Contributed across the full stack with a strong back-end focus while the Tech, Data & Product team grew from ~8 to ~50.",
  achievements: [
    "Designed the qualification and matching engines behind Gojob's headline performance — 95% fill rate, staffing missions filled in as little as 2 hours",
    "Built operational tooling for recruiters (KYC, experience collection, candidate triage)",
    "Architected back-end features as self-contained use-cases (CQS/CQRS) exposed via endpoints, keeping the codebase clean and evolvable",
    "Championed Software Craftsmanship practices: TDD, Clean Architecture, DDD, code review culture",
    "Onboarded and mentored junior engineers joining the squad",
  ],
  tags: [
    "NestJS",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "TypeORM",
    "Elasticsearch",
    "GCP",
    "Kubernetes",
    "GraphQL",
    "REST",
    "CQRS",
    "DDD",
    "TDD",
  ],
  featured: true,
};

export const pastExperiences: Experience[] = [
  {
    company: "OMNILOG",
    role: "Developer",
    start: "2016-04",
    end: "2016-10",
    internship: true,
    location: "Paris, France",
    description:
      "Internship (end-of-studies) — on assignment at Lagardère Active. Built from scratch an internal web app in material design for pre-contract creation and editing.",
    tags: ["AngularJS", "ASP.NET Web API", "SQL Server"],
  },
  {
    company: "VIDATA",
    role: "Front-End Developer",
    start: "2015-10",
    end: "2016-02",
    internship: true,
    location: "Paris, France",
    description:
      "Internship (part-time, 5th year) — continued development of a B2B personalized video marketing platform.",
    tags: ["AngularJS"],
  },
  {
    company: "DGA — Direction générale de l'armement",
    role: "C# / .NET Developer",
    start: "2014-03",
    end: "2014-07",
    internship: true,
    location: "Toulon, France",
    description:
      "Internship (3rd year) — built a scenario generator for the EVITAC system (Exploitation des Vidéos TACtiques).",
    tags: ["C#", ".NET", "WPF"],
  },
];

export const experiences: Experience[] = [featuredExperience, ...pastExperiences];
