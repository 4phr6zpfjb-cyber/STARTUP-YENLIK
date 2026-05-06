"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/lib/useLanguage";
import { AuthModal } from "@/components/auth/AuthModal";

export const Header = () => {
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");

  if (pathname === "/auth") return null;

  const openAuth = (tab: "signin" | "signup") => {
    router.push(`/auth?tab=${tab}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 h-16 border-b border-border bg-cream/85 backdrop-blur-md">
        <div className="content-wrap flex h-full items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-text-primary">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <circle cx="4" cy="7" r="2" fill="#B8A9F0" />
              <circle cx="9" cy="4" r="2" fill="#B8A9F0" />
              <circle cx="14" cy="7" r="2" fill="#B8A9F0" />
              <ellipse cx="10" cy="13" rx="5" ry="4" fill="#B8A9F0" />
            </svg>
            TimeBuddy
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <LanguageSwitcher />
            <div className="flex items-center gap-2">
              <button 
                onClick={() => openAuth("signin")}
                className="text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {t("authSignIn")}
              </button>
              <button 
                onClick={() => openAuth("signup")}
                className="rounded-lg bg-lavender px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-lavender-deep transition-colors"
              >
                {t("authSignUp")}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
