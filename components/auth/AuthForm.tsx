"use client";

import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { useLanguage } from "@/lib/useLanguage";

type Tab = "signin" | "signup";

export const AuthForm = ({ initialTab = "signup" }: { initialTab?: Tab }) => {
  const { t } = useLanguage();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>(initialTab);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);

  const canSubmit = useMemo(() => {
    if (!email.trim() || !password.trim()) return false;
    if (tab === "signup" && (!fullName.trim() || password.length < 8)) return false;
    return true;
  }, [email, fullName, password, tab]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    
    try {
      if (tab === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
      
      setShowToast(true);
      setTimeout(() => router.push("/dashboard"), 600);
    } catch (error: any) {
      console.error("Auth error:", error.message);
      // Here you could also set an error state and show it to the user
    }
  };

  return (
    <>
      <div className="w-full max-w-[420px] rounded-xl3 border border-border bg-surface p-10 shadow-soft">
        <div className="mb-6 flex border-b border-border">
          {(["signin", "signup"] as const).map((k) => (
            <button
              key={k}
              type="button"
              className={`h-12 flex-1 text-sm ${tab === k ? "border-b-2 border-lavender font-semibold text-text-primary" : "text-text-secondary"}`}
              onClick={() => setTab(k)}
            >
              {k === "signin" ? t("authSignIn") : t("authSignUp")}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.form key={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} onSubmit={onSubmit} className="space-y-4">
            {tab === "signup" && <input className="focuspet-input" placeholder={t("fullName")} value={fullName} onChange={(e) => setFullName(e.target.value)} />}
            <input className="focuspet-input" placeholder={t("email")} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="focuspet-input" placeholder={t("password")} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {tab === "signin" && <p className="text-right text-[13px] text-lavender">{t("forgotPassword")}</p>}
            <Button type="submit" className="w-full" disabled={!canSubmit}>
              {tab === "signin" ? t("authSignIn") : t("createAccount")}
            </Button>
            {tab === "signup" && <p className="text-center text-xs text-text-muted">By signing up you agree to our Terms</p>}
          </motion.form>
        </AnimatePresence>
      </div>
      <Toast show={showToast} message="Welcome to TimeBuddy! 🐼" />
    </>
  );
};
