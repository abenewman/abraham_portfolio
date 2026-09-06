# Abraham Newman - Portfolio

A portfolio site for a writer working in film, television and narrative media.
Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4.

**All content is placeholder.** The structure is real; the words and images are
not.

## Start here

- **[SETUP.md](SETUP.md)** - installing everything on a Mac from scratch and
  getting the site running locally. Written for someone who has never used a
  developer tool.
- **[EDITING.md](EDITING.md)** - adding writing and images, and creating new
  project pages. No code required.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Requires Node.js 20.9 or newer.

## How it is put together

Content is authored as Markdown and YAML in `content/`, read at build time, and
rendered into static pages. Nothing about editing content requires touching
`src/`.

```
content/
  site.yml              name, tagline, email, social links, shared intros
  about.md              About page: settings block + biography
  resume.md             Résumé page, entirely a settings block
  projects/
    01-….md … 06-….md   one file per project, filename sets order and URL
    _TEMPLATE.md        copied to create a new project (ignored by the build)
public/
  images/               all images, referenced as /images/<name>
  *.pdf                 the downloadable résumé
src/
  lib/content.ts        reads and validates content, with author-facing errors
  lib/markdown.ts       Markdown → HTML, plus the figure/gallery/quote rules
  components/           sidebar and shared UI
  app/                  routes
```

### Content model

Files in `content/projects` are discovered automatically. The leading `NN-`
orders the sidebar and is stripped from the slug, so `03-night-shift.md` serves
`/work/night-shift`. Files beginning with `_` or `.` are skipped.

Only `title` and `cover` are required on a project. Every other field is
optional and its UI is omitted when absent, so a valid project page can be two
lines of frontmatter. The same is true across the site: the résumé, the About
portrait, "Currently", "Elsewhere" and each résumé section all disappear rather
than render empty.

Authoring mistakes are caught in `src/lib/content.ts` and re-thrown as messages
that name the file and the fix, rather than surfacing as a parser stack trace.

### Markdown conventions

Body copy is plain Markdown. Three conventions are applied when rendering, so
that authors never need a shortcode or a component:

- An image alone in a paragraph becomes a `<figure>`, with the Markdown title
  (`![alt](src "title")`) as the caption.
- Two or more images in one paragraph become a side-by-side gallery.
- A blockquote becomes a pull quote; a trailing line starting with `--` becomes
  the attribution.

Intrinsic width and height are stamped onto body images at build time so pages
do not shift while images load.

## Design notes

- Warm minimal: cream canvas, Fraunces for display type, Inter for body text,
  and a single clay accent used sparingly for links and active states.
- Colour and type tokens live in the `@theme` block at the top of
  `src/app/globals.css`. Changing the accent is one line: `--color-clay`.
- The sidebar is fixed on desktop and becomes a slide-in drawer below 1024px.
- Respects `prefers-reduced-motion`, includes a skip link, and every image
  carries alt text.

## Deploying

Push to GitHub and import the repository at vercel.com. No configuration or
environment variables are needed. Every page is statically prerendered.

A failed build does not replace the live site, so a content typo cannot take
the site down.
