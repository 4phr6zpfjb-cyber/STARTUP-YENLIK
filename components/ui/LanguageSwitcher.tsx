"use client";

import { useLanguage } from "@/lib/useLanguage";
import { Language } from "@/types";

const languages: Language[] = ["en", "ru", "kz"];

export const LanguageSwitcher = () => {
  const { lang, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 text-[13px]">
      {languages.map((code, idx) => (
        <div key={code} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLanguage(code)}
            className={`uppercase ${lang === code ? "font-bold text-black" : "font-medium text-gray-500 hover:text-black"}`}
          >
            {code}
          </button>
          {idx < languages.length - 1 && <span className="text-gray-300">|</span>}
        </div>
      ))}
    </div>
  );
};
