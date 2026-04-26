# LuxuryBlind Rebrand & Ecommerce Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild LuxuryBlind into a dark-luxury ecommerce site with a window configurator, canvas visualizer, checkout flow, and B2B partners section.

**Architecture:** Tailwind v4 CSS tokens replace all color/font variables in globals.css; Google Fonts loaded via next/font; language context (MN/EN) + order context stored in localStorage via React context providers; new pages (/checkout, /partners) added to the existing App Router structure.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4, Framer Motion (motion), HTML5 Canvas, next/font/google, Zustand (already installed), localStorage

---

## File Map

### New files to create
- `src/lib/translations/mn.ts` — Mongolian strings
- `src/lib/translations/en.ts` — English strings
- `src/lib/translations/index.ts` — Translation type + export
- `src/lib/hooks/use-language.ts` — Language hook (localStorage)
- `src/lib/hooks/use-order.ts` — Order cart hook (localStorage)
- `src/lib/utils/price.ts` — Price calculation helpers
- `src/lib/context/language-context.tsx` — React context provider
- `src/lib/context/order-context.tsx` — React context provider
- `src/components/ui/korean-badge.tsx` — 🇰🇷 badge component
- `src/components/ui/price-display.tsx` — Bodoni Moda price renderer
- `src/components/ui/eyebrow.tsx` — Eyebrow label component
- `src/components/sections/home/home-screen-partners-cta.tsx` — Partners CTA strip
- `src/components/sections/footer/footer.tsx` — New footer
- `src/app/checkout/page.tsx` — Checkout page
- `src/app/partners/page.tsx` — Partners/B2B page
- `src/components/sections/checkout/checkout-form.tsx`
- `src/components/sections/checkout/order-summary.tsx`
- `src/components/sections/checkout/payment-instructions.tsx`
- `src/components/sections/partners/partners-hero.tsx`
- `src/components/sections/partners/bulk-order-form.tsx`
- `src/components/sections/partners/site-visit-form.tsx`
- `src/components/sections/product/product-configurator.tsx` — Size inputs + price calc
- `src/components/sections/product/window-canvas.tsx` — HTML5 canvas visualizer

### Files to modify
- `src/app/globals.css` — Replace color tokens, add font CSS variables
- `src/app/layout.tsx` — Add font loading, wrap with providers, remove ThemeToggleButton
- `src/components/sections/header/views/header-view.tsx` — Rebrand: dark, gold CTA, language toggle, new nav items
- `src/components/sections/home/home-screen-hero.tsx` — Rebrand: dark, Playfair headline, Korean badge
- `src/components/sections/home/home-screen-benefits.tsx` — Rebrand: minimal icon row
- `src/components/sections/home/home-screen-featured.tsx` — Rebrand: dark product cards with Bodoni prices
- `src/components/sections/home/home-screen-process.tsx` — Rebrand: 4-step process
- `src/components/sections/home/home-screen-testimonials.tsx` — Rebrand: dark testimonials
- `src/components/sections/home/home-screen-cta.tsx` — Visualizer CTA
- `src/components/sections/home/views/home-screen-view.tsx` — Add footer + partners CTA
- `src/components/sections/product/product-grid.tsx` — Rebrand dark product cards
- `src/components/sections/product/view/product-detail-screen.tsx` — Add configurator + canvas
- `src/components/sections/product/view/product-screen-view.tsx` — Rebrand
- `src/components/sections/about/views/about-screen-view.tsx` — Visual refresh
- `src/components/sections/contact/views/contact-view-screen.tsx` — Visual refresh
- `src/data/product.json` — Add `pricePerSqm` to every product

---

## Task 1: Design Tokens & Fonts

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace CSS tokens in globals.css**

Replace the entire contents of `src/app/globals.css` with:

```css
@import "tailwindcss";
@import "tw-animate-css";

@font-face {
  font-family: "Juana";
  src: url("/font/Fontspring-DEMO-juana-black.otf") format("opentype");
  font-weight: 900; font-style: normal;
}
@font-face {
  font-family: "Juana";
  src: url("/font/Fontspring-DEMO-juana-bold.otf") format("opentype");
  font-weight: 700; font-style: normal;
}
@font-face {
  font-family: "Juana";
  src: url("/font/Fontspring-DEMO-juana-extralight.otf") format("opentype");
  font-weight: 200; font-style: normal;
}
@font-face {
  font-family: "Juana";
  src: url("/font/Fontspring-DEMO-juana-light.otf") format("opentype");
  font-weight: 300; font-style: normal;
}
@font-face {
  font-family: "Juana";
  src: url("/font/Fontspring-DEMO-juana-medium.otf") format("opentype");
  font-weight: 500; font-style: normal;
}
@font-face {
  font-family: "Juana";
  src: url("/font/Fontspring-DEMO-juana-regular.otf") format("opentype");
  font-weight: 400; font-style: normal;
}
@font-face {
  font-family: "Juana";
  src: url("/font/Fontspring-DEMO-juana-semibold.otf") format("opentype");
  font-weight: 600; font-style: normal;
}
@font-face {
  font-family: "Juana";
  src: url("/font/Fontspring-DEMO-juana-thin.otf") format("opentype");
  font-weight: 100; font-style: normal;
}
@font-face {
  font-family: "Juana Alt";
  src: url("/font/Fontspring-DEMO-juanaalt-black.otf") format("opentype");
  font-weight: 900; font-style: normal;
}
@font-face {
  font-family: "Juana Alt";
  src: url("/font/Fontspring-DEMO-juanaalt-bold.otf") format("opentype");
  font-weight: 700; font-style: normal;
}
@font-face {
  font-family: "Juana Alt";
  src: url("/font/Fontspring-DEMO-juanaalt-extralight.otf") format("opentype");
  font-weight: 200; font-style: normal;
}
@font-face {
  font-family: "Juana Alt";
  src: url("/font/Fontspring-DEMO-juanaalt-light.otf") format("opentype");
  font-weight: 300; font-style: normal;
}
@font-face {
  font-family: "Juana Alt";
  src: url("/font/Fontspring-DEMO-juanaalt-medium.otf") format("opentype");
  font-weight: 500; font-style: normal;
}
@font-face {
  font-family: "Juana Alt";
  src: url("/font/Fontspring-DEMO-juanaalt-regular.otf") format("opentype");
  font-weight: 400; font-style: normal;
}
@font-face {
  font-family: "Juana Alt";
  src: url("/font/Fontspring-DEMO-juanaalt-semibold.otf") format("opentype");
  font-weight: 600; font-style: normal;
}
@font-face {
  font-family: "Juana Alt";
  src: url("/font/Fontspring-DEMO-juanaalt-thin.otf") format("opentype");
  font-weight: 100; font-style: normal;
}

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Brand colors */
  --color-lb-bg:        #0A0A0A;
  --color-lb-surface:   #141414;
  --color-lb-card:      #1C1C1C;
  --color-lb-border:    #2A2A2A;
  --color-lb-gold:      #C9A96E;
  --color-lb-gold-lt:   #E2C99A;
  --color-lb-ivory:     #F5F0EB;
  --color-lb-ash:       #888888;

  /* Semantic aliases (keep existing tokens pointing to new brand) */
  --color-background:   #0A0A0A;
  --color-foreground:   #F5F0EB;
  --color-primary:      #C9A96E;
  --color-primary-foreground: #0A0A0A;
  --color-accent:       #C9A96E;
  --color-accent-foreground: #0A0A0A;
  --color-secondary:    #1C1C1C;
  --color-secondary-foreground: #F5F0EB;
  --color-muted:        #1C1C1C;
  --color-muted-foreground: #888888;
  --color-destructive:  oklch(0.6 0.2 20);
  --color-border:       #2A2A2A;
  --color-input:        #1C1C1C;
  --color-ring:         #C9A96E;

  /* Fonts */
  --font-display:  var(--font-playfair), "Georgia", serif;
  --font-sans:     var(--font-dm-sans), "Juana Alt", "Arial", sans-serif;
  --font-mono:     "Poppins", monospace;
  --font-numbers:  var(--font-bodoni), "Georgia", serif;

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.25rem;
}

@layer base {
  * {
    @apply border-lb-border outline-lb-gold/50;
  }

  html, body {
    @apply bg-lb-bg text-lb-ivory font-sans min-h-screen;
  }

  html {
    overflow-x: hidden;
  }

  /* Bodoni Moda numeric alignment */
  .font-numbers {
    font-family: var(--font-numbers);
    font-weight: 300;
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum" 1, "lnum" 1;
  }

  /* Eyebrow labels */
  .eyebrow {
    @apply font-sans font-semibold text-xs tracking-widest uppercase text-lb-ash;
  }
}
```

- [ ] **Step 2: Add Google Fonts + providers to layout.tsx**

