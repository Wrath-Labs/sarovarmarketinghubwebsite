# Sarovar Marketing Hub — Website

A frontend-only [Next.js](https://nextjs.org) marketing site. **Every piece of
content, every image and every colour lives in the five JSON files inside
`/content`.** You never need to open a component to change the site.

```
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

---

## The only folder you need: `/content`

| File | What it controls |
|---|---|
| **`site.json`** | Brand name & logo, navigation, announcement bar, contact details, social links, footer (columns, newsletter, badges, legal), floating WhatsApp button, SEO / social-share defaults |
| **`theme.json`** | All colours, fonts, corner radius, section spacing, shadows and animation switches |
| **`home.json`** | The entire home page — hero, logo strip, services, about, why us, stats, work, process, testimonials, FAQ, contact block — **and the order they appear in** |
| **`services.json`** | The `/services` page — hero, the six service blocks, process, pricing packages, add-ons, FAQ, closing CTA |
| **`contact.json`** | The `/contact` page — hero, every form field, contact cards, call booking, map, FAQ, closing CTA |

Save the file → the dev server refreshes instantly.

> Keys starting with `_comment` are notes for you. They are ignored by the site
> and safe to delete.

---

## Common edits

### Change a colour
`content/theme.json` → `colors`. The four brand colours are already set:

```json
"colors": {
  "indigo":          "#5511ED",
  "lilacSnow":       "#F5F2FC",
  "deepRoyalPurple": "#2B0080",
  "richSoftBlack":   "#1C1C1C"
}
```

`roles` decides *where* each colour is used, so you can swap the whole palette by
pointing a role at a different colour name:

```json
"roles": { "primary": "indigo", "sectionBackground": "lilacSnow" }
```

### Change a font
`content/theme.json` → `fonts`. Any family name from
[fonts.google.com](https://fonts.google.com) works — it is loaded automatically.

```json
"fonts": { "heading": "Sora", "body": "Plus Jakarta Sans" }
```

### Swap an image
Every image field takes **either** a file in `/public/images` **or** a full URL:

```json
"image": "/images/hero-visual.svg"
"image": "https://images.example.com/photo.jpg"
```

Drop your own file into `public/images/` and point the JSON at it. The bundled
`.svg` files are placeholders — replace them with real photography when you have it.

### Reorder or remove home-page sections
`content/home.json` → `sectionOrder`. Delete a name to remove that section, move
it to reorder:

```json
"sectionOrder": ["hero", "logos", "services", "about", "whyUs", "stats",
                 "work", "process", "testimonials", "faq", "contact"]
```

### Add a service, a project, a testimonial, an FAQ, a pricing plan
Copy an existing object in the relevant array and edit it. The page picks it up —
grids, filters, carousels and anchor links all adjust on their own.

The `id` on a service becomes its anchor link, e.g.
`id: "seo-content"` → `/services#seo-content`.

### Add or remove a contact-form field
`content/contact.json` → `form.fields`. Supported `type` values: `text`,
`email`, `tel`, `textarea`, `select` (add an `options` array). `width` is
`"half"` or `"full"`.

```json
{ "name": "website", "label": "Your website", "type": "text",
  "placeholder": "https://", "required": false, "width": "half", "icon": "globe" }
```

### Make the contact form deliver to your inbox
The site has no backend, so out of the box the form opens the visitor's email app
with everything pre-filled. To collect submissions properly, paste a form
endpoint (Formspree, Getform, Google Apps Script, Basin…) into:

```json
"form": { "endpoint": "https://formspree.io/f/your-id" }
```

It is POSTed as JSON. Leave it `""` to keep the email-app behaviour.

### Icons
Any `"icon"` field takes a name from [lucide.dev/icons](https://lucide.dev/icons)
in lowercase-with-hyphens form — `"trending-up"`, `"shield-check"`, `"map-pin"`.
Social platforms are also available: `instagram`, `linkedin`, `twitter`, `x`,
`youtube`, `facebook`, `whatsapp`. An unknown name falls back to a sparkle
rather than breaking the page.

### Turn animations up or down
`content/theme.json` → `effects`:

```json
"enableAnimations": true,        // master switch for all motion
"enableGrainTexture": true,      // subtle film grain over the page
"enableCursorGlow": true,        // light that follows the pointer (desktop)
"enableScrollProgressBar": true, // gradient bar at the top of the window
"revealDuration": 0.7,           // seconds per scroll-in animation
"revealDistance": 28,            // pixels an element travels as it appears
"staggerDelay": 0.09             // gap between items in a grid
```

Visitors who set "reduce motion" in their OS automatically get a still version.

---

## Pages

| Route | File | Contains |
|---|---|---|
| `/` | `src/app/page.tsx` | Hero, logos, services, about, why us, stats, work, process, testimonials, FAQ, contact |
| `/services` | `src/app/services/page.tsx` | Service detail, process, pricing, add-ons, FAQ, CTA |
| `/contact` | `src/app/contact/page.tsx` | Form, contact cards, call booking, map, FAQ, CTA |

Anchor links to home-page sections: `/#services`, `/#about`, `/#why-us`,
`/#work`, `/#process`, `/#testimonials`, `/#faq`, `/#contact`.

---

## Project structure

```
content/               ← everything you edit
public/images/         ← your images
src/
  app/                 route files + global CSS
  components/
    layout/            navbar, footer, logo, theme injection, global effects
    sections/          one file per page section
    ui/                buttons, cards, reveal/stagger animation helpers, icons
  lib/
    content.ts         loads the JSON and turns theme.json into CSS variables
    types.ts           shapes of the content files
    utils.ts           small helpers
```

## Notes

- Fully responsive, verified from 320px to 1440px+.
- All three pages are statically prerendered — host it anywhere (Vercel,
  Netlify, Cloudflare Pages, or any static host).
- Accessibility: keyboard-navigable, skip-to-content link, labelled form fields,
  visible focus rings, reduced-motion support.
- SEO: per-page titles and descriptions, Open Graph and Twitter cards,
  JSON-LD organisation data — all driven from `site.json` → `seo`.
