"use client";

import React from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Image from "next/image";
import { useLanguage } from "@/lib/context/language-context";
import { KoreanBadge } from "@/components/ui/korean-badge";

function MagneticButton({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export default function HomeScreenHero() {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const y1 = useSpring(useTransform(scrollY, [0, 500], [0, 200]), { stiffness: 100, damping: 30 });
  const y2 = useSpring(useTransform(scrollY, [0, 500], [0, -150]), { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen -mt-16 flex items-center overflow-hidden">
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute inset-0"
      >
        <Image
          src="/hero-background.jpeg"
          alt="LuxuryBlind interior"
          fill
          priority
          className="object-cover object-center scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: y2, opacity }}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full"
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex flex-wrap gap-2 mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <KoreanBadge />
            </motion.div>
            {[
              t.hero.badgeDelivery,
              t.hero.badgeCustom,
            ].map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="inline-flex items-center px-3 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white text-[10px] font-sans font-semibold tracking-widest uppercase"
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.05] mb-6"
          >
            {t.hero.headline}
            <br />
            <motion.em
              className="not-italic text-lb-gold inline-block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {t.hero.headlineItalic}
            </motion.em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-sans text-white/70 text-sm tracking-widest uppercase mb-10"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-lb-gold text-lb-bg font-sans text-sm font-semibold tracking-wider uppercase rounded hover:bg-lb-gold-lt transition-colors min-h-[52px] shadow-lg hover:shadow-xl hover:shadow-lb-gold/20"
            >
              {t.hero.ctaPrimary}
            </MagneticButton>
            <MagneticButton
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/50 text-white font-sans text-sm font-semibold tracking-wider uppercase rounded hover:border-lb-gold hover:text-lb-gold transition-colors min-h-[52px] backdrop-blur-sm hover:bg-white/5"
            >
              {t.hero.ctaSecondary}
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.span
          className="font-sans text-[10px] text-white/40 tracking-widest uppercase"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <svg width="26" height="40" viewBox="0 0 26 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.rect
            x="1"
            y="1"
            width="24"
            height="38"
            rx="12"
            stroke="white"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
          />
          <motion.rect
            x="11.5"
            y="8"
            width="3"
            height="6"
            rx="1.5"
            fill="white"
            fillOpacity="0.7"
            animate={{ y: [8, 20, 8], opacity: [0.7, 0.1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
        </svg>
      </motion.div>
    </section>
  );
}
