# Publish your portfolio on GitHub Pages: step by step

Written for **your** setup: Windows 11, Git already installed (version 2.49), project at `Desktop\portfolio`.
Wherever you see **YOUR-USERNAME**, type your GitHub username.

---

## PART 1: Prepare the files

I already checked your project. Here is what I found:

| Check | Result |
|---|---|
| `index.html` is in the main folder | ✅ Yes |
| File names have no spaces | ✅ Yes |
| Image names match the code exactly | ✅ Yes (all 157 links tested) |
| Only relative paths (no `C:\...`) | ✅ Yes |
| Every image under 500 KB | ✅ Yes, largest is about 430 KB |
| Total size | ✅ 8.8 MB (GitHub allows 1 GB) |
| Private app folder excluded | ✅ `.gitignore` skips `.claude/` |

The resume file is `Mustafa-Adawi-Resume.pdf`, with capital letters. That is fine, because the links use exactly the same spelling.

**Still to fill in before you publish** (search the files for `[ADD`):
1. `about.html`: replace `[FORM_ID]` with your Formspree ID, or the contact form won't send.
2. `certificates.html`: replace `[ADD VERIFY LINK]` on the IOSH card, or delete that button.
3. `projects/golf-cart.html`: team size, max stress (MPa), chassis mass (kg) and load case.
4. `projects/solar-tracker.html`: duration, team size and energy gain (%).

**If you add new images later**, compress them first:
1. Open **https://squoosh.app** in your browser.
2. Drag your image onto the page.
3. On the right, choose **MozJPEG** and set **Quality 75**.
4. Check the size at the bottom right is under 500 KB.
5. Click the **download** arrow.
6. Rename it in lowercase with dashes, e.g. `new-gearbox-photo.jpg`.

✅ **Check:** all four placeholder items above are filled in or removed.

---

## PART 2: Create the repository

### 2.1 Create a GitHub account (skip if you have one)
1. Go to **https://github.com/signup**.
2. Enter your email, a password and a username.
   Pick a professional username, e.g. `mustafa-adawi` or `madawi-eng`. It becomes part of your website address.
3. Solve the puzzle and click **Create account**.
4. Enter the code GitHub emails you.

### 2.2 Choose the repository name

| Option | Repository name | Your website address |
|---|---|---|
| **a (recommended)** | `YOUR-USERNAME.github.io` | `https://YOUR-USERNAME.github.io` |
| b | `portfolio` | `https://YOUR-USERNAME.github.io/portfolio` |

**Use option a.** The address is shorter and cleaner for your Resume and LinkedIn, and it's what recruiters expect for a personal site. Your site works with either, because all its links are relative.

### 2.3 Create it
1. Sign in to GitHub.
2. Click the **+** at the top right, then **New repository**.
3. In **Repository name** type: `YOUR-USERNAME.github.io` (exactly your username, all lowercase).
4. Description: `Mechanical engineering portfolio — design, FEA and simulation projects`.
5. Choose **Public**.
6. **Do not** tick "Add a README file" (you already have one).
7. Click **Create repository**.

✅ **Check:** you see an empty repository page that says *"Quick setup"*.

---

## PART 3: Upload the project

Pick **one** method. Method B is best for you, because Git is already installed.

### Method A: Easy (drag and drop on the website)
1. On the empty repository page, click the link **uploading an existing file**.
2. Open File Explorer and go to `Desktop\portfolio`.
3. Select **everything inside** the folder (Ctrl + A), **not** the folder itself.
   - Do **not** select the `.claude` folder or `.gitignore` (hidden files are fine to skip).
4. Drag the selection into the browser window. Folders like `assets` and `projects` keep their structure when dragged this way.
5. Wait until every file shows in the list (about 90 files).
6. In **Commit changes**, type: `First upload of portfolio`.
7. Click **Commit changes**.

> Tip: if the browser refuses folders, use **Microsoft Edge or Chrome**. Firefox doesn't support dragging folders.

### Method B: Professional (Git commands), recommended
1. Open the project in VS Code.
2. Click **Terminal → New Terminal** at the top. A terminal opens at the bottom, already in the `portfolio` folder.
3. Run each command below, one at a time (paste it, press Enter).

