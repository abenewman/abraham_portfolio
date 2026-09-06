import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { getProjects, getSite } from "@/lib/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export function generateMetadata(): Metadata {
  const site = getSite();
  return {
    title: {
      default: `${site.name} - ${site.role}`,
      template: `%s - ${site.name}`,
    },
    description: site.tagline,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  const site = getSite();
  const projects = getProjects().map((p) => ({ slug: p.slug, navLabel: p.navLabel }));

  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full`}>
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
        >
          Skip to content
        </a>
        <Sidebar site={site} projects={projects} />
        <main id="main" className="lg:pl-72">
          {children}
        </main>
      </body>
    </html>
  );
}
