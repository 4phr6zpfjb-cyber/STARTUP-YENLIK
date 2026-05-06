"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { PetSVG } from "@/components/pet/PetSVG";
import { Button } from "@/components/ui/Button";
import { OTPInput } from "@/components/ui/OTPInput";
import { CreatureType } from "@/types";

type Screen = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export default function OnboardingPage() {
  const [screen, setScreen] = useState<Screen>(0);
  const [type, setType] = useState<CreatureType>("fox");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vices, setVices] = useState<string[]>([]);
  const [demoProgress, setDemoProgress] = useState(0);
  const [demoInterrupted, setDemoInterrupted] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const router = useRouter();

  // Screen 0 -> 1 transition
  useEffect(() => {
    if (screen === 0) {
      const timer = setTimeout(() => setScreen(1), 2800);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // Screen 11 Timer
  useEffect(() => {
    if (resendTimer > 0) {
      const t = setInterval(() => setResendTimer(s => s - 1), 1000);
      return () => clearInterval(t);
    }
  }, [resendTimer]);

  // Screen 7 (Demo) logic
  useEffect(() => {
    if (screen === 7) {
      const interval = setInterval(() => {
        setDemoProgress((p) => {
          if (p >= 18) {
            setDemoInterrupted(true);
            clearInterval(interval);
            return 18;
          }
          return p + 3; // Fast forward for demo
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [screen]);

  const next = () => setScreen((s) => (s + 1) as Screen);

  const handleSendOtp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      setScreen(10);
      setResendTimer(30);
      // Auto transition to Screen 11 after the envelope animation
      setTimeout(() => setScreen(11), 3000);
    } catch (e) {
      console.error(e);
      alert("Error sending code. Please try again.");
    }
  };

  const handleVerifyOtp = async (token: string) => {
    try {
      setOtpError(false);
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email"
      });
      if (error) throw error;
      
      // Success!
      setScreen(12);
      setIsJumping(true);
      setTimeout(() => {
        router.push("/dashboard?new=true");
      }, 2200);
    } catch (e) {
      setOtpError(true);
      setTimeout(() => setOtpError(false), 1000);
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#05070A] text-[#F8F6FF] selection:bg-lavender/30">
      <AnimatePresence mode="wait">
        {/* ... (Existing screens 0-8) ... */}
        {screen < 9 && (
          <AnimatePresence mode="wait">
            {screen === 0 && (
              <motion.div key="s0" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="flex h-full items-center justify-center bg-black">
                <PetSVG mood="eyes" size={200} />
              </motion.div>
            )}
            {screen === 1 && (
              <motion.div key="s1" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="flex h-full flex-col items-center justify-center p-8">
                <PetSVG mood="happy" type={type} size={160} />
                <div className="mt-12 text-center">
                  <motion.p variants={textVariants} initial="initial" animate="animate" className="text-xl font-light tracking-wide opacity-80">oh. you opened me.</motion.p>
                  <motion.p variants={textVariants} initial="initial" animate="animate" transition={{ delay: 1.2 }} className="mt-4 text-2xl font-medium">hi.</motion.p>
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="absolute bottom-16">
                  <button onClick={next} className="text-lg font-light tracking-widest opacity-50 hover:opacity-100 transition-opacity">...hi?</button>
                </motion.div>
              </motion.div>
            )}
            {screen === 2 && (
              <motion.div key="s2" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="flex h-full flex-col items-center justify-center p-8 text-center">
                <PetSVG mood="happy" type={type} size={120} />
                <div className="mt-12 space-y-4 max-w-sm">
                  <motion.p variants={textVariants} initial="initial" animate="animate">I&apos;m going to be honest with you.</motion.p>
                  <motion.p variants={textVariants} initial="initial" animate="animate" transition={{ delay: 0.8 }}>I&apos;m not an app.</motion.p>
                  <motion.p variants={textVariants} initial="initial" animate="animate" transition={{ delay: 1.6 }}>I&apos;m more like... a presence.</motion.p>
                </div>
                <div className="mt-16 flex gap-8">
                  <button onClick={next} className="text-sm opacity-40 hover:opacity-100 transition-opacity">okay, weird</button>
                  <button onClick={next} className="text-sm font-medium text-lavender hover:text-lavender-deep transition-colors">tell me more</button>
                </div>
              </motion.div>
            )}
            {screen === 3 && (
              <motion.div key="s3" variants={containerVariants} initial="initial" animate="animate" exit="exit" onClick={next} className="flex h-full flex-col items-center justify-center p-8 text-center cursor-pointer">
                <div className="relative mb-12"><div className="absolute inset-0 bg-lavender/10 blur-3xl rounded-full" /><PetSVG mood="tired" type={type} size={140} /></div>
                <div className="space-y-4 max-w-sm">
                  <p className="text-lg opacity-80">You know that feeling.</p>
                  <p className="text-lg opacity-80">You open your phone for 2 minutes.</p>
                  <p className="text-3xl font-bold text-lavender">It&apos;s been 47.</p>
                  <p className="pt-8 text-sm opacity-50 italic">I notice that stuff. Gently.</p>
                </div>
                <div className="mt-20 text-[10px] uppercase tracking-[0.2em] opacity-30">tap anywhere</div>
              </motion.div>
            )}
            {screen === 4 && (
              <motion.div key="s4" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="flex h-full flex-col items-center justify-center p-8">
                <h2 className="mb-16 text-2xl font-light">who do you want with you?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl">
                  {(["fox", "bear", "ghost"] as CreatureType[]).map((t) => (
                    <button key={t} onClick={() => { setType(t); next(); }} className="group flex flex-col items-center p-6 rounded-2xl border border-white/5 hover:border-lavender/30 hover:bg-white/5 transition-all">
                      <PetSVG mood="happy" type={t} size={100} /><span className="mt-4 text-lg font-medium capitalize">{t}</span>
                      <span className="mt-2 text-xs opacity-40 italic">
                        {t === "fox" && "curious. sharp. chaotic."}{t === "bear" && "calm. slow. won't rush."}{t === "ghost" && "quiet. just there. safe."}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
            {screen === 5 && (
              <motion.div key="s5" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="flex h-full flex-col items-center justify-center p-8 text-center">
                <PetSVG mood="happy" type={type} size={160} />
                <div className="mt-12 space-y-6 max-w-sm">
                  <p className="text-xl font-light">does it have a name?</p>
                  <input autoFocus type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="call it something" className="w-full bg-transparent border-b border-white/20 py-2 text-center text-2xl focus:border-lavender outline-none transition-colors" />
                  <div className="pt-8 flex flex-col gap-4">
                    <Button onClick={next} disabled={!name} className="w-full">Continue</Button>
                    <button onClick={next} className="text-sm opacity-40 hover:opacity-100">skip for now →</button>
                  </div>
                </div>
              </motion.div>
            )}
            {screen === 6 && (
              <motion.div key="s6" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="flex h-full flex-col items-center justify-center p-8">
                <div className="mb-12 text-center"><h2 className="text-2xl font-light">one thing.</h2><p className="mt-2 text-sm opacity-50">what&apos;s the thing that eats your time most?</p></div>
                <div className="grid grid-cols-2 gap-4 max-w-sm w-full">
                  {["social media", "YouTube / video", "gaming", "just... lying there"].map((v) => (
                    <button key={v} onClick={() => setVices(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} className={`p-4 rounded-xl border text-sm transition-all ${vices.includes(v) ? "bg-lavender/20 border-lavender text-lavender" : "border-white/10 hover:border-white/30"}`}>{v}</button>
                  ))}
                </div>
                <div className="mt-12 text-center"><p className="text-[10px] uppercase tracking-widest opacity-30 mb-6">be honest, it&apos;s just us</p><Button onClick={next} disabled={vices.length === 0} className="px-12">that&apos;s it</Button></div>
              </motion.div>
            )}
            {screen === 7 && (
              <motion.div key="s7" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="relative flex h-full items-center justify-center overflow-hidden">
                <div className="w-full max-w-md h-[80vh] bg-[#121212] rounded-3xl border border-white/10 overflow-hidden flex flex-col opacity-40 blur-[2px]">
                   <div className="h-16 border-b border-white/5 flex items-center px-4 justify-between"><div className="w-24 h-4 bg-white/10 rounded" /><div className="w-18 h-8 rounded-full bg-white/5" /></div>
                   <div className="flex-1 p-4 space-y-8">{[1,2,3].map(i => (<div key={i} className="space-y-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white/10" /><div className="w-32 h-3 bg-white/10 rounded" /></div><div className="aspect-square bg-white/5 rounded-xl" /></div>))}</div>
                </div>
                <div className="absolute top-12 right-12 text-lg font-mono text-white/50">{demoProgress} minutes</div>
                <AnimatePresence>{demoInterrupted && (
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} className="absolute inset-0 bg-[#05070A]/95 flex flex-col items-center justify-center p-8 text-center">
                    <PetSVG mood="sad" type={type} size={180} />
                    <div className="mt-8 space-y-4 max-w-xs"><p className="text-xl font-medium">{type === "fox" && "hey. still here?"}{type === "bear" && "..."}{type === "ghost" && "18 minutes."}</p><p className="text-sm opacity-60">{type === "fox" && "you said social media was the thing. just checking."}{type === "bear" && "you've been scrolling for a bit. no rush. just noticed."}{type === "ghost" && ""}</p></div>
                    <div className="mt-12 flex flex-col gap-4 w-full max-w-xs"><Button onClick={next}>okay, I&apos;ll stop</Button><button onClick={next} className="text-sm opacity-40 hover:opacity-100">5 more minutes</button></div>
                  </motion.div>
                )}</AnimatePresence>
              </motion.div>
            )}
            {screen === 8 && (
              <motion.div key="s8" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="flex h-full flex-col items-center justify-center p-8 text-center">
                <PetSVG mood="happy" type={type} size={140} /><div className="mt-12 space-y-4 max-w-sm"><p className="text-lg opacity-80 font-light italic tracking-wide">that&apos;s what I do.</p><p className="text-lg opacity-80 font-light italic tracking-wide">not constantly. just when it matters.</p><p className="pt-8 text-2xl font-medium">want me to stick around?</p></div>
                <div className="mt-16 flex flex-col gap-4 w-full max-w-xs"><Button onClick={next}>yes</Button><button onClick={() => setScreen(3)} className="text-sm opacity-40 hover:opacity-100 underline underline-offset-4">how does it work first?</button></div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {screen === 9 && (
          <motion.div 
            key="screen9"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex h-full flex-col items-center justify-center p-8 text-center"
          >
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }}>
              <PetSVG mood="happy" type={type} size={220} />
            </motion.div>
            <div className="mt-12 space-y-4 max-w-sm">
              <p className="text-2xl font-medium">I can remember you.</p>
              <p className="text-sm opacity-50">so next time you open this, I&apos;m already here.</p>
            </div>
            <div className="mt-12 w-full max-w-sm space-y-6">
               <div className="space-y-4">
                 <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-lavender outline-none transition-all"
                 />
                 <Button onClick={handleSendOtp} disabled={!email.includes("@")} className="w-full">save with email</Button>
               </div>
               <button onClick={() => router.push("/dashboard")} className="text-xs opacity-20 hover:opacity-100 transition-opacity">continue without saving</button>
            </div>
          </motion.div>
        )}

        {screen === 10 && (
          <motion.div 
            key="screen10"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex h-full flex-col items-center justify-center p-8 text-center"
          >
            <div className="relative">
              <motion.div
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: 300, opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeIn", delay: 0.5 }}
                className="absolute top-0 left-0"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.div>
              <PetSVG mood="happy" type={type} size={160} />
            </div>
            <div className="mt-12 space-y-4">
              <motion.p variants={textVariants} initial="initial" animate="animate">sent.</motion.p>
              <motion.p variants={textVariants} initial="initial" animate="animate" transition={{ delay: 0.8 }} className="text-sm opacity-60">check {email} for a 6-digit code.</motion.p>
              <motion.p variants={textVariants} initial="initial" animate="animate" transition={{ delay: 1.6 }} className="text-lg font-medium">I&apos;ll wait.</motion.p>
              <motion.div 
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex gap-1 justify-center pt-8"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              </motion.div>
            </div>
            <button 
              onClick={() => setScreen(9)}
              className="absolute bottom-16 text-xs opacity-30 hover:opacity-100 underline"
            >
              wrong email? go back
            </button>
          </motion.div>
        )}

        {screen === 11 && (
          <motion.div 
            key="screen11"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex h-full flex-col items-center justify-center p-8 text-center"
          >
            <PetSVG mood="happy" type={type} size={120} />
            <div className="mt-12 w-full max-w-sm space-y-8">
              <div>
                <p className="text-[13px] text-white/40 mb-4 tracking-wide uppercase">6-digit code</p>
                <OTPInput 
                  onComplete={handleVerifyOtp} 
                  isError={otpError} 
                  accentColor={type === "fox" ? "#FF8C42" : type === "bear" ? "#A5A58D" : "#B8A9F0"} 
                />
              </div>
              
              <AnimatePresence>
                {resendTimer > 0 ? (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs opacity-30">
                    resend in 0:{resendTimer.toString().padStart(2, "0")}
                  </motion.p>
                ) : (
                  <motion.button 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    onClick={handleSendOtp}
                    className="text-xs opacity-60 hover:opacity-100 text-lavender font-medium"
                  >
                    didn&apos;t get it? resend →
                  </motion.button>
                )}
              </AnimatePresence>

              {otpError && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                  <p className="text-petal font-medium italic">hmm. that&apos;s not it.</p>
                  <p className="text-xs opacity-40">try again?</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {screen === 12 && (
          <motion.div 
            key="screen12"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex h-full flex-col items-center justify-center p-8 text-center overflow-hidden"
          >
            <motion.div
              animate={isJumping ? { y: [0, -40, 0] } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <PetSVG mood="happy" type={type} size={180} />
            </motion.div>
            <div className="mt-12 space-y-4">
              <motion.p variants={textVariants} initial="initial" animate="animate">there you are.</motion.p>
              <motion.p variants={textVariants} initial="initial" animate="animate" transition={{ delay: 0.8 }} className="text-2xl font-bold">all set.</motion.p>
            </div>

            {/* Walking away animation */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: 500 }}
              transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

