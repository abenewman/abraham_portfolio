# Setting up on a Mac, from scratch

This walks through everything needed to see the website running on your own
computer. It assumes you have never installed a developer tool before. Every
tool here is free, and nothing you do on your own machine is visible to anyone
else until you deliberately publish it.

Set aside about thirty minutes. Most of that is waiting on downloads.

You will install three things:

| Tool | What it is for |
| --- | --- |
| **Visual Studio Code** | Writing and editing the text |
| **Node.js** | Running the website on your computer |
| **GitHub Desktop** | Getting the code, and publishing your changes |

---

## Step 1 - Install Visual Studio Code

This is the app you will write in. It is free, made by Microsoft, and is the
standard choice.

1. Go to **<https://code.visualstudio.com>**.
2. Click the big blue **Download for macOS** button.
3. Open the downloaded file. It unzips into an app called
   **Visual Studio Code**.
4. Drag that app into your **Applications** folder. This matters - if you run
   it from the Downloads folder it will misbehave later.
5. Open it from Applications. If macOS warns that it was downloaded from the
   internet, click **Open**.

You can close the welcome tab. Nothing else to configure yet.

> **Do not use TextEdit for this project.** It silently converts straight quotes
> (`"`) into curly quotes, which breaks the site's settings files in a way that
> is genuinely hard to spot. VS Code never does this.

---

## Step 2 - Install Node.js

Node.js is the program that actually runs the website. It is free and open
source.

1. Go to **<https://nodejs.org>**.
2. Download the version labelled **LTS** (Long Term Support - the stable one).
   The site should detect that you are on a Mac.
3. Open the downloaded `.pkg` file and click through the installer, accepting
   all the defaults.

You will confirm this worked in Step 5.

---

## Step 3 - Set up GitHub

GitHub is where the code lives online. It is how you receive the project, and
how you publish changes to the live site later.

### 3a. Create an account

1. Go to **<https://github.com/signup>**.
2. Sign up with your email address. The free plan is all you need.
3. Verify your email when GitHub sends you the confirmation.

### 3b. Accept the invitation to the project

Whoever set this up will send you an invitation to the repository (the folder
of code). It arrives by email, and also appears at
**<https://github.com/notifications>**.

Click **Accept invitation**. Until you do, the cloning step below cannot find
the project.

### 3c. Install GitHub Desktop

This is the app that copies the code to your computer and sends your changes
back. It means you never have to type a git command or deal with passwords and
access tokens.

1. Go to **<https://desktop.github.com>**.
2. Click **Download for macOS**.
3. Open the downloaded file and drag **GitHub Desktop** into your
   **Applications** folder.
4. Open it from Applications.
5. Click **Sign in to GitHub.com**. Your browser opens - sign in with the
   account from step 3a and approve the request.
6. When it asks for your name and email, accept what it suggests and continue.

GitHub Desktop installs the underlying `git` tool for you, so there is nothing
else to set up.

### 3d. Clone the project

"Cloning" just means downloading your own copy.

1. In GitHub Desktop, choose **File -> Clone repository** from the menu bar.
2. Stay on the **GitHub.com** tab. The project should be listed. If it is not,
   click the refresh icon, and confirm you accepted the invitation in step 3b.
3. Select the project.
4. Under **Local path**, choose where to put it. Your **Documents** folder is a
   good choice.
5. Click **Clone** and wait for it to finish.

You now have the full project on your computer.

> **Sent a ZIP file instead of a GitHub invitation?** Unzip it, drag the folder
> into **Documents**, and skip to Step 4. You can set up GitHub later, but you
> will not be able to publish changes until you do.

---

## Step 4 - Open the project in VS Code

1. Open **Visual Studio Code**.
2. Choose **File -> Open Folder** from the menu bar.
3. Navigate to the folder you cloned in step 3d and click **Open**.
4. If VS Code asks whether you trust the authors, click
   **Yes, I trust the authors**.

A file list appears down the left side. You should see `content`, `public`,
`src`, and files like `package.json` and `README.md`. If you do not see those,
you opened the wrong folder - try again, and make sure you select the project
folder itself rather than the folder containing it.

---

## Step 5 - Open the built-in Terminal

