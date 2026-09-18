# CoreNovaIT — Next.js site

A multi-page marketing site for CoreNovaIT, ported from the original
single-file HTML artifact into a Next.js 14 App Router project.

## Structure

```
app/
  layout.tsx          Root layout — fonts, <Header>, <Marquee>, <Footer>
  globals.css          All design tokens & styles (dark by default, light via [data-theme])
  page.tsx              Home — assembles the components/home/* sections below
  services/page.tsx      Services
  platforms/page.tsx     Platforms
  process/page.tsx       Process (the 7-step workflow)
  ai/page.tsx             AI Integrations
  partners/page.tsx      For Agency Partners
  faq/page.tsx            FAQ
  contact/page.tsx        Contact (renders <ContactForm>, reads ?email= to prefill)
components/
  Header.tsx        Sticky pill nav + theme toggle + mobile menu (client component)
  Marquee.tsx        Scrolling services strip
  Footer.tsx          Always-light footer with sitemap + wordmark
  Reveal.tsx        Shared scroll-triggered fade/slide-up wrapper (IntersectionObserver)
  ContactForm.tsx  Controlled form that POSTs to /api/contact (client component)
  home/              Homepage sections (hero, services, portfolio carousel, etc.)
  api/contact/route.ts   Saves submissions to Supabase, emails via Resend
```

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Notes on porting from the artifact

- **Routing**: the original artifact was a single HTML file with a
  hand-rolled hash router (`#/services`, `#/contact`, …). That's gone —
  every section is now a real Next.js route with its own URL
  (`/services`, `/contact`, …), so browser back/forward, direct links,
  and SEO all work natively via `next/link` and the App Router.
- **Fonts**: swapped the `<link>`-tag Google Fonts import for
  `next/font/google` (Bricolage Grotesque, IBM Plex Sans, IBM Plex Mono),
  which self-hosts and preloads them — no external request at runtime.
- **Theme**: token-based in `globals.css`, dark by default regardless of
  the visitor's OS preference (that's the brand look). A light palette
  still exists behind `[data-theme="light"]` on `<html>`, ready for a
  manual toggle later, but nothing switches to it automatically.
- **Contact form**: submitting POSTs JSON (`{name, company, email,
  service, details}`) to `/api/contact` (`app/api/contact/route.ts`),
  which saves the row to Supabase (schema in `supabase-schema.sql`) and
  emails a notification via Resend, returning a success/error message
  the form displays. Needs `NEXT_PUBLIC_SUPABASE_URL`,
  `SUPABASE_SERVICE_ROLE_KEY`, and `RESEND_API_KEY` set — copy
  `.env.example` to `.env.local` and fill them in, then restart the dev
  server (env vars are only read at startup).
- **Legacy PHP backend**: `backend-php/contact.php` and
  `create_table.sql` are unused — they assumed classic FTP +
  PHP/MySQL hosting, but this site actually runs on Hostinger's
  Next.js/Node.js hosting (confirmed via its response headers), which
  can't execute PHP dropped alongside it. Superseded by the
  Supabase/Resend API route above; safe to delete once you've
  confirmed the new form works. (The FTP-deploy GitHub Action that
  used to accompany them has already been removed — Hostinger builds
  and runs this app directly from the repo.)
- **Homepage sections** (`components/home/`): Hero (with a CSS-only
  auto-scrolling mockup marquee, no photography), an animated services
  showcase, a center-focus portfolio carousel, a "why choose us" grid,
  a scroll-progressive testimonial quote, a stats section, a process
  teaser, a homepage FAQ, and a final email-capture CTA that routes to
  `/contact?email=…` to prefill the real contact form. All respect
  `prefers-reduced-motion`.

## Things you'll likely want to change

- Contact email is `contact@corenovait.com.au`, set as `CONTACT_EMAIL` /
  `TO` constants in `components/Footer.tsx` and
  `components/ContactForm.tsx`.
- `app/icon.svg` is the nova-mark favicon (Next.js serves it
  automatically, no code needed). Replace it with a real brand
  favicon whenever one exists.
- The Resend `from` address (`onboarding@resend.dev` in the API route)
  only works reliably once you verify a sending domain in Resend — until
  then, Resend restricts sending to the email address on your own
  account. Verify `corenovait.com.au` (or a subdomain) in the Resend
  dashboard and update the `from` address in
  `app/api/contact/route.ts` once it's done.
