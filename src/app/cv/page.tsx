import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PrintButton } from "@/components/ui/print-button";
import { aboutCraftTags, aboutSectionContent, aboutStack } from "@/data/about";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/data/constants";
import { experiences } from "@/data/experience";

export const metadata: Metadata = {
  title: "Résumé — Maxime Miramond",
  description: "Senior Software Engineer · 9+ years · Aix-en-Provence",
  robots: { index: false },
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-[10px] font-mono text-amber-600 tracking-[0.2em] uppercase mb-2.5">
      <span className="w-2 h-px bg-amber-400 shrink-0" />
      {children}
      <span className="flex-1 h-px bg-gray-100 shrink-0" />
    </h2>
  );
}

export default function CVPage() {
  const githubHandle = GITHUB_URL.replace("https://", "");
  const linkedinHandle = LINKEDIN_URL.replace("https://linkedin.com/", "");
  const now = new Date();
  const age = now.getFullYear() - 1992 - (now.getMonth() < 9 ? 1 : 0);

  return (
    <>
      <style>{`
        @page { size: A4; margin: 16mm 20mm; }
        @media print {
          html, body { background: white !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Portfolio</span>
        </Link>
        <PrintButton />
      </div>

      <div className="bg-white text-gray-900 min-h-screen print:min-h-0 font-sans">
        <div className="max-w-[210mm] mx-auto px-4 sm:px-10 pb-10 pt-20 print:p-0">
          <header className="mb-7 flex justify-between items-start gap-4">
            <div className="flex-1 border-l-[3px] border-amber-400 pl-4 min-w-0">
              <h1 className="text-[1.9rem] sm:text-[2.5rem] print:text-[2.5rem] font-bold tracking-tight leading-none mb-1.5">
                <span className="text-amber-500">Maxime</span>{" "}
                <span className="text-gray-900">Miramond</span>
              </h1>
              <p className="text-[10px] sm:text-[11px] print:text-[11px] font-mono text-gray-500 uppercase tracking-[0.06em] mb-3 sm:whitespace-nowrap print:whitespace-nowrap">
                Senior Software Engineer {"·"} {age} ans {"·"} Aix-en-Provence, France
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:text-[11px] print:text-[11px] font-mono text-gray-400">
                <a
                  href={`mailto:${EMAIL}`}
                  className="hover:text-amber-500 transition-colors print:no-underline"
                >
                  {EMAIL}
                </a>
                <span className="text-amber-300">·</span>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors print:no-underline"
                >
                  {linkedinHandle}
                </a>
                <span className="text-amber-300">·</span>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors print:no-underline"
                >
                  {githubHandle}
                </a>
              </div>
            </div>
            <Image
              src="/avatar.webp"
              alt="Maxime Miramond"
              width={84}
              height={84}
              className="rounded-full object-cover ring-2 ring-amber-300 ring-offset-2 shrink-0 w-14 h-14 sm:w-21 sm:h-21 print:w-21 print:h-21"
            />
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_176px] print:grid-cols-[1fr_176px] gap-8">
            <main className="order-2 sm:order-1 print:order-1">
              <SectionTitle>Experience</SectionTitle>
              <div>
                {experiences.map((exp, i) => (
                  <article
                    key={exp.company}
                    className={`break-inside-avoid${i > 0 ? " pt-4 mt-4 border-t border-amber-100/70" : ""}`}
                  >
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-semibold text-sm text-gray-900 flex items-center gap-1.5">
                        {exp.featured && (
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        )}
                        {exp.company}
                      </span>
                      <span className="text-[11px] text-gray-400 font-mono ml-2 shrink-0">
                        {exp.period}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-xs text-gray-500 italic">{exp.role}</span>
                      <span className="text-[11px] text-gray-400 ml-2 shrink-0">
                        {exp.location}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed mb-1.5">
                      {exp.description}
                    </p>
                    {exp.achievements && (
                      <ul className="space-y-0.5 mb-2">
                        {exp.achievements.map((a) => (
                          <li
                            key={a}
                            className="text-[11px] text-gray-600 leading-relaxed flex gap-2"
                          >
                            <span className="text-amber-400 shrink-0 select-none">▸</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {exp.tags.map((t) => (
                        <span
                          key={t}
                          className={
                            exp.featured
                              ? "text-[9px] font-mono border rounded px-1.5 py-0.5 bg-amber-50 border-amber-200 text-amber-700"
                              : "text-[9px] font-mono text-gray-400 border border-gray-200 rounded px-1.5 py-0.5"
                          }
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </main>

            <aside className="order-1 sm:order-2 print:order-2 space-y-5 border-t sm:border-t-0 print:border-t-0 border-amber-100 pt-6 sm:pt-0 print:pt-0 sm:border-l-2 print:border-l-2 sm:pl-6 print:pl-6">
              <section>
                <SectionTitle>Summary</SectionTitle>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  {aboutSectionContent.whoIAmParagraph1}
                </p>
              </section>

              <section>
                <SectionTitle>Stack</SectionTitle>
                <div className="flex flex-wrap gap-1">
                  {aboutStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-mono text-gray-500 border border-gray-200 rounded px-1.5 py-0.5 bg-gray-50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle>Practices</SectionTitle>
                <div className="flex flex-wrap gap-1">
                  {aboutCraftTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono text-gray-500 border border-gray-200 rounded px-1.5 py-0.5 bg-gray-50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle>Education</SectionTitle>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-gray-800">EPITECH</p>
                    <p className="text-[10px] text-gray-500 leading-snug">
                      Expert en Technologies de l&rsquo;Information
                    </p>
                    <p className="text-[10px] font-mono text-gray-400 mt-0.5">2011 — 2016</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-600">Université Laval · Québec</p>
                    <p className="text-[10px] font-mono text-gray-400 mt-0.5">
                      2014 — 2015 · exchange
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <SectionTitle>Languages</SectionTitle>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-gray-700">French</span>
                    <span className="text-[9px] font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                      Native
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-gray-700">English</span>
                    <span className="text-[9px] font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                      Professional
                    </span>
                  </div>
                </div>
              </section>

              <section>
                <SectionTitle>Misc</SectionTitle>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-700">Driving license</span>
                  <span className="text-[9px] font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                    B
                  </span>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
