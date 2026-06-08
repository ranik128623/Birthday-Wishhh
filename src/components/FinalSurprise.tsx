/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Heart, Sparkles, Stars } from "lucide-react";
import { synth } from "./AudioSynth";
import { triggerConfetti } from "./Confetti";

interface FinalSurpriseProps {
  friendName: string;
}

export default function FinalSurprise({ friendName }: FinalSurpriseProps) {
  // states: 'initial' | 'countdown' | 'revealed'
  const [stage, setStage] = useState<"initial" | "countdown" | "revealed">("initial");
  const [countdownNum, setCountdownNum] = useState(3);

  const startCountdown = () => {
    setStage("countdown");
    setCountdownNum(3);
    synth.playClick();
  };

  // Countdown timer loop
  useEffect(() => {
    if (stage !== "countdown") return;

    if (countdownNum > 0) {
      const timer = setTimeout(() => {
        const nextNum = countdownNum - 1;
        setCountdownNum(nextNum);
        if (nextNum > 0) {
          synth.playClick();
        } else {
          // Play celebration sounds
          synth.playExplosion();
          synth.playTada();
          // Fire multiple confetti streams
          triggerConfetti(window.innerWidth * 0.25, window.innerHeight * 0.5, false);
          triggerConfetti(window.innerWidth * 0.75, window.innerHeight * 0.5, false);
          triggerConfetti(window.innerWidth * 0.5, window.innerHeight * 0.5, true);
          setStage("revealed");
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [countdownNum, stage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      id="final-surprise-section"
      className="bg-slate-800/50 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-700 text-center relative overflow-hidden backdrop-blur-md"
    >
      {/* Glow ambient background lights */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {stage === "initial" && (
          <motion.div
            key="initial-reward"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="py-6 flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-full flex items-center justify-center mb-4 shadow-lg animate-pulse">
              <Award className="w-8 h-8 font-bold" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-black font-display text-slate-100 mb-3 tracking-tight">
              🏆 ফাইনাল জন্মদিনের পুরস্কার!
            </h2>
            <p className="text-slate-300 text-xs md:text-sm font-sans max-w-sm mx-auto mb-8 leading-relaxed">
              আজকে পুরো দিন তুই সব পাগলামি সাফল্যের সাথে পার করেছিস! সেজন্য তোকে এই বিশেষ গ্র্যান্ড ট্রিবিউট দেওয়া হচ্ছে। নিচে ক্লিক করে তোর আসল পুরস্কার বুঝে নে!
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={startCountdown}
              id="get-reward-btn"
              className="px-8 py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-550 text-white font-black font-display text-lg md:text-xl rounded-2xl shadow-xl shadow-pink-500/10 hover:opacity-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer border border-pink-400/20"
            >
              <span>🎁 জন্মদিনের পুরস্কার গ্রহণ করো 🎁</span>
            </motion.button>
          </motion.div>
        )}

        {stage === "countdown" && (
          <motion.div
            key="countdown-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-12 flex flex-col items-center justify-center"
          >
            <span className="text-slate-400 font-mono text-[10px] uppercase tracking-widest mb-4">
              পুরস্কার ডিক্রিপ্ট করা হচ্ছে...
            </span>

            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Spinning background rays */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-amber-500 rounded-full blur-xl opacity-20 animate-ping duration-1000" />
              <div className="absolute inset-4 border-4 border-dashed border-pink-500/40 rounded-full animate-spin-slow" />
              <div className="absolute inset-8 bg-slate-900 border border-slate-700/60 rounded-full shadow-lg" />
              
              <motion.div
                key={countdownNum}
                initial={{ scale: 0.3, rotate: -45, opacity: 0 }}
                animate={{ scale: 1.1, rotate: 0, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="absolute font-display font-black text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-400 select-none"
              >
                {countdownNum}
              </motion.div>
            </div>

            <p className="mt-8 font-sans font-bold text-slate-400 text-xs md:text-sm animate-pulse">
              মেগা ব্লাস্টের জন্য প্রস্তুত থাকো! 💥🔥
            </p>
          </motion.div>
        )}

        {stage === "revealed" && (
          <motion.div
            key="revealed-reward"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="py-4 flex flex-col items-center animate-fade-in"
          >
            {/* Visual Header Sparkles */}
            <div className="flex gap-2 mb-2 text-amber-400 justify-center">
              <Stars className="w-8 h-8 animate-spin-slow" />
              <Sparkles className="w-8 h-8 animate-bounce" />
              <Stars className="w-8 h-8 animate-spin-slow" />
            </div>

            <h3 className="bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 font-black font-display text-2xl md:text-3xl text-transparent bg-clip-text tracking-wide mb-6">
              👑 জন্মদিনের মেগা পুরস্কার 👑
            </h3>

            {/* Prize Block (Obsidian card with warm gold text) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-md p-6 bg-slate-900/80 border border-amber-500/30 rounded-3xl shadow-xl shadow-amber-500/5 relative mb-6 hover:border-amber-500/50 transition-colors duration-300"
            >
              {/* Ribbons corners */}
              <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-amber-500 text-neutral-950 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest font-sans shadow-md">
                সেরা পুরস্কার
              </span>
              
              <div className="text-amber-200 font-display font-black text-lg md:text-xl leading-relaxed pt-3 text-center">
                &ldquo;আরও এক বছর পাগলামি, আরও এক বছর বন্ধুত্ব, আর আরও অনেক স্মৃতি একসাথে তৈরি করার সুযোগ! ❤️😂&rdquo;
              </div>
            </motion.div>

            {/* Heartfelt Final Message */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-md p-6 bg-pink-950/40 border border-pink-900/50 rounded-3xl text-left backdrop-blur-sm shadow-md"
            >
              <h4 className="font-extrabold font-sans text-pink-400 text-xs sm:text-sm uppercase tracking-wider mb-2.5 flex items-center gap-1.5 justify-center sm:justify-start">
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
                আমার মন থেকে তোর জন্য বার্তা
              </h4>
              <p className="text-slate-200 font-sans text-sm md:text-base leading-relaxed text-center sm:text-left font-bold">
                শুভ জন্মদিন বন্ধু! তোর জীবন যেন সুখ, শান্তি, সফলতা আর অনেক হাসিতে ভরে থাকে। আশা করি সামনে তোর জন্য অনেক চমৎকার কিছু অপেক্ষা করছে। ❤️🎂
              </p>
            </motion.div>

            {/* Repeat Animation Trigger */}
            <button
              onClick={() => {
                synth.playChime();
                triggerConfetti(undefined, undefined, true);
              }}
              className="mt-8 flex items-center gap-2 bg-slate-900 hover:bg-slate-800 px-5 py-2.5 border border-slate-700 rounded-full text-xs font-semibold font-sans text-pink-400 hover:text-pink-300 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <span>আবার ফেভারিট কনফেটি বিস্ফোরণ কর! 🎉</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
