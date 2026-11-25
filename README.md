# MEROS Project Page (GitHub Pages)

Static GitHub Pages website for **MEROS: The More a ViT Sees, the Less Precise It Needs to Attend** (Hao Yu, Feng Xue, Hui Wei, Guoying Zhao).

## Quick Local Preview

```bash
cd MEROS_PROJECT_PAGE
python3 -m http.server 8000
# Open http://127.0.0.1:8000 in your browser
```

## Updating Placeholder Links (arXiv)

GitHub repository links already point to `https://github.com/CV-AC/MEROS`. Search for `TODO:` in `index.html` (2 spots: top navigation & hero action buttons):
1. Replace `href="#"` and remove `data-placeholder="..."` on `#paper-link-btn` (and the nav `Paper` link) with your arXiv / PDF URL.
2. Update the `journal` / `eprint` field in the `#bibtexText` block once the arXiv ID is assigned.

## Deploying to GitHub Pages

Push the contents of `MEROS_PROJECT_PAGE/` directly to your repository (root or `docs/` folder, or `gh-pages` branch). `.nojekyll` is already included, so no build step is required.
