"use client";

import { Moon, Sun } from "lucide-react";

function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Moon aria-hidden className="w-4 h-4 dark:hidden" />
      <Sun aria-hidden className="hidden w-4 h-4 dark:block" />
      <span className="sr-only dark:hidden">Switch to dark mode</span>
      <span className="hidden dark:inline dark:sr-only">Switch to light mode</span>
    </button>
  );
}
