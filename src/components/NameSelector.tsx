/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Heart, HelpCircle, Gift } from "lucide-react";
import { synth } from "./AudioSynth";
import { triggerConfetti } from "./Confetti";

interface NameSelectorProps {
  onNameSelected: (name: string) => void;
}

export default function NameSelector({ onNameSelected }: NameSelectorProps) {
  const name = "Saimoon";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    synth.playClick();
    triggerConfetti(window.innerWidth / 2, window.innerHeight / 2, false);
    onNameSelected(name);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      id="name-selector-card"
      className="w-full max-w-md bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-slate-700 text-center relative overflow-hidden"
    >
      {/* Decorative Glow elements */}
      <div className="absolute -top-10 -left-10 w-24 h-24 bg-pink-500/10 rounded-full blur-xl opacity-70 animate-pulse pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl opacity-70 animate-pulse pointer-events-none" />

      <div className="flex justify-center mb-4">
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 6, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="relative"
        >
          <div className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-amber-400 animate-bounce" />
        </motion.div>
      </div>

      <h1 className="text-3xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-amber-400 to-emerald-400 mb-2 leading-tight tracking-tight">
        মজার জন্মদিন পোর্টাল 🎉
      </h1>
      <p className="text-slate-400 text-xs md:text-sm font-sans mb-6">
        তোর সেই স্পেশল পাগলা বন্ধুকে ট্রোল ও ভালোবাসার সংমিশ্রণে শুভকামনা জানাতে প্রস্তুত হ!
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        {/* Beautiful Lock display card indicating target name Saimoon */}
        <div className="p-6 bg-slate-900/80 border border-slate-700/60 rounded-2xl shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/10 rounded-full blur-xl pointer-events-none" />
          <span className="text-[10px] font-mono text-pink-400 uppercase tracking-widest block mb-2 font-bold flex items-center gap-1.5">
            <Heart className="w-3 h-3 fill-pink-500 text-pink-500" /> TARGET BIRTHDAY BOY 👑
          </span>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-amber-400 to-emerald-400 font-display tracking-tight">
            Saimoon
          </h2>
          <p className="text-slate-400 text-[11px] mt-3 font-sans leading-relaxed">
            নিশ্চিত করা হয়েছে! আজকের সম্পূর্ণ পোর্টাল সাইমনের জন্য লক করা আছে। 🔒
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          id="start-birthday-btn"
          className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-bold font-sans text-lg py-4 px-6 rounded-2xl shadow-xl shadow-pink-500/10 hover:opacity-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
        >
          ম্যাজিক শুরু করো! 🔮
        </motion.button>
      </form>

      <div className="mt-6 flex justify-center gap-1.5 items-center text-[10px] text-slate-500 font-mono">
        <span>v3.54-DANGER-ZONE</span>
        <span>•</span>
        <span>সম্পূর্ণ বাংলা এডিশন</span>
      </div>
    </motion.div>
  );
}
