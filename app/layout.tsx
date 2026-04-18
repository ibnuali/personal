import type React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

const SITE_URL = "https://ibnua.li";
const SITE_NAME = "Ibnu Ali Mukhtarom";

export const metadata: Metadata = {
  title: {
    default: "Ibnu Ali Mukhtarom — Software Engineer",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Software Engineer from Indonesia specializing in React, TypeScript, and Node.js. Building scalable systems at the crossroads of innovation, performance, and user impact.",
  keywords: [
    "Ibnu Ali Mukhtarom",
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Web Development",
    "Indonesia",
  ],
  authors: [{ name: "Ibnu Ali Mukhtarom", url: SITE_URL }],
  creator: "Ibnu Ali Mukhtarom",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Ibnu Ali Mukhtarom — Software Engineer",
    description:
      "Software Engineer from Indonesia specializing in React, TypeScript, and Node.js. Building scalable systems at the crossroads of innovation, performance, and user impact.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibnu Ali Mukhtarom — Software Engineer",
    description:
      "Software Engineer from Indonesia specializing in React, TypeScript, and Node.js.",
    creator: "@iibnuali",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ibnu Ali Mukhtarom",
    url: SITE_URL,
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Len Inovasi Teknologi",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
      addressLocality: "Indonesia",
    },
    sameAs: [
      "https://github.com/ibnuali",
      "https://www.linkedin.com/in/ibnuali/",
      "https://x.com/iibnuali",
      "https://www.instagram.com/ibnualii/",
    ],
    knowsAbout: [
      "React",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Python",
      "PostgreSQL",
      "Docker",
      "WebSocket",
      "WebRTC",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('loading')",
          }}
        />
        <JsonLd />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
