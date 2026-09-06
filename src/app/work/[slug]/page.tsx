import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Figure, MetaLine } from "@/components/ui";
import { getProject, getProjects } from "@/lib/content";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.logline };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const all = getProjects();
  const next = all[(all.findIndex((p) => p.slug === slug) + 1) % all.length];

  return (
    <article className="pb-28 pt-24 lg:pt-28">
      <Container>
        <header className="rise">
          <Link href="/work" className="text-sm text-ink-faint transition hover:text-clay">
            ← Work
          </Link>
<MetaLine parts={[project.kicker, project.year]} className="eyebrow mt-8" />
          <h1 className="display mt-4 text-[clamp(2.25rem,6vw,3.75rem)]">{project.title}</h1>
{project.logline && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{project.logline}</p>
          )}
        </header>

        <Figure
          src={project.lead}
          alt={project.leadAlt}
          caption={project.leadCaption}
          ratio="16 / 9"
          priority
          className="rise mt-12 lg:mt-14"
        />

        {project.facts.length > 0 && (
          <dl className="mt-12 grid gap-x-8 gap-y-6 border-y border-line py-8 sm:grid-cols-3 lg:grid-cols-5">
            {project.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="mt-2 text-sm leading-snug text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}

{project.html.trim() && (
          <div className="md mt-14 lg:mt-16" dangerouslySetInnerHTML={{ __html: project.html }} />
        )}

        <nav className="mt-24 border-t border-line pt-8">
          <Link href={`/work/${next.slug}`} className="group block">
            <p className="eyebrow">Next project</p>
            <p className="display mt-3 text-2xl transition-colors duration-200 group-hover:text-clay">
              {next.title}
              <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </p>
          </Link>
        </nav>
      </Container>
    </article>
  );
}
