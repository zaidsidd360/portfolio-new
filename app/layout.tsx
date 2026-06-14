import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zaidsiddiqui.dev";
const title = "Md Zaid Siddiqui · Software Engineer";
const description =
  "Md Zaid Siddiqui is a software engineer building APIs, search infrastructure, and AI pipelines at scale. Currently at Vujis and building Discovry.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · Zaid Siddiqui",
  },
  description,
  applicationName: "Zaid Siddiqui",
  authors: [{ name: "Md Zaid Siddiqui", url: siteUrl }],
  creator: "Md Zaid Siddiqui",
  publisher: "Md Zaid Siddiqui",
  category: "technology",
  keywords: [
    "Zaid Siddiqui",
    "Md Zaid Siddiqui",
    "software engineer",
    "backend engineer",
    "full stack developer",
    "Node.js",
    "TypeScript",
    "React",
    "Next.js",
    "OpenSearch",
    "search infrastructure",
    "AI pipelines",
    "Discovry",
    "Hyderabad",
    "portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Md Zaid Siddiqui",
    title,
    description,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Md Zaid Siddiqui · Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@zaidsidd360",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Md Zaid Siddiqui",
  alternateName: "Zaid Siddiqui",
  url: siteUrl,
  image: `${siteUrl}/og.png`,
  jobTitle: "Software Engineer",
  email: "mailto:zaidsidd360@gmail.com",
  worksFor: {
    "@type": "Organization",
    name: "Vujis",
    url: "https://vujis.com",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/zaidsidd360",
    "https://linkedin.com/in/zaidsidd360",
    "https://twitter.com/zaidsidd360",
    "https://www.npmjs.com/package/@zqui/react-terminal",
  ],
  knowsAbout: [
    "Software Engineering",
    "APIs",
    "Search Infrastructure",
    "AI Pipelines",
    "Node.js",
    "TypeScript",
    "React",
    "OpenSearch",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&family=Ubuntu+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
