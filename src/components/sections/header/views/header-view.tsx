"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t, lang, toggle } = useLanguage();

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = !isHome || scrolled;

  const navItems = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.products, path: "/products" },
    { label: t.nav.about, path: "/about" },
    { label: t.nav.contact, path: "/contact" },
    { label: t.nav.partners, path: "/partners" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.25,
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b backdrop-blur-md ${
        dark
          ? "bg-lb-bg/95 border-lb-border shadow-lg/20"
          : "bg-transparent border-white/10 shadow-none"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="shrink-0 group">
              <motion.span
                className="font-display text-xl font-semibold tracking-widest text-lb-ivory block"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                LUXURY<span className="text-lb-gold group-hover:text-lb-gold-lt transition-colors">BLIND</span>
              </motion.span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={item.path}
                  className={`relative font-sans text-sm px-4 py-2 rounded-full transition-all duration-300 group ${
                    pathname === item.path
                      ? "text-lb-gold"
                      : dark
                      ? "text-lb-ash hover:text-lb-ivory"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  <motion.span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full transition-all duration-300 ${
                      pathname === item.path
                        ? "bg-lb-gold w-full"
                        : "bg-current group-hover:w-8"
                    }`}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              onClick={toggle}
              className={`font-sans text-xs font-semibold tracking-widest border rounded-full px-3 py-1.5 transition-all duration-300 min-w-[56px] group ${
                dark
                  ? "text-lb-ash hover:text-lb-ivory border-lb-border hover:border-lb-gold"
                  : "text-white/70 hover:text-white border-white/30 hover:border-lb-gold"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {lang === "mn" ? "EN" : "МН"}
            </motion.button>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <Link
                href="/partners"
                className="group inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase px-5 py-2.5 bg-lb-gold text-lb-bg rounded-full hover:bg-lb-gold-lt transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {t.nav.cta}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors rounded-full ${
              dark ? "text-lb-ash hover:text-lb-ivory hover:bg-lb-border/20" : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden overflow-hidden border-t border-lb-border/50 bg-lb-bg/98 backdrop-blur-md"
          >
            <nav className="flex flex-col px-4 py-6 gap-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  variants={itemVariants}
                >
                  <Link
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className={`font-sans text-sm py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                      pathname === item.path
                        ? "text-lb-gold bg-lb-gold/10"
                        : "text-lb-ash hover:text-lb-ivory hover:bg-lb-border/20"
                    }`}
                  >
                    <span>{item.label}</span>
                    {pathname === item.path && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="w-1.5 h-1.5 rounded-full bg-lb-gold"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 pt-4 border-t border-lb-border/50 mt-2"
              >
                <button
                  onClick={toggle}
                  className="font-sans text-xs font-semibold tracking-widest text-lb-ash border border-lb-border rounded-full px-4 py-2.5 min-h-[44px] flex items-center hover:border-lb-gold hover:text-lb-gold transition-all duration-300 flex-1"
                >
                  {lang === "mn" ? "EN" : "МН"}
                </button>
                <Link
                  href="/partners"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center font-sans text-xs font-semibold tracking-widest uppercase px-4 py-2.5 bg-lb-gold text-lb-bg rounded-full hover:bg-lb-gold-lt transition-all duration-300 min-h-[44px] flex items-center justify-center shadow-md"
                >
                  {t.nav.cta}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
