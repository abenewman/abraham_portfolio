import Link from "next/link";
import { Container, Figure, MetaLine } from "@/components/ui";
import { getFeaturedProject, getProjects, getSite } from "@/lib/content";

export default function HomePage() {
  const site = getSite();
  const featured = getFeaturedProject();
  const rest = getProjects().filter((p) => p.slug !== featured.slug);

  return (
    <>
      <section className="pt-24 lg:pt-28">
        <Container>
          <div className="rise">
            <p className="eyebrow">{site.discipline}</p>
            <h1 className="display mt-5 text-[clamp(2.5rem,6.5vw,4.25rem)]">{site.name}</h1>
{site.tagline && (
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{site.tagline}</p>
            )}
          </div>
        </Container>
      </section>

      <section className="mt-16 lg:mt-20">
        <Container>
          <div className="rise" style={{ animationDelay: "120ms" }}>
            <Link href={`/work/${featured.slug}`} className="group block">
              <div className="overflow-hidden rounded-2xl border border-line bg-raised">
                <Figure
                  src={featured.lead}
                  alt={featured.leadAlt}
                  ratio="16 / 9"
                  priority
                  className="[&>div]:rounded-none [&>div]:border-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                />
              </div>

              <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
<MetaLine parts={["Featured", featured.kicker, featured.year]} />
                  <h2 className="display mt-3 text-[clamp(1.75rem,4vw,2.75rem)]">
                    {featured.title}
                  </h2>
{featured.logline && (
                    <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
                      {featured.logline}
                    </p>
                  )}
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 text-sm text-clay">
                  Read more
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      <section className="mt-24 lg:mt-32">
        <Container>
          <div className="flex items-baseline justify-between border-t border-line pt-6">
            <h2 className="eyebrow">More work</h2>
            <Link href="/work" className="text-sm text-ink-soft transition hover:text-clay">
              All projects →
            </Link>
          </div>

          <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {rest.map((project) => (
              <li key={project.slug}>
                <Link href={`/work/${project.slug}`} className="group block">
                  <div className="overflow-hidden rounded-xl border border-line bg-raised">
                    <Figure
                      src={project.cover}
                      alt={project.coverAlt}
                      ratio="4 / 3"
                      sizes="(min-width: 640px) 24rem, 100vw"
                      className="[&>div]:rounded-none [&>div]:border-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </div>
<MetaLine parts={[project.kicker, project.year]} className="eyebrow mt-4" />
                  <h3 className="display mt-2 text-xl transition-colors duration-200 group-hover:text-clay">
                    {project.title}
                  </h3>
{project.logline && (
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                      {project.logline}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="mt-28 pb-28 lg:mt-36">
        <Container>
          <div className="rounded-2xl border border-line bg-surface p-8 sm:p-12">
            <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
<p className="eyebrow">About</p>
                {site.homeAboutTeaser && (
                  <p className="display mt-4 text-[clamp(1.375rem,3vw,1.875rem)] leading-snug text-ink">
                    {site.homeAboutTeaser}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/about"
                  className="rounded-full bg-ink px-5 py-2.5 text-sm text-canvas transition hover:bg-clay"
                >
                  About {site.name.split(" ")[0]}
                </Link>
                <Link
                  href="/resume"
                  className="rounded-full border border-line-strong px-5 py-2.5 text-sm text-ink transition hover:border-clay hover:text-clay"
                >
                  Résumé
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
