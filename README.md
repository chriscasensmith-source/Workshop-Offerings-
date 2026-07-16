# Workplace Learning

A static internal workshop catalog where employees can search, filter, compare, and explore 11 practical workplace-learning sessions before registering interest through Microsoft Forms.

## Technology

- React and TypeScript
- Vite
- Tailwind CSS
- Motion for React
- Lucide React
- Vitest and React Testing Library
- GitHub Actions and GitHub Pages

The site has no database, authentication, server, API, CMS, or embedded registration form.

## Install dependencies

Install Node.js 22 or a compatible current LTS release, then run:

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Vite prints the local address, normally `http://localhost:5173/`.

## Configure the Microsoft Form

Every Register action reads the build-time environment variable `VITE_MICROSOFT_FORM_URL`. The supplied response URL is already present in `.env.production`:

```text
https://forms.office.com/r/HgUVx6tuQ8
```

For local development, create `.env.local` in the project root:

```dotenv
VITE_MICROSOFT_FORM_URL=https://forms.office.com/r/HgUVx6tuQ8
```

Restart the development server after changing an environment variable. `.env.local` is ignored by Git.

For GitHub Pages, add or update the repository variable:

1. Open the repository on GitHub.
2. Select **Settings → Secrets and variables → Actions → Variables**.
3. Select **New repository variable**.
4. Name it `VITE_MICROSOFT_FORM_URL`.
5. Paste the public Microsoft Forms **Collect responses** URL as the value.

The Actions variable overrides `.env.production` during the Pages build. If no URL is available in any environment, the app uses a clearly marked Microsoft Forms placeholder and never renders an internal form.

## Add or edit a course

The entire catalog lives in [`src/data/courses.ts`](src/data/courses.ts). Reusable types live in [`src/types/course.ts`](src/types/course.ts).

To edit a workshop, update its existing object. To add one, create a new object containing every required field:

```ts
{
  id: 'unique-url-safe-id',
  title: 'Complete workshop title',
  shortTitle: 'Short title',
  category: 'Artificial Intelligence',
  duration: '90 minutes',
  durationMinutes: 90,
  audience: 'Who this workshop is for',
  summary: 'A concise catalog summary.',
  outcome: 'What participants will leave able to do.',
  learningPoints: ['First learning point'],
  searchTerms: ['useful synonym', 'topic'],
  featured: false,
  icon: 'bot',
}
```

Valid categories and icon names are constrained by TypeScript. An optional `note` appears only inside the course detail drawer. This release intentionally contains exactly 11 workshops, so update the catalog-count test if the approved catalog size changes.

## Run tests

```bash
npm test
```

For interactive watch mode:

```bash
npm run test:watch
```

## Lint

```bash
npm run lint
```

## Create a production build

```bash
npm run build
```

The deployable static files are written to `dist/`. Preview them locally with:

```bash
npm run preview
```

Run lint, tests, and the production build together with:

```bash
npm run check
```

## Enable GitHub Pages

The workflow at `.github/workflows/deploy-pages.yml` builds and deploys `dist` whenever `main` changes. It also supports manual runs from the Actions tab.

1. Push the project to `chriscasensmith-source/Workshop-Offerings-`.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Add the `VITE_MICROSOFT_FORM_URL` Actions variable described above.
5. Push to `main` or run **Deploy to GitHub Pages** manually from **Actions**.

The workflow installs from `package-lock.json`, runs lint and all automated tests, builds the Vite application, uploads `dist`, and deploys it to the `github-pages` environment.

## Change the GitHub Pages repository path

The production base path is configured in [`vite.config.ts`](vite.config.ts):

```ts
base: command === 'build' ? '/Workshop-Offerings-/' : '/',
```

If the repository name changes, replace `Workshop-Offerings-` with the exact new repository name, including capitalization and punctuation. Keep both leading and trailing slashes. Local development continues to use `/`.

The expected Pages URL for this repository is:

```text
https://chriscasensmith-source.github.io/Workshop-Offerings-/
```

## Project structure

```text
src/
  components/       Focused page, explorer, card, and dialog components
  data/courses.ts   Complete typed workshop catalog
  lib/              Search/filter and registration helpers
  styles/index.css  Tailwind entry point and the editorial design system
  types/course.ts   Shared course and filter types
```

All registration links open in a new tab with `noopener noreferrer`. Registering interest does not guarantee a seat; dates and session details are shared after interest is reviewed.
