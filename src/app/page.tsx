import { type Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { ArcadeMode } from "@/components/ui/arcade-mode";
import { aboutSectionContent } from "@/data/about";
import { withYears } from "@/lib/seniority";

// Declared here rather than in the layout, which every route inherits: the CV and the 404 would
// otherwise each claim to be the home page.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-100 focus-visible:px-4 focus-visible:py-2 focus-visible:rounded-md focus-visible:bg-cta focus-visible:text-cta-foreground focus-visible:text-sm focus-visible:font-medium"
      >
        Skip to content
      </a>
      <ArcadeMode>
        <Navbar />
        <main id="main-content">
          <Hero />
          <About whoIAm={withYears(aboutSectionContent.whoIAmParagraph1)} />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </ArcadeMode>
    </>
  );
}
