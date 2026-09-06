import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown } from "./markdown";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Content is read from disk rather than imported, so the bundler cannot know
// when it changes. Caching in development would hide edits until a restart.
const CACHE = process.env.NODE_ENV === "production";

/**
 * Content is edited by hand, so a mistake in a file is expected and should read
 * like an instruction rather than a stack trace.
 */
function fail(file: string, problem: string): never {
  throw new Error(
    [
      "",
      `Problem in content/${file}`,
      `  ${problem}`,
      "",
      "Fix that file and save it. The page reloads on its own.",
      "",
    ].join("\n"),
  );
}

type Fields = Record<string, unknown>;

/** A value that must be present, because the page cannot be drawn without it. */
function required(data: Fields, key: string, file: string): string {
  const value = data[key];
  if (typeof value !== "string" || !value.trim()) {
    fail(file, `the "${key}:" line is missing or empty. It is required.`);
  }
  return value.trim();
}

/** Everything else. Missing simply means "do not show it". */
function text(data: Fields, key: string): string {
  const value = data[key];
  return typeof value === "string" ? value.trim() : "";
}

function list(data: Fields, key: string): string[] {
  const value = data[key];
  return Array.isArray(value) ? value.map(String) : [];
}

function readFile(file: string): string {
  const full = path.join(CONTENT_DIR, file);
  if (!fs.existsSync(full)) fail(file, "this file is missing.");
  return fs.readFileSync(full, "utf8");
}

function readMarkdown(file: string) {
  try {
    const { data, content } = matter(readFile(file));
    return { data: data as Fields, body: content };
  } catch {
    fail(
      file,
      "the settings block at the top could not be read. Check that it starts and ends with a --- line, and that each value is wrapped in quotes.",
    );
  }
}

/* ------------------------------------------------------------------ site */

export type Social = { label: string; href: string; handle: string };

export type Site = {
  name: string;
  role: string;
  discipline: string;
  location: string;
  email: string;
  tagline: string;
  workIntro: string;
  homeAboutTeaser: string;
  resumeFile: string;
  socials: Social[];
};

let siteCache: Site | undefined;

export function getSite(): Site {
  if (siteCache && CACHE) return siteCache;

  const file = "site.yml";
  // site.yml is a bare settings block, so wrap it to reuse the same parser.
  const { data } = matter(`---\n${readFile(file)}\n---\n`) as unknown as { data: Fields };

  const site: Site = {
    name: required(data, "name", file),
    role: text(data, "role"),
    discipline: text(data, "discipline"),
    location: text(data, "location"),
    email: text(data, "email"),
    tagline: text(data, "tagline"),
    workIntro: text(data, "workIntro"),
    homeAboutTeaser: text(data, "homeAboutTeaser"),
    resumeFile: text(data, "resumeFile"),
    socials: (Array.isArray(data.socials) ? data.socials : [])
      .map((raw) => raw as Fields)
      .filter((s) => typeof s?.label === "string" && typeof s?.href === "string")
      .map((s) => ({
        label: s.label as string,
        href: s.href as string,
        handle: typeof s.handle === "string" ? s.handle : "",
      })),
  };

  siteCache = site;
  return site;
}

/* -------------------------------------------------------------- projects */

/**
 * Only `title` and `cover` are required. Every other field may be left out of
 * the markdown file, and the page simply omits that piece.
 */
export type Project = {
  slug: string;
  title: string;
  cover: string;
  coverAlt: string;
  navLabel: string;
  lead: string;
  leadAlt: string;
  leadCaption: string;
  kicker: string;
  year: string;
  format: string;
  logline: string;
  facts: { label: string; value: string }[];
  html: string;
};

let projectsCache: Project[] | undefined;

export function getProjects(): Project[] {
  if (projectsCache && CACHE) return projectsCache;

  const dir = path.join(CONTENT_DIR, "projects");
  if (!fs.existsSync(dir)) fail("projects/", "this folder is missing.");

  // Files appear in filename order, so the "01-", "02-" prefixes set the order
  // of the sidebar. The prefix is stripped from the web address.
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_") && !f.startsWith("."))
    .sort();

  if (files.length === 0) fail("projects/", "there are no project files in this folder yet.");

  const parsed: Project[] = files.map((filename) => {
    const file = `projects/${filename}`;
    const { data, body } = readMarkdown(file);

    const title = required(data, "title", file);
    const cover = required(data, "cover", file);
    const coverAlt = text(data, "coverAlt") || title;

    const rawFacts = data.facts;
    if (rawFacts !== undefined && (typeof rawFacts !== "object" || Array.isArray(rawFacts))) {
      fail(file, '"facts:" must be a list of indented "Label: Value" lines.');
    }

    return {
      slug: filename.replace(/\.md$/, "").replace(/^\d+[-_]/, ""),
      title,
      cover,
      coverAlt,
      navLabel: text(data, "navLabel") || title,
      lead: text(data, "lead") || cover,
      leadAlt: text(data, "leadAlt") || coverAlt,
      leadCaption: text(data, "leadCaption"),
      kicker: text(data, "kicker"),
      year: text(data, "year"),
      format: text(data, "format"),
      logline: text(data, "logline"),
      facts: Object.entries((rawFacts ?? {}) as Fields).map(([label, value]) => ({
        label,
        value: String(value),
      })),
      html: renderMarkdown(body),
    };
  });

  projectsCache = parsed;
  return parsed;
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getFeaturedProject(): Project {
  return getProjects()[0];
}

/* ----------------------------------------------------------------- about */

export type About = {
  portrait: string;
  portraitAlt: string;
  portraitCaption: string;
  currently: string[];
  html: string;
};

export function getAbout(): About {
  const file = "about.md";
  const { data, body } = readMarkdown(file);
  return {
    portrait: text(data, "portrait"),
    portraitAlt: text(data, "portraitAlt"),
    portraitCaption: text(data, "portraitCaption"),
    currently: list(data, "currently"),
    html: renderMarkdown(body),
  };
}

/* ---------------------------------------------------------------- resume */

export type Resume = {
  summary: string;
  experience: {
    role: string;
    org: string;
    dates: string;
    location: string;
    bullets: string[];
  }[];
  education: { school: string; credential: string; dates: string; detail: string }[];
  skills: { label: string; items: string[] }[];
  awards: { title: string; detail: string }[];
};

export function getResume(): Resume {
  const { data } = readMarkdown("resume.md");
  const entries = (key: string) => (Array.isArray(data[key]) ? (data[key] as unknown[]) : []);

  return {
    summary: text(data, "summary"),
    experience: entries("experience").map((raw) => {
      const job = raw as Fields;
      return {
        role: text(job, "role"),
        org: text(job, "org"),
        dates: text(job, "dates"),
        location: text(job, "location"),
        bullets: list(job, "bullets"),
      };
    }),
    education: entries("education").map((raw) => {
      const ed = raw as Fields;
      return {
        school: text(ed, "school"),
        credential: text(ed, "credential"),
        dates: text(ed, "dates"),
        detail: text(ed, "detail"),
      };
    }),
    skills: Object.entries((data.skills ?? {}) as Fields).map(([label, items]) => ({
      label,
      items: Array.isArray(items) ? items.map(String) : [],
    })),
    awards: entries("awards").map((raw) => {
      const a = raw as Fields;
      return { title: text(a, "title"), detail: text(a, "detail") };
    }),
  };
}
