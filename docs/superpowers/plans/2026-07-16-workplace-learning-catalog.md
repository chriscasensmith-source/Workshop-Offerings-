# Workplace Learning Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a polished, accessible static workshop catalog containing the 11 supplied courses and safe Microsoft Forms registration links.

**Architecture:** A Vite React single-page application composes focused presentational components around one typed course-data module. Pure filtering helpers provide search and filter behavior, while local React state coordinates explorer controls and the accessible course-detail dialog. GitHub Actions builds the static bundle with the repository Pages base path and deploys `dist`.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, Motion for React, Lucide React, Radix Dialog, Vitest, React Testing Library, ESLint, GitHub Actions

## Global Constraints

- The catalog contains exactly 11 workshops and uses the supplied course copy verbatim.
- The app is static and contains no database, authentication, server, API, CMS, admin dashboard, or embedded registration form.
- Every registration link reads `VITE_MICROSOFT_FORM_URL`, initially `https://forms.office.com/r/HgUVx6tuQ8`, and uses `target="_blank"` with `rel="noopener noreferrer"`.
- Production assets are served from `/Workshop-Offerings-/`; development assets are served from `/`.
- Search covers title, short title, summary, outcome, audience, learning points, and search terms.
- Search, category, and duration filters combine with logical AND.
- Motion respects reduced-motion preferences without removing functionality.
- Accessibility targets WCAG AA expectations.

---

## File Map

- Project/configuration: `package.json`, `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `index.html`, `.gitignore`, `.env.example`
- Test setup: `src/test/setup.ts`
- Application entry and shell: `src/main.tsx`, `src/App.tsx`
- Types/data: `src/types/course.ts`, `src/data/courses.ts`
- Shared behavior: `src/lib/filterCourses.ts`, `src/lib/registration.ts`
- Components: `src/components/*.tsx`
- Visual system: `src/styles/index.css`
- Tests: `src/**/*.test.ts(x)`
- Delivery: `.github/workflows/deploy-pages.yml`, `README.md`

### Task 1: Project foundation and typed catalog

**Files:**
- Create: project configuration files listed above
- Create: `src/types/course.ts`
- Create: `src/data/courses.ts`
- Create: `src/data/courses.test.ts`
- Create: `src/lib/filterCourses.test.ts`
- Create after RED: `src/lib/filterCourses.ts`

**Interfaces:**
- Produces: `Course`, `CourseCategory`, `DurationFilter`, `courses`, and `filterCourses(courses, filters): Course[]`

- [ ] **Step 1: Create the test-capable Vite foundation**

Configure scripts `dev`, `build`, `preview`, `test`, `test:watch`, `lint`, and `check`. Configure Vitest with jsdom and `src/test/setup.ts`. Set Vite base to `/` in development and `/Workshop-Offerings-/` for builds.

- [ ] **Step 2: Install dependencies**

Run `npm install`. Expected: exit 0 and a generated lockfile.

- [ ] **Step 3: Write catalog and filter tests first**

Tests assert exactly 11 courses, unique IDs, the CliftonStrengths note, case-insensitive field search, each category, duration values 60/90/120, combined filtering, and whitespace-only search.

- [ ] **Step 4: Run RED tests**

Run `npm test -- src/data/courses.test.ts src/lib/filterCourses.test.ts`. Expected: FAIL because types, data, and filter implementation do not exist.

- [ ] **Step 5: Implement types, all supplied course data, and pure filtering**

Use this filter contract:

```ts
export interface CourseFilters {
  query: string;
  category: CourseCategory | 'All Workshops';
  duration: DurationFilter;
}

