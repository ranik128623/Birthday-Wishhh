/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gift, AlertCircle, Heart, RotateCcw } from "lucide-react";
import { synth } from "./AudioSynth";
import { triggerConfetti } from "./Confetti";

export default function GiftBox() {
  // states: 'closed' | 'shaking' | 'opened'
  const [giftState, setGiftState] = useState<"closed" | "shaking" | "opened">("closed");

  const handleOpenGift = () => {
    if (giftState !== "closed") return;

    setGiftState("shaking");
    synth.playSuspense();

    // After 1.6s of shaking suspense, burst open!
    setTimeout(() => {
      setGiftState("opened");
      synth.playTada();
      // Burst heavy emojis to match the dramatic mood!
      triggerConfetti(window.innerWidth / 2, window.innerHeight / 2, true);
    }, 1600);
  };

  const handleResetGift = () => {
    synth.playClick();
    setGiftState("closed");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      id="gift-box-section"
      className="bg-slate-800/50 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-700 text-center relative overflow-hidden backdrop-blur-md"
    >
      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-3 py-1 rounded-full font-bold font-sans inline-block mb-3">
        🎁 স্পেশাল সারপ্রাইজ গিফট 🎁
      </span>
      <h2 className="text-2xl md:text-3xl font-black font-display text-slate-100 mb-2">
        তোর জন্য বিশেষ উপহার!
      </h2>
      <p className="text-slate-400 text-xs md:text-sm font-sans max-w-sm mx-auto mb-8">
        অনেক চেষ্টার পর বাজেট ম্যানেজ করে তোর পছন্দের গিফট পাঠানো হয়েছে। নিচে ক্লিক করে আনবক্স কর!
      </p>

      <div className="min-h-[280px] flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {giftState === "closed" && (
            <motion.div
              key="closed-gift"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={handleOpenGift}
              className="cursor-pointer group flex flex-col items-center"
            >
              {/* Outer Glow container */}
              <div className="relative">
                <div className="absolute inset-0 bg-pink-500 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 1, -1, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className="w-40 h-40 bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-all duration-300 relative border border-white/10"
                >
                  <Gift className="w-20 h-20 text-white animate-pulse" />
                  {/* Decorative Ribbon Cross Lines */}
                  <div className="absolute inset-x-0 h-4 bg-amber-400 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <div className="absolute inset-y-0 w-4 bg-amber-400 left-1/2 -translate-x-1/2 pointer-events-none" />
                </motion.div>
              </div>

              <motion.p
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-pink-400 font-extrabold font-sans text-sm mt-6 bg-slate-900 px-4 py-2 rounded-full border border-slate-700 flex items-center gap-1.5 shadow-md animate-pulse"
              >
                <span>গিফট খুলতে এখানে টাচ কর! 👆</span>
              </motion.p>
            </motion.div>
          )}

          {giftState === "shaking" && (
            <motion.div
              key="shaking-gift"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center flex flex-col items-center"
            >
              <motion.div
                animate={{
                  x: [-8, 8, -8, 8, -6, 6, -4, 4, 0],
                  y: [-4, 4, -4, 4, -2, 2, 0],
                  rotate: [-3, 3, -3, 3, -1, 1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.35,
                  ease: "linear",
                }}
                className="w-40 h-40 bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 rounded-3xl flex items-center justify-center shadow-2xl relative border border-white/10"
              >
                <Gift className="w-20 h-20 text-white" />
                <div className="absolute inset-x-0 h-4 bg-amber-400 top-1/2 -translate-y-1/2" />
                <div className="absolute inset-y-0 w-4 bg-amber-400 left-1/2 -translate-x-1/2" />
              </motion.div>
              <p className="text-amber-400 font-bold font-sans text-xs md:text-sm mt-6 animate-pulse bg-amber-950/20 px-5 py-2 rounded-full border border-amber-900/30">
                প্যাকেট ডিক্রিপ্ট করা হচ্ছে... একটু ধৈর্য ধর! ⏳⚡
              </p>
            </motion.div>
          )}

          {giftState === "opened" && (
            <motion.div
              key="opened-gift"
              initial={{ scale: 0.85, opacity: 0, rotate: -3 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="w-full max-w-sm mx-auto p-6 bg-red-950/20 border border-red-900/45 rounded-3xl flex flex-col items-center shadow-lg"
            >
              {/* Empty wallet/broken heart visual */}
              <div className="relative mb-4">
                <div className="w-20 h-20 bg-red-950/50 rounded-full flex items-center justify-center text-red-400 border border-red-900/40">
                  <AlertCircle className="w-12 h-12" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-red-900 p-1 rounded-full shadow-md text-white font-extrabold text-[9px] px-1.5">
                  404
                </div>
              </div>

              {/* Reveal message */}
              <h3 className="text-2xl font-black font-display text-red-400 tracking-wide mb-2">
                💸 Error 404: টাকা পাওয়া যায়নি
              </h3>
              
              <div className="w-full h-[1px] bg-red-900/40 my-3" />

              <p className="text-slate-200 font-sans text-sm md:text-base font-bold flex items-center gap-1.5 justify-center py-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
                <span>বাজেটের অভাবে এই ভালোবাসা গ্রহণ করুন। ❤️</span>
              </p>

              <p className="text-xs text-slate-400 font-sans mt-2 max-w-xs leading-relaxed text-center">
                আসলে মূল গিফট হচ্ছে তোর সাথে এই নিখাদ বন্ধুত্ব! আর এই ফালতু ওয়েবসাইট বানাতে যে সময় লেগেছে সেটাও তো গিফটের চেয়ে কম কিছু না। কী বলিস? 😉
              </p>

              {/* Try again/close box */}
              <button
                onClick={handleResetGift}
                className="mt-6 flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded-full shadow-sm transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" /> আবার গিফট বন্ধ করো
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