```tsx
import { Playfair_Display, DM_Sans, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/header/views/header-view";
import Footer from "@/components/sections/footer/footer";
import { LanguageProvider } from "@/lib/context/language-context";
import { OrderProvider } from "@/lib/context/order-context";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn" className={`${playfair.variable} ${dmSans.variable} ${bodoni.variable}`}>
      <body className="bg-lb-bg text-lb-ivory min-h-screen">
        <LanguageProvider>
          <OrderProvider>
            <Header />
            {children}
            <Footer />
          </OrderProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: design tokens, Google fonts, provider layout"
```

---

## Task 2: Translations & Language Context

**Files:**
- Create: `src/lib/translations/mn.ts`
- Create: `src/lib/translations/en.ts`
- Create: `src/lib/translations/index.ts`
- Create: `src/lib/context/language-context.tsx`
- Create: `src/lib/hooks/use-language.ts`

- [ ] **Step 1: Create `src/lib/translations/mn.ts`**

```ts
export const mn = {
  nav: {
    home: "Нүүр хуудас",
    products: "Бүтээгдэхүүн",
    about: "Бидний тухай",
    contact: "Холбоо барих",
    partners: "Түншлэл / B2B",
    cta: "Үнийн Санал",
  },
  hero: {
    headline: "Таны Орон Зайг",
    headlineItalic: "Шинэчлэнэ",
    tagline: "Тансаг Цонхны Хөшиг · Солонгос Материал",
    ctaPrimary: "Цонхоо Дүрслэх",
    ctaSecondary: "Бүтээгдэхүүн Харах",
    badgeDelivery: "Хүргэлттэй",
    badgeCustom: "Захиалгат Хэмжээ",
    badgeKorean: "Солонгос Материал",
  },
  benefits: {
    eyebrow: "Яагаад биднийг сонгох вэ",
    korean: "Солонгос Материал",
    koreanDesc: "Шилдэг чанарын Солонгос даавуу, мод, торон материал",
    custom: "Захиалгат Хэмжээ",
    customDesc: "Таны цонхны хэмжээнд тохирсон, нэг см нарийвчлалтай",
    delivery: "Хурдан Хүргэлт",
    deliveryDesc: "Улаанбаатар хотод 3–5 ажлын өдөрт хүргэнэ",
  },
  featured: {
    eyebrow: "Онцлох Бүтээгдэхүүн",
    heading: "Шилдэг Хөшгүүд",
    viewAll: "Бүгдийг харах",
    configure: "Тохируулах",
    perSqm: "м²",
    from: "₮",
  },
  process: {
    eyebrow: "Захиалгын Үйл Явц",
    heading: "Хэрхэн захиалах вэ?",
    steps: [
      { title: "Хэмжих", desc: "Цонхны өргөн, өндрийг хэмжинэ" },
      { title: "Сонгох", desc: "Материал, загварыг сонгоно" },
      { title: "Дүрслэх", desc: "Canvas дээр хэрхэн харагдахыг үзнэ" },
      { title: "Захиалах", desc: "Баталгаажуулж, банкаар шилжүүлнэ" },
    ],
  },
  visualizerCta: {
    eyebrow: "Canvas Visualizer",
    heading: "Цонхоо Дүрслэн Харааарай",
    desc: "Хэмжээгээ оруулаад, хөшиг хэрхэн харагдахыг шууд харна уу.",
    cta: "Дүрслэлийг Нээх",
  },
  testimonials: {
    eyebrow: "Үйлчлүүлэгчдийн Сэтгэгдэл",
    heading: "Тэд бидний тухай юу хэлэв",
  },
  partnersCta: {
    eyebrow: "B2B · Түншлэл",
    heading: "Компани уу? Bulk захиалга авна уу",
    desc: "Олон цонх захиалах, эсвэл манай мэргэжилтнийг урьж хэмжилт хийлгэх боломжтой.",
    cta: "Түншлэлийн Хуудас",
  },
  footer: {
    tagline: "Тансаг Цонхны Хөшиг · Солонгос Материал",
    contact: "Холбоо барих",
    rights: "© 2024 LUXURYBLIND. Бүх эрх хуулиар хамгаалагдсан.",
  },
  configurator: {
    eyebrow: "Хэмжээ Тохируулах",
    width: "Өргөн (см)",
    height: "Өндөр (см)",
    widthMin: "мин 30",
    heightMin: "мин 30",
    price: "Нийт үнэ",
    sqm: "м²",
    delivery: "Хүргэлт + ₮10,000",
    pickup: "Дэлгүүрээс авах — Үнэгүй",
    openBlind: "Нээлттэй",
    closedBlind: "Хаалттай",
    addToOrder: "Захиалгад Нэмэх",
    minSqm: "Хамгийн бага 1 м²",
  },
  checkout: {
    eyebrow: "Захиалга Баталгаажуулах",
    heading: "Таны Захиалга",
    name: "Нэр",
    phone: "Утасны дугаар",
    address: "Хүргэлтийн хаяг",
    notes: "Тэмдэглэл (заавал биш)",
    subtotal: "Дүн",
    deliveryFee: "Хүргэлт",
    total: "Нийт",
    submit: "Захиалга Илгээх",
    paymentTitle: "Төлбөрийн Мэдээлэл",
    paymentInstructions: "Шилжүүлгийн утган дээр захиалгын дугаараа бичнэ үү",
    confirmed: "Захиалга Баталгаажлаа",
    orderRef: "Захиалгын дугаар",
  },
  partners: {
    eyebrow: "Түншлэл / B2B",
    heading: "Компанийн Захиалга",
    bulkTitle: "Bulk Захиалга",
    bulkDesc: "Цонхны жагсаалт оруулж, нийт үнийг тооцоолно",
    visitTitle: "Мэргэжилтэн Дуудах",
    visitDesc: "Манай мэргэжилтэн очиж хэмжилт хийнэ",
    roomName: "Өрөөний нэр",
    productType: "Материал",
    addRow: "Мөр Нэмэх",
    removeRow: "Устгах",
    totalSqm: "Нийт м²",
    estimatedPrice: "Тооцоолсон үнэ",
    quoteRequest: "Үнийн Санал Авах",
    company: "Компанийн нэр",
    preferredDate: "Хүссэн огноо",
    preferredTime: "Хүссэн цаг",
    submit: "Илгээх",
  },
} as const;
```

- [ ] **Step 2: Create `src/lib/translations/en.ts`**

```ts
export const en = {
  nav: {
    home: "Home",
    products: "Products",
    about: "About Us",
    contact: "Contact",
    partners: "Partners / B2B",
    cta: "Get a Quote",
  },
  hero: {
    headline: "Transform Your",
    headlineItalic: "Space",
    tagline: "Premium Window Coverings · Korean Craftsmanship",
    ctaPrimary: "Visualize Your Window",
    ctaSecondary: "View Products",
    badgeDelivery: "Fast Delivery",
    badgeCustom: "Custom Size",
    badgeKorean: "Korean Material",
  },
  benefits: {
    eyebrow: "Why Choose Us",
    korean: "Korean Material",
    koreanDesc: "Premium Korean fabric, wood, and screen materials",
    custom: "Custom Sizing",
    customDesc: "Precision cut to your exact window measurements",
    delivery: "Fast Delivery",
    deliveryDesc: "3–5 business days within Ulaanbaatar",
  },
  featured: {
    eyebrow: "Featured Products",
    heading: "Our Best Blinds",
    viewAll: "View All",
    configure: "Configure",
    perSqm: "m²",
    from: "₮",
  },
  process: {
    eyebrow: "How to Order",
    heading: "Simple Steps",
    steps: [
      { title: "Measure", desc: "Take your window width and height" },
      { title: "Choose", desc: "Select material and style" },
      { title: "Visualize", desc: "See it on canvas before ordering" },
      { title: "Order", desc: "Confirm and transfer payment" },
    ],
  },
  visualizerCta: {
    eyebrow: "Canvas Visualizer",
    heading: "See It Before You Buy",
    desc: "Enter your dimensions and instantly preview how your blind will look.",
    cta: "Open Visualizer",
  },
  testimonials: {
    eyebrow: "Customer Reviews",
    heading: "What Our Clients Say",
  },
  partnersCta: {
    eyebrow: "B2B · Partners",
    heading: "Business? Order in bulk",
    desc: "Submit a multi-window order list or invite our specialist to measure on-site.",
    cta: "Partners Page",
  },
  footer: {
    tagline: "Premium Window Coverings · Korean Craftsmanship",
    contact: "Contact",
    rights: "© 2024 LUXURYBLIND. All rights reserved.",
  },
  configurator: {
    eyebrow: "Size Configurator",
    width: "Width (cm)",
    height: "Height (cm)",
    widthMin: "min 30",
    heightMin: "min 30",
    price: "Total Price",
    sqm: "m²",
    delivery: "Home Delivery + ₮10,000",
    pickup: "Store Pickup — Free",
    openBlind: "Open",
    closedBlind: "Closed",
    addToOrder: "Add to Order",
    minSqm: "Minimum 1 m²",
  },
  checkout: {
    eyebrow: "Confirm Order",
    heading: "Your Order",
    name: "Full Name",
    phone: "Phone Number",
    address: "Delivery Address",
    notes: "Notes (optional)",
    subtotal: "Subtotal",
    deliveryFee: "Delivery",
    total: "Total",
    submit: "Place Order",
    paymentTitle: "Payment Details",
    paymentInstructions: "Include your order number in the transfer description",
    confirmed: "Order Confirmed",
    orderRef: "Order Reference",
  },
  partners: {
    eyebrow: "Partners / B2B",
    heading: "Business Orders",
    bulkTitle: "Bulk Order",
    bulkDesc: "Enter a list of windows and get a total price estimate",
    visitTitle: "Request Site Visit",
    visitDesc: "Our specialist will visit and measure on-site",
    roomName: "Room Name",
    productType: "Material",
    addRow: "Add Row",
    removeRow: "Remove",
    totalSqm: "Total m²",
    estimatedPrice: "Estimated Price",
    quoteRequest: "Request Quote",
    company: "Company Name",
    preferredDate: "Preferred Date",
    preferredTime: "Preferred Time",
    submit: "Submit",
  },
} as const;
```

