"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import { PetSVG } from "@/components/pet/PetSVG";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new") === "true";
  const [greeting, setGreeting] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (isNew) {
      setGreeting("this is your space.");
      setTimeout(() => setGreeting("I'll be around."), 3000);
    } else {
      if (hour >= 6 && hour < 11) setGreeting("morning.");
      else if (hour >= 11 && hour < 17) setGreeting("you're back.");
      else if (hour >= 17 && hour < 22) setGreeting("hey.");
      else setGreeting("still up?");
    }
    
    setShowGreeting(true);
    const timer = setTimeout(() => setShowGreeting(false), 6000);
    return () => clearTimeout(timer);
  }, [isNew]);

  return (
    <section className="relative min-h-[calc(100vh-64px)] bg-cream py-16 px-4">
      <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-xl3 border border-border bg-surface p-8 shadow-soft">
            <h1 className="text-3xl font-bold">Your Focus Dashboard</h1>
            <p className="mt-3 text-text-secondary">
              Welcome{user?.fullName ? `, ${user.fullName}` : ""}. Track your app limits and mood shifts here.
            </p>
            <div className="mt-8 flex gap-3">
              <Button href="/demo">Open Demo</Button>
              <Button href="/" variant="secondary">Settings</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl2 border border-border bg-surface p-6">
              <h3 className="font-bold text-lg mb-2">Today&apos;s Focus</h3>
              <p className="text-3xl font-bold text-lavender">2h 14m</p>
              <p className="text-sm text-text-muted mt-1">15% less than yesterday</p>
            </div>
            <div className="rounded-xl2 border border-border bg-surface p-6">
              <h3 className="font-bold text-lg mb-2">Pet Health</h3>
              <p className="text-3xl font-bold text-petal">Optimal</p>
              <p className="text-sm text-text-muted mt-1">0 violations today</p>
            </div>
          </div>
        </div>

        {/* Sidebar / Pet Interaction */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl3 border border-border bg-surface p-8 flex flex-col items-center text-center">
            <div className="relative">
              <AnimatePresence>
                {showGreeting && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-text-primary text-white text-xs px-3 py-1.5 rounded-full"
                  >
                    {greeting}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-text-primary rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
              <PetSVG mood="happy" size={160} />
            </div>
            <h2 className="mt-4 text-xl font-bold">Buddy</h2>
            <p className="text-sm text-text-secondary mt-1 italic">Watching gently...</p>
          </div>
        </div>
      </div>

      {/* Floating Creature for First Arrival */}
      {isNew && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="fixed bottom-8 left-8"
        >
          {/* Subtle presence in the corner */}
        </motion.div>
      )}
    </section>
  );
}

