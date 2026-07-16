# Workplace Learning Catalog Design

## Purpose

Build a polished, completely static internal workshop catalog for employees, supervisors, technicians, and leaders. The site helps a visitor understand the available workshops, find a relevant course, compare options, review full course details, and open an external Microsoft Form to register interest.

The site is an inviting internal learning hub rather than a consulting website, administrative dashboard, or marketing funnel. Submitting the Microsoft Form expresses interest and does not guarantee a seat.

## Scope

The catalog contains exactly the 11 workshops and all course copy supplied in the source brief. It includes no database, authentication, server, API, administrative interface, CMS, embedded registration form, fabricated testimonials, ratings, attendance figures, outcomes, quotes, or scheduled dates.

The first release is a single-page React application built with TypeScript, Vite, Tailwind CSS, Motion for React, and Lucide React. It is deployable as static files to the GitHub repository `chriscasensmith-source/Workshop-Offerings-` through GitHub Actions and GitHub Pages.

## Experience Principles

1. Put useful information before promotion.
2. Make the full catalog easy to scan without hiding important distinctions.
3. Use warm, human editorial styling rather than dashboard conventions.
4. Treat search, filtering, keyboard access, and reduced motion as core behaviors.
5. Keep registration honest: the Microsoft Form records interest and does not promise enrollment.

## Visual Direction

### Concept

The selected direction is an editorial learning map. The hero presents learning as a connected path across four topic nodes, with layered workshop cards suggesting a real catalog. This becomes the site's one signature visual element; the remainder of the interface stays quiet, structured, and information-led.

### Color tokens

- Ink `#12202E`: headings, body text, header structure, and high-contrast controls
- Paper `#F5F2EA`: main page background
- Surface `#FFFEFA`: cards, search panel, and drawer
- Teal `#117C78`: Emotional Intelligence accent
- Amber `#D99016`: Teams and Communication accent
- Coral `#E76852`: Leadership accent
- Violet blue `#5C62E8`: Artificial Intelligence accent

Category color is always paired with text and/or an icon. Color never carries meaning alone. Accent colors are used for labels, small rules, icons, and interaction states rather than covering entire surfaces.

### Typography

- Archivo: compact, confident display headings
- Source Sans 3: readable interface and body copy
- IBM Plex Mono: catalog facts, filter counts, and compact utility labels

Fonts are bundled through npm font packages so the deployed site does not depend on third-party font requests.

### Layout

- A compact sticky header becomes more opaque after scroll.
- The hero uses an asymmetric two-column composition on desktop and a single-column stack on mobile.
- The course explorer begins with a prominent full-width search field, horizontally scrollable category controls on small screens, and compact duration controls.
- Course cards render in one, two, or three columns at phone, tablet, and wide desktop breakpoints.
- Course details use a right-side drawer on larger screens and a near-full-screen sheet on phones.
- The process and final registration sections use strong left alignment and generous space.

## Information Architecture

1. Sticky header with wordmark, anchor navigation, and registration action
2. Hero with supplied eyebrow, heading, supporting copy, actions, catalog facts, and learning-map illustration
3. Course explorer with search, category filters, duration filters, match count, reset action, cards, and empty state
4. Accessible course detail drawer
5. Three-step “How it works” section using the supplied copy
6. Final Microsoft Forms registration section
7. Minimal footer with name, practical-development statement, and current year

## Data Model

All course content lives in `src/data/courses.ts`. Components receive course objects and never maintain duplicate course copy.

Reusable types define:

- `CourseCategory`: the four supplied category names
- `DurationFilter`: `all`, `60`, `90`, or `up-to-120`
- `CourseIconName`: a controlled string union mapped to Lucide icons in presentation code
- `Course`: `id`, `title`, `shortTitle`, `category`, `duration`, `durationMinutes`, `audience`, `summary`, `outcome`, `learningPoints`, `searchTerms`, `featured`, `icon`, and optional `note`

The CliftonStrengths workshop alone carries the supplied assessment note. Exactly 11 typed objects are exported in the final catalog.

## Search and Filtering

Search is case-insensitive, whitespace-trimmed, and applied instantly across title, short title, summary, outcome, audience, learning points, and search terms. The category and duration filters combine with search using logical AND.

Duration rules are explicit:

- `60 Minutes`: `durationMinutes === 60`
- `90 Minutes`: `durationMinutes === 90`
- `Up to 2 Hours`: `durationMinutes === 120`

The 90-to-120-minute presentation workshop is represented by `durationMinutes: 120` and therefore appears under “Up to 2 Hours,” matching the supplied data.

The result count updates through an ARIA live status region. Reset Filters appears only while search or any filter is active. No matches produces a helpful empty state with a reset action and guidance to try a broader search.

Filter state remains local to the page. URL parameters are intentionally omitted to avoid unnecessary static-host routing concerns.

## Registration Behavior

The registration URL comes exclusively from `VITE_MICROSOFT_FORM_URL`.

