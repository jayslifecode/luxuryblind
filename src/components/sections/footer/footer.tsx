"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/context/language-context";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-lb-border bg-lb-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <span className="font-display text-lg font-semibold tracking-widest text-lb-ivory">
              LUXURY<span className="text-lb-gold">BLIND</span>
            </span>
            <p className="font-sans text-sm text-lb-ash leading-relaxed">{t.footer.tagline}</p>
          </div>

          {/* Nav */}
          <div className="space-y-3">
            <p className="eyebrow">Menu</p>
            <nav className="flex flex-col gap-2">
              {[
                { label: t.nav.home, path: "/" },
                { label: t.nav.products, path: "/products" },
                { label: t.nav.about, path: "/about" },
                { label: t.nav.partners, path: "/partners" },
              ].map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="font-sans text-sm text-lb-ash hover:text-lb-ivory transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <p className="eyebrow">{t.footer.contact}</p>
            <div className="font-sans text-sm text-lb-ash space-y-1">
              <p>info@luxuryblind.mn</p>
              <p>+976 9900 0000</p>
              <p>Улаанбаатар, Монгол</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-lb-border">
          <p className="font-sans text-xs text-lb-ash text-center">{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
