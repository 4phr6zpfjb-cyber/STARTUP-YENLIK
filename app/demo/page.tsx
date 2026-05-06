"use client";

import { useEffect } from "react";
import { useDemoStore } from "@/store/demoStore";
import { AppTimer } from "@/components/demo/AppTimer";
import { PetDisplay } from "@/components/demo/PetDisplay";
import { AddictionMeter } from "@/components/demo/AddictionMeter";
import { OverlayDemo } from "@/components/demo/OverlayDemo";
import { Button } from "@/components/ui/Button";

export default function DemoPage() {
  const { 
    phase, 
    seconds, 
    limitSeconds, 
    isRunning, 
    appName, 
    blockCountdown, 
    violationCount,
    petMood,
    tick, 
    toggle, 
    reset, 
    skipToLimit, 
    countdownTick 
  } = useDemoStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && phase !== "blocked") {
      interval = setInterval(() => {
        tick();
      }, 1000);
    } else if (phase === "blocked") {
      interval = setInterval(() => {
        countdownTick();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, phase, tick, countdownTick]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-cream p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Interactive Demo</h1>
            <p className="text-text-secondary">Experience how TimeBuddy protects your focus in real-time.</p>
          </div>
          <Button href="/" variant="secondary">Exit Demo</Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Controls & Stats */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-xl3 border border-border bg-surface p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold">App Tracking</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-secondary">App:</span>
                  <span className="font-bold text-lavender-deep">{appName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-secondary">Status:</span>
                  <span className={`text-sm font-bold ${isRunning ? "text-green-500" : "text-amber-500"}`}>
                    {isRunning ? "Active" : "Paused"}
                  </span>
                </div>
                <Button onClick={toggle} className="w-full">
                  {isRunning ? "Pause Session" : "Start Session"}
                </Button>
                <Button onClick={reset} variant="secondary" className="w-full">
                  Reset Demo
                </Button>
                <button 
                  onClick={skipToLimit}
                  className="w-full text-xs text-text-secondary hover:underline"
                >
                  Skip to limit (90%)
                </button>
              </div>
            </div>

            <AddictionMeter violationCount={violationCount} />
          </div>

          {/* Right Column: Visual Feedback */}
          <div className="relative lg:col-span-2">
            <div className="h-full rounded-xl3 border border-border bg-surface p-8 shadow-sm">
              <div className="flex flex-col items-center justify-center space-y-12">
                <PetDisplay mood={petMood} />
                <AppTimer seconds={seconds} limitSeconds={limitSeconds} />
              </div>

              <OverlayDemo phase={phase} blockCountdown={blockCountdown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
