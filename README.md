# Portfolio Code Style

Personal portfolio site for Sagar Dash, built with Astro and Tailwind CSS. The UI presents profile, experience, projects, contributions, and articles in a code editor inspired layout.

## Stack

- Astro 2
- Tailwind CSS 3
- React dependencies available for interactive islands
- Medium RSS integration at build time

## Project Structure

```text
src/
  assets/          Static source assets
  components/      Reusable Astro components
  data/            Portfolio content JSON
  layouts/         Page shell and shared head setup
  pages/           Astro routes
  styles/          Global styles
public/            Public static assets
fetch-articles.js  Medium RSS fetcher used during build
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Build the static site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Content Updates

Most portfolio content lives in `src/data/content.json`.

- Update name, title, contact details, skills, projects, and experience there.
- The homepage imports this file from `src/pages/index.astro`.
- Articles are fetched from the Medium RSS feed in `fetch-articles.js` during build.
- If Medium is unavailable, fallback article data in `fetch-articles.js` is used so the build can still complete.

## Deployment Notes

The site is configured for `https://sagardash.me` in `astro.config.mjs`. Production output is generated in `dist/` by `npm run build`.
