import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider }  from "@/components/ThemeProvider";
import { ErrorBoundary }  from "@/components/ErrorBoundary";
import { siteConfig }     from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

function getSiteUrl(): URL {
  try   { return new URL(siteConfig.seo.url); }
  catch { return new URL("https://kaua-honorato.netlify.app"); }
}

// ── JSON-LD: Person schema (Google Rich Results) ─────────────────
const personJsonLd = {
  "@context":  "https://schema.org",
  "@type":     "Person",
  name:        siteConfig.name,
  jobTitle:    siteConfig.title,
  description: siteConfig.bio,
  email:       `mailto:${siteConfig.email}`,
  url:         siteConfig.seo.url,
  sameAs: [
    siteConfig.social.github,
    siteConfig.social.linkedin,
  ],
};

// Safely serialize JSON-LD — prevent </script> injection
function safeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g,  "\\u003c")
    .replace(/>/g,  "\\u003e")
    .replace(/&/g,  "\\u0026")
    .replace(/'/g,  "\\u0027");
}

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#07071a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export const metadata: Metadata = {
  title:        siteConfig.seo.title,
  description:  siteConfig.seo.description,
  keywords:     siteConfig.seo.keywords,
  authors:      [{ name: siteConfig.name }],
  creator:      siteConfig.name,
  metadataBase: getSiteUrl(),
  openGraph: {
    type:        "website",
    url:         siteConfig.seo.url,
    title:       siteConfig.seo.title,
    description: siteConfig.seo.description,
    images:      [{ url: siteConfig.seo.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    locale:      "pt_BR",
    siteName:    siteConfig.name,
  },
  twitter: {
    card:        "summary_large_image",
    title:       siteConfig.seo.title,
    description: siteConfig.seo.description,
    images:      [siteConfig.seo.ogImage],
  },
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: siteConfig.seo.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased">
        {/* JSON-LD structured data for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
