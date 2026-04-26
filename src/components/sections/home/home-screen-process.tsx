"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useLanguage } from "@/lib/context/language-context";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function HomeScreenProcess() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-lb-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <Eyebrow className="mb-3 text-lb-text-md">{t.process.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-lb-text mb-8 sm:mb-10">
              {t.process.heading}
            </h2>
            <div className="space-y-0">
              {t.process.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex gap-4 sm:gap-6 items-start group"
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-lb-gold flex items-center justify-center shrink-0 bg-lb-white group-hover:bg-lb-gold group-hover:scale-110 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="font-numbers text-lb-gold group-hover:text-lb-bg text-sm sm:text-base transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </motion.div>
                    {i < t.process.steps.length - 1 && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                        className="w-px flex-1 bg-lb-lborder mt-3 sm:mt-4 mb-2 min-h-[40px] origin-top"
                      />
                    )}
                  </div>
                  <div className="pb-6 sm:pb-8 pt-2">
                    <motion.h3
                      className="font-display text-lg sm:text-xl font-light text-lb-text mb-2 group-hover:text-lb-gold transition-colors"
                    >
                      {step.title}
                    </motion.h3>
                    <p className="font-sans text-sm text-lb-text-md leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            {[
              "/images/projects/oyutolgoi/66569B36-2F5B-47CB-8FE8-F87E3461B4EB.JPG",
              "/images/projects/oyutolgoi/679E9D8F-370D-4FDE-992E-BB3B7AE69D3B.JPG",
              "/images/projects/oyutolgoi/8D2EFF0A-124B-441B-BC2D-339144C73FEE.JPG",
              "/images/projects/oyutolgoi/947965B6-6AB8-4BB1-87DC-C3A11076EFAB.JPG",
            ].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className={`relative overflow-hidden rounded-sm cursor-pointer ${i === 0 ? "aspect-[3/4]" : i === 1 ? "aspect-square" : "aspect-[4/3]"}`}
              >
                <Image
                  src={src}
                  alt={`Монтаж үйл явц ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
