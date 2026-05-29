# Agent Instructions

## Project Overview

This is an Astro + Tailwind CSS static portfolio. The main page is `src/pages/index.astro`, and most editable profile content is centralized in `src/data/content.json`.

## Common Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

Use `npm run build` to verify production output after code or data changes. The build fetches Medium RSS data through `fetch-articles.js`, so network failures may trigger fallback articles.

## Coding Guidelines

- Prefer existing Astro component patterns before adding new abstractions.
- Keep portfolio copy and structured profile data in `src/data/content.json` when possible.
- Keep layout and presentation changes in Astro components and Tailwind classes.
- Preserve the editor/code-theme visual language defined in `tailwind.config.cjs` and `src/styles/global.css`.
- Avoid unrelated refactors when making small content or UI changes.
- Do not commit generated `dist/` output unless explicitly requested.

## Files To Know

- `src/pages/index.astro`: homepage composition and Medium article rendering
- `src/layouts/Layout.astro`: HTML shell, SEO, analytics, font loading, global style import
- `src/components/CodeBlock.astro`: reusable code-style section wrapper
- `src/components/SEO.astro`: metadata generation
- `src/components/GoogleAnalytics.astro`: analytics snippet
- `src/data/content.json`: editable portfolio content
- `fetch-articles.js`: Medium RSS parser and fallback article data
- `astro.config.mjs`: Astro site URL and integrations
- `tailwind.config.cjs`: editor-themed design tokens

## Validation Checklist

Before handing off changes:

- Run `npm run build` for code or data changes.
- Check that content changes render correctly on the homepage.
- Verify external links use the correct full URL.
- Confirm the Medium fallback still has valid article titles and URLs if `fetch-articles.js` changes.
