"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Site } from "@/lib/content";

export type SidebarProject = { slug: string; navLabel: string };

const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
];

export function Sidebar({
  site,
  projects,
}: {
  site: Site;
  projects: SidebarProject[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-canvas/85 px-5 backdrop-blur-md lg:hidden">
        <Link href="/" className="display text-lg">
          {site.name}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-nav"
          className="-mr-2 flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-raised"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            {open ? (
              <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 4l10 10M14 4L4 14" />
              </g>
            ) : (
              <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M2 5h14M2 9h14M2 13h14" />
              </g>
            )}
          </svg>
        </button>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink/25 backdrop-blur-[2px] lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        id="site-nav"
        aria-label="Main"
        onClick={() => setOpen(false)}
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col overflow-y-auto border-r border-line bg-canvas px-7 py-8 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between lg:block">
          <Link href="/" className="group block">
            <span className="display block text-[1.375rem] leading-tight">{site.name}</span>
{site.role && <span className="eyebrow mt-1.5 block">{site.role}</span>}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="-mr-2 -mt-1 flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-raised lg:hidden"
          >
            <span className="sr-only">Close menu</span>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-10 flex-1">
          <ul className="space-y-0.5">
            {primaryNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <NavLink href={item.href} active={active}>
                    {item.label}
                  </NavLink>

                  {item.href === "/work" && (
                    <ul className="mb-2 ml-[7px] mt-1 border-l border-line pl-4">
                      {projects.map((project) => {
                        const on = pathname === `/work/${project.slug}`;
                        return (
                          <li key={project.slug}>
                            <Link
                              href={`/work/${project.slug}`}
                              aria-current={on ? "page" : undefined}
                              className={`group relative -ml-4 block rounded-md py-1.5 pl-4 pr-2 text-[0.8125rem] leading-snug transition-colors duration-200 ${
                                on ? "text-ink" : "text-ink-faint hover:text-ink-soft"
                              }`}
                            >
                              <span
                                aria-hidden="true"
                                className={`absolute left-[-1px] top-1/2 h-4 w-px -translate-y-1/2 bg-clay transition-opacity duration-200 ${
                                  on ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                                }`}
                              />
                              {project.navLabel}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              className="block text-[0.8125rem] text-ink-soft underline decoration-line-strong underline-offset-4 transition hover:text-clay hover:decoration-clay"
            >
              {site.email}
            </a>
          )}
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.75rem] text-ink-faint transition hover:text-clay"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          {site.location && (
            <p className="mt-5 text-[0.6875rem] leading-relaxed text-ink-faint/80">
              {site.location}
            </p>
          )}
        </div>
      </nav>
    </>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group flex items-center gap-2.5 rounded-md py-1.5 text-[0.9375rem] transition-colors duration-200 ${
        active ? "text-ink" : "text-ink-soft hover:text-ink"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 ${
          active ? "bg-clay" : "bg-line-strong group-hover:bg-clay-soft"
        }`}
      />
      {children}
    </Link>
  );
}
