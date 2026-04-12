"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GITHUB_URL } from "@/data/constants";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
] as const;

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const y = window.scrollY;
        setScrolled(y > 20);

        const threshold = y + window.innerHeight * 0.4;
        let current: string | null = null;
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= threshold) current = id;
        }
        setActiveSection(current);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <ScrollProgress />
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled && "bg-background/80 backdrop-blur-md border-b border-border"
        )}
      >
        <nav
          aria-label="Main navigation"
          className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between"
        >
          <a
            href="#"
            className="flex items-baseline gap-px hover:opacity-80 transition-opacity group"
          >
            <span className="font-bold text-base tracking-tight text-foreground font-mono">
              maxime
            </span>
            <span className="text-primary font-bold text-base font-mono">.</span>
            <span className="font-bold text-base tracking-tight text-foreground/40 font-mono group-hover:text-foreground/60 transition-colors">
              dev
            </span>
          </a>

          <ul className="hidden sm:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "text-sm transition-colors relative",
                      "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full",
                      "after:origin-left after:scale-x-0 after:bg-primary after:transition-transform",
                      "hover:text-foreground",
                      isActive ? "text-foreground after:scale-x-100" : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="sm:hidden flex items-center justify-center w-8 h-8 text-foreground"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div
            id="mobile-menu"
            className="sm:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 py-4 flex flex-col gap-4"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        )}
      </header>
    </>
  );
}