VS Code has a command line built into it, already pointed at your project
folder. Using it saves a lot of fiddling.

From the menu bar, choose **Terminal -> New Terminal**.

A panel opens at the bottom of the window with a blinking cursor. That is where
the commands below go.

**How to use the commands:** copy one line, paste it into that panel, press
`Return`, and wait for the blinking cursor to come back before typing the next
one. Some commands print a wall of text. That is normal.

First, confirm Node.js installed correctly:

```bash
node --version
```

You should see a version number like `v22.14.0`. Anything **20.9 or higher**
works.

If you instead see `command not found: node`, quit VS Code completely
(`Command` + `Q`), reopen it, and try again - it cannot see a newly installed
program until it restarts. If it still fails, redo Step 2.

---

## Step 6 - Install the website's building blocks

Run this once:

```bash
npm install
```

This downloads the libraries the site is built from into a new `node_modules`
folder. It takes one to three minutes and prints a lot of text. A few lines
saying `warn` are normal and can be ignored.

You only need to do this again if you are told the project's dependencies
changed.

---

## Step 7 - Start the website

```bash
npm run dev
```

After a few seconds you will see something like:

```
▲ Next.js 16.3.4
- Local:  http://localhost:3000
✓ Ready in 1.2s
```

Open **<http://localhost:3000>** in your browser. The site is running.

Leave this terminal panel running. It has to stay open for the site to work.

While it runs, editing is a two-step loop: **save the file, then refresh the
browser tab** (`Command` + `R`). You never need to stop and restart the server
to see a change, not even when you add a whole new page.

---

## Step 8 - Stopping and starting again

**To stop:** click the terminal panel and press `Control` + `C`.
(That is Control, not Command.)

**To start again another day:**

1. Open VS Code. It reopens the project automatically. If it does not, use
   **File -> Open Recent**.
2. **Terminal -> New Terminal**.
3. Run `npm run dev`.

You do **not** need to repeat Steps 1 through 4, or `npm install`.

---

## Step 9 - Publishing your changes

Your edits live only on your computer until you publish them. In GitHub
Desktop:

1. Open **GitHub Desktop**. Your changed files are listed down the left, and
   you can click any one to see exactly what you changed.
2. Bottom left, type a short note in the **Summary** box describing the change,
   for example `Add new project page`.
3. Click **Commit to main**.
4. Click **Push origin** at the top.

That sends the changes to GitHub, and the live site rebuilds itself within a
minute or two.

If a content file has a mistake in it, the rebuild fails and **the live site
simply stays as it was.** A typo cannot take the site down.

Before publishing, it is worth running this to catch problems early:

```bash
npm run build
```

If it finishes without an error, publishing will work.

---

## Editing the site

See **[EDITING.md](EDITING.md)** for adding your writing, swapping in your own
images, and creating new project pages. No code required.

---

## When something goes wrong

**`command not found: node` or `command not found: npm`**
Node.js is not installed, or VS Code was not restarted after installing it.
Quit VS Code fully with `Command` + `Q`, reopen, and try again. If it still
fails, redo Step 2.

**`Error: Cannot find module ...` or `Module not found`**
Run `npm install` again.

**`Port 3000 is already in use`**
The site is already running somewhere. Either find that window and use it, or
press `Control` + `C` there first. Next.js will usually just offer you port
3001 instead, which is fine - use whichever address it prints.

**A red error page in the browser saying "Problem in content/..."**
This is the site telling you a content file has a typo, and it names the exact
file and the exact problem. Open that file, fix it, save, and refresh the page.
See the troubleshooting section of [EDITING.md](EDITING.md).

**GitHub Desktop cannot find the project when cloning**
You have probably not accepted the invitation yet. Check your email, or go to
<https://github.com/notifications>, then click the refresh icon in the clone
window.

**GitHub Desktop says there are changes you did not make**
Files like `package-lock.json` sometimes update on their own. It is safe to
commit them along with your edits.

**`zsh: no such file or directory`**
The terminal is not in the project folder. Close the panel and open a fresh one
with **Terminal -> New Terminal**, which always opens in the right place.

**Something else entirely**
Copy the full error text and send it on. The message almost always names the
file causing the problem.
