# Editing the site

You never need to touch the website's code. Everything you write and every
image you show lives in two folders:

```
content/          <- all the words
public/images/    <- all the pictures
```

Start the site first (`npm run dev`, see [SETUP.md](SETUP.md)) and keep the
browser open beside your editor. The loop is: **save the file, refresh the
browser tab** (`Command` + `R`). You never need to restart the server, even
after adding a new page.

---

## The two kinds of thing in a content file

Open `content/projects/01-the-long-way-around.md` and you will see this shape:

```
---
title: "The Long Way Around"
year: "2025"
---

## The idea

This is placeholder copy, but the shape of it is real.
```

Everything **between the two `---` lines** is settings: short labelled values
like the title and the year. Everything **after the second `---`** is the page
itself, written normally.

### The one rule for settings

Keep the quotes.

```
title: "The Long Way Around"      <- correct
title: The Long Way Around        <- will probably break
```

Also keep the indentation exactly as you find it. In this part of the file,
spaces at the start of a line are meaningful.

If you break one of these, the site shows a red page naming the file and the
problem. Nothing is lost - fix the line, save, and it recovers.

---

## Adding your own images

1. Put the image file into the **`public/images`** folder. Any name without
   spaces works: `night-shift-still.jpg`, not `night shift still.jpg`.
2. Refer to it in a content file by writing `/images/` and then the filename:

```
cover: "/images/night-shift-still.jpg"
```

**Resize large photos first.** A photo straight off a phone or camera can be
20MB, which makes the page slow to load. Open it in Preview, choose
**Tools → Adjust Size**, set the width to about 2000 pixels, and save. That is
plenty sharp for any screen.

The placeholder `.svg` files that came with the site can be deleted once you
have replaced them.

---

## Adding a new project page

1. Open the `content/projects` folder.
2. Duplicate **`_TEMPLATE.md`** (right-click → Duplicate).
3. Rename the copy. **The name matters:**

   ```
   07-my-new-script.md
   ^^                    the number sets where it appears in the sidebar
      ^^^^^^^^^^^^^^     this becomes the web address: /work/my-new-script
   ```

   Use only lowercase letters, numbers and dashes after the number.
4. Fill in the settings and write the page. The template explains each line.
5. Save, then refresh the browser. It appears in the sidebar.

**Only two settings are required:** `title` and `cover` (the main image).
Delete any other line you do not want and the page simply leaves it out.

To **reorder** projects, renumber the files. To **remove** one, delete the file
or rename it to start with an underscore (`_old-project.md`), which hides it
without throwing it away.

---

## Writing the page itself

Below the second `---`, write normally. A blank line starts a new paragraph.
A few extras:

| To get this | Write this |
| --- | --- |
| A section heading | `## The idea` |
| **Bold** | `**bold**` |
| *Italic* | `*italic*` |
| A link | `[the words](https://example.com)` |
| A bulleted list | A line starting with `- ` |

### Images inside the page

```
![Description of the image](/images/my-photo.jpg "A caption under the image.")
```

The part in square brackets describes the image for people using screen
readers. The part in quotes is the caption shown on the page, and can be left
out along with its quotes.

### Two images side by side

Put them on the **same line with nothing between them**:

```
![First](/images/one.jpg "Left caption.")![Second](/images/two.jpg "Right caption.")
```

### A pull quote

Start the line with `>`. Add a line beginning with `--` for the attribution.

```
> The road film is the only genre where the destination is allowed to be a
> disappointment.
> -- From the writer's notes
```

---

## The other pages

| Page | File |
| --- | --- |
| Your name, tagline, email, social links | `content/site.yml` |
| About page biography and "Currently" list | `content/about.md` |
| Résumé page | `content/resume.md` |
| Each project | `content/projects/*.md` |

`content/site.yml` also holds the two short intros used on the home page and
the Work page. Comments in the file say which is which.

### The résumé PDF

The Download button hands over the file at `public/abraham-newman-resume.pdf`.
Replace that file with your real résumé, keeping the same name, and the button
needs no other change.

If you want a different filename, put your PDF in `public/` and update this
line in `content/site.yml`:

```
resumeFile: "/your-file-name.pdf"
```

Note that `content/resume.md` (the web page) and the PDF are separate - update
both when your résumé changes.

---

## Publishing your changes

If the site is connected to Vercel through GitHub, publishing is:

```bash
git add -A
git commit -m "Update projects"
git push
```

Vercel rebuilds and the live site updates in about a minute. If a content file
has an error, the build fails and **the currently live site stays up** - it will
not publish a broken page.

Before pushing, it is worth running:

```bash
npm run build
```

If that finishes without an error, the deploy will succeed.

---

## Troubleshooting

**A red page saying `Problem in content/...`**
Read the second line. It names the exact file and what is wrong with it, for
example `the "title:" line is missing or empty`. Open that file, fix it, save.

**The settings block "could not be read"**
Almost always a missing or curly quote, or indentation that got nudged. Compare
the file against `_TEMPLATE.md`. Make sure you are editing in VS Code and not
TextEdit, which silently replaces `"` with `"` and `"`.

**An image shows as a broken icon**
The filename in the content file does not match the file in `public/images`.
Check the spelling, and remember it is case-sensitive: `Photo.jpg` and
`photo.jpg` are different files.

**A new project does not appear**
Check that the filename ends in `.md` and does not start with `_` or `.`.

**A change is not showing up**
Refresh the browser tab with `Command` + `R`. If it still does not appear, check
that you saved the file - unsaved files show a dot in the VS Code tab.

**Something looks wrong but there is no error**
Stop the site with `Control` + `C` and run `npm run dev` again.