Start Git in the folder:
```bash
git init
```

Add all the files:
```bash
git add .
```

Save them as your first version:
```bash
git commit -m "First upload of portfolio"
```

Name the main branch:
```bash
git branch -M main
```

Link to your GitHub repository (change YOUR-USERNAME):
```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
```

Upload:
```bash
git push -u origin main
```

4. **Signing in:** the first time you push, a GitHub sign-in window opens (Git Credential Manager).
   - Click **Sign in with your browser**.
   - Approve it in the browser.
   - Windows remembers this, so you only do it once.
   - If it asks for a password in the terminal instead, create a token: GitHub → your photo → **Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token**. Tick **repo**, generate it, copy it, and paste it as the password. You won't see it while you paste; that's normal.

### Middle option: GitHub Desktop (no commands)
1. Download it from **https://desktop.github.com** and sign in.
2. Click **File → Add local repository** and choose `Desktop\portfolio`.
3. If it says "not a Git repository", click **create a repository** there.
4. Type a summary, e.g. `First upload`, and click **Commit to main**.
5. Click **Publish repository**.
   - Name it `YOUR-USERNAME.github.io`.
   - **Untick** "Keep this code private".

✅ **Check:** refresh the repository page on GitHub. You see `index.html`, `about.html`, the `assets` and `projects` folders, etc. at the top level, **not** inside a `portfolio` folder.

---

## PART 4: Make it live
1. In your repository, click **Settings** (top bar).
2. In the left menu, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose **main**, then the folder **/ (root)**.
5. Click **Save**.
6. Wait **1–3 minutes**.
7. Click the **Actions** tab (top bar). You'll see *"pages build and deployment"*:
   - 🟡 yellow circle = still building
   - ✅ green tick = live
   - ❌ red cross = failed (see Part 8)
8. Go back to **Settings → Pages**. At the top it now says **"Your site is live at …"**. Click **Visit site**.

✅ **Check:** your Home page opens at `https://YOUR-USERNAME.github.io` with the gears, photos and navy header.

---

## PART 5: Test the live site
Tick each one:
1. ☐ Home, Projects, Certificates and About all open from the menu.
2. ☐ All four project case studies open (gearbox, golf cart, solar tracker, roll bender).
3. ☐ Images show on every page, and the slideshows change automatically.
4. ☐ **Resume** button opens the preview, and **Download PDF** downloads `Mustafa-Adawi-Resume.pdf`.
5. ☐ The heat exchanger **20 slides** viewer opens.
6. ☐ Email and LinkedIn links in the footer work.
7. ☐ The contact form sends (only after you add your Formspree ID; Formspree emails you on the first message to confirm).
8. ☐ On your phone: the menu opens with ☰, and nothing scrolls sideways.

**To find a broken image or file (404):**
1. On the live page, press **F12**. Developer tools open.
2. Click the **Console** tab. Red lines saying *"Failed to load resource: 404"* show the file name that's wrong.
3. Or click the **Network** tab, press **F5**, and look for rows in red with status **404**.
4. Compare that file name with the real file in GitHub. Upper/lower case must match exactly.

✅ **Check:** no red 404 lines in the Console on any page.

---

## PART 6: Update the site later

### On the GitHub website (small changes)
- **Edit text:**
  1. Open the file (e.g. `about.html`) and click the **pencil ✏️** icon.
  2. Make your change.
  3. Click **Commit changes…**, then **Commit changes**.
- **Replace an image:**
  1. Open the `assets/img` folder and click **Add file → Upload files**.
  2. Drag in the new image **with exactly the same name** and commit. It replaces the old one.
- The live site updates in 1–3 minutes.

### With Git (from VS Code)
After editing files on your computer, run:
```bash
git add .
```
```bash
git commit -m "Describe what you changed"
```
```bash
git push
```

✅ **Check:** the **Actions** tab shows a new green tick, then your change appears on the live site (press **Ctrl + F5** to refresh).

---

## PART 7: Professional extras (optional)