export function filterCourses(items: Course[], filters: CourseFilters): Course[];
```

Normalize searchable fields with lowercasing and collapsed whitespace. Map duration filters to exact numeric values: 60, 90, and 120.

- [ ] **Step 6: Run GREEN tests and lint**

Run `npm test -- src/data/courses.test.ts src/lib/filterCourses.test.ts` and `npm run lint`. Expected: all tests pass and zero lint errors.

- [ ] **Step 7: Commit foundation**

Commit message: `feat: add typed workshop catalog and filtering`.

### Task 2: Explorer interactions and registration safety

**Files:**
- Create: `src/lib/registration.ts`
- Create: `src/components/RegistrationLink.tsx`
- Create: `src/components/SearchBar.tsx`
- Create: `src/components/CategoryFilters.tsx`
- Create: `src/components/DurationFilters.tsx`
- Create: `src/components/CourseCard.tsx`
- Create: `src/components/CourseGrid.tsx`
- Create: `src/App.test.tsx`
- Create after RED: `src/App.tsx`

**Interfaces:**
- Consumes: `courses`, `filterCourses`, `Course`, category and duration types
- Produces: user-visible catalog filtering and reusable `RegistrationLink`

- [ ] **Step 1: Write explorer and registration tests first**

Render `App` and verify search by “fishbone,” category selection, duration selection, combined filtering, live result count, Reset Filters, empty state, and registration anchors pointing to the configured response URL with safe external attributes.

- [ ] **Step 2: Run RED tests**

Run `npm test -- src/App.test.tsx`. Expected: FAIL because `App` and explorer components do not exist.

- [ ] **Step 3: Implement minimal explorer behavior**

`App` owns `query`, `category`, and `duration` state. It derives matches through `filterCourses`; reset returns all controls to defaults. Controls use native buttons and input elements with visible labels and accessible pressed states.

- [ ] **Step 4: Implement registration configuration**

Use:

```ts
export const PLACEHOLDER_FORM_URL = 'https://forms.office.com/';
export const formUrl = import.meta.env.VITE_MICROSOFT_FORM_URL?.trim() || PLACEHOLDER_FORM_URL;
export const isFormConfigured = formUrl !== PLACEHOLDER_FORM_URL;
```

`RegistrationLink` always opens a new tab safely and adds a screen-reader configuration warning only when using the placeholder.

- [ ] **Step 5: Run GREEN tests and lint**

Run `npm test -- src/App.test.tsx` and `npm run lint`. Expected: all tests pass and zero lint errors.

- [ ] **Step 6: Commit explorer**

Commit message: `feat: add searchable workshop explorer`.

### Task 3: Accessible course detail dialog

**Files:**
- Create: `src/components/CourseDetail.tsx`
- Modify: `src/components/CourseCard.tsx`
- Modify: `src/App.tsx`
- Extend: `src/App.test.tsx`

**Interfaces:**
- Consumes: selected `Course | null`, `onOpenChange(open: boolean)`, and trigger refs managed by Radix Dialog
- Produces: keyboard-accessible detail drawer with focus return

- [ ] **Step 1: Add dialog behavior tests first**

Test opening the RULER course, complete learning-point rendering, optional CliftonStrengths note, close button, Escape dismissal, backdrop dismissal, registration link, and focus return to the originating View Details button.

- [ ] **Step 2: Run RED dialog tests**

Run `npm test -- src/App.test.tsx`. Expected: new tests fail because no dialog exists.

- [ ] **Step 3: Implement the Radix-based drawer**

Use `Dialog.Root`, `Dialog.Portal`, `Dialog.Overlay`, `Dialog.Content`, `Dialog.Title`, `Dialog.Description`, and `Dialog.Close`. Render full supplied fields and learning points. Keep browser-history integration out of scope.

- [ ] **Step 4: Run GREEN dialog tests**

Run `npm test -- src/App.test.tsx`. Expected: all App tests pass with no act or accessibility warnings.

- [ ] **Step 5: Commit dialog**

Commit message: `feat: add accessible course details`.

### Task 4: Editorial page sections and visual system

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/LearningMap.tsx`
- Create: `src/components/HowItWorks.tsx`
- Create: `src/components/RegistrationCTA.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/styles/index.css`
- Create: `src/main.tsx`
- Modify: `src/App.tsx`
- Extend: `src/App.test.tsx`

