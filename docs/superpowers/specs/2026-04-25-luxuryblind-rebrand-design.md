# LuxuryBlind — Rebrand & Ecommerce Design Spec
**Date:** 2026-04-25  
**Approach:** Layered rebuild — keep Next.js routing and data structure, replace visual layer, add ecommerce features on top.

---

## 1. Brand Identity

### Name & Wordmark
- **Name:** LUXURYBLIND (all caps, letter-spaced)
- **Tagline (MN):** Тансаг Цонхны Хөшиг · Солонгос Материал
- **Tagline (EN):** Premium Window Coverings · Korean Craftsmanship
- **Korean badge:** `🇰🇷 Солонгос Материал · Korean Craftsmanship` — appears on hero and every product card

### Color System
| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0A0A0A` | Page background |
| Surface | `#141414` | Section backgrounds |
| Card | `#1C1C1C` | Cards, panels, modals |
| Border | `#2A2A2A` | All borders, dividers |
| Seoul Gold | `#C9A96E` | Accent, CTAs, prices, active states |
| Gold Light | `#E2C99A` | Italic text, hover states |
| Ivory | `#F5F0EB` | Primary text |
| Ash | `#888888` | Muted/secondary text |

### Typography
| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display / Hero | Playfair Display | 300 Light | Hero headlines |
| Display Italic | Playfair Display | 300 Italic | Emphasis within headlines |
| Heading | Playfair Display | 600 SemiBold | Section headings, product names |
| Subheading | Playfair Display | 400 Regular | Card titles, mid-level headings |
| Body | DM Sans | 300 Light | Descriptions, paragraphs |
| UI / Nav | DM Sans | 500 Medium | Navigation, labels, links |
| Button | DM Sans | 700 Bold | All CTA buttons |
| Eyebrow | DM Sans | 600 SemiBold | Section labels (letter-spaced uppercase) |
| **Numbers** | **Bodoni Moda** | **300 Light** | All prices, dimensions, quantities |

Bodoni Moda numbers must always use `font-variant-numeric: tabular-nums` and `font-feature-settings: "tnum" 1, "lnum" 1` for column alignment.

---

## 2. Site Architecture

### Pages
| Page | Route | Type |
|------|-------|------|
| Home | `/` | Rebuild |
| Products | `/products` | Rebuild |
| Product Detail + Configurator | `/products/[id]` | Rebuild + new feature |
| Checkout | `/checkout` | New |
| Partners / B2B | `/partners` | New |
| About | `/about` | Visual refresh |
| Contact | `/contact` | Visual refresh |

### Navigation
- Logo left, nav links center, `МН / EN` toggle + CTA button right
- Mobile: hamburger menu, full-screen overlay nav
- Active page: ivory text (vs ash for inactive)
- CTA: "Үнийн Санал" (gold button, DM Sans 700)

---

## 3. Home Page Sections

1. **Hero** — Full-bleed dark image, Playfair Display headline with italic emphasis, two CTAs: "Цонхоо Дүрслэх" (gold) + "Бүтээгдэхүүн Харах" (outline). Korean badge + custom size + delivery badges below.
2. **Benefits** — 3-column icon row: Korean Material / Custom Size / Fast Delivery. Minimal, icon + label only.
3. **Featured Products** — 3 product cards pulled from `product.json`, with Bodoni Moda prices.
4. **Process** — "Хэрхэн захиалах вэ?" — 4 steps: Хэмжих → Сонгох → Дүрслэх → Захиалах.
5. **Visualizer CTA** — Full-width dark section pushing users to the canvas visualizer.
6. **Testimonials** — 2–3 customer quotes.
7. **Partners CTA** — Brief B2B callout with link to `/partners`.
8. **Footer** — Logo, nav links, Korean badge, contact info, language toggle.

---

## 4. Product Configurator & Canvas Visualizer

### Product Detail Page Flow
1. Product images (carousel, existing images from `product.json`)
2. **Size Configurator**
   - Width input (cm) — min 30, max product's `dimensions.wide` stripped of "см"
   - Height input (cm) — min 30, max 300
   - Live price formula: `Math.ceil((width/100) * (height/100)) * pricePerSqm`
   - Price updates on every keystroke using Bodoni Moda 300 Light
