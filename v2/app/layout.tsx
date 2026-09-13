import type { Metadata, Viewport } from "next";
import { Archivo, Archivo_Narrow, Martian_Mono } from "next/font/google";
import { SITE } from "@/content/site";
import { ScrollProvider } from "@/lib/scroll/ScrollProvider";
import { ScrollRail } from "@/components/dom/ScrollRail";
import { CommandPalette } from "@/components/dom/CommandPalette";
import { SceneMount } from "@/components/three/SceneMount";
import "./globals.css";

/* Reading face. Grotesque workhorse with real tabular figures. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

/* Drafting lettering: title blocks, callouts, headings. Set uppercase, tracked. */
const archivoNarrow = Archivo_Narrow({
  subsets: ["latin"],
  variable: "--font-archivo-narrow",
  display: "swap",
});

/*
 * Dimensions and serial numbers only — measurement, never "technical" costume.
 * The previous site styled half its UI font-mono without ever loading a mono.
 */
const martian = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian",
  display: "swap",
});

// TODO(ibrahim): confirm the production domain before launch.
const BASE_URL = "https://ibbu.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: `${SITE.tagline} ${SITE.role} working on workflow systems, scheduled pipelines, and interfaces that stay fast under load.`,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f0efe8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${archivoNarrow.variable} ${martian.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link bg-object text-vellum px-4 py-2 text-sm">
          Skip to content
        </a>
        {/*
          ScrollProvider is a Client Component, but `children` is passed through
          it as a prop — so the whole page tree below stays server-rendered.
        */}
        <ScrollProvider>
          <SceneMount />
          {children}
          <ScrollRail />
          <CommandPalette />
        </ScrollProvider>
      </body>
    </html>
  );
}
