export const aboutSectionContent = {
  section: {
    eyebrow: "About",
    titleLead: "The person",
    titleHighlight: "behind the code.",
  },
  whoIAmLabel: "Who I am",
  whoIAmParagraph1:
    "Senior engineer with a strong back-end focus. I build systems that hold up under real-world pressure — from architecture to production.",
  whoIAmParagraph2:
    "What matters to me: code that's robust, maintainable, and that actually solves the right business problem. No clever shortcuts that become tomorrow's debt, no over-engineering for its own sake.",
  education: "EPITECH · Université Laval (Québec)",
  mantraLabel: "Philosophy",
  mantraLine1: "The only way to go fast,",
  mantraLine2: "is to go well.",
  mantraAuthor: "Robert C. Martin",
  craftLabel: "Craft",
  stackLabel: "Stack",
  aiToolsLabel: "+ AI tools",
  aiToolsTitle: "AI coding assistant",
  interestsToggleLabelShow: "Fun facts",
  interestsToggleLabelHide: "Hide fun facts",
} as const;

export const aboutStack = [
  "TypeScript",
  "NestJS",
  "Node.js",
  "PostgreSQL",
  "Elasticsearch",
  "GraphQL",
  "REST",
  "GCP",
  "Kubernetes",
  "Docker",
];

export const aboutCraftTags = ["TDD", "Clean Archi", "DDD", "CQRS"];

export const aboutHomelabItems = [
  "Unraid NAS",
  "Home Assistant",
  "Raspberry Pi",
  "ESP32",
  "50+ containers",
];

export const aboutFavoriteFilms = [
  "Pulp Fiction",
  "Lord of the Rings",
  "Fight Club",
  "Dune",
  "American History X",
];

export const aboutFavoriteSeries = [
  "Breaking Bad",
  "Game of Thrones",
  "Pluribus",
  "The Sopranos",
  "Severance",
];

export const aboutFavoriteArtists = [
  "Eminem",
  "Kanye West",
  "Travis Scott",
  "Kendrick Lamar",
  "Damso",
];

export const aboutInterestSections = [
  { icon: "Server", label: "Homelab", items: aboutHomelabItems, numbered: false },
  { icon: "Film", label: "Films", items: aboutFavoriteFilms, numbered: true },
  { icon: "Tv2", label: "Séries", items: aboutFavoriteSeries, numbered: true },
  { icon: "Music2", label: "Musique", items: aboutFavoriteArtists, numbered: true },
] as const;