- [ ] **Step 3: Create `src/lib/translations/index.ts`**

```ts
import { mn } from "./mn";
import { en } from "./en";

export type Language = "mn" | "en";
export type Translations = typeof mn;
export { mn, en };

export const translations: Record<Language, Translations> = { mn, en };
```

- [ ] **Step 4: Create `src/lib/context/language-context.tsx`**

```tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Language } from "@/lib/translations";
import { translations } from "@/lib/translations";

interface LanguageContextValue {
  lang: Language;
  t: (typeof translations)["mn"];
  setLang: (l: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("mn");

  useEffect(() => {
    const saved = localStorage.getItem("lb-lang") as Language | null;
    if (saved === "mn" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("lb-lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be inside LanguageProvider");
  return ctx;
}
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/translations src/lib/context/language-context.tsx
git commit -m "feat: translations (MN/EN) and language context"
```

---

## Task 3: Order Context & Price Utils

**Files:**
- Create: `src/lib/context/order-context.tsx`
- Create: `src/lib/utils/price.ts`

- [ ] **Step 1: Create `src/lib/utils/price.ts`**

```ts
export function calcSqm(widthCm: number, heightCm: number): number {
  return (widthCm / 100) * (heightCm / 100);
}

export function calcPrice(widthCm: number, heightCm: number, pricePerSqm: number): number {
  const sqm = Math.max(1, Math.ceil(calcSqm(widthCm, heightCm)));
  return sqm * pricePerSqm;
}

export function formatPrice(amount: number): string {
  return amount.toLocaleString("mn-MN");
}

export function generateOrderRef(): string {
  const date = new Date();
  const dateStr = date.getFullYear().toString() +
    String(date.getMonth() + 1).padStart(2, "0") +
    String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `LB-${dateStr}-${rand}`;
}
```

- [ ] **Step 2: Create `src/lib/context/order-context.tsx`**

```tsx
"use client";

import { createContext, useContext, useReducer, useEffect } from "react";

export interface OrderItem {
  productId: string;
  productTitle: string;
  widthCm: number;
  heightCm: number;
  pricePerSqm: number;
  totalPrice: number;
  delivery: "delivery" | "pickup";
}

interface OrderState {
  items: OrderItem[];
}

type OrderAction =
  | { type: "ADD_ITEM"; item: OrderItem }
  | { type: "CLEAR" };

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "ADD_ITEM":
      return { items: [...state.items, action.item] };
    case "CLEAR":
      return { items: [] };
  }
}

interface OrderContextValue {
  state: OrderState;
  addItem: (item: OrderItem) => void;
  clear: () => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, { items: [] });

  useEffect(() => {
    const saved = localStorage.getItem("lb-order");
    if (saved) {
      const parsed = JSON.parse(saved) as OrderState;
      parsed.items.forEach((item) => dispatch({ type: "ADD_ITEM", item }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lb-order", JSON.stringify(state));
  }, [state]);

  const addItem = (item: OrderItem) => dispatch({ type: "ADD_ITEM", item });
  const clear = () => dispatch({ type: "CLEAR" });

  return (
    <OrderContext.Provider value={{ state, addItem, clear }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be inside OrderProvider");
  return ctx;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/context/order-context.tsx src/lib/utils/price.ts
git commit -m "feat: order context and price utilities"
```

---

## Task 4: Shared UI Components

**Files:**
- Create: `src/components/ui/korean-badge.tsx`
- Create: `src/components/ui/price-display.tsx`
- Create: `src/components/ui/eyebrow.tsx`

- [ ] **Step 1: Create `src/components/ui/korean-badge.tsx`**

```tsx
interface KoreanBadgeProps {
  className?: string;
}

export function KoreanBadge({ className = "" }: KoreanBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 border border-lb-gold/40 text-[10px] font-sans font-medium tracking-widest uppercase text-lb-gold ${className}`}>
      🇰🇷 <span>Солонгос Материал · Korean Craftsmanship</span>
    </span>
  );
}
```

- [ ] **Step 2: Create `src/components/ui/price-display.tsx`**

```tsx
import { formatPrice } from "@/lib/utils/price";

interface PriceDisplayProps {
  amount: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showCurrency?: boolean;
}

const sizeMap = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

