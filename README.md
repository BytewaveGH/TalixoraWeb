# Talixora — official website

Website for **Talixora**: makers of **Sellix** (ERPs for real estate, eateries and enterprise POS) and
**Bidchale** (an online bidding marketplace), and providers of software consultancy and dedicated developers.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Material Tailwind, Ant Design and Framer Motion.

## Getting started

```bash
npm install          # if NODE_ENV=production is set in your shell, use: npm install --include=dev
npm run dev          # http://localhost:3000
npm run build
npm run lint
```

## Where to edit content

Most copy lives in [`src/data/talixora.ts`](src/data/talixora.ts):

| What | Export |
| --- | --- |
| Company name, email, location, social links | `company` |
| Sellix modules and shared core | `sellixModules`, `sellixCore` |
| Bidchale | `bidchale` |
| Services and engagement models (project / part of a project / developer on request) | `services`, `engagementModels` |
| Team | `team` |
| FAQs (Why Talixora page) | `faqs` |
| Contact form categories and budgets | `enquiryCategories`, `budgetRanges` |

Navigation menus are in [`src/components/navbar.tsx`](src/components/navbar.tsx) and footer links in
[`src/components/footer.tsx`](src/components/footer.tsx).

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — products, Sellix modules, Bidchale, services, process, technologies, work with us |
| `/whytalixora` | Why Talixora — FAQs, benefits, team (`/whybytewave` redirects here) |
| `/about` | About — who we are, what we do, team |
| `/contactUs` | Contact form (supports `?category=` and `?role=` to pre-fill) |
| `/signIn`, `/admin` | Sign-in and admin dashboard |

## Structure

```
src/
  app/          routes (App Router)
  components/   UI sections and templates (moved out of src/pages, which Next treats as routes)
  data/         site content (talixora.ts) and admin grid columns
  interfaces/   shared TypeScript types
```

## Forms

The contact and "Work with us" forms currently open the visitor's email client with a pre-filled message to
`company.email`. To store enquiries server-side, replace the `onFinish` handlers with a call to an API route or form service.
