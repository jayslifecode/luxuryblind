"use client";

import { motion } from "motion/react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { KoreanBadge } from "@/components/ui/korean-badge";
import Link from "next/link";
import Image from "next/image";

const values = [
  { label: "Чанар", desc: "Зөвхөн Солонгосын шилдэг материал ашиглана" },
  { label: "Нарийвчлал", desc: "Нэг сантиметр нарийвчлалтай захиалгат хэмжээ" },
  { label: "Хариуцлага", desc: "Хүргэлтийн хугацааг чанд сахина" },
  { label: "Гоо зүй", desc: "Орчин үеийн тансаг дизайн, өнгөний уялдаа" },
];

const milestones = [
  { year: "2018", title: "Үүсгэн байгуулагдсан", desc: "LuxuryBlind Монгол улсад байгуулагдав" },
  { year: "2020", title: "Солонгосын түнш", desc: "Солонгосын үйлдвэртэй шууд гэрээ байгуулав" },
  { year: "2022", title: "1000+ захиалга", desc: "Мянга гаруй захиалагчид үйлчлэв" },
  { year: "2024", title: "B2B алба", desc: "Корпорацийн хэрэглэгчдэд зориулсан үйлчилгээ нэмэв" },
];

const stats = [
  { value: "1,000+", label: "Захиалагч" },
  { value: "6+", label: "Жилийн туршлага" },
  { value: "100%", label: "Солонгос материал" },
  { value: "3–5", label: "Хүргэлтийн өдөр" },
];

export default function AboutScreenView() {
  return (
    <main className="min-h-screen bg-lb-bg">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/projects/oyutolgoi/947965B6-6AB8-4BB1-87DC-C3A11076EFAB.JPG"
            alt="About hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lb-bg via-lb-bg/60 to-lb-bg/20" />
        </div>
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl space-y-5"
          >
            <KoreanBadge />
            <h1 className="font-display text-5xl sm:text-6xl font-light text-lb-ivory leading-tight">
              Тансаг цонхны<br />
              <em className="not-italic text-lb-gold">хөшгийн брэнд</em>
            </h1>
            <p className="font-sans text-sm text-lb-ash leading-relaxed max-w-lg">
              LuxuryBlind нь Солонгосын шилдэг материалыг ашиглан захиалгат цонхны хөшиг үйлдвэрлэдэг Монголын компани юм.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-t border-b border-lb-border bg-lb-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`py-8 px-6 text-center ${i < stats.length - 1 ? "border-r border-lb-border" : ""}`}
              >
                <p className="font-numbers text-3xl text-lb-gold mb-1">{stat.value}</p>
                <p className="font-sans text-[10px] text-lb-ash tracking-widest uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + Timeline */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 lg:sticky lg:top-28"
            >
              <Eyebrow>Манай түүх</Eyebrow>
              <h2 className="font-display text-4xl font-light text-lb-ivory leading-tight">
                2018 оноос хойш таны итгэлийг хүлээж байна
              </h2>
              <p className="font-sans text-sm text-lb-ash leading-relaxed">
                Монголын зах зээлд чанартай цонхны хөшгийн хомсдолыг мэдэрсний үндсэн дээр LuxuryBlind байгуулагдсан.
                Манай үүсгэн байгуулагчид Солонгос улсад суралцаж, тус улсын материал болон технологийг шууд нэвтрүүлсэн.
              </p>
              <p className="font-sans text-sm text-lb-ash leading-relaxed">
                Өнөөдөр бид 1000 гаруй захиалагчид үйлчилсэн бөгөөд корпорацийн болон хувийн захиалагчдад тэгш боломж олгодог.
              </p>
              <div className="pt-2">
                <div className="h-px bg-lb-border w-16 mb-4" />
                <p className="font-numbers text-lb-gold/60 text-xs tracking-widest">SINCE 2018</p>
              </div>
            </motion.div>

            <div className="space-y-px">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="group flex gap-6 items-start bg-lb-surface hover:bg-lb-card border border-lb-border p-6 transition-colors duration-200"
                >
                  <span className="font-numbers text-lb-gold text-2xl shrink-0 w-14 leading-none pt-0.5">{m.year}</span>
                  <div className="space-y-1">
                    <p className="font-display text-base text-lb-ivory">{m.title}</p>
                    <p className="font-sans text-xs text-lb-ash leading-relaxed">{m.desc}</p>
                  </div>
                  <span className="ml-auto text-lb-border group-hover:text-lb-gold transition-colors text-xs self-center shrink-0">→</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 border-t border-lb-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex items-end justify-between flex-wrap gap-6">
            <div className="space-y-2">
              <Eyebrow>Манай үнэт зүйлс</Eyebrow>
              <h2 className="font-display text-4xl font-light text-lb-ivory">Бидний баримтлах зарчим</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-lb-border">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-lb-surface hover:bg-lb-card transition-colors duration-200 p-8 space-y-4"
              >
                <span className="font-numbers text-lb-gold/40 text-4xl leading-none">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-xl font-light text-lb-ivory">{v.label}</h3>
                <p className="font-sans text-xs text-lb-ash leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo strip */}
      <section className="py-0 overflow-hidden">
        <div className="relative h-64 sm:h-80">
          <Image
            src="/images/projects/oyutolgoi/3EAE8C35-52D2-4205-A837-5BC51D6F654C.JPG"
            alt="Project"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-lb-bg/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-lb-bg via-transparent to-lb-bg" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-lb-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <Eyebrow>Эхлэцгээе</Eyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-lb-ivory leading-tight">
            Таны цонхыг<br />
            <span className="text-lb-gold">тохируулахад бэлэн</span>
          </h2>
          <p className="font-sans text-sm text-lb-ash max-w-lg mx-auto leading-relaxed">
            Хувийн захиалга эсвэл корпорацийн томоохон захиалга хийх бол бидэнтэй холбогдоорой.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 bg-lb-gold text-lb-bg font-sans text-xs font-semibold tracking-widest uppercase rounded hover:bg-lb-gold-lt transition-colors min-h-[52px] flex items-center justify-center"
            >
              Бүтээгдэхүүн харах
            </Link>
            <Link
              href="/partners"
              className="px-8 py-4 border border-lb-border text-lb-ash font-sans text-xs font-semibold tracking-widest uppercase rounded hover:border-lb-gold hover:text-lb-gold transition-colors min-h-[52px] flex items-center justify-center"
            >
              Компанийн захиалга
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
