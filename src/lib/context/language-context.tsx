"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { mn } from "@/lib/translations/mn";
import { en } from "@/lib/translations/en";

type Lang = "mn" | "en";
type Translations = typeof mn;

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("mn");

  useEffect(() => {
    const stored = localStorage.getItem("lb-lang") as Lang | null;
    if (stored === "mn" || stored === "en") setLang(stored);
  }, []);

  const toggle = () => {
    setLang((prev) => {
      const next = prev === "mn" ? "en" : "mn";
      localStorage.setItem("lb-lang", next);
      return next;
    });
  };

  const t = lang === "mn" ? mn : (en as unknown as Translations);

  return (
    <LanguageContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
