"use client";

import { useEffect, useMemo, useState } from "react";
import { translations } from "@/constants/translations";
import { Language } from "@/types";

const KEY = "focuspet-lang";

export const useLanguage = () => {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(KEY) as Language | null;
    if (saved && ["en", "ru", "kz"].includes(saved)) {
      setLang(saved);
    }
  }, []);

  const setLanguage = (next: Language) => {
    setLang(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY, next);
    }
  };

  const t = useMemo(() => {
    return (key: string): string => translations[lang][key] ?? translations.en[key] ?? key;
  }, [lang]);

  return { lang, setLanguage, t };
};
