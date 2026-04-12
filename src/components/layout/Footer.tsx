import { Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/data/constants";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono text-muted-foreground text-center sm:text-left">
          © 20{new Date().getFullYear() - 2000} — Made with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          by <span className="text-muted-foreground">Maxime Miramond</span>
        </p>
        <nav aria-label="Footer links" className="flex items-center gap-5">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
