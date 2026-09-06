# Setting up on a Mac, from scratch

This walks through everything needed to see the website running on your own
computer. It assumes you have never installed a developer tool before. Nothing
here costs money, and nothing here is published to the internet - the site only
runs on your machine until you decide otherwise.

Set aside about fifteen minutes. Most of that is waiting on downloads.

---

## Step 1 - Open Terminal

Terminal is a Mac app that lets you type commands.

1. Press `Command` + `Space` to open Spotlight search.
2. Type `Terminal`.
3. Press `Return`.

A small window opens with a line of text and a blinking cursor. That is where
you will type the commands in this guide.

**How to use the commands below:** copy one line, paste it into Terminal, press
`Return`, and wait until the blinking cursor comes back before typing the next
one. Some commands print a wall of text. That is normal.

---

## Step 2 - Install Node.js

Node.js is the program that runs the website. It is free and made by the
OpenJS Foundation.

1. Go to **<https://nodejs.org>**.
2. Download the version labelled **LTS** (it stands for Long Term Support, and
   it is the stable one). The site should detect that you are on a Mac.
3. Open the downloaded `.pkg` file and click through the installer, accepting
   the defaults.
4. **Quit Terminal completely** (`Command` + `Q`) and open it again. It will not
   see the new installation until you do.

Now check that it worked. Type this and press `Return`:

```bash
node --version
```

You should see a version number like `v22.14.0`. Anything **20.9 or higher**
works.

If you instead see `command not found: node`, the installer did not finish or
Terminal was not restarted. Redo steps 3 and 4.

---

## Step 3 - Install a text editor

You need something to edit the writing with. **Visual Studio Code** is free and
is the standard choice.

1. Go to **<https://code.visualstudio.com>** and click Download.
2. Open the downloaded file, then drag **Visual Studio Code** into your
   Applications folder.
3. Open it once from Applications so macOS registers it.

You could technically use TextEdit, but do not. It silently converts straight
quotes into curly quotes, which breaks the settings files.

---

## Step 4 - Get the website files onto your computer

You will be sent the project either as a **ZIP file** or as a **GitHub link**.

### If you were sent a ZIP file

1. Double-click the ZIP to unzip it.
2. Drag the resulting folder somewhere you will remember, such as your
   **Documents** folder.

### If you were sent a GitHub link

Run this in Terminal, replacing the URL with the one you were given:

```bash
cd ~/Documents
git clone https://github.com/USERNAME/REPOSITORY.git
```

macOS will offer to install developer tools the first time you use `git`.
Accept, wait for it to finish, then run the `git clone` line again.

---

## Step 5 - Point Terminal at the folder

Terminal needs to be "inside" the project folder before it can run anything.

1. Type `cd ` in Terminal - the letters c and d, then **a space**. Do not press
   Return yet.
2. Drag the project folder from Finder directly onto the Terminal window. It
   pastes the full path for you.
3. Now press `Return`.

To confirm you are in the right place, run:

```bash
ls
```

You should see names including `content`, `public`, `package.json` and
`README.md`. If you do not, you are in the wrong folder - repeat this step.

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

Leave this Terminal window open. It has to keep running for the site to work.

While it runs, editing is a two-step loop: **save the file, then refresh the
browser tab** (`Command` + `R`). You never need to stop and restart the server
to see a change, not even when you add a whole new page.

---

## Step 8 - Stopping and starting again

**To stop:** click the Terminal window and press `Control` + `C`.
(That is Control, not Command.)

**To start again another day**, you only need two commands:

```bash
cd ~/Documents/abe_page
npm run dev
```

Adjust the first line if you put the folder somewhere else. You do **not** need
to repeat steps 1 through 4, or `npm install`.

---

## Editing the site

Once it is running, open the project folder in Visual Studio Code
(**File → Open Folder**) and see **[EDITING.md](EDITING.md)**. That guide covers
adding your writing, swapping in your own images, and creating new project
pages.

---

## When something goes wrong

**`command not found: node` or `command not found: npm`**
Node.js is not installed, or Terminal was not restarted after installing it.
Go back to Step 2.

**`Error: Cannot find module ...` or `Module not found`**
Run `npm install` again from inside the project folder.

**`Port 3000 is already in use`**
The site is already running in another Terminal window. Either switch to that
window, or press `Control` + `C` there and start again. Next.js will usually
just offer you port 3001 instead, which is also fine - use the address it
prints.

**A red error page in the browser saying "Problem in content/..."**
This is the site telling you a content file has a typo, and it names the exact
file and the exact problem. Open that file, fix it, save, and refresh the page.
See the troubleshooting section of [EDITING.md](EDITING.md).

**`zsh: no such file or directory`**
Terminal is not in the project folder. Redo Step 5.

**Something else entirely**
Copy the full error text out of Terminal and send it on. The message almost
always names the file causing the problem.
