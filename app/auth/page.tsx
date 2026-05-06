"use client";

import { useState, useMemo, FormEvent, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/useLanguage";
import { PetSVG } from "@/components/pet/PetSVG";

type Tab = "signin" | "signup";

export default function AuthPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<Tab>("signin");

  useEffect(() => {
    const qTab = searchParams.get("tab");
    if (qTab === "signin" || qTab === "signup") {
      setTab(qTab);
    }
  }, [searchParams]);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // OTP state
  const [showOtp, setShowOtp] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first OTP box on mount
    if (showOtp && otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, [showOtp]);

  const canSubmit = useMemo(() => {
    if (!email.trim() || !password.trim()) return false;
    if (tab === "signup" && (!fullName.trim() || password.length < 8)) return false;
    return true;
  }, [email, fullName, password, tab]);

  const handleAuthSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    
    try {
      if (tab === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        });
        if (error) throw error;
        // On successful signup, maybe we want to show OTP or just redirect.
        // The prompt says "OTP Экран: 6 отдельных ячеек". Let's show it.
        setShowOtp(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Auth error:", error.message);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;

    const newValues = [...otpValues];
    newValues[index] = val.slice(-1);
    setOtpValues(newValues);

    // Auto-focus next
    if (val && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-submit
    if (newValues.every((v) => v !== "")) {
      handleVerifyOtp(newValues.join(""));
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (code: string) => {
    // Here we'd verify the OTP with Supabase if using phone/email OTP,
    // but since we used regular email/password signUp, email confirmation might be a link.
    // Assuming standard implementation or just mock redirect for now as requested.
    console.log("Verifying OTP:", code);
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="auth-dark-theme flex min-h-screen w-full bg-[var(--bg-main)] font-sans text-[var(--text-body)]">
      {/* Left Panel - Branding (Hidden on mobile) */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 lg:p-20"
      >
        {/* Decorative Circles */}
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[var(--bg-alt)] opacity-30 z-0 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--bg-alt)] opacity-30 z-0 blur-3xl pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
            <circle cx="4" cy="7" r="2" fill="var(--orange)" />
            <circle cx="9" cy="4" r="2" fill="var(--orange)" />
            <circle cx="14" cy="7" r="2" fill="var(--orange)" />
            <ellipse cx="10" cy="13" rx="5" ry="4" fill="var(--orange)" />
          </svg>
          <span className="text-[var(--text-primary)] text-xl font-bold tracking-wide">TimeBuddy</span>
        </div>

        {/* Center Pet & Bubble */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 my-12">
          {/* Speech Bubble */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[var(--bg-panel)] px-6 py-4 rounded-2xl rounded-br-none mb-6 max-w-[280px] shadow-lg relative"
          >
            <p className="text-[var(--text-body)] text-center text-[15px] leading-relaxed">
              Ready to take back your time? I'll help you get there 🌿
            </p>
            {/* Bubble Tail */}
            <div className="absolute bottom-[-10px] right-6 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-[var(--bg-panel)] border-r-[10px] border-r-transparent" />
          </motion.div>

          {/* Pet Container */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-48 h-48 rounded-full bg-[var(--bg-panel)] flex items-center justify-center shadow-2xl relative"
          >
            {/* Subtle glow behind pet */}
            <div className="absolute inset-0 rounded-full bg-[var(--orange-soft)] blur-xl" />
            <div className="relative z-10">
              <PetSVG mood="happy" type="fox" size={140} />
            </div>
          </motion.div>
        </div>

        {/* Bottom Features */}
        <div className="relative z-10 flex flex-col gap-4">
          {[
            "Track your screen time mindfully",
            "Grow your digital companion",
            "Build healthier habits daily"
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="w-2 h-2 rounded-full bg-[var(--orange)]" />
              <span className="text-[var(--text-muted)] text-[15px]">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Panel - Form (100% on mobile, 50% on desktop) */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full md:w-1/2 bg-[var(--bg-panel)] flex flex-col items-center justify-center p-6 sm:p-12"
      >
        <div className="w-full max-w-[400px]">
          {/* Mobile Logo Header */}
          <div className="md:hidden flex items-center justify-center gap-3 mb-10">
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
              <circle cx="4" cy="7" r="2" fill="var(--orange)" />
              <circle cx="9" cy="4" r="2" fill="var(--orange)" />
              <circle cx="14" cy="7" r="2" fill="var(--orange)" />
              <ellipse cx="10" cy="13" rx="5" ry="4" fill="var(--orange)" />
            </svg>
            <span className="text-[var(--text-primary)] text-2xl font-bold tracking-wide">TimeBuddy</span>
          </div>

          {!showOtp ? (
            <>
              {/* Header Texts */}
              <div className="mb-8">
                <h2 className="text-[var(--text-primary)] text-3xl font-bold mb-2">
                  {tab === "signin" ? "Welcome back" : "Create an account"}
                </h2>
                <p className="text-[var(--text-muted)] text-[15px]">
                  {tab === "signin" ? "Enter your details to sign in." : "Start your journey to better digital habits."}
                </p>
              </div>

              {/* Tabs */}
              <div className="relative flex p-1 mb-8 bg-[var(--bg-main)] rounded-xl">
                {(["signin", "signup"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="relative flex-1 py-2.5 text-sm font-medium z-10 transition-colors"
                    style={{ color: tab === t ? "var(--text-primary)" : "var(--text-muted)" }}
                  >
                    {t === "signin" ? "Sign In" : "Sign Up"}
                    {tab === t && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[var(--bg-panel)] rounded-lg shadow-sm -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Form */}
              <AnimatePresence mode="wait">
                <motion.form
                  key={tab}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  onSubmit={handleAuthSubmit}
                  className="flex flex-col gap-4"
                >
                  {tab === "signup" && (
                    <motion.div variants={staggerItem}>
                      <input 
                        type="text"
                        placeholder="Full Name" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full h-12 bg-[var(--bg-main)] border border-[var(--border-mid)] rounded-xl px-4 text-[var(--text-primary)] placeholder-[var(--text-faint)] focus:outline-none focus:border-[var(--border-focus)] focus:shadow-[0_0_0_4px_var(--orange-soft)] transition-all"
                      />
                    </motion.div>
                  )}
                  <motion.div variants={staggerItem}>
                    <input 
                      type="email"
                      placeholder="Email address" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 bg-[var(--bg-main)] border border-[var(--border-mid)] rounded-xl px-4 text-[var(--text-primary)] placeholder-[var(--text-faint)] focus:outline-none focus:border-[var(--border-focus)] focus:shadow-[0_0_0_4px_var(--orange-soft)] transition-all"
                    />
                  </motion.div>
                  <motion.div variants={staggerItem}>
                    <input 
                      type="password"
                      placeholder="Password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 bg-[var(--bg-main)] border border-[var(--border-mid)] rounded-xl px-4 text-[var(--text-primary)] placeholder-[var(--text-faint)] focus:outline-none focus:border-[var(--border-focus)] focus:shadow-[0_0_0_4px_var(--orange-soft)] transition-all"
                    />
                  </motion.div>

                  {tab === "signin" && (
                    <motion.div variants={staggerItem} className="flex justify-end">
                      <button type="button" className="text-[13px] text-[var(--orange)] hover:text-[var(--orange-deep)] transition-colors">
                        Forgot password?
                      </button>
                    </motion.div>
                  )}

                  <motion.div variants={staggerItem} className="mt-2">
                    <button 
                      type="submit" 
                      disabled={!canSubmit}
                      className="w-full h-12 bg-[var(--orange)] text-[var(--btn-text)] font-bold rounded-xl hover:bg-[var(--orange-deep)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {tab === "signin" ? "Sign In" : "Create Account"}
                    </button>
                  </motion.div>

                  {/* Divider */}
                  <motion.div variants={staggerItem} className="relative flex items-center py-4">
                    <div className="flex-grow border-t border-[var(--border-mid)]"></div>
                    <span className="flex-shrink-0 mx-4 text-[var(--text-faint)] text-xs">OR</span>
                    <div className="flex-grow border-t border-[var(--border-mid)]"></div>
                  </motion.div>

                  {/* Google Button */}
                  <motion.div variants={staggerItem}>
                    <button 
                      type="button"
                      className="w-full h-12 flex items-center justify-center gap-3 bg-[var(--bg-main)] border border-[var(--border-mid)] text-[var(--text-body)] rounded-xl hover:bg-[var(--bg-alt)] transition-colors font-medium"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Continue with Google
                    </button>
                  </motion.div>
                </motion.form>
              </AnimatePresence>
            </>
          ) : (
            /* OTP Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center w-full"
            >
              <h2 className="text-[var(--text-primary)] text-3xl font-bold mb-4 text-center">
                Verify your email
              </h2>
              <p className="text-[var(--text-muted)] text-[15px] text-center mb-10">
                We've sent a 6-digit code to <br/>
                <span className="text-[var(--text-body)] font-semibold">{email}</span>
              </p>

              <div className="flex gap-2 sm:gap-3 justify-center mb-10 w-full">
                {otpValues.map((v, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={v}
                    onChange={(e) => handleOtpChange(e, i)}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl bg-[var(--bg-main)] border border-[var(--border-mid)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] focus:shadow-[0_0_0_4px_var(--orange-soft)] transition-all"
                  />
                ))}
              </div>

              <div className="text-center">
                <p className="text-[var(--text-faint)] text-sm mb-2">Didn't receive the code?</p>
                <button className="text-[var(--orange)] text-sm font-semibold hover:text-[var(--orange-deep)] transition-colors">
                  Resend Code
                </button>
              </div>
              
              <button 
                onClick={() => setShowOtp(false)}
                className="mt-8 text-[var(--text-muted)] text-sm hover:text-[var(--text-primary)] transition-colors"
              >
                ← Back to sign up
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}