export function PriceDisplay({ amount, size = "md", className = "", showCurrency = true }: PriceDisplayProps) {
  return (
    <span className={`font-numbers text-lb-gold ${sizeMap[size]} ${className}`}>
      {showCurrency && "₮"}{formatPrice(amount)}
    </span>
  );
}
```

- [ ] **Step 3: Create `src/components/ui/eyebrow.tsx`**

```tsx
interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p className={`eyebrow ${className}`}>{children}</p>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/korean-badge.tsx src/components/ui/price-display.tsx src/components/ui/eyebrow.tsx
git commit -m "feat: shared UI components (KoreanBadge, PriceDisplay, Eyebrow)"
```

---

## Task 5: Header Rebuild

**Files:**
- Modify: `src/components/sections/header/views/header-view.tsx`

- [ ] **Step 1: Rewrite header**

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { lang, t, setLang } = useLanguage();

  const navItems = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.products, path: "/products" },
    { label: t.nav.partners, path: "/partners" },
    { label: t.nav.about, path: "/about" },
    { label: t.nav.contact, path: "/contact" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-lb-bg/95 backdrop-blur-sm border-b border-lb-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="font-display font-semibold text-lg tracking-[0.2em] text-lb-ivory uppercase">
            LUXURYBLIND
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`font-sans font-medium text-sm tracking-wide transition-colors ${
                  pathname === item.path ? "text-lb-ivory" : "text-lb-ash hover:text-lb-ivory"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Lang + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setLang(lang === "mn" ? "en" : "mn")}
              className="font-sans font-medium text-xs tracking-widest uppercase text-lb-ash hover:text-lb-ivory transition-colors px-2 py-1 border border-lb-border rounded-sm"
            >
              {lang === "mn" ? "EN" : "МН"}
            </button>
            <Link
              href="/products"
              className="px-4 py-2 bg-lb-gold text-lb-bg font-sans font-bold text-xs tracking-widest uppercase hover:bg-lb-gold-lt transition-colors"
            >
              {t.nav.cta}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-lb-ash hover:text-lb-ivory min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-lb-surface border-t border-lb-border overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className={`block font-sans font-medium text-sm py-2 transition-colors min-h-[44px] flex items-center ${
                    pathname === item.path ? "text-lb-ivory" : "text-lb-ash"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-4 border-t border-lb-border">
                <button
                  onClick={() => { setLang(lang === "mn" ? "en" : "mn"); setOpen(false); }}
                  className="font-sans font-medium text-xs tracking-widest uppercase text-lb-ash px-3 py-2 border border-lb-border min-h-[44px]"
                >
                  {lang === "mn" ? "EN" : "МН"}
                </button>
                <Link
                  href="/products"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center px-4 py-2 bg-lb-gold text-lb-bg font-sans font-bold text-xs tracking-widest uppercase min-h-[44px] flex items-center justify-center"
                >
                  {t.nav.cta}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/header/views/header-view.tsx
git commit -m "feat: header rebrand — dark, gold CTA, language toggle"
```

---

## Task 6: Footer

**Files:**
- Create: `src/components/sections/footer/footer.tsx`

- [ ] **Step 1: Create footer**

```tsx
import Link from "next/link";
import { KoreanBadge } from "@/components/ui/korean-badge";

export default function Footer() {
  return (
    <footer className="bg-lb-surface border-t border-lb-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display font-semibold text-lg tracking-[0.2em] text-lb-ivory uppercase mb-3">
              LUXURYBLIND
            </p>
            <p className="font-sans font-light text-sm text-lb-ash mb-4 leading-relaxed">
              Тансаг Цонхны Хөшиг · Солонгос Материал
            </p>
            <KoreanBadge />
          </div>

          {/* Nav */}
          <div>
            <p className="eyebrow mb-4">Цэс</p>
            <ul className="space-y-3">
              {[
                { label: "Нүүр хуудас", path: "/" },
                { label: "Бүтээгдэхүүн", path: "/products" },
                { label: "Бидний тухай", path: "/about" },
                { label: "Холбоо барих", path: "/contact" },
                { label: "Түншлэл / B2B", path: "/partners" },
              ].map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="font-sans font-light text-sm text-lb-ash hover:text-lb-ivory transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow mb-4">Холбоо барих</p>
            <ul className="space-y-3 font-sans font-light text-sm text-lb-ash">
              <li>Улаанбаатар, Монгол</li>
              <li>+976 9900 0000</li>
              <li>info@luxuryblind.mn</li>
            </ul>
          </div>

          {/* Language */}
          <div>
            <p className="eyebrow mb-4">Хэл</p>
            <div className="flex gap-2">
              <span className="font-sans font-medium text-xs tracking-widest uppercase text-lb-gold px-3 py-1.5 border border-lb-gold">МН</span>
              <span className="font-sans font-medium text-xs tracking-widest uppercase text-lb-ash px-3 py-1.5 border border-lb-border">EN</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-lb-border text-center">
          <p className="font-sans font-light text-xs text-lb-ash">
            © 2024 LUXURYBLIND. Бүх эрх хуулиар хамгаалагдсан.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/footer/footer.tsx
git commit -m "feat: footer with brand, nav, contact, language"
```

---

## Task 7: Home Page — Hero & Benefits

**Files:**
- Modify: `src/components/sections/home/home-screen-hero.tsx`
- Modify: `src/components/sections/home/home-screen-benefits.tsx`

- [ ] **Step 1: Rewrite hero**

```tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { KoreanBadge } from "@/components/ui/korean-badge";
import { useLanguage } from "@/lib/context/language-context";

export default function HomeScreenHero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center bg-lb-bg overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-lb-bg via-lb-surface to-lb-bg opacity-80" />

      {/* Decorative vertical lines */}
      <div className="absolute inset-y-0 left-1/4 w-px bg-lb-border/40 hidden lg:block" />
      <div className="absolute inset-y-0 right-1/4 w-px bg-lb-border/40 hidden lg:block" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <KoreanBadge />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-light text-[2rem] sm:text-[3rem] lg:text-[4rem] leading-tight text-lb-ivory mb-4"
          >
            {t.hero.headline}{" "}
            <em className="italic text-lb-gold-lt not-italic font-light" style={{ fontStyle: "italic" }}>
              {t.hero.headlineItalic}
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans font-light text-base sm:text-lg text-lb-ash mb-8 max-w-xl"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 bg-lb-gold text-lb-bg font-sans font-bold text-sm tracking-widest uppercase hover:bg-lb-gold-lt transition-colors min-h-[48px]"
            >
              {t.hero.ctaPrimary}
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-lb-border text-lb-ash font-sans font-medium text-sm tracking-widest uppercase hover:border-lb-gold hover:text-lb-ivory transition-colors min-h-[48px]"
            >
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>

          {/* Badges row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {[t.hero.badgeKorean, t.hero.badgeCustom, t.hero.badgeDelivery].map((badge) => (
              <span key={badge} className="px-3 py-1 border border-lb-border font-sans font-light text-xs text-lb-ash tracking-wide">
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite benefits**

```tsx
"use client";

import { motion } from "motion/react";
import { Layers, Ruler, Truck } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { Eyebrow } from "@/components/ui/eyebrow";

const icons = [Layers, Ruler, Truck];

export default function HomeScreenBenefits() {
  const { t } = useLanguage();

  const items = [
    { icon: icons[0], title: t.benefits.korean, desc: t.benefits.koreanDesc },
    { icon: icons[1], title: t.benefits.custom, desc: t.benefits.customDesc },
    { icon: icons[2], title: t.benefits.delivery, desc: t.benefits.deliveryDesc },
  ];

  return (
    <section className="bg-lb-surface border-y border-lb-border py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 hidden sm:block">
          <Eyebrow>{t.benefits.eyebrow}</Eyebrow>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-6"
            >
              <item.icon size={24} className="text-lb-gold mb-4 stroke-[1.5]" />
              <p className="font-display font-semibold text-base text-lb-ivory mb-2">{item.title}</p>
              <p className="font-sans font-light text-sm text-lb-ash leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/home/home-screen-hero.tsx src/components/sections/home/home-screen-benefits.tsx
git commit -m "feat: home hero and benefits rebrand"
```

---

## Task 8: Home Page — Featured, Process, Testimonials, CTAs

**Files:**
- Modify: `src/components/sections/home/home-screen-featured.tsx`
- Modify: `src/components/sections/home/home-screen-process.tsx`
- Modify: `src/components/sections/home/home-screen-testimonials.tsx`
- Modify: `src/components/sections/home/home-screen-cta.tsx`
- Create: `src/components/sections/home/home-screen-partners-cta.tsx`
- Modify: `src/components/sections/home/views/home-screen-view.tsx`

- [ ] **Step 1: Rewrite featured products section**

```tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import products from "@/data/product.json";
import { PriceDisplay } from "@/components/ui/price-display";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useLanguage } from "@/lib/context/language-context";
import { KoreanBadge } from "@/components/ui/korean-badge";

export default function HomeScreenFeatured() {
  const { t } = useLanguage();
  const featured = products.slice(0, 3);

  return (
    <section className="bg-lb-bg py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 lg:mb-14 gap-4">
          <div>
            <Eyebrow className="mb-3">{t.featured.eyebrow}</Eyebrow>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl text-lb-ivory">{t.featured.heading}</h2>
          </div>
          <Link href="/products" className="font-sans font-medium text-sm text-lb-gold tracking-wide hover:text-lb-gold-lt transition-colors">
            {t.featured.viewAll} →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-lb-card border border-lb-border hover:border-lb-gold/40 transition-colors"
            >
              <div className="aspect-[4/3] overflow-hidden bg-lb-surface relative">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-semibold text-base text-lb-ivory leading-snug">{product.title}</h3>
                </div>
                <p className="font-sans font-light text-xs text-lb-ash mb-4 leading-relaxed line-clamp-2">{product.description.slice(0, 80)}...</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-sans font-light text-[10px] text-lb-ash uppercase tracking-widest mb-0.5">{t.featured.perSqm}</p>
                    <PriceDisplay amount={(product as any).pricePerSqm ?? 120000} size="md" />
                  </div>
                  <Link
                    href={`/products/${product.id}`}
                    className="px-4 py-2 border border-lb-gold text-lb-gold font-sans font-bold text-xs tracking-widest uppercase hover:bg-lb-gold hover:text-lb-bg transition-colors min-h-[44px] flex items-center"
                  >
                    {t.featured.configure}
                  </Link>
                </div>
                <div className="mt-3 pt-3 border-t border-lb-border">
                  <KoreanBadge className="text-[9px]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite process section**

```tsx
"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/lib/context/language-context";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function HomeScreenProcess() {
  const { t } = useLanguage();

  return (
    <section className="bg-lb-surface border-y border-lb-border py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <Eyebrow className="mb-3">{t.process.eyebrow}</Eyebrow>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-lb-ivory">{t.process.heading}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {t.process.steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="flex items-start gap-4">
                <span className="font-numbers text-3xl font-light text-lb-gold/30 leading-none w-10 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display font-semibold text-base text-lb-ivory mb-1">{step.title}</p>
                  <p className="font-sans font-light text-sm text-lb-ash leading-relaxed">{step.desc}</p>
                </div>
              </div>
              {i < t.process.steps.length - 1 && (
                <div className="hidden lg:block absolute top-4 left-full w-full h-px bg-lb-border -translate-x-4 translate-y-0" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Rewrite visualizer CTA (home-screen-cta.tsx)**

```tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/language-context";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function HomeScreenCta() {
  const { t } = useLanguage();

  return (
    <section className="bg-lb-bg py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-lb-border bg-lb-surface p-8 sm:p-12 lg:p-16 text-center"
        >
          <Eyebrow className="mb-4">{t.visualizerCta.eyebrow}</Eyebrow>
          <h2 className="font-display font-light text-2xl sm:text-3xl lg:text-4xl text-lb-ivory mb-4">
            {t.visualizerCta.heading}
          </h2>
          <p className="font-sans font-light text-sm sm:text-base text-lb-ash max-w-xl mx-auto mb-8">
            {t.visualizerCta.desc}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-3 bg-lb-gold text-lb-bg font-sans font-bold text-sm tracking-widest uppercase hover:bg-lb-gold-lt transition-colors min-h-[48px]"
          >
            {t.visualizerCta.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Rewrite testimonials**

```tsx
"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/lib/context/language-context";
import { Eyebrow } from "@/components/ui/eyebrow";

const testimonials = [
  {
    quote: "Солонгос материалын чанар үнэхээр гайхалтай. Цонхны хэмжээнд яг тохирч ирсэн.",
    author: "Б. Оюунтулга",
    role: "Гэрийн эзэгтэй, Улаанбаатар",
  },
  {
    quote: "Canvas дээр дүрслэн харсны дараа захиалахад маш хялбар байсан. Өнгө, хэмжээ нь яг таарч ирсэн.",
    author: "Г. Батбаяр",
    role: "Архитектор",
  },
  {
    quote: "Оффисдоо 12 цонх захиалсан. Bulk захиалгын хуудас маш хялбар, хурдан хариу ирлээ.",
    author: "Д. Энхзаяа",
    role: "Компанийн захирал",
  },
];

export default function HomeScreenTestimonials() {
  const { t } = useLanguage();

  return (
    <section className="bg-lb-surface border-y border-lb-border py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Eyebrow className="mb-3">{t.testimonials.eyebrow}</Eyebrow>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-lb-ivory">{t.testimonials.heading}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-lb-card border border-lb-border p-6 lg:p-8"
            >
              <p className="font-sans font-light text-sm text-lb-ash leading-relaxed mb-6">"{item.quote}"</p>
              <div className="border-t border-lb-border pt-4">
                <p className="font-display font-semibold text-sm text-lb-ivory">{item.author}</p>
                <p className="font-sans font-light text-xs text-lb-ash mt-0.5">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create partners CTA strip**

Create `src/components/sections/home/home-screen-partners-cta.tsx`:

```tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage } from "@/lib/context/language-context";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function HomeScreenPartnersCta() {
  const { t } = useLanguage();

  return (
    <section className="bg-lb-bg py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 py-8 px-8 border border-lb-border"
        >
          <div>
            <Eyebrow className="mb-2">{t.partnersCta.eyebrow}</Eyebrow>
            <h3 className="font-display font-semibold text-xl text-lb-ivory mb-2">{t.partnersCta.heading}</h3>
            <p className="font-sans font-light text-sm text-lb-ash max-w-md">{t.partnersCta.desc}</p>
          </div>
          <Link
            href="/partners"
            className="flex-shrink-0 px-6 py-3 border border-lb-gold text-lb-gold font-sans font-bold text-xs tracking-widest uppercase hover:bg-lb-gold hover:text-lb-bg transition-colors min-h-[48px] flex items-center justify-center"
          >
            {t.partnersCta.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Update home-screen-view.tsx**

```tsx
import HomeScreenHero from "../home-screen-hero";
import HomeScreenBenefits from "../home-screen-benefits";
import HomeScreenFeatured from "../home-screen-featured";
import HomeScreenProcess from "../home-screen-process";
import HomeScreenTestimonials from "../home-screen-testimonials";
import HomeScreenCta from "../home-screen-cta";
import HomeScreenPartnersCta from "../home-screen-partners-cta";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-lb-bg">
      <HomeScreenHero />
      <HomeScreenBenefits />
      <HomeScreenFeatured />
      <HomeScreenProcess />
      <HomeScreenCta />
      <HomeScreenTestimonials />
      <HomeScreenPartnersCta />
    </main>
  );
}
```

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/home/
git commit -m "feat: home page full rebrand — featured, process, testimonials, CTAs"
```

---

## Task 9: Product Data & Products Page

**Files:**
- Modify: `src/data/product.json`
- Modify: `src/components/sections/product/product-grid.tsx`
- Modify: `src/components/sections/product/view/product-screen-view.tsx`

- [ ] **Step 1: Add pricePerSqm to product.json**

Add `"pricePerSqm": 120000` after each product's `"images"` array. Use these values:
- `wood-blind`: `"pricePerSqm": 145000`
- `roll-screen-blind`: `"pricePerSqm": 98000`
- `kombi-blind`: `"pricePerSqm": 130000`
- any other products: `"pricePerSqm": 110000`

- [ ] **Step 2: Rewrite product-grid.tsx**

```tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { PriceDisplay } from "@/components/ui/price-display";
import { KoreanBadge } from "@/components/ui/korean-badge";
import { useLanguage } from "@/lib/context/language-context";

interface Product {
  id: string;
  title: string;
  description: string;
  material: string;
  images: string[];
  pricePerSqm: number;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="group bg-lb-card border border-lb-border hover:border-lb-gold/40 transition-colors"
        >
          <div className="aspect-[4/3] relative overflow-hidden bg-lb-surface">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-5">
            <h3 className="font-display font-semibold text-base text-lb-ivory mb-1 leading-snug">{product.title}</h3>
            <p className="font-sans font-light text-xs text-lb-ash mb-1">{product.material}</p>
            <div className="flex items-end justify-between mt-4">
              <div>
                <p className="font-sans font-light text-[10px] text-lb-ash uppercase tracking-widest mb-0.5">/ {t.featured.perSqm}</p>
                <PriceDisplay amount={product.pricePerSqm} size="md" />
              </div>
              <Link
                href={`/products/${product.id}`}
                className="px-4 py-2 bg-lb-gold text-lb-bg font-sans font-bold text-xs tracking-widest uppercase hover:bg-lb-gold-lt transition-colors min-h-[44px] flex items-center"
              >
                {t.featured.configure}
              </Link>
            </div>
            <div className="mt-3 pt-3 border-t border-lb-border">
              <KoreanBadge className="text-[9px]" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Rewrite product-screen-view.tsx**

```tsx
import products from "@/data/product.json";
import ProductGrid from "../product-grid";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function ProductScreenView() {
  return (
    <main className="min-h-screen bg-lb-bg py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 lg:mb-14">
          <Eyebrow className="mb-3">Каталог</Eyebrow>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-lb-ivory">Бүтээгдэхүүн</h1>
        </div>
        <ProductGrid products={products as any} />
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/data/product.json src/components/sections/product/product-grid.tsx src/components/sections/product/view/product-screen-view.tsx
git commit -m "feat: product data + products page rebrand"
```

---

## Task 10: Window Canvas Visualizer

**Files:**
- Create: `src/components/sections/product/window-canvas.tsx`

- [ ] **Step 1: Create window canvas component**

```tsx
"use client";

import { useRef, useEffect } from "react";

interface WindowCanvasProps {
  widthCm: number;
  heightCm: number;
  slatColor: string;
  isOpen: boolean;
}

export default function WindowCanvas({ widthCm, heightCm, slatColor, isOpen }: WindowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(0, 0, W, H);

    // Calculate frame dimensions (proportional to canvas, maintain aspect ratio)
    const aspectRatio = widthCm > 0 && heightCm > 0 ? widthCm / heightCm : 1;
    const frameMarginX = W * 0.12;
    const frameMarginY = H * 0.1;
    const maxFrameW = W - frameMarginX * 2;
    const maxFrameH = H - frameMarginY * 2;

    let frameW = maxFrameW;
    let frameH = frameW / aspectRatio;
    if (frameH > maxFrameH) {
      frameH = maxFrameH;
      frameW = frameH * aspectRatio;
    }

    const frameX = (W - frameW) / 2;
    const frameY = (H - frameH) / 2;

    // Window frame (gold border)
    ctx.strokeStyle = "#C9A96E";
    ctx.lineWidth = 2;
    ctx.strokeRect(frameX, frameY, frameW, frameH);

    // Window frame inner detail
    ctx.strokeStyle = "#2A2A2A";
    ctx.lineWidth = 1;
    ctx.strokeRect(frameX + 6, frameY + 6, frameW - 12, frameH - 12);

    // Blind slats
    const blindPad = 8;
    const blindX = frameX + blindPad;
    const blindY = frameY + blindPad;
    const blindW = frameW - blindPad * 2;
    const blindH = frameH - blindPad * 2;

    // Number of slats scales with height
    const slatCount = Math.max(6, Math.min(30, Math.round(heightCm / 8)));
    const slatH = blindH / slatCount;

    ctx.save();
    ctx.beginPath();
    ctx.rect(blindX, blindY, blindW, blindH);
    ctx.clip();

    for (let i = 0; i < slatCount; i++) {
      const y = blindY + i * slatH;

      if (isOpen) {
        // Open: thin lines (slats at 45° angle — drawn as thin horizontal bands with gap)
        ctx.fillStyle = slatColor;
        ctx.globalAlpha = 0.6 + (i % 2) * 0.1;
        const slatThickness = slatH * 0.3;
        ctx.fillRect(blindX, y, blindW, slatThickness);
      } else {
        // Closed: full-width slats
        ctx.fillStyle = slatColor;
        ctx.globalAlpha = i % 2 === 0 ? 1 : 0.85;
        ctx.fillRect(blindX, y, blindW, slatH - 1);
      }
    }

    ctx.restore();
    ctx.globalAlpha = 1;

    // Dimension label
    if (widthCm > 0 && heightCm > 0) {
      ctx.fillStyle = "#C9A96E";
      ctx.font = "12px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText(`${widthCm} × ${heightCm} см`, W / 2, H - 8);
    }

  }, [widthCm, heightCm, slatColor, isOpen]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={400}
      className="w-full max-w-full border border-lb-border bg-lb-bg"
      style={{ aspectRatio: "5/4" }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/product/window-canvas.tsx
git commit -m "feat: window canvas visualizer component"
```

---

## Task 11: Product Configurator

**Files:**
- Create: `src/components/sections/product/product-configurator.tsx`
- Modify: `src/components/sections/product/view/product-detail-screen.tsx`

- [ ] **Step 1: Create product-configurator.tsx**

```tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import WindowCanvas from "./window-canvas";
import { PriceDisplay } from "@/components/ui/price-display";
import { Eyebrow } from "@/components/ui/eyebrow";
import { calcPrice } from "@/lib/utils/price";
import { useOrder } from "@/lib/context/order-context";
import { useLanguage } from "@/lib/context/language-context";

interface Product {
  id: string;
  title: string;
  pricePerSqm: number;
  dimensions: { wide: string };
}

interface ProductConfiguratorProps {
  product: Product;
  slatColor?: string;
}

export default function ProductConfigurator({ product, slatColor = "#8B7355" }: ProductConfiguratorProps) {
  const { t } = useLanguage();
  const { addItem } = useOrder();
  const router = useRouter();

  const maxWidth = parseInt(product.dimensions.wide) || 300;

  const [width, setWidth] = useState(120);
  const [height, setHeight] = useState(150);
  const [delivery, setDelivery] = useState<"delivery" | "pickup">("delivery");
  const [isOpen, setIsOpen] = useState(false);

  const price = useMemo(() => calcPrice(width, height, product.pricePerSqm), [width, height, product.pricePerSqm]);
  const deliveryFee = delivery === "delivery" ? 10000 : 0;
  const total = price + deliveryFee;

  const handleAddToOrder = () => {
    addItem({
      productId: product.id,
      productTitle: product.title,
      widthCm: width,
      heightCm: height,
      pricePerSqm: product.pricePerSqm,
      totalPrice: price,
      delivery,
    });
    router.push("/checkout");
  };

  return (
    <div className="space-y-8">
      {/* Canvas */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Eyebrow>{t.configurator.eyebrow}</Eyebrow>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="font-sans font-medium text-xs tracking-widest uppercase text-lb-ash hover:text-lb-ivory transition-colors px-3 py-1.5 border border-lb-border min-h-[36px]"
          >
            {isOpen ? t.configurator.openBlind : t.configurator.closedBlind}
          </button>
        </div>
        <WindowCanvas widthCm={width} heightCm={height} slatColor={slatColor} isOpen={isOpen} />
      </div>

      {/* Size inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="eyebrow block mb-2">{t.configurator.width}</label>
          <input
            type="number"
            min={30}
            max={maxWidth}
            value={width}
            onChange={(e) => setWidth(Math.min(maxWidth, Math.max(30, Number(e.target.value))))}
            className="w-full bg-lb-card border border-lb-border text-lb-ivory font-numbers text-lg px-3 py-2 focus:outline-none focus:border-lb-gold min-h-[44px]"
          />
          <p className="font-sans text-[10px] text-lb-ash mt-1">{t.configurator.widthMin} / max {maxWidth}</p>
        </div>
        <div>
          <label className="eyebrow block mb-2">{t.configurator.height}</label>
          <input
            type="number"
            min={30}
            max={300}
            value={height}
            onChange={(e) => setHeight(Math.min(300, Math.max(30, Number(e.target.value))))}
            className="w-full bg-lb-card border border-lb-border text-lb-ivory font-numbers text-lg px-3 py-2 focus:outline-none focus:border-lb-gold min-h-[44px]"
          />
          <p className="font-sans text-[10px] text-lb-ash mt-1">{t.configurator.heightMin} / max 300</p>
        </div>
      </div>

      {/* Delivery toggle */}
      <div className="space-y-2">
        {(["delivery", "pickup"] as const).map((option) => (
          <label key={option} className="flex items-center gap-3 cursor-pointer min-h-[44px] group">
            <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
              delivery === option ? "border-lb-gold" : "border-lb-border"
            }`}>
              {delivery === option && <span className="w-2 h-2 rounded-full bg-lb-gold" />}
            </span>
            <input
              type="radio"
              name="delivery"
              value={option}
              checked={delivery === option}
              onChange={() => setDelivery(option)}
              className="sr-only"
            />
            <span className="font-sans font-light text-sm text-lb-ash group-hover:text-lb-ivory transition-colors">
              {option === "delivery" ? t.configurator.delivery : t.configurator.pickup}
            </span>
          </label>
        ))}
      </div>

      {/* Price summary */}
      <div className="border border-lb-border bg-lb-card p-5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-sans font-light text-sm text-lb-ash">{t.configurator.price}</span>
          <PriceDisplay amount={price} size="sm" />
        </div>
        {deliveryFee > 0 && (
          <div className="flex items-center justify-between">
            <span className="font-sans font-light text-sm text-lb-ash">Хүргэлт</span>
            <PriceDisplay amount={deliveryFee} size="sm" />
          </div>
        )}
        <div className="pt-2 border-t border-lb-border flex items-center justify-between">
          <span className="font-sans font-medium text-sm text-lb-ivory">Нийт</span>
          <PriceDisplay amount={total} size="lg" />
        </div>
        <p className="font-sans text-[10px] text-lb-ash">{t.configurator.minSqm}</p>
      </div>

      <button
        onClick={handleAddToOrder}
        className="w-full py-4 bg-lb-gold text-lb-bg font-sans font-bold text-sm tracking-widest uppercase hover:bg-lb-gold-lt transition-colors min-h-[52px]"
      >
        {t.configurator.addToOrder}
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Update product-detail-screen.tsx**

Read the current file first to see its structure, then replace with:

```tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { KoreanBadge } from "@/components/ui/korean-badge";
import { PriceDisplay } from "@/components/ui/price-display";
import ProductConfigurator from "../product-configurator";

interface Product {
  id: string;
  title: string;
  description: string;
  features: string[];
  material: string;
  dimensions: { wide: string; thickness: string };
  images: string[];
  pricePerSqm: number;
}

interface ProductDetailScreenProps {
  product: Product;
}

// Rough color mapping from material to slat color
const SLAT_COLORS: Record<string, string> = {
  "Мод 100%": "#8B7355",
  "Polyester 100%": "#6B7280",
  default: "#7C6B54",
};

export default function ProductDetailScreen({ product }: ProductDetailScreenProps) {
  const [activeImage, setActiveImage] = useState(0);
  const slatColor = SLAT_COLORS[product.material] ?? SLAT_COLORS.default;

  return (
    <main className="min-h-screen bg-lb-bg py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] relative overflow-hidden bg-lb-surface border border-lb-border">
              <Image
                src={product.images[activeImage]}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-[4/3] relative overflow-hidden border transition-colors ${
                    activeImage === i ? "border-lb-gold" : "border-lb-border hover:border-lb-gold/50"
                  }`}
                >
                  <Image src={img} alt={`${product.title} ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info + Configurator */}
          <div className="space-y-8">
            <div>
              <Eyebrow className="mb-3">Бүтээгдэхүүн</Eyebrow>
              <h1 className="font-display font-semibold text-2xl sm:text-3xl text-lb-ivory mb-3">{product.title}</h1>
              <div className="flex items-baseline gap-2 mb-4">
                <PriceDisplay amount={product.pricePerSqm} size="lg" />
                <span className="font-sans font-light text-sm text-lb-ash">/ м²</span>
              </div>
              <KoreanBadge className="mb-4" />
              <p className="font-sans font-light text-sm text-lb-ash leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <p className="eyebrow mb-3">Онцлог</p>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 font-sans font-light text-sm text-lb-ash">
                    <span className="text-lb-gold mt-0.5 flex-shrink-0">—</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Material + Dimensions */}
            <div className="grid grid-cols-2 gap-4 border border-lb-border p-4">
              <div>
                <p className="eyebrow mb-1">Материал</p>
                <p className="font-sans font-light text-sm text-lb-ash">{product.material}</p>
              </div>
              <div>
                <p className="eyebrow mb-1">Хэмжээ</p>
                <p className="font-numbers text-sm text-lb-ash">{product.dimensions.wide}</p>
              </div>
            </div>

            {/* Configurator */}
            <ProductConfigurator product={product} slatColor={slatColor} />
          </div>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/product/product-configurator.tsx src/components/sections/product/view/product-detail-screen.tsx
git commit -m "feat: product configurator + canvas on product detail page"
```

---

## Task 12: Checkout Page

**Files:**
- Create: `src/app/checkout/page.tsx`
- Create: `src/components/sections/checkout/checkout-form.tsx`
- Create: `src/components/sections/checkout/order-summary.tsx`
- Create: `src/components/sections/checkout/payment-instructions.tsx`

- [ ] **Step 1: Create payment-instructions.tsx**

```tsx
"use client";

import { useLanguage } from "@/lib/context/language-context";

interface PaymentInstructionsProps {
  orderRef: string;
}

export function PaymentInstructions({ orderRef }: PaymentInstructionsProps) {
  const { t } = useLanguage();

  return (
    <div className="border border-lb-gold/40 bg-lb-card p-6 space-y-4">
      <h3 className="font-display font-semibold text-lg text-lb-ivory">{t.checkout.paymentTitle}</h3>
      <div className="space-y-2 font-sans font-light text-sm text-lb-ash">
        <p>Банк: <span className="text-lb-ivory">Хаан Банк</span></p>
        <p>Дансны дугаар: <span className="font-numbers text-lb-ivory">5034 1234 56</span></p>
        <p>Хүлээн авагч: <span className="text-lb-ivory">LUXURY BLIND LLC</span></p>
      </div>
      <div className="border-t border-lb-border pt-4">
        <p className="font-sans font-light text-sm text-lb-ash mb-2">{t.checkout.paymentInstructions}</p>
        <div className="bg-lb-surface border border-lb-border px-4 py-3 flex items-center justify-between">
          <span className="font-numbers text-lg text-lb-gold tracking-widest">{orderRef}</span>
          <span className="eyebrow">{t.checkout.orderRef}</span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create order-summary.tsx**

```tsx
"use client";

import { PriceDisplay } from "@/components/ui/price-display";
import { useOrder } from "@/lib/context/order-context";
import { useLanguage } from "@/lib/context/language-context";

export function OrderSummary() {
  const { state } = useOrder();
  const { t } = useLanguage();

  const subtotal = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = state.items.some((i) => i.delivery === "delivery") ? 10000 : 0;
  const total = subtotal + deliveryFee;

  if (state.items.length === 0) {
    return <p className="font-sans font-light text-sm text-lb-ash">Захиалга хоосон байна.</p>;
  }

  return (
    <div className="bg-lb-card border border-lb-border">
      <div className="p-5 border-b border-lb-border">
        <p className="eyebrow">{t.checkout.heading}</p>
      </div>
      <div className="divide-y divide-lb-border">
        {state.items.map((item, i) => (
          <div key={i} className="p-5 space-y-1">
            <p className="font-display font-semibold text-sm text-lb-ivory">{item.productTitle}</p>
            <p className="font-numbers text-sm text-lb-ash">
              {item.widthCm} × {item.heightCm} см
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-sans font-light text-xs text-lb-ash">
                {item.delivery === "delivery" ? "Хүргэлт" : "Дэлгүүрээс авах"}
              </span>
              <PriceDisplay amount={item.totalPrice} size="sm" />
            </div>
          </div>
        ))}
      </div>
      <div className="p-5 border-t border-lb-border space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-sans font-light text-sm text-lb-ash">{t.checkout.subtotal}</span>
          <PriceDisplay amount={subtotal} size="sm" />
        </div>
        {deliveryFee > 0 && (
          <div className="flex items-center justify-between">
            <span className="font-sans font-light text-sm text-lb-ash">{t.checkout.deliveryFee}</span>
            <PriceDisplay amount={deliveryFee} size="sm" />
          </div>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-lb-border">
          <span className="font-sans font-semibold text-sm text-lb-ivory">{t.checkout.total}</span>
          <PriceDisplay amount={total} size="lg" />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create checkout-form.tsx**

```tsx
"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/context/language-context";
import { useOrder } from "@/lib/context/order-context";
import { generateOrderRef } from "@/lib/utils/price";
import { OrderSummary } from "./order-summary";
import { PaymentInstructions } from "./payment-instructions";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function CheckoutForm() {
  const { t } = useLanguage();
  const { state, clear } = useOrder();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [orderRef] = useState(generateOrderRef);

  const hasDelivery = state.items.some((i) => i.delivery === "delivery");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clear();
  };

  if (submitted) {
    return (
      <div className="text-center py-16 space-y-6">
        <div className="w-16 h-16 mx-auto border-2 border-lb-gold flex items-center justify-center">
          <span className="text-lb-gold text-2xl">✓</span>
        </div>
        <h2 className="font-display font-semibold text-2xl text-lb-ivory">{t.checkout.confirmed}</h2>
        <PaymentInstructions orderRef={orderRef} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
      <div>
        <Eyebrow className="mb-3">{t.checkout.eyebrow}</Eyebrow>
        <h1 className="font-display font-semibold text-2xl sm:text-3xl text-lb-ivory mb-8">{t.checkout.heading}</h1>
        <OrderSummary />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="eyebrow block mb-2">{t.checkout.name}</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-lb-card border border-lb-border text-lb-ivory font-sans font-light text-sm px-4 py-3 focus:outline-none focus:border-lb-gold min-h-[48px]"
          />
        </div>
        <div>
          <label className="eyebrow block mb-2">{t.checkout.phone}</label>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-lb-card border border-lb-border text-lb-ivory font-sans font-light text-sm px-4 py-3 focus:outline-none focus:border-lb-gold min-h-[48px]"
          />
        </div>
        {hasDelivery && (
          <div>
            <label className="eyebrow block mb-2">{t.checkout.address}</label>
            <input
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-lb-card border border-lb-border text-lb-ivory font-sans font-light text-sm px-4 py-3 focus:outline-none focus:border-lb-gold min-h-[48px]"
            />
          </div>
        )}
        <div>
          <label className="eyebrow block mb-2">{t.checkout.notes}</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full bg-lb-card border border-lb-border text-lb-ivory font-sans font-light text-sm px-4 py-3 focus:outline-none focus:border-lb-gold resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 bg-lb-gold text-lb-bg font-sans font-bold text-sm tracking-widest uppercase hover:bg-lb-gold-lt transition-colors min-h-[52px]"
        >
          {t.checkout.submit}
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 4: Create `src/app/checkout/page.tsx`**

```tsx
import CheckoutForm from "@/components/sections/checkout/checkout-form";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-lb-bg py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CheckoutForm />
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/checkout/ src/components/sections/checkout/
git commit -m "feat: checkout page with order summary and payment instructions"
```

---

## Task 13: Partners / B2B Page

**Files:**
- Create: `src/app/partners/page.tsx`
- Create: `src/components/sections/partners/partners-hero.tsx`
- Create: `src/components/sections/partners/bulk-order-form.tsx`
- Create: `src/components/sections/partners/site-visit-form.tsx`

- [ ] **Step 1: Create bulk-order-form.tsx**

```tsx
"use client";

import { useState } from "react";
import { PriceDisplay } from "@/components/ui/price-display";
import { useLanguage } from "@/lib/context/language-context";
import products from "@/data/product.json";

interface WindowRow {
  id: number;
  room: string;
  widthCm: number;
  heightCm: number;
  productId: string;
}

export function BulkOrderForm() {
  const { t } = useLanguage();
  const [rows, setRows] = useState<WindowRow[]>([
    { id: 1, room: "", widthCm: 120, heightCm: 150, productId: products[0].id },
  ]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { id: Date.now(), room: "", widthCm: 120, heightCm: 150, productId: products[0].id },
    ]);
  };

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRow = (id: number, field: keyof WindowRow, value: string | number) => {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, [field]: value } : r));
  };

  const totalSqm = rows.reduce((sum, r) => {
    return sum + Math.max(1, Math.ceil((r.widthCm / 100) * (r.heightCm / 100)));
  }, 0);

  const estimatedPrice = rows.reduce((sum, r) => {
    const product = (products as any[]).find((p) => p.id === r.productId);
    const pricePerSqm = product?.pricePerSqm ?? 120000;
    const sqm = Math.max(1, Math.ceil((r.widthCm / 100) * (r.heightCm / 100)));
    return sum + sqm * pricePerSqm;
  }, 0);

  if (submitted) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-12 h-12 mx-auto border-2 border-lb-gold flex items-center justify-center">
          <span className="text-lb-gold text-xl">✓</span>
        </div>
        <p className="font-display font-semibold text-lg text-lb-ivory">Үнийн санал хүсэлт илгээгдлээ</p>
        <p className="font-sans font-light text-sm text-lb-ash">Манай баг удалгүй холбогдох болно.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-lb-border">
              <th className="eyebrow text-left py-3 pr-4">{t.partners.roomName}</th>
              <th className="eyebrow text-left py-3 pr-4">Өргөн (см)</th>
              <th className="eyebrow text-left py-3 pr-4">Өндөр (см)</th>
              <th className="eyebrow text-left py-3 pr-4">{t.partners.productType}</th>
              <th className="py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-lb-border">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="py-2 pr-4">
                  <input
                    value={row.room}
                    onChange={(e) => updateRow(row.id, "room", e.target.value)}
                    placeholder="Унтлагын өрөө"
                    className="w-full bg-lb-card border border-lb-border text-lb-ivory font-sans font-light text-sm px-3 py-2 focus:outline-none focus:border-lb-gold min-h-[40px]"
                  />
                </td>
                <td className="py-2 pr-4">
                  <input
                    type="number"
                    min={30}
                    value={row.widthCm}
                    onChange={(e) => updateRow(row.id, "widthCm", Number(e.target.value))}
                    className="w-24 bg-lb-card border border-lb-border text-lb-ivory font-numbers text-sm px-3 py-2 focus:outline-none focus:border-lb-gold min-h-[40px]"
                  />
                </td>
                <td className="py-2 pr-4">
                  <input
                    type="number"
                    min={30}
                    value={row.heightCm}
                    onChange={(e) => updateRow(row.id, "heightCm", Number(e.target.value))}
                    className="w-24 bg-lb-card border border-lb-border text-lb-ivory font-numbers text-sm px-3 py-2 focus:outline-none focus:border-lb-gold min-h-[40px]"
                  />
                </td>
                <td className="py-2 pr-4">
                  <select
                    value={row.productId}
                    onChange={(e) => updateRow(row.id, "productId", e.target.value)}
                    className="bg-lb-card border border-lb-border text-lb-ivory font-sans font-light text-sm px-3 py-2 focus:outline-none focus:border-lb-gold min-h-[40px]"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </td>
                <td className="py-2">
                  {rows.length > 1 && (
                    <button
                      onClick={() => removeRow(row.id)}
                      className="font-sans text-xs text-lb-ash hover:text-lb-ivory transition-colors px-2 py-2 min-h-[40px]"
                    >
                      ×
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addRow}
        className="px-4 py-2 border border-lb-border text-lb-ash font-sans font-medium text-xs tracking-widest uppercase hover:border-lb-gold hover:text-lb-ivory transition-colors min-h-[44px]"
      >
        + {t.partners.addRow}
      </button>

      {/* Totals */}
      <div className="flex flex-col sm:flex-row gap-4 border border-lb-border bg-lb-card p-5">
        <div className="flex-1">
          <p className="eyebrow mb-1">{t.partners.totalSqm}</p>
          <p className="font-numbers text-2xl text-lb-ivory">{totalSqm} м²</p>
        </div>
        <div className="flex-1">
          <p className="eyebrow mb-1">{t.partners.estimatedPrice}</p>
          <PriceDisplay amount={estimatedPrice} size="lg" />
        </div>
      </div>

      {/* Contact fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="eyebrow block mb-2">Нэр</label>
          <input required value={name} onChange={(e) => setName(e.target.value)}
            className="w-full bg-lb-card border border-lb-border text-lb-ivory font-sans font-light text-sm px-4 py-3 focus:outline-none focus:border-lb-gold min-h-[48px]"
          />
        </div>
        <div>
          <label className="eyebrow block mb-2">{t.partners.company}</label>
          <input required value={company} onChange={(e) => setCompany(e.target.value)}
            className="w-full bg-lb-card border border-lb-border text-lb-ivory font-sans font-light text-sm px-4 py-3 focus:outline-none focus:border-lb-gold min-h-[48px]"
          />
        </div>
        <div>
          <label className="eyebrow block mb-2">Утас</label>
          <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-lb-card border border-lb-border text-lb-ivory font-sans font-light text-sm px-4 py-3 focus:outline-none focus:border-lb-gold min-h-[48px]"
          />
        </div>
      </div>

      <button
        onClick={() => setSubmitted(true)}
        className="w-full py-4 bg-lb-gold text-lb-bg font-sans font-bold text-sm tracking-widest uppercase hover:bg-lb-gold-lt transition-colors min-h-[52px]"
      >
        {t.partners.quoteRequest}
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Create site-visit-form.tsx**

```tsx
"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/context/language-context";

export function SiteVisitForm() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [fields, setFields] = useState({ name: "", company: "", phone: "", address: "", date: "", time: "" });

  const update = (k: keyof typeof fields, v: string) => setFields((f) => ({ ...f, [k]: v }));

  if (submitted) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-12 h-12 mx-auto border-2 border-lb-gold flex items-center justify-center">
          <span className="text-lb-gold text-xl">✓</span>
        </div>
        <p className="font-display font-semibold text-lg text-lb-ivory">Хүсэлт илгээгдлээ</p>
        <p className="font-sans font-light text-sm text-lb-ash">Манай мэргэжилтэн тантай холбогдох болно.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <p className="font-sans font-light text-sm text-lb-ash">{t.partners.visitDesc}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "Нэр", key: "name" as const },
          { label: t.partners.company, key: "company" as const },
          { label: "Утас", key: "phone" as const },
          { label: "Хаяг", key: "address" as const },
        ].map(({ label, key }) => (
          <div key={key}>
            <label className="eyebrow block mb-2">{label}</label>
            <input
              required
              value={fields[key]}
              onChange={(e) => update(key, e.target.value)}
              className="w-full bg-lb-card border border-lb-border text-lb-ivory font-sans font-light text-sm px-4 py-3 focus:outline-none focus:border-lb-gold min-h-[48px]"
            />
          </div>
        ))}
        <div>
          <label className="eyebrow block mb-2">{t.partners.preferredDate}</label>
          <input
            type="date"
            value={fields.date}
            onChange={(e) => update("date", e.target.value)}
            className="w-full bg-lb-card border border-lb-border text-lb-ivory font-sans font-light text-sm px-4 py-3 focus:outline-none focus:border-lb-gold min-h-[48px]"
          />
        </div>
        <div>
          <label className="eyebrow block mb-2">{t.partners.preferredTime}</label>
          <input
            type="time"
            value={fields.time}
            onChange={(e) => update("time", e.target.value)}
            className="w-full bg-lb-card border border-lb-border text-lb-ivory font-sans font-light text-sm px-4 py-3 focus:outline-none focus:border-lb-gold min-h-[48px]"
          />
        </div>
      </div>
      <button
        onClick={() => setSubmitted(true)}
        className="w-full py-4 bg-lb-gold text-lb-bg font-sans font-bold text-sm tracking-widest uppercase hover:bg-lb-gold-lt transition-colors min-h-[52px]"
      >
        {t.partners.submit}
      </button>
    </div>
  );
}
```

- [ ] **Step 3: Create partners-hero.tsx**

```tsx
"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Eyebrow } from "@/components/ui/eyebrow";

export function PartnersHero() {
  const { t } = useLanguage();
  return (
    <div className="mb-12 lg:mb-16">
      <Eyebrow className="mb-3">{t.partners.eyebrow}</Eyebrow>
      <h1 className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-lb-ivory">{t.partners.heading}</h1>
    </div>
  );
}
```

- [ ] **Step 4: Create `src/app/partners/page.tsx`**

```tsx
"use client";

import { useState } from "react";
import { PartnersHero } from "@/components/sections/partners/partners-hero";
import { BulkOrderForm } from "@/components/sections/partners/bulk-order-form";
import { SiteVisitForm } from "@/components/sections/partners/site-visit-form";
import { useLanguage } from "@/lib/context/language-context";

export default function PartnersPage() {
  const { t } = useLanguage();
  const [track, setTrack] = useState<"bulk" | "visit">("bulk");

  return (
    <main className="min-h-screen bg-lb-bg py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PartnersHero />

        {/* Track selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {(["bulk", "visit"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setTrack(option)}
              className={`p-6 border text-left transition-colors ${
                track === option ? "border-lb-gold bg-lb-card" : "border-lb-border bg-lb-surface hover:border-lb-gold/50"
              }`}
            >
              <p className={`font-display font-semibold text-base mb-1 ${track === option ? "text-lb-ivory" : "text-lb-ash"}`}>
                {option === "bulk" ? t.partners.bulkTitle : t.partners.visitTitle}
              </p>
              <p className="font-sans font-light text-xs text-lb-ash">
                {option === "bulk" ? t.partners.bulkDesc : t.partners.visitDesc}
              </p>
            </button>
          ))}
        </div>

        <div className="border border-lb-border bg-lb-surface p-6 sm:p-8">
          {track === "bulk" ? <BulkOrderForm /> : <SiteVisitForm />}
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/partners/ src/components/sections/partners/
git commit -m "feat: partners B2B page — bulk order + site visit forms"
```

---

## Task 14: About & Contact Visual Refresh

**Files:**
- Modify: `src/components/sections/about/views/about-screen-view.tsx`
- Modify: `src/components/sections/contact/views/contact-view-screen.tsx`

- [ ] **Step 1: Wrap about view in dark container**

Open `src/components/sections/about/views/about-screen-view.tsx` and add `bg-lb-bg` to the wrapper div. Change any `className` values that reference light colors to use dark equivalents (`bg-background` → `bg-lb-bg`, `text-foreground` → `text-lb-ivory`, `text-muted-foreground` → `text-lb-ash`, `border-border` → `border-lb-border`).

- [ ] **Step 2: Wrap contact view in dark container**

Same as above for `src/components/sections/contact/views/contact-view-screen.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/about/ src/components/sections/contact/
git commit -m "feat: about and contact dark visual refresh"
```

---

## Task 15: Final Build Check

- [ ] **Step 1: Run build**

```bash
cd /Users/munkhjavkhlan/Documents/luxuryblind && bun run build
```

Expected: exits with code 0. Fix any TypeScript or import errors before continuing.

- [ ] **Step 2: Start dev server and do a quick manual check**

```bash
bun dev
```

Check:
- `/` — Hero, benefits, featured products, process, CTA sections render
- `/products` — Grid renders with prices
- `/products/wood-blind` — Detail page with canvas visualizer
- `/checkout` — Form renders
- `/partners` — Both tracks work
- Mobile (< 640px): header hamburger works, no horizontal scroll

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: LuxuryBlind full rebrand and ecommerce complete"
```
