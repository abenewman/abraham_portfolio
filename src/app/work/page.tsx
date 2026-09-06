import type { Metadata } from "next";
import Link from "next/link";
import { Container, Figure, MetaLine } from "@/components/ui";
import { getProjects, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected screenplays, scripts, essays and production writing.",
};

export default function WorkPage() {
  const projects = getProjects();
  const site = getSite();

  return (
    <div className="pb-28 pt-24 lg:pt-28">
      <Container>
        <header className="rise max-w-2xl">
          <p className="eyebrow">Selected work</p>
          <h1 className="display mt-5 text-[clamp(2.25rem,5.5vw,3.5rem)]">Projects</h1>
{site.workIntro && (
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{site.workIntro}</p>
          )}
        </header>

        <ul className="mt-16 space-y-16 lg:space-y-24">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="group grid gap-6 sm:grid-cols-2 sm:items-center sm:gap-10"
              >
                <div
                  className={`overflow-hidden rounded-xl border border-line bg-raised ${
                    i % 2 === 1 ? "sm:order-2" : ""
                  }`}
                >
                  <Figure
                    src={project.cover}
                    alt={project.coverAlt}
                    ratio="4 / 3"
                    sizes="(min-width: 640px) 26rem, 100vw"
                    className="[&>div]:rounded-none [&>div]:border-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </div>

                <div>
<MetaLine parts={[project.kicker, project.year]} />
                  <h2 className="display mt-3 text-[clamp(1.5rem,3.2vw,2rem)] transition-colors duration-200 group-hover:text-clay">
                    {project.title}
                  </h2>
{project.logline && (
                    <p className="mt-4 leading-relaxed text-ink-soft">{project.logline}</p>
                  )}
{project.format && (
                    <p className="mt-5 text-sm text-ink-faint">{project.format}</p>
                  )}
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-clay">
                    Read more
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
