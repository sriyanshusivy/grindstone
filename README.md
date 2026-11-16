# Grindstone: Size Reduction Study Studio

An interactive study site for the size-reduction unit of CH21205 Mechanical Operations (IIT Kharagpur),
built from three lecture slide decks and the Autumn 2023 and 2024 end-semester papers.

**11 topics · 35 formula cards · 11 worked examples · 17 practice problems (6 end-semester questions) ·
69 quiz questions · 58 flashcards · 9 interactive models**

The course PDFs are not in this repository. Source chips on the site give the deck and slide number to
look up in your own copy.

## Put it online with GitHub Pages

`index.html` in the repository root is the whole site in one file, so no build step is needed.

1. Create a new repository on GitHub and push these files to the `main` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
4. After a minute the site is live at `https://<your-username>.github.io/<repository-name>/`.

```bash
git init
git add .
git commit -m "Grindstone study studio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repository-name>.git
git push -u origin main
```

You can also open `index.html` directly in a browser. It needs an internet connection for the maths
renderer (KaTeX from cdnjs) and the fonts (Google Fonts).

## Change the content

Requirements: Node.js 18 or newer.

```bash
npm install
npm run build
```

The build checks every equation and every cross-reference, then rewrites `index.html`. Commit the new
`index.html` along with your source change.

| File | What it holds |
|---|---|
| `src/topics.js` | Learning path, explanations, quiz questions, flashcards, coverage map |
| `src/formulas.js` | Formula cards |
| `src/problems.js` | Worked examples, practice problems and end-semester questions with solutions |
| `src/sims.js` | Figures and interactive models |
| `src/app.js` | Pages, search, progress tracking |
| `src/style.css` | Styles |
| `build.mjs` | Content checks and single-file build |

## Notes on the content

- Solutions marked "Studio" were written for this site; the slides and papers give no official answers
  for them.
- The two slide decks define screen efficiency on the oversize basis differently. The site follows
  Lectures 14 to 19 and quotes the older deck's answer beside it.
- Progress is stored in the browser (`localStorage`) and does not sync between devices.