### Custom domain (e.g. mustafaadawi.com)
1. Buy the domain from a registrar (Namecheap, Cloudflare, GoDaddy).
2. In the registrar's **DNS settings**, add these records:

| Type | Host/Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR-USERNAME.github.io |

3. On GitHub, go to **Settings → Pages → Custom domain**, type `mustafaadawi.com` and click **Save**. GitHub creates a `CNAME` file for you.
4. Wait up to 24 hours. Then tick **Enforce HTTPS** on the same page.

### Make the repository look professional
1. On the repository's main page, click the **⚙️ gear** next to **About** (right side).
2. Fill it in:
   - Description: `Mechanical engineering portfolio — design, FEA and simulation`
   - Website: tick **Use your GitHub Pages website**
   - Topics: `portfolio`, `mechanical-engineering`, `solidworks`, `fea`, `github-pages`
3. Click **Save changes**.

### Share the link
- **LinkedIn:**
  - Edit your profile → **Contact info → Website**, type **Portfolio** and paste the link.
  - Also add it in **Featured → Add a link**.
- **Resume:** add `YOUR-USERNAME.github.io` under your phone and email, then update the PDF in `assets/docs/` (tell Claude so the preview image is regenerated too).
- **Email signature:** add `Portfolio: https://YOUR-USERNAME.github.io`.

### Appear on Google
1. Go to **https://search.google.com/search-console** and click **Start now**.
2. Choose **URL prefix** and type `https://YOUR-USERNAME.github.io/`.
3. Choose the **HTML tag** verification method and copy the `<meta name="google-site-verification" …>` line.
4. Paste it into `index.html` just below `<meta charset="UTF-8">`, then push.
5. Click **Verify**.
6. In the left menu, open **URL inspection**, paste your site link and click **Request indexing**.
7. It can take a few days to appear in Google.

✅ **Check:** your repository's About box shows the website link, and LinkedIn shows your portfolio.

---

## PART 8: Troubleshooting: the 8 most common problems

| # | Problem | Fix |
|---|---|---|
| 1 | **404 "There isn't a GitHub Pages site here"** | Wait 3 minutes. Check that Settings → Pages says *main / (root)*, and that `index.html` is at the **top level**, not inside a `portfolio` folder. |
| 2 | **Images don't show** | Press F12 → Console. The file name in the error must match GitHub exactly, including capital letters (`Photo.JPG` ≠ `photo.jpg`). Rename the file or fix the code. |
| 3 | **Page has no styling (plain text)** | `assets/css/style.css` wasn't uploaded, or the `assets` folder ended up somewhere else. Re-upload so `assets` sits next to `index.html`. |
| 4 | **Site doesn't show my latest change** | Check the Actions tab finished (green tick), then press **Ctrl + F5**. Your browser may be showing an old copy. |
| 5 | **Wrong page opens / README shows instead** | GitHub couldn't find `index.html` at the root. Make sure the file is named exactly `index.html` in lowercase. |
| 6 | **`git push` rejected ("fetch first" / "non-fast-forward")** | You changed something on the website too. Run `git pull --rebase origin main`, then `git push` again. |
| 7 | **`git push` asks for a password and fails** | GitHub no longer accepts your account password there. Use the browser sign-in window, or a **personal access token** as the password (Part 3, step 4). |
| 8 | **Contact form doesn't send** | `[FORM_ID]` hasn't been replaced in `about.html`. Create a free form at formspree.io, paste its ID, push, and confirm the first test email Formspree sends you. |

Fix for problem 6:
```bash
git pull --rebase origin main
```

---

## Final checklist before you share the link
1. ☐ All `[ADD …]` placeholders filled in or removed (Part 1).
2. ☐ Formspree ID added and the contact form tested.
3. ☐ Repository is **Public** and named `YOUR-USERNAME.github.io`.
4. ☐ `index.html` is at the top level of the repository.
5. ☐ Settings → Pages shows *"Your site is live"*.
6. ☐ Every page and all four case studies open on the live link.
7. ☐ No 404 errors in the browser console.
8. ☐ Resume preview and download work on the live site.
9. ☐ The site looks right on your phone.
10. ☐ Link added to LinkedIn, your Resume and your email signature.
