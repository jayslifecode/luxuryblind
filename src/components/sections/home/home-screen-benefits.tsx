"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useLanguage } from "@/lib/context/language-context";
import { Eyebrow } from "@/components/ui/eyebrow";

const projectImages = [
  "/images/projects/oyutolgoi/026B1663-0C8C-4E3A-B010-85C55C99B8DD.JPG",
  "/images/projects/oyutolgoi/2C3E8541-345A-44DB-B657-550735A5EA0E.JPG",
  "/images/projects/oyutolgoi/3EAE8C35-52D2-4205-A837-5BC51D6F654C.JPG",
  "/images/projects/oyutolgoi/5E018130-D93A-498D-B6CD-5867DBC397E9.JPG",
];

export default function HomeScreenBenefits() {
  const { t } = useLanguage();

  const items = [
    { label: t.benefits.korean, desc: t.benefits.koreanDesc, icon: "🇰🇷" },
    { label: t.benefits.custom, desc: t.benefits.customDesc, icon: "⊞" },
    { label: t.benefits.delivery, desc: t.benefits.deliveryDesc, icon: "◎" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <>
      <section className="bg-lb-bg overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {projectImages.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-[4/3] overflow-hidden group cursor-pointer"
            >
              <Image
                src={src}
                alt={`Оюу Толгой төсөл ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <motion.div
                className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"
              />
              {i === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute inset-0 bg-lb-bg/70 flex flex-col items-start justify-end p-4 sm:p-5"
                >
                  <span className="font-sans text-[10px] sm:text-xs text-lb-gold tracking-widest uppercase mb-1">Жишээ Төсөл</span>
                  <span className="font-display text-lg sm:text-xl font-light text-lb-ivory">Оюу Толгой</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-lb-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <Eyebrow className="mb-3 text-lb-text-md">{t.benefits.eyebrow}</Eyebrow>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12"
          >
            {items.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="text-center space-y-4 sm:space-y-5 px-4 sm:px-6 py-8 rounded-2xl hover:bg-lb-cream/50 transition-colors duration-300 group cursor-default"
              >
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-lb-lborder flex items-center justify-center mx-auto text-3xl sm:text-4xl bg-lb-white group-hover:border-lb-gold group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <motion.h3
                  className="font-display text-xl sm:text-2xl font-light text-lb-text group-hover:text-lb-gold transition-colors duration-300"
                >
                  {item.label}
                </motion.h3>
                <motion.p
                  className="font-sans text-sm sm:text-base text-lb-text-md leading-relaxed"
                  initial={{ opacity: 0.7 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  {item.desc}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
