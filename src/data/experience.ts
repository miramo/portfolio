export interface Experience {
  company: string;
  role: string;
  period: string;
  /** ISO 8601 value for the <time> dateTime attribute */
  dateTime: string;
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

export const experiences: Experience[] = [
  {
    company: "Gojob",
    role: "Senior Software Engineer",
    period: "2017 — Present",
    dateTime: "2017",
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
  },
  {
    company: "OMNILOG",
    role: "Developer",
    period: "Apr 2016 — Oct 2016",
    dateTime: "2016-04",
    location: "Paris, France",
    description:
      "Internship (end-of-studies) — on assignment at Lagardère Active. Built from scratch an internal web app in material design for pre-contract creation and editing.",
    tags: ["AngularJS", "ASP.NET Web API", "SQL Server"],
  },
  {
    company: "VIDATA",
    role: "Front-End Developer",
    period: "Oct 2015 — Feb 2016",
    dateTime: "2015-10",
    location: "Paris, France",
    description:
      "Internship (part-time, 5th year) — continued development of a B2B personalized video marketing platform.",
    tags: ["AngularJS"],
  },
  {
    company: "DGA — Direction générale de l'armement",
    role: "C# / .NET Developer",
    period: "Mar 2014 — Jul 2014",
    dateTime: "2014-03",
    location: "Toulon, France",
    description:
      "Internship (3rd year) — built a scenario generator for the EVITAC system (Exploitation des Vidéos TACtiques).",
    tags: ["C#", ".NET", "WPF"],
  },
];
