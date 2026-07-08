# Bulma Admin / Buefy

[Leia em português](./README.pt-BR.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE) ![Free](https://img.shields.io/badge/price-free-brightgreen)

Bulma Admin / Buefy is an admin dashboard template built with Vue 3, Buefy and Bulma. It ships 25 views (dashboard, auth flow, apps, utility pages and a public landing page), a light and dark theme, three languages and mock authentication, so you can click through the whole product before writing any backend code. State lives in Pinia stores, routing in Vue Router, and everything is typed with TypeScript.

Live preview: https://template.dev.br/preview/bulma-admin-buefy/

## Views included

25 route views in `src/views/`:

- Landing: public marketing page with hero, feature and pricing sections
- Login: sign-in form with validation and mock credentials
- Register: account creation form
- Forgot password: request form for a reset link
- Reset password: form to set a new password
- Dashboard: KPI stat cards with sparklines, charts and recent activity
- Charts: analytics page with bar, area and donut charts (ApexCharts)
- Forms: inputs, selects, date picker, file dropzone and inline validation (VeeValidate + Yup)
- Tables: data table with sorting, filtering, pagination and row selection (TanStack Table)
- Components: catalog of the base UI components
- UI advanced: modals, tabs, toasts and other composite widgets
- Typography: type scale, headings and text helpers
- Integrations: third-party service cards with toggles
- Profile: user page with personal data and activity
- Pricing: plan comparison
- Settings: application preferences, theme and language
- Inbox: mail-style app screen with folders and message list
- File manager: file listing with folders and file actions
- Gallery: image grid
- Invoice: printable invoice detail
- Billing: payment methods and invoice history
- Documentation: in-app reference page for the template
- Maintenance: standalone downtime page
- Coming soon: standalone pre-launch page
- Not found: 404 error page

## Tech stack

- Vue 3.5 with `<script setup>` and TypeScript 5.7
- Buefy 3.0 (Buefy for Vue 3) on top of Bulma 1.0.4
- Vite 6 with `vite-plugin-pwa` 1.3 (installable PWA, offline cache)
- Pinia 3.0 with `pinia-plugin-persistedstate` 4.2
- Vue Router 4.4
- vue-i18n 11.4 (en, es, pt-BR locales)
- ApexCharts 5 via vue3-apexcharts 1.11
- TanStack Vue Table 8.21
- Tiptap 3.23 rich text editor
- VeeValidate 4.15 + Yup 1.7 form validation
- Material Design Icons (@mdi/font 7.4)
- Sass 1.83

## Requirements

- Node.js 18 or newer
- npm

## Getting started

```bash
npm install
npm run dev
```

Vite starts a dev server with hot reload. Authentication is simulated in the Pinia auth store, no backend needed. Demo credentials:

- `admin@template.com` / `admin123`
- `user@template.com` / `user123`

## Build for production

```bash
npm run build
```

Runs `vue-tsc` type checking and outputs the production bundle to `dist/`. Preview the build locally with `npm run preview`.

## Project structure

```
src/
├── assets/styles/     app.scss, variables.css, dark.css
├── components/
│   ├── landing/       sections of the public landing page
│   ├── layout/        header, sidebar, footer
│   └── ui/            DataTable, StatsCard, ApexChart, RichTextEditor, FileDropzone, ...
├── composables/       shared composition functions
├── i18n/locales/      en.json, es.json, pt-BR.json
├── router/            route definitions and guards
├── stores/            auth.ts, menu.ts, ui.ts (Pinia)
└── views/             25 route views
```

`components.md` at the repo root lists the Buefy components used by the template, grouped by category.

## Theming and customization

Bulma Sass variables are set at the top of `src/assets/styles/app.scss`, before `@use 'bulma/bulma'`: `$primary` (#485fc7), `$family-sans-serif` (Inter) and `$radius`. Runtime tokens are CSS custom properties with the `--tx-` prefix in `variables.css`: semantic colors, sidebar and header dimensions, and a spacing scale. `dark.css` overrides those tokens for the dark theme, which the UI store toggles at runtime. Change `--tx-primary` and `$primary` together to rebrand the template.

## Internationalization

Three locales ship in `src/i18n/locales/`: English, Spanish and Brazilian Portuguese. The `LanguageSwitcher` component in the header switches between them and the choice persists.

## The same layout in other stacks

This repo is one of five implementations of the same Bulma admin layout. Each one has the same 25 views and the same visual identity:

- React 19: https://github.com/danilo62x/bulma-admin-react
- Angular 19: https://github.com/danilo62x/bulma-admin-angular
- Laravel 11 + Blade: https://github.com/danilo62x/bulma-admin-laravel
- Static HTML: https://github.com/danilo62x/bulma-admin-html

The full catalog of free and paid templates is at https://template.dev.br

## Support this project

This template is free and MIT licensed. If it saves you time, you can support the work with a donation at https://template.dev.br/doar?template=bulma-admin-buefy

## License

[MIT](./LICENSE), copyright 2026 Danilo Quinelato.