When configured, every registration action renders as an external link with `target="_blank"` and `rel="noopener noreferrer"`. Buttons include descriptive accessible names. When missing, the app uses a clearly marked placeholder URL constant and identifies the link as needing configuration without building an internal registration form.

The README documents creating `.env.local`, adding `VITE_MICROSOFT_FORM_URL=https://...`, restarting the local development server, and configuring the same value as a GitHub Actions repository variable for deployment.

## Course Cards

Each card shows category, icon, title, duration, concise summary, “You will leave able to” outcome, audience, View Details, and Register. Category identity combines accent color, label, and icon. Cards use subtle borders, restrained shadows, and small hover elevation without continuous floating motion.

The whole card is not a link. Actions remain explicit controls with comfortable touch targets and visible keyboard focus.

## Course Detail Drawer

Selecting View Details opens a dialog containing the course title, category, duration, audience, full summary, participant outcome, all learning points, optional course note, and registration action.

The implementation uses an accessible dialog primitive with:

- programmatic title and description relationships
- automatic focus movement into the drawer
- tab focus containment
- Escape key dismissal
- a visible Close button
- backdrop dismissal
- focus return to the exact View Details trigger
- body scroll locking while open

Browser history integration is omitted because it adds complexity without improving this single-page static catalog enough to justify the risk.

## Motion

Motion for React provides:

- a brief hero entrance sequence
- light staggered card entrances
- layout transitions as filter results change
- a moving category-filter active indicator
- a short drawer/backdrop transition
- restrained card and button hover feedback

`useReducedMotion` and CSS `prefers-reduced-motion` remove nonessential transforms, stagger, and smooth scrolling while preserving state changes and all functionality.

## Accessibility

The build targets WCAG AA expectations with semantic landmarks, a skip link, ordered headings, accessible search labeling, native buttons and links, visible focus rings, minimum touch targets, sufficient contrast, non-color cues, ARIA result announcements, dialog focus management, and reduced-motion support.

Anchor navigation accounts for the sticky header. The horizontally scrolling mobile category list remains keyboard accessible and does not hide focus indicators. Decorative hero graphics are hidden from assistive technology.

## Responsive Behavior

- Phone: single-column hero and catalog, horizontally scrollable category filters, stacked actions, full-height detail sheet
- Tablet: two-column card grid and compact filter wrapping
- Laptop: asymmetric hero and two-column catalog where space requires
- Wide desktop: three-column catalog, larger learning-map visual, and restrained maximum content width

No breakpoint may introduce horizontal page overflow. Content remains usable at 320 CSS pixels wide and at 200% zoom.

## Component Boundaries

- `App`: page composition, selected course state, and filter state
- `Header`: sticky navigation and registration action
- `Hero`: headline, facts, calls to action, and learning-map visual
- `SearchBar`: labeled search input
- `CategoryFilters`: accessible single-select category control
- `DurationFilters`: accessible single-select duration control
- `CourseGrid`: animated result layout and empty state
- `CourseCard`: concise course summary and explicit actions
- `CourseDetail`: accessible drawer dialog
- `HowItWorks`: supplied three-step process
- `RegistrationCTA`: final external registration action
- `Footer`: name, development statement, and year
- `RegistrationLink`: shared safe external-link behavior and placeholder messaging

Pure helpers in `src/lib/filterCourses.ts` own normalization and filtering so search behavior is independently testable.

## Build and Deployment

Vite uses `/Workshop-Offerings-/` as the production base path and `/` during local development. The README explains how to change the repository segment. The GitHub Pages workflow installs dependencies with `npm ci`, runs tests, builds the site with the Microsoft Form repository variable, uploads `dist`, and deploys it through the official Pages actions.

The project includes strict TypeScript, ESLint, Vitest, React Testing Library, jsdom, and production build scripts.

## Testing Strategy

Automated tests cover:

1. Search matches every required field through representative terms
2. Category filtering
3. All three duration filters
4. Combined search, category, and duration filtering
5. Reset Filters visibility and behavior
6. Helpful no-results state
7. Course detail opening and closing by button, Escape, close control, and backdrop
8. Focus return after closing details
9. Safe external registration-link attributes and configured URL
10. Placeholder registration behavior when the environment value is absent
11. Exactly 11 courses and the CliftonStrengths note

Final verification runs lint, all automated tests, and the production build. Browser inspection covers phone, tablet, laptop, and wide desktop widths; keyboard navigation; search/filter combinations; every registration action; reduced motion; overflow; console errors; and serving the production build beneath `/Workshop-Offerings-/`.

## Required User Configuration

The site is complete with a clearly labeled registration placeholder. The only required content configuration is the real Microsoft Form URL. Publishing also requires granting the GitHub app or local Git credentials access to `chriscasensmith-source/Workshop-Offerings-`, pushing the generated files, and enabling GitHub Pages with GitHub Actions as its source.
