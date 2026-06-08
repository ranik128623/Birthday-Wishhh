/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, AlertOctagon, HelpCircle, AlertTriangle, ShieldCheck } from "lucide-react";
import { synth } from "./AudioSynth";
import { triggerConfetti } from "./Confetti";

interface DangerousButtonProps {
  friendName: string;
  onShake: () => void;
}

interface WarningPayload {
  id: string;
  title: string;
  text: string;
  color: string;
  icon: string;
}

export default function DangerousButton({ friendName, onShake }: DangerousButtonProps) {
  const [clickCount, setClickCount] = useState(0);
  const [activeWarnings, setActiveWarnings] = useState<WarningPayload[]>([]);

  const warningsList: WarningPayload[] = [
    {
      id: "ageing-alert",
      title: "🚨 বার্ধক্য সতর্কতা!",
      text: `অভিনন্দন! তুই আরও এক বছর বুড়ো হলি 😂 আর কোনো ছাড় নাই!`,
      color: "bg-red-950/40 border-red-900/50 text-red-200",
      icon: "👴",
    },
    {
      id: "free-trial-done",
      title: "⏳ সাবস্ক্রিপশন সমাপ্তি!",
      text: "শৈশবের ফ্রি ট্রায়াল শেষ! এখন থেকে সকল ভুলের জন্য নিজে জরিমানা দিবি।",
      color: "bg-amber-950/40 border-amber-900/50 text-amber-200",
      icon: "💳",
    },
    {
      id: "responsibilities",
      title: "⚙️ গুরু দায়িত্ব ওভারলোড!",
      text: "দায়িত্ব আপডেট ডাউনলোড হচ্ছে... ৯০% সম্পন্ন। আড্ডা কমানোর নোটিশ পাঠানো হয়েছে।",
      color: "bg-blue-950/40 border-blue-900/50 text-blue-200",
      icon: "📦",
    },
    {
      id: "hairloss",
      title: "💇‍♂️ মাথার আবহাওয়া রিপোর্ট!",
      text: "চুল পড়া শুরু হলে আমরা দায়ী না। অবিলম্বে চিকিৎসকের পরামর্শ নে। 😭",
      color: "bg-rose-950/40 border-rose-900/50 text-rose-200",
      icon: "🧼",
    },
  ];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Increment clicks and play sound
    const newCount = clickCount + 1;
    setClickCount(newCount);
    synth.playBoing();
    onShake(); // Shakes parent container

    // Add corresponding warning
    const warningIdx = (newCount - 1) % warningsList.length;
    const warningToPush = {
      ...warningsList[warningIdx],
      id: `${warningsList[warningIdx].id}-${Date.now()}`, // unique id to allow multiple
    };

    setActiveWarnings((prev) => [warningToPush, ...prev].slice(0, 4));

    // Confetti burst from button coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    triggerConfetti(x, y, true);

    // Extra trigger for 5+ clicks
    if (newCount > 4) {
      synth.playAlert();
    }
  };

  const handleClear = () => {
    synth.playClick();
    setActiveWarnings([]);
    setClickCount(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      id="dangerous-button-section"
      className="bg-neutral-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-neutral-800 relative overflow-hidden"
    >
      {/* Visual cyber warning grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="text-center relative z-10 mb-6">
        <span className="bg-red-500/10 text-red-400 border border-red-500/30 text-xs px-3.5 py-1.5 rounded-full font-bold font-sans inline-block mb-3 animate-pulse">
          ⚠️ অতি বিপজ্জনক এলাকা ⚠️
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold font-display leading-snug">
          বিপজ্জনক বাটন টেস্ট
        </h2>
        <p className="text-neutral-400 text-xs md:text-sm font-sans max-w-sm mx-auto mt-2">
          এই বাটনটি অত্যন্ত স্পর্শকাতর। দয়া করে কোনো অবস্থাতেই এটি স্পর্শ করবে না!
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 py-4 relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.90 }}
          onClick={handleClick}
          className={`px-8 py-6 rounded-2xl font-display font-extrabold text-base md:text-lg shadow-2xl transition-all duration-300 cursor-pointer flex flex-col items-center gap-2 select-none border-t-2 border-b-4 ${
            clickCount === 0
              ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 border-red-400 border-b-red-800 text-white shadow-red-900/30"
              : "bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 border-yellow-300 border-b-amber-800 text-neutral-900 shadow-yellow-900/20"
          }`}
        >
          <div className="flex items-center gap-2 text-xl md:text-2xl animate-bounce">
            <Flame className="w-6 h-6 fill-amber-200" />
            <span>⚠️ এই বাটনে চাপ দিয়ো না ⚠️</span>
            <Flame className="w-6 h-6 fill-amber-200" />
          </div>
          <span className="text-[11px] font-mono tracking-wider opacity-90 uppercase">
            {clickCount === 0 ? "নিষেধাজ্ঞা অমান্য করার চেষ্টা করিস না" : `মোট ক্লিক করা হয়েছে: ${clickCount} বার!`}
          </span>
        </motion.button>

        {clickCount > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleClear}
            className="text-xs text-neutral-500 hover:text-white transition-colors underline underline-offset-4 font-sans cursor-pointer"
          >
            সতর্কতাগুলি রিমুভ করে ভুল সংশোধন করো 🛡️
          </motion.button>
        )}
      </div>

      {/* Slide-in Dynamic Warnings Container */}
      <div className="mt-4 space-y-3 relative z-10 max-w-md mx-auto">
        <AnimatePresence>
          {activeWarnings.map((warning, index) => (
            <motion.div
              key={warning.id}
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, x: 50 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className={`p-4 rounded-xl border flex items-start gap-3 shadow-md ${warning.color}`}
            >
              <div className="text-2xl select-none" role="img">
                {warning.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold font-display text-sm flex items-center justify-between gap-2">
                  <span>{warning.title}</span>
                  <span className="text-[9px] font-mono uppercase bg-black/5 px-1.5 py-0.5 rounded">
                    Splat #{activeWarnings.length - index}
                  </span>
                </h3>
                <p className="text-xs font-sans mt-1 font-medium leading-relaxed">
                  {warning.text}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {clickCount === 0 && (
        <div className="text-center mt-4 text-[10px] text-neutral-600 font-mono tracking-widest flex items-center justify-center gap-1.5">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>DO_NOT_CLICK_FOR_YOUR_OWN_SAFETY // VER-2.06</span>
        </div>
      )}
    </motion.div>
  );
}
