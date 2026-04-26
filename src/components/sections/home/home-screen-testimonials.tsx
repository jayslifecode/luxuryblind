"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useLanguage } from "@/lib/context/language-context";
import { Eyebrow } from "@/components/ui/eyebrow";

const testimonials = [
  {
    name: "Б. Нарантуяа",
    role: "Гэрийн захиалагч",
    text: "Маш чанартай, үнэ нь боломжийн. Хоёр өрөөний цонхыг нэг долоо хоногт дуусгасан.",
    image: "/images/projects/oyutolgoi/9A0DE112-8657-418A-911F-29FC70FE4F69.JPG",
  },
  {
    name: "Г. Баяртөгс",
    role: "Оффис захиалагч",
    text: "Оюу Толгойн оффисын хөшгийг захиалсан. Чанар болон хурд нь маш сайн байсан.",
    image: "/images/projects/oyutolgoi/9CF6FE36-AFED-4468-A272-B60DB7AD76DE.JPG",
  },
  {
    name: "Д. Энхтуяа",
    role: "Орон сууцны захиалагч",
    text: "Canvas visualizer дээр хэрхэн харагдахыг урьдчилан харсан нь их тустай байсан.",
    image: "/images/projects/oyutolgoi/AFCEBEAD-7B71-4FBF-BD02-1E039CB3BF09.JPG",
  },
];

function StarRow() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 fill-lb-gold" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function HomeScreenTestimonials() {
  const { t } = useLanguage();

  return (
    <section className="py-20 sm:py-28 bg-lb-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Eyebrow className="mb-3">{t.testimonials.eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-lb-ivory">{t.testimonials.heading}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-5">
                <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-lb-bg/30" />
              </div>
              {/* Card */}
              <div className="bg-lb-surface border border-lb-border rounded-sm p-5 space-y-3">
                <StarRow />
                <p className="font-sans text-sm text-lb-ivory leading-relaxed">&ldquo;{item.text}&rdquo;</p>
                <div>
                  <p className="font-sans text-sm font-semibold text-lb-ivory">{item.name}</p>
                  <p className="font-sans text-xs text-lb-ash">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
