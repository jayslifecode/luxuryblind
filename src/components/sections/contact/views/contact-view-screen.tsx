"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";

interface ContactForm {
  name: string;
  phone: string;
  message: string;
}

const faqs = [
  { q: "Хүргэлтийн хугацаа хэд вэ?", a: "Улаанбаатар хотод 3–5 ажлын өдөрт хүргэнэ." },
  { q: "Хамгийн бага захиалгын хэмжээ ямар вэ?", a: "Нэг м² буюу 100 × 100 см байна." },
  { q: "Яаж хэмжих вэ?", a: "Цонхны дотоод өргөн болон өндрийг хэмжинэ. Мэргэжилтний хэмжилт шаардлагатай бол бидэнтэй холбоо барина уу." },
  { q: "Буцаалт хийх боломжтой юу?", a: "Захиалгат хэмжээтэй бүтээгдэхүүнийг буцаах боломжгүй. Гэмтэлтэй бол 7 хоногт мэдэгдэнэ үү." },
];

const contactItems = [
  { label: "Утас", value: "+976 9900 0000", icon: "→" },
  { label: "И-мэйл", value: "info@luxuryblind.mn", icon: "→" },
  { label: "Хаяг", value: "Улаанбаатар, СБД, 1-р хороо", icon: "→" },
  { label: "Цагийн хуваарь", value: "Даваа–Бямба 09:00–18:00", icon: "→" },
];

export default function ContactViewScreen() {
  const [form, setForm] = useState<ContactForm>({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-lb-bg">
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/projects/oyutolgoi/3EAE8C35-52D2-4205-A837-5BC51D6F654C.JPG"
            alt="Contact hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lb-bg via-lb-bg/55 to-lb-bg/15" />
        </div>
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <Eyebrow>Холбоо барих</Eyebrow>
            <h1 className="font-display text-5xl sm:text-6xl font-light text-lb-ivory leading-tight">
              Бидэнтэй<br />
              <em className="not-italic text-lb-gold">холбогдох</em>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Contact info strip */}
      <section className="border-t border-b border-lb-border bg-lb-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {contactItems.map((item, i) => (
              <div
                key={item.label}
                className={`py-6 px-6 ${i < contactItems.length - 1 ? "border-r border-lb-border" : ""}`}
              >
                <p className="font-sans text-[10px] text-lb-ash tracking-widest uppercase mb-1.5">{item.label}</p>
                <p className="font-sans text-sm text-lb-ivory leading-snug">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left: form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8 space-y-2">
                <Eyebrow>Мессеж илгээх</Eyebrow>
                <h2 className="font-display text-3xl font-light text-lb-ivory">Асуулт, захиалга, зөвлөгөө</h2>
              </div>

              {submitted ? (
                <div className="bg-lb-surface border border-lb-border rounded-sm p-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full border border-lb-gold flex items-center justify-center mx-auto">
                    <span className="text-lb-gold text-xl">✓</span>
                  </div>
                  <p className="font-display text-xl font-light text-lb-ivory">Мессеж хүлээн авлаа</p>
                  <p className="font-sans text-sm text-lb-ash">Бид 1–2 ажлын өдрийн дотор хариу өгөх болно</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {(["name", "phone"] as const).map((field) => (
                    <div key={field} className="space-y-2">
                      <label className="font-sans text-[10px] text-lb-ash tracking-widest uppercase font-medium">
                        {field === "name" ? "Нэр" : "Утасны дугаар"}
                      </label>
                      <input
                        type="text"
                        name={field}
                        required
                        value={form[field]}
                        onChange={handleChange}
                        className="w-full bg-lb-surface border border-lb-border rounded-sm px-4 py-3.5 font-sans text-sm text-lb-ivory placeholder:text-lb-ash/40 focus:outline-none focus:border-lb-gold transition-colors"
                      />
                    </div>
                  ))}
                  <div className="space-y-2">
                    <label className="font-sans text-[10px] text-lb-ash tracking-widest uppercase font-medium">Мессеж</label>
                    <textarea
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full bg-lb-surface border border-lb-border rounded-sm px-4 py-3.5 font-sans text-sm text-lb-ivory placeholder:text-lb-ash/40 focus:outline-none focus:border-lb-gold transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-lb-gold text-lb-bg font-sans text-xs font-semibold tracking-widest uppercase rounded hover:bg-lb-gold-lt transition-colors min-h-[52px]"
                  >
                    Илгээх
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right: FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="mb-8 space-y-2">
                <Eyebrow>Түгээмэл асуултууд</Eyebrow>
                <h2 className="font-display text-3xl font-light text-lb-ivory">Хариулт хайж байна уу?</h2>
              </div>

              <div className="space-y-px bg-lb-border">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="bg-lb-surface"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex justify-between items-center px-6 py-5 text-left gap-4 hover:bg-lb-card transition-colors"
                    >
                      <span className="font-sans text-sm text-lb-ivory">{faq.q}</span>
                      <span className={`text-lb-gold text-sm shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-5 border-t border-lb-border">
                        <p className="font-sans text-xs text-lb-ash leading-relaxed pt-4">{faq.a}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Emergency / quick contact */}
              <div className="mt-8 bg-lb-surface border border-lb-border rounded-sm p-6 space-y-3">
                <p className="font-sans text-[10px] text-lb-ash tracking-widest uppercase">Шуурхай холбоо барих</p>
                <p className="font-display text-xl font-light text-lb-ivory">+976 9900 0000</p>
                <p className="font-sans text-xs text-lb-ash">Даваа–Бямба · 09:00–18:00</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