**Interfaces:**
- Consumes: shared `RegistrationLink` and catalog anchor `#courses`
- Produces: complete page composition and responsive editorial design

- [ ] **Step 1: Write structural and reduced-motion tests first**

Assert a single H1, main landmarks, navigation destinations, supplied hero and process copy, current-year footer, and a working Browse Workshops anchor.

- [ ] **Step 2: Run RED structural tests**

Run `npm test -- src/App.test.tsx`. Expected: new structure tests fail.

- [ ] **Step 3: Implement page components**

Build the asymmetric hero and SVG/CSS learning map, sticky header, three-step process, registration close, and footer. Use Lucide icons through a typed icon map. Use Motion components only for meaningful entrances, filter layout changes, active filter indicator, and dialog transitions.

- [ ] **Step 4: Implement the token-driven CSS system**

Define the approved palette and typography variables, bundled font imports, 1/2/3-column breakpoints, focus styles, touch targets, scroll margins, mobile filter overflow, dialog sheet/drawer behavior, and `prefers-reduced-motion` overrides.

- [ ] **Step 5: Run GREEN tests, lint, and build**

Run `npm test`, `npm run lint`, and `npm run build`. Expected: all pass with exit 0.

- [ ] **Step 6: Commit visual build**

Commit message: `feat: complete workplace learning experience`.

### Task 5: GitHub Pages delivery and documentation

**Files:**
- Create: `.github/workflows/deploy-pages.yml`
- Create: `.env.example`
- Create: `README.md`
- Modify: `vite.config.ts` if deployment verification reveals a base-path issue

**Interfaces:**
- Consumes: npm scripts and Vite build output
- Produces: repeatable Pages deployment and operator documentation

- [ ] **Step 1: Add the Pages workflow**

Use official checkout, configure-pages, upload-pages-artifact, and deploy-pages actions. Build with `VITE_MICROSOFT_FORM_URL: ${{ vars.VITE_MICROSOFT_FORM_URL }}` after `npm ci`, `npm test -- --run`, and `npm run build`.

- [ ] **Step 2: Write complete README instructions**

Document install, local development, `.env.local`, the supplied Microsoft Form response URL, course editing, tests, lint, production build, Pages enablement, repository Actions variable configuration, and changing `/Workshop-Offerings-/` in Vite.

- [ ] **Step 3: Verify the production asset base**

Run `npm run build`; inspect `dist/index.html`. Expected: generated asset references begin with `/Workshop-Offerings-/assets/`.

- [ ] **Step 4: Run the full automated gate**

Run `npm run check`. Expected: lint, tests, and production build all exit 0.

- [ ] **Step 5: Commit delivery files**

Commit message: `ci: deploy workshop catalog to github pages`.

### Task 6: Browser and accessibility verification

**Files:**
- Modify only files required by a reproduced browser defect, always after adding a failing regression test

- [ ] **Step 1: Serve the production build under the repository path**

Run `npm run preview -- --host 127.0.0.1`. Confirm the `/Workshop-Offerings-/` page loads without console errors.

- [ ] **Step 2: Inspect four viewport classes**

Verify at 375x812, 768x1024, 1440x900, and 1920x1080. Confirm 1/2/3-column behavior, comfortable actions, no clipping, and no horizontal document overflow.

- [ ] **Step 3: Exercise the complete interaction story**

Test representative search terms for every searchable field, every category, every duration, combined filters, reset, no results, mouse and keyboard dialog closing, focus return, and all registration links.

- [ ] **Step 4: Verify reduced motion and accessibility**

Emulate reduced motion, navigate by keyboard, inspect headings/landmarks/dialog semantics/live status, and check focus visibility and contrast.

- [ ] **Step 5: Run a fresh final gate**

Run `npm run check`. Expected: zero lint errors, zero failing tests, and a successful production build.

- [ ] **Step 6: Commit any verified fixes**

If changes were necessary, commit them with a specific `fix:` message. If no changes were necessary, do not create an empty commit.
