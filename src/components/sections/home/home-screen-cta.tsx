"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "@/lib/context/language-context";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ArrowRight } from "lucide-react";

export default function HomeScreenCta() {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <>
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src="/images/projects/oyutolgoi/66569B36-2F5B-47CB-8FE8-F87E3461B4EB.JPG"
            alt="Visualizer background"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-lb-bg/90 via-lb-bg/85 to-lb-bg/90" />
        </motion.div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            className="border border-lb-gold/40 rounded-lg p-6 sm:p-10 lg:p-14 text-center max-w-3xl mx-auto bg-lb-bg/60 backdrop-blur-md shadow-2xl shadow-black/20"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Eyebrow className="mb-4">{t.visualizerCta.eyebrow}</Eyebrow>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-lb-ivory mb-4 sm:mb-6"
            >
              {t.visualizerCta.heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="font-sans text-sm sm:text-base text-lb-ash mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto"
            >
              {t.visualizerCta.desc}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 bg-lb-gold text-lb-bg font-sans text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-lb-gold-lt transition-all duration-300 min-h-[52px] shadow-lg hover:shadow-xl hover:shadow-lb-gold/20"
              >
                {t.visualizerCta.cta}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-16 lg:py-20 bg-lb-cream border-t border-lb-lborder">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10"
          >
            <div className="text-center lg:text-left">
              <Eyebrow className="mb-2 text-lb-text-md">{t.partnersCta.eyebrow}</Eyebrow>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-lb-text mb-2 sm:mb-3">
                {t.partnersCta.heading}
              </h2>
              <p className="font-sans text-sm sm:text-base text-lb-text-md leading-relaxed max-w-xl mx-auto lg:mx-0">
                {t.partnersCta.desc}
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shrink-0 mx-auto lg:mx-0"
            >
              <Link
                href="/partners"
                className="group inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-4 border-2 border-lb-gold text-lb-gold font-sans text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-lb-gold hover:text-lb-white transition-all duration-300 min-h-[52px] shadow-md hover:shadow-lg"
              >
                {t.partnersCta.cta}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}