import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/components/providers";
import { EMAIL, GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL, SITE_URL } from "@/data/constants";
import { featuredExperience } from "@/data/experience";
import { fullName, profile } from "@/data/profile";
import { withYears } from "@/lib/seniority";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = `${fullName} — ${profile.role}`;
const DESCRIPTION = withYears(
  `${profile.role} with {years}+ years of experience building scalable full-stack systems. Based in ${profile.city}, ${profile.country}.`
);
const OG_DESCRIPTION = withYears(
  `${profile.role} with {years}+ years of experience building scalable full-stack systems.`
);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "48x48 32x32 16x16" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    siteName: fullName,
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: OG_DESCRIPTION,
    images: ["/og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: fullName,
  url: SITE_URL,
  jobTitle: profile.role,
  worksFor: { "@type": "Organization", name: featuredExperience.company },
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.city,
    addressCountry: profile.countryCode,
  },
  sameAs: [GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL],
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
            __html: `try{document.documentElement.classList.toggle("dark",localStorage.getItem("theme")!=="light")}catch(e){document.documentElement.classList.add("dark")}`,
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
