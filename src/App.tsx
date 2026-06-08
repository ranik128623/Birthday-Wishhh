/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, RotateCcw, Heart, Gift, Laugh, Sparkles } from "lucide-react";

import NameSelector from "./components/NameSelector";
import DramaticLoader from "./components/DramaticLoader";
import BirthdayReportCard from "./components/BirthdayReportCard";
import DangerousButton from "./components/DangerousButton";
import GiftBox from "./components/GiftBox";
import FriendshipStats from "./components/FriendshipStats";
import FinalSurprise from "./components/FinalSurprise";
import Confetti, { triggerConfetti } from "./components/Confetti";
import { synth } from "./components/AudioSynth";

type AppStage = "name-selection" | "dramatic-loading" | "birthday-celebration";

export default function App() {
  const [stage, setStage] = useState<AppStage>("name-selection");
  const [friendName, setFriendName] = useState("Saimoon");
  const [soundOn, setSoundOn] = useState(true);
  const [isShaking, setIsShaking] = useState(false);

  // Trigger sound toggle
  const toggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    synth.setEnabled(newState);
    synth.playClick();
  };

  // Trigger full page shake
  const triggerPageShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 600);
  };

  // Reset to beginning
  const handleRestart = () => {
    synth.playClick();
    setStage("name-selection");
  };

  // Start scanning
  const handleNameSelected = (selectedName: string) => {
    setFriendName(selectedName);
    setStage("dramatic-loading");
  };

  // End scanning, start party
  const handleScanningComplete = () => {
    setStage("birthday-celebration");
    // Initial blast
    setTimeout(() => {
      triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.3, false);
      synth.playTada();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-slate-950 text-slate-200 antialiased font-sans relative overflow-x-hidden selection:bg-slate-800 selection:text-pink-400">
      {/* Confetti canvas renders globally */}
      <Confetti />

      {/* Universal Audio Control Bar */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={toggleSound}
          title={soundOn ? "মিউজিক বন্ধ করো" : "মিউজিক চালু করো"}
          className="p-3 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-full shadow-lg backdrop-blur-md text-slate-300 hover:text-pink-400 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          {soundOn ? <Volume2 className="w-5 h-5 animate-pulse text-pink-400" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
        </button>

        {stage === "birthday-celebration" && (
          <button
            onClick={handleRestart}
            title="নতুন কোনো বন্ধুর জন্মদিন"
            className="p-3 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-full shadow-lg backdrop-blur-md text-slate-300 hover:text-indigo-400 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
          >
            <RotateCcw className="w-5 h-5 text-emerald-400" />
          </button>
        )}
      </div>

      {/* App brand badge top left */}
      <div className="absolute top-4 left-4 z-40 pointer-events-none select-none hidden md:flex items-center gap-1.5 bg-slate-800/50 border border-slate-700 px-3.5 py-2 rounded-full backdrop-blur-sm text-xs font-mono text-slate-400 font-bold">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
        <span className="uppercase tracking-widest text-[10px]">STATUS: পাগলামি সনাক্ত করা হয়েছে 🚨</span>
      </div>

      <main className="min-h-screen flex items-center justify-center p-4 py-12 md:p-8">
        <AnimatePresence mode="wait">
          {/* STEP 1: Personalization Name Selection */}
          {stage === "name-selection" && (
            <div key="select-screen" className="w-full flex justify-center">
              <NameSelector onNameSelected={handleNameSelected} />
            </div>
          )}

          {/* STEP 2: Cinematic Progressive Scanner */}
          {stage === "dramatic-loading" && (
            <div key="loading-screen" className="w-full flex justify-center">
              <DramaticLoader friendName={friendName} onComplete={handleScanningComplete} />
            </div>
          )}

          {/* STEP 3: Complete Scrollboard Celebration View */}
          {stage === "birthday-celebration" && (
            <motion.div
              key="celebration-screen"
              animate={
                isShaking
                  ? {
                      x: [0, -14, 14, -14, 14, -8, 8, -4, 4, 0],
                      y: [0, -6, 6, -6, 6, -3, 3, -1, 1, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full max-w-2xl space-y-8 py-8"
            >
              {/* Massive Header Greeting Panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => {
                  synth.playChime();
                  triggerConfetti();
                }}
                className="bg-slate-800/50 rounded-3xl p-6 md:p-10 shadow-2xl border border-slate-700 text-center relative overflow-hidden cursor-pointer group backdrop-blur-md"
              >
                {/* Visual glow background lights */}
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Sleek control status lights */}
                <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"></div>
                    <div className="w-3 w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]"></div>
                    <div className="w-3 w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-900 px-2.5 py-1 rounded text-emerald-400 border border-slate-800 uppercase tracking-wider font-bold">
                    CELEBRATION STATUS: ACTIVE
                  </span>
                </div>

                {/* Animated launcher badges */}
                <div className="flex justify-center gap-3 mb-4 relative">
                  <motion.span
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.1 }}
                    className="text-4xl filter drop-shadow-md select-none"
                    role="img"
                  >
                    🎈
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 2.4, delay: 0.3 }}
                    className="text-4xl filter drop-shadow-md select-none"
                    role="img"
                  >
                    🎁
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, delay: 0.5 }}
                    className="text-4xl filter drop-shadow-md select-none"
                    role="img"
                  >
                    🎂
                  </motion.span>
                </div>

                <motion.h1
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="text-3xl md:text-5xl font-black font-display leading-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-amber-400 to-emerald-400 tracking-tight"
                >
                  🎉 শুভ জন্মদিন {friendName}! 🎉
                </motion.h1>

                <p className="text-slate-300 font-sans text-xs md:text-sm mt-4 leading-relaxed max-w-lg mx-auto">
                  তোর এই ঐতিহাসিক শুভ জন্মদিনে জানাই পৃথিবীর সব চেয়ে বড় শুভেচ্ছা! তুই একাধারে আমাদের বিনোদন, ডবল জিপিএ ফেইল ট্রেনার এবং সেরা সাপোর্ট সিস্টেম। আজকের পুরো দিনটি তোকে উৎসর্গ করা হলো! 💖🥂
                </p>

                {/* Sparkling tiny micro indicators */}
                <div className="mt-8 flex justify-center flex-wrap gap-4 text-slate-400 font-sans font-bold text-xs border-t border-slate-700/60 pt-4">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/60 rounded-full border border-slate-800">
                    <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" /> রোস্টিং মোড একটিভ
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/60 rounded-full border border-slate-800">
                    <Laugh className="w-3.5 h-3.5 text-amber-400" /> ১০০% বিনোদন
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/60 rounded-full border border-slate-800">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> আনলিমিটেড ভালোবাসা
                  </span>
                </div>
              </motion.div>

              {/* SECTION 1: Birthday Report Card */}
              <BirthdayReportCard friendName={friendName} />

              {/* SECTION 2: Danger Command Button Block */}
              <DangerousButton friendName={friendName} onShake={triggerPageShake} />

              {/* SECTION 3: Suspense Unpack Gift Box */}
              <GiftBox />

              {/* SECTION 4: Friendship Statistics Dashboard */}
              <FriendshipStats />

              {/* FINAL SECTION: Final Countdown & Deep Hearty Messages */}
              <FinalSurprise friendName={friendName} />

              {/* Bottom Copyright and Love Signboard */}
              <footer className="text-center pt-8 pb-12 text-xs text-slate-500 font-sans space-y-2">
                <p>তোর প্রিয় বন্ধুদের পক্ষ থেকে অত্যন্ত ভালোবাসা দিয়ে নির্মিত ❤️</p>
                <p className="font-mono text-[9px] tracking-widest uppercase">
                  No databases were harmed during this birthday scan.
                </p>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