3. **Canvas Visualizer**
   - HTML5 Canvas (500×400px desktop, full-width mobile)
   - Draws: window frame outline (gold border), blind slats filling the frame
   - Slat count scales with entered height
   - Slat color matches selected product's material tone
   - "Open / Closed" toggle rotates slat angle (0° = closed, 45° = open)
   - Dimensions label below canvas in Bodoni Moda
4. **Delivery / Pickup toggle**
   - Radio: "Хүргэлт + ₮10,000" / "Дэлгүүрээс авах — Үнэгүй"
   - Delivery fee added to order total
5. **Add to Order button** — stores order in `localStorage` / React state, navigates to `/checkout`

### Pricing Model
- Each product in `product.json` will gain a `pricePerSqm` field (MNT)
- Minimum order: 1 м² (so orders below 1 м² are rounded up to 1 м²)

---

## 5. Checkout Page

### Fields
- Customer name (Нэр)
- Phone number (Утасны дугаар)
- Delivery address — shown only if delivery selected (Хүргэлтийн хаяг)
- Order notes (Тэмдэглэл) — optional

### Order Summary
- Product name, dimensions, quantity, unit price — all numbers in Bodoni Moda 300
- Subtotal, delivery fee (+₮10,000 if delivery), **Total**
- Total in Bodoni Moda 300 Light, gold color, large

### Payment Instructions
After submitting the form, show:
- Bank account details (account name, number, bank name) — stored in env/config
- Instructions: "Шилжүүлгийн утган дээр захиалгын дугаараа бичнэ үү"
- Order reference number (auto-generated: `LB-YYYYMMDD-XXXX`)
- "Захиалга баталгаажлаа" confirmation screen

---

## 6. Partners / B2B Page

Two tracks presented as a split choice:

### Track A — Bulk Order
- Upload or manually enter a list of windows (room name, width, height, product type)
- Dynamic table: add/remove rows
- Calculates total m² and estimated price per product
- Submit as a quote request (name, company, phone, email)

### Track B — Request a Site Visit
- Form: name, company, address, preferred date/time, phone
- "Манай мэргэжилтэн очиж хэмжилт хийнэ" — our specialist will visit and measure
- No price shown — sales team follows up

---

## 7. Bilingual (МН / EN)

- Language toggle in header: `МН / EN` pill
- All text stored in a simple `translations/mn.ts` and `translations/en.ts` object
- `useLanguage()` hook — reads from `localStorage`, defaults to `МН`
- No i18n library needed — direct object lookup is sufficient for this scope

---

## 8. Responsive Design (First-Class Requirement)

All breakpoints:
| Breakpoint | Width | Notes |
|------------|-------|-------|
| Mobile | `< 640px` | Single column, stacked nav, full-width canvas |
| Tablet | `640px – 1024px` | 2-col grids, canvas 50% width |
| Desktop | `> 1024px` | Full layout as designed |

Rules:
- Every component is designed **mobile-first** (base styles = mobile, then `sm:` / `md:` / `lg:` upward)
- Canvas visualizer: full viewport width on mobile with fixed aspect ratio
- Product grid: 1 col mobile → 2 col tablet → 3–4 col desktop
- Configurator inputs: stacked on mobile, side-by-side on desktop
- Navigation: hamburger on mobile, full nav on desktop
- Typography scales: hero headline 32px mobile → 48px tablet → 64px desktop
- Touch targets: minimum 44×44px for all interactive elements
- No horizontal scroll at any breakpoint

---

## 9. Technical Notes

- **Framework:** Next.js 14 App Router (existing)
- **Styling:** Tailwind CSS (existing) — extend with new color tokens in `tailwind.config`
- **Animation:** Framer Motion (existing) — slow fade-ins, no flashy effects
- **State:** React `useState` / `useReducer` for configurator; `localStorage` for cart/language
- **Canvas:** Native HTML5 Canvas via `useRef` + `useEffect` — no canvas library needed
- **Data:** `product.json` extended with `pricePerSqm` field
- **Translation:** Simple `translations/mn.ts` + `translations/en.ts` files
- **No external payment gateway** — bank transfer with order reference only
- **Fonts:** Load via `next/font/google` for performance (Playfair Display, DM Sans, Bodoni Moda)
