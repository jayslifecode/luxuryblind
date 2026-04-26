"use client";

import { useState } from "react";
import { useOrder } from "@/lib/context/order-context";
import { useLanguage } from "@/lib/context/language-context";
import Link from "next/link";
import { formatPrice } from "@/lib/utils/price";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PriceDisplay } from "@/components/ui/price-display";

interface FormState {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

export default function CheckoutView() {
  const { t } = useLanguage();
  const { state, removeItem, subtotal, deliveryFee, total, clear } = useOrder();
  const [form, setForm] = useState<FormState>({ name: "", phone: "", address: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clear();
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-lb-bg flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-full border border-lb-gold flex items-center justify-center mx-auto">
            <span className="text-lb-gold text-2xl">✓</span>
          </div>
          <h1 className="font-display text-3xl font-light text-lb-ivory">{t.checkout.confirmed}</h1>
          <p className="font-sans text-sm text-lb-ash">{t.checkout.orderRef}: <span className="font-numbers text-lb-gold">{state.ref}</span></p>
          <div className="bg-lb-surface border border-lb-border rounded-sm p-6 text-left space-y-2">
            <p className="eyebrow mb-3">{t.checkout.paymentTitle}</p>
            <p className="font-sans text-sm text-lb-ash leading-relaxed">{t.checkout.paymentInstructions}</p>
            <p className="font-numbers text-lb-gold text-lg">{formatPrice(total || subtotal)}</p>
          </div>
        </div>
      </main>
    );
  }

  if (state.items.length === 0) {
    return (
      <main className="min-h-screen bg-lb-bg flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="font-display text-2xl font-light text-lb-ash">Захиалга хоосон байна</p>
          <Link href="/products" className="inline-block font-sans text-sm text-lb-gold underline">Бүтээгдэхүүн харах</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-lb-bg py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Eyebrow className="mb-2">{t.checkout.eyebrow}</Eyebrow>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-lb-ivory">{t.checkout.heading}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Order summary */}
          <div className="space-y-4">
            {state.items.map((item, i) => (
              <div key={i} className="bg-lb-surface border border-lb-border rounded-sm p-5 flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <p className="font-display text-base text-lb-ivory">{item.productTitle}</p>
                  <p className="font-sans text-xs text-lb-ash">{item.widthCm} × {item.heightCm} см · {item.sqm} м²</p>
                  <p className="font-sans text-xs text-lb-ash">{item.delivery ? t.configurator.delivery : t.configurator.pickup}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <PriceDisplay amount={item.totalPrice} size="sm" />
                  <button
                    onClick={() => removeItem(i)}
                    className="font-sans text-xs text-lb-ash hover:text-red-400 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-lb-surface border border-lb-border rounded-sm p-5 space-y-2">
              <div className="flex justify-between font-sans text-sm text-lb-ash">
                <span>{t.checkout.subtotal}</span>
                <span className="font-numbers text-lb-ivory">{formatPrice(subtotal)}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between font-sans text-sm text-lb-ash">
                  <span>{t.checkout.deliveryFee}</span>
                  <span className="font-numbers text-lb-ivory">{formatPrice(deliveryFee)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-lb-border pt-2">
                <span className="font-sans text-sm font-semibold text-lb-ivory">{t.checkout.total}</span>
                <PriceDisplay amount={total} size="md" />
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {(["name", "phone", "address"] as const).map((field) => (
              <div key={field} className="space-y-1.5">
                <label className="font-sans text-xs text-lb-ash tracking-wide">{t.checkout[field]}</label>
                <input
                  type="text"
                  name={field}
                  required
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full bg-lb-card border border-lb-border rounded px-3 py-3 font-sans text-sm text-lb-ivory focus:outline-none focus:border-lb-gold transition-colors"
                />
              </div>
            ))}
            <div className="space-y-1.5">
              <label className="font-sans text-xs text-lb-ash tracking-wide">{t.checkout.notes}</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="w-full bg-lb-card border border-lb-border rounded px-3 py-3 font-sans text-sm text-lb-ivory focus:outline-none focus:border-lb-gold transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-lb-gold text-lb-bg font-sans text-sm font-semibold tracking-wider uppercase rounded hover:bg-lb-gold-lt transition-colors min-h-[52px]"
            >
              {t.checkout.submit}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
