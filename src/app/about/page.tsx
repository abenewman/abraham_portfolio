import type { Metadata } from "next";
import Link from "next/link";
import { Container, Figure } from "@/components/ui";
import { getAbout, getSite } from "@/lib/content";

export function generateMetadata(): Metadata {
  const site = getSite();
  return { title: "About", description: `About ${site.name}, ${site.role}.` };
}

export default function AboutPage() {
  const site = getSite();
  const about = getAbout();

  return (
    <div className="pb-28 pt-24 lg:pt-28">
      <Container>
        <header className="rise max-w-2xl">
          <p className="eyebrow">About</p>
          <h1 className="display mt-5 text-[clamp(2.25rem,5.5vw,3.5rem)]">{site.name}</h1>
{site.tagline && (
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{site.tagline}</p>
          )}
        </header>

        <div className={`mt-14 grid gap-10 lg:gap-14 ${about.portrait ? "lg:grid-cols-[minmax(0,1fr)_18rem]" : ""}`}>
          <div className="md order-2 max-w-2xl lg:order-1" dangerouslySetInnerHTML={{ __html: about.html }} />

          {about.portrait && (
            <aside className="order-1 lg:order-2">
              <Figure
                src={about.portrait}
                alt={about.portraitAlt || site.name}
                ratio="4 / 5"
                sizes="(min-width: 1024px) 18rem, 100vw"
                caption={about.portraitCaption}
                priority
              />
            </aside>
          )}
        </div>

        {about.currently.length > 0 && (
          <section className="mt-20 border-t border-line pt-8">
            <h2 className="eyebrow mb-8">Currently</h2>
            <ul className="space-y-4">
              {about.currently.map((item) => (
                <li key={item} className="relative max-w-2xl pl-6 leading-relaxed text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[0.65em] h-1.5 w-1.5 rounded-full bg-clay-soft"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {site.socials.length > 0 && (
        <section className="mt-20 border-t border-line pt-8">
          <h2 className="eyebrow mb-8">Elsewhere</h2>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-baseline justify-between gap-4 border-b border-line py-3 transition hover:border-clay"
                >
                  <span className="text-ink transition group-hover:text-clay">{s.label}</span>
                  <span className="text-sm text-ink-faint">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
        )}

        <div className="mt-20 flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className="rounded-full bg-ink px-5 py-2.5 text-sm text-canvas transition hover:bg-clay"
          >
            Email {site.name.split(" ")[0]}
          </a>
          <Link
            href="/resume"
            className="rounded-full border border-line-strong px-5 py-2.5 text-sm text-ink transition hover:border-clay hover:text-clay"
          >
            Read the résumé
          </Link>
        </div>
      </Container>
    </div>
  );
}
