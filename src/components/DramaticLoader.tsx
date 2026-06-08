/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Server, UserCheck, AlertTriangle, ShieldAlert } from "lucide-react";
import { synth } from "./AudioSynth";

interface DramaticLoaderProps {
  friendName: string;
  onComplete: () => void;
}

interface Step {
  id: number;
  text: string;
  subText: string;
  icon: any;
  duration: number; // in ms
  color: string;
}

export default function DramaticLoader({ friendName, onComplete }: DramaticLoaderProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [percent, setPercent] = useState(0);

  const steps: Step[] = [
    {
      id: 1,
      text: "পৃথিবীর সবচেয়ে আজব মানুষকে খোঁজা হচ্ছে...",
      subText: "Scan Range: Global • Targets Evaluated: 8.2 Billion",
      icon: Search,
      duration: 1800,
      color: "text-blue-500",
    },
    {
      id: 2,
      text: "ডেটাবেজ স্ক্যান করা হচ্ছে...",
      subText: "Analyzing weird habits, funny laughter, and sleep schedules...",
      icon: Server,
      duration: 1800,
      color: "text-indigo-500",
    },
    {
      id: 3,
      text: `Birthday Person শনাক্ত করা হয়েছে! (${friendName})`,
      subText: "Target locked! High frequency happiness markers detected.",
      icon: UserCheck,
      duration: 1600,
      color: "text-emerald-500",
    },
    {
      id: 4,
      text: "অতিরিক্ত পাগলামি সনাক্ত করা হয়েছে! 🚨",
      subText: "System Warning: Madness index exceeds standard human capacity!",
      icon: ShieldAlert,
      duration: 1600,
      color: "text-rose-500",
    },
  ];

  // Increment step and sound trigger
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const runStep = (idx: number) => {
      if (idx >= steps.length) {
        // All finished! Trigger callback
        setTimeout(() => {
          onComplete();
        }, 500);
        return;
      }

      setCurrentStepIdx(idx);

      // Play matching sounds
      if (idx === 0 || idx === 1) {
        synth.playScan();
      } else if (idx === 2) {
        synth.playChime();
      } else if (idx === 3) {
        synth.playAlert();
      }

      timer = setTimeout(() => {
        runStep(idx + 1);
      }, steps[idx].duration);
    };

    runStep(0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Percent counter simulation
  useEffect(() => {
    let start = 0;
    const end = 100;
    const totalDuration = steps.reduce((sum, s) => sum + s.duration, 0) - 200;
    const stepTime = Math.floor(totalDuration / end);

    const interval = setInterval(() => {
      start += 1;
      if (start > end) {
        clearInterval(interval);
      } else {
        setPercent(start);
        if (start % 15 === 0) {
          synth.playClick();
        }
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  const ActiveIcon = steps[currentStepIdx]?.icon || Search;

  return (
    <div id="dramatic-loader" className="w-full max-w-lg bg-neutral-950/95 border border-neutral-800 rounded-3xl p-8 md:p-10 shadow-2xl text-center relative overflow-hidden backdrop-blur-xl">
      {/* Target scanning reticle lines */}
      <div className="absolute inset-0 pointer-events-none border border-red-500/10 rounded-3xl m-3" />
      <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent animate-pulse" />

      {/* Futuristic Radar Element */}
      <div className="relative w-36 h-36 mx-auto mb-8 flex items-center justify-center">
        {/* Pulsing rings */}
        <div className="absolute inset-0 border-2 border-red-500/20 rounded-full animate-ping duration-1000" />
        <div className="absolute inset-2 border-2 border-dashed border-red-500/30 rounded-full animate-spin-slow" />
        <div className="absolute inset-6 border border-neutral-800 rounded-full" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIdx}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-lg ${steps[currentStepIdx]?.color}`}
          >
            <ActiveIcon className="w-8 h-8" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bars */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 px-1 text-xs font-mono">
          <span className="text-neutral-500 uppercase tracking-widest flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
            Scanner Active
          </span>
          <span className="text-red-500 font-bold">{percent}%</span>
        </div>
        <div className="w-full h-3 bg-neutral-900 rounded-full overflow-hidden p-[2px] border border-neutral-800">
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 rounded-full"
            style={{ width: `${percent}%` }}
            layoutId="scanning-bar-progress"
          />
        </div>
      </div>

      {/* Status updates log */}
      <div className="min-h-[100px] flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            <h2 className="text-xl md:text-2xl font-extrabold font-display text-white tracking-wide">
              {steps[currentStepIdx]?.text}
            </h2>
            <p className="text-neutral-400 font-mono text-xs tracking-tight">
              {steps[currentStepIdx]?.subText}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer warning line */}
      <div className="mt-8 pt-6 border-t border-neutral-900 flex justify-between items-center text-[10px] text-neutral-600 font-mono">
        <span>LOC_ID: 2026.SYS</span>
        <span className="text-red-500 animate-pulse flex items-center gap-1 font-semibold">
          <AlertTriangle className="w-2.5 h-2.5" /> DEVIATION_MADNESS = HIGH
        </span>
      </div>
    </div>
  );
}
