import type { Metadata } from "next";
import { Container, MetaLine } from "@/components/ui";
import { getResume, getSite } from "@/lib/content";

export function generateMetadata(): Metadata {
  const site = getSite();
  return { title: "Résumé", description: `Résumé for ${site.name}, ${site.role}.` };
}

export default function ResumePage() {
  const site = getSite();
  const resume = getResume();

  return (
    <div className="pb-28 pt-24 lg:pt-28">
      <Container>
        <header className="rise flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Résumé</p>
            <h1 className="display mt-5 text-[clamp(2.25rem,5.5vw,3.5rem)]">{site.name}</h1>
<MetaLine parts={[site.role, site.location]} className="mt-3 text-ink-soft" />
          </div>
          {site.resumeFile && (
          <a
            href={site.resumeFile}
            download
            className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-sm text-canvas transition hover:bg-clay"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none">
              <path
                d="M7 1v8m0 0L4 6m3 3l3-3M1.5 11.5h11"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download PDF
          </a>
          )}
        </header>

{resume.summary && (
          <p className="mt-10 max-w-2xl leading-relaxed text-ink-soft">{resume.summary}</p>
        )}

        {resume.experience.length > 0 && (
        <Section title="Experience">
          <ol className="space-y-10">
            {resume.experience.map((job) => (
              <li key={`${job.org}-${job.role}`}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="display text-xl">{job.role}</h3>
                  <p className="shrink-0 text-sm text-ink-faint">{job.dates}</p>
                </div>
<MetaLine parts={[job.org, job.location]} className="mt-1 text-sm text-ink-soft" />
                <ul className="mt-4 space-y-2">
                  {job.bullets.map((b, i) => (
                    <li key={i} className="relative pl-5 text-[0.9375rem] leading-relaxed text-ink-soft">
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-clay-soft"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>
        )}

        {resume.education.length > 0 && (
        <Section title="Education">
          {resume.education.map((ed) => (
            <div key={ed.school}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="display text-xl">{ed.school}</h3>
                <p className="shrink-0 text-sm text-ink-faint">{ed.dates}</p>
              </div>
{ed.credential && <p className="mt-1 text-sm text-ink-soft">{ed.credential}</p>}
{ed.detail && (
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{ed.detail}</p>
              )}
            </div>
          ))}
        </Section>
        )}

        {resume.skills.length > 0 && (
        <Section title="Skills">
          <div className="grid gap-8 sm:grid-cols-3">
            {resume.skills.map((group) => (
              <div key={group.label}>
                <h3 className="eyebrow">{group.label}</h3>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-[0.9375rem] text-ink-soft">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
        )}

        {resume.awards.length > 0 && (
        <Section title="Awards & selections">
          <ul className="space-y-3">
            {resume.awards.map((a) => (
              <li
                key={a.title}
                className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="text-[0.9375rem] text-ink">{a.title}</span>
                <span className="shrink-0 text-sm text-ink-faint">{a.detail}</span>
              </li>
            ))}
          </ul>
        </Section>
        )}

        {site.email && (
        <div className="mt-20 rounded-2xl border border-line bg-surface p-8">
          <p className="eyebrow">Get in touch</p>
          <a
            href={`mailto:${site.email}`}
            className="display mt-3 inline-block text-2xl text-ink transition hover:text-clay"
          >
            {site.email}
          </a>
        </div>
        )}
      </Container>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-16 border-t border-line pt-8">
      <h2 className="eyebrow mb-8">{title}</h2>
      {children}
    </section>
  );
}
