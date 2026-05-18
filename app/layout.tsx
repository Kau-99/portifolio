import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Garante que a URL base seja sempre válida, mesmo com placeholder
function getSiteUrl() {
  try {
    return new URL(siteConfig.seo.url);
  } catch {
    return new URL("https://seusite.netlify.app");
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#07071a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  metadataBase: getSiteUrl(),
  openGraph: {
    type: "website",
    url: siteConfig.seo.url,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630 }],
    locale: "pt_BR",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: siteConfig.seo.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      {/*
        suppressHydrationWarning no <html> é necessário: next-themes injeta
        um script inline que adiciona a classe "dark"/"light" antes da hidratação
        React, evitando FOUC. O React vê uma divergência server/client na classe
        e o suppressHydrationWarning diz para ignorá-la silenciosamente.
      */}
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
