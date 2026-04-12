import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/components/providers";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/data/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Maxime Miramond — Senior Software Engineer";
const DESCRIPTION =
  "Senior Software Engineer with 9+ years of experience building scalable full-stack systems. Based in Aix-en-Provence, France.";
const OG_DESCRIPTION =
  "Senior Software Engineer with 9+ years of experience building scalable full-stack systems.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    siteName: "Maxime Miramond",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: OG_DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Maxime Miramond",
  url: SITE_URL,
  jobTitle: "Senior Software Engineer",
  worksFor: { "@type": "Organization", name: "Gojob" },
  address: { "@type": "PostalAddress", addressLocality: "Aix-en-Provence", addressCountry: "FR" },
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  email: EMAIL,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme")||"dark";document.documentElement.classList.toggle("dark",t==="dark")}catch(e){document.documentElement.classList.add("dark")}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
