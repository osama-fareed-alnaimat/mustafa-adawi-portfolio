# Mustafa Adawi — Engineering Portfolio

A static portfolio website (HTML, CSS and vanilla JavaScript), ready to host for free on **GitHub Pages**. No build tools and no frameworks.

## Folder structure

```
portfolio/
├── index.html              Home
├── projects.html           All projects (numbered list)
├── experience.html         Redirect to about.html#experience (old link)
├── certificates.html       Certificates + award
├── about.html              About + experience + education + contact form
├── projects/
│   ├── gearbox.html        Case study 01
│   ├── golf-cart.html      Case study 02
│   └── solar-tracker.html  Case study 03
├── assets/
│   ├── css/style.css       One shared stylesheet (colours, fonts, layout)
│   ├── js/main.js          Mobile menu, active nav, filter, lightbox, animations, form
│   ├── img/                All images
│   └── docs/Mustafa-Adawi-Resume.pdf         Your CV (add this file yourself)
└── README.md
```

## 1. Fill in the placeholders first

Some information was not provided, so the site uses placeholders in square brackets. In VS Code press **Ctrl + Shift + H** (Replace in Files) and replace each one across all files:

| Find | Replace with |
|---|---|
| `[ADD EMAIL]` | your email address |
| `[ADD PHONE]` | your phone number, e.g. `+97300000000` (no spaces in the `tel:` link) |
| `[ADD LINKEDIN URL]` | your full LinkedIn URL, e.g. `https://www.linkedin.com/in/your-name` |
| `[FORM_ID]` | your Formspree form ID (see step 3) |
| `[ADD LANGUAGE]` / `[ADD LEVEL]` | your second language and level (about.html) |
| `[ADD VERIFY LINK]` | certificate verification links (certificates.html) |
| `[ADD VALUE]` | missing project numbers (durations, team sizes, stresses, etc.) |
| `[ADD IMAGE: ...]` | see "Replace an image placeholder" below |

Search for `[ADD` to find anything left.

## 2. Add your CV

Save your CV as **`assets/docs/Mustafa-Adawi-Resume.pdf`**. Every "Download CV" button already points to that file.

## 3. Connect the contact form (free)

1. Create a free account at https://formspree.io
2. Create a new form. Formspree gives you an ID like `xayzabcd`.
3. In `about.html`, replace `[FORM_ID]` in `action="https://formspree.io/f/[FORM_ID]"` with that ID.

Until you do this, the form shows a friendly message asking visitors to email you instead.

## 4. Edit text

Open the `.html` file for the page and edit the text between the tags. Example:

```html
<p class="card__result">12:1 reduction from 1,920 RPM to 160 RPM ...</p>
```

The header and footer are copied into every page. If you change them (for example to add a new menu link), change them in **all 8 page files** (`experience.html` is only a redirect). Use Replace in Files to do it in one step.

## 5. Change or add images

1. Put the image in `assets/img/` using a short, lowercase name with dashes, e.g. `gearbox-exploded-view.png`.
2. Point the `src` to it. Pages in the root use `assets/img/...` and pages inside `projects/` use `../assets/img/...`.
3. Always write a meaningful `alt` text that describes the image.

**Replace an image placeholder** in a case study. Change:

```html
<figure class="step__media"><div class="img-placeholder">[ADD IMAGE: exploded view or drawing sheet]</div></figure>
```

to:

```html
<figure class="step__media"><img src="../assets/img/gearbox-exploded-view.png" alt="Exploded view of the gearbox assembly" loading="lazy"></figure>
```

**Add a gallery image** (click-to-enlarge works automatically). Replace an empty slot with:

```html
<button class="gallery__item" type="button" data-full="../assets/img/gearbox-drawing.png" data-caption="General assembly drawing">
  <img src="../assets/img/gearbox-drawing.png" alt="General assembly drawing of the gearbox" loading="lazy">
</button>
```

Tip: keep images under about 300 KB (export JPG at around 80% quality, max 1600 px wide) so the site loads fast.

## 6. Add a new project

1. Copy `projects/gearbox.html` and rename the copy, e.g. `projects/autonomous-golf-cart.html`.
2. Change the `<title>`, `meta description`, `og:` tags, breadcrumb, title, tags, info bar, metrics and all sections.
3. Update the **Previous / Next** links at the bottom of the new page and the neighbouring pages.
4. Add a row to `projects.html`: copy an existing `<li class="feature reveal">` block and change the number, image, category line, title, text and link.
5. Optional: add it to the Featured Projects on `index.html`.

The Autonomous Golf Cart, Heat Exchanger, Refrigeration and Roll Bending projects already have summary cards on `projects.html`. You can turn any of them into a full case study this way.

## 7. Change colours or fonts

All colours are CSS variables at the top of `assets/css/style.css`:

```css
--navy: #0F1E33;  --accent: #E8762B;  --bg: #FFFFFF;  --bg-alt: #F5F7FA;
--text: #1F2937;  --muted: #6B7280;   --border: #E5E7EB;
```

## 8. Preview on your computer

Open `index.html` by double-clicking it, or in VS Code install the **Live Server** extension, right-click `index.html`, then choose **Open with Live Server**.

## 9. Deploy to GitHub Pages (step by step)

1. Create a free account at https://github.com if you do not have one.
2. Click **+** (top right) → **New repository**.
   - Name: `your-username.github.io` gives the address `https://your-username.github.io`.
   - Or any name (e.g. `portfolio`) gives `https://your-username.github.io/portfolio`.
   - Set it to **Public** and click **Create repository**.
3. Upload the files:
   - **Easy way:** on the new repository page click **uploading an existing file**, then drag **the contents** of the `portfolio` folder (not the folder itself) into the browser so that `index.html` sits at the top level. Click **Commit changes**.
   - **With Git (from the portfolio folder in VS Code's terminal):**
     ```bash
     git init
     git add .
     git commit -m "Initial portfolio"
     git branch -M main
     git remote add origin https://github.com/your-username/your-repo-name.git
     git push -u origin main
     ```
4. In the repository go to **Settings → Pages**.
5. Under **Build and deployment** → **Source**, choose **Deploy from a branch**. Then choose branch **main**, folder **/ (root)**, and click **Save**.
6. Wait 1–2 minutes and refresh. GitHub shows your live link at the top of the Pages settings.
7. To update the site later, edit the files and upload or push them again. GitHub Pages republishes automatically.

## Image map

| Original file (Desktop/Portfolio Images) | Site file | Used on |
|---|---|---|
| About Me/AboutMe_02.jpg | `assets/img/profile-graduation.jpg` | Home hero, About photo |
| EngineeringProjects_02.png | `assets/img/gearbox-render.png` | Home + Projects card, gearbox case study |
| EngineeringProjects_03.jpg | `assets/img/golf-cart-chassis.jpg` | Home + Projects card, golf cart case study |
| EngineeringProjects_04.png | `assets/img/solar-tracker.png` | Home + Projects card, solar tracker case study |
| EngineeringProjects_05.png | `assets/img/refrigeration-schematic.png` | Projects card 05 |
| EngineeringProjects_06.png | `assets/img/roll-bender-render.png` | Projects card 06 |
| EngineeringProjects_07.jpg | `assets/img/award-team.jpg` | Home award section, Projects card 07 |
| EngineeringProjects_08.png | `assets/img/award-trophy.png` | Certificates award section |
| EngineeringProjects_01.jpg | not used (smaller copy of _07) | — |
