/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sparkles, MessageCircle, Heart, Zap, Coffee } from "lucide-react";
import { synth } from "./AudioSynth";
import { triggerConfetti } from "./Confetti";

export default function FriendshipStats() {
  const stats = [
    {
      id: "laughing",
      label: "একসাথে হাসাহাসি",
      value: 100,
      icon: MessageCircle,
      subText: "হাসতে হাসতে পেট ফাঁতা লেভেলে! 😂",
      color: "bg-emerald-500",
      rating: "অনিয়ন্ত্রিত"
    },
    {
      id: "useless-stuff",
      label: "আজাইরা কাজ",
      value: 99,
      icon: Coffee,
      subText: "বাকি ১% শুধুমাত্র ঘুমানো ও খাওয়ার সময়! 🛌",
      color: "bg-amber-500",
      rating: "বিশ্ব রেকর্ড"
    },
    {
      id: "serious-talk",
      label: "সিরিয়াস আলোচনা",
      value: 1,
      icon: Heart,
      subText: "সেটাও সাধারণত ধার নেওয়া টাকা ফেরত চাওয়ার সময়! 💸",
      color: "bg-rose-500",
      rating: "বিপদজনক"
    },
    {
      id: "memes",
      label: "Meme শেয়ারিং",
      value: 100,
      icon: Sparkles,
      subText: "২৪ ঘণ্টাই সোশ্যাল মিডিয়ার মেসেঞ্জার ইনবক্স ফুল! 📩",
      color: "bg-purple-500",
      rating: "পেশাদারী"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      id="friendship-stats-section"
      className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-pink-50 relative overflow-hidden"
    >
      {/* Decorative vector cloud */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-purple-50 rounded-full blur-2xl opacity-70 pointer-events-none" />

      <div className="mb-8">
        <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-bold font-sans inline-block mb-2">
          📊 ডেটা অ্যানালিটিক্স
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold font-display text-gray-800 leading-tight">
          🤝 আমাদের বন্ধুত্বের পরিসংখ্যান
        </h2>
        <p className="text-gray-500 text-xs md:text-sm font-sans mt-2">
          আমাদের আজ পর্যন্ত হওয়া পাগলামি ও স্মৃতির উপর গবেষণা করে তৈরি কৃত্রিম পরিসংখ্যান রিপোর্ট।
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <motion.div
              key={st.id}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => synth.playClick()}
              className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100/50 hover:shadow-md transition-all border border-slate-100 cursor-pointer text-left flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-white shadow-sm border border-slate-200/60 ${st.color.replace('bg-', 'text-')}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold font-sans bg-white border border-slate-200/80 px-2 py-0.5 rounded-full text-slate-500 uppercase tracking-wide">
                    {st.rating}
                  </span>
                </div>
                <h3 className="font-extrabold font-sans text-gray-800 text-base mb-1">
                  {st.label}
                </h3>
                <p className="text-xs text-gray-400 font-sans leading-snug mb-3">
                  {st.subText}
                </p>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-1 text-xs font-mono font-bold text-gray-600">
                  <span>অগ্রগতি</span>
                  <span className="text-base font-extrabold text-slate-800">{st.value}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200/70 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${st.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15 + idx * 0.08 }}
                    className={`h-full ${st.color}`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Infinite Friendship Level Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        onClick={() => {
          synth.playChime();
          triggerConfetti();
        }}
        className="mt-6 p-5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer relative overflow-hidden group shadow-lg shadow-purple-200"
      >
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl animate-pulse">
            ♾️
          </div>
          <div>
            <h3 className="text-lg font-black font-display tracking-wide">
              বন্ধুত্বের শক্তি: অসীম ♾️
            </h3>
            <p className="text-white/80 font-sans text-xs">
              সকল ঝগড়া এবং আড্ডা পেরিয়ে আমাদের এই বন্ডিং থাকবে আজীবন মেয়াদী!
            </p>
          </div>
        </div>

        <span className="text-xs font-bold font-sans tracking-wide bg-white text-purple-700 px-4 py-2 rounded-xl shadow-md group-hover:scale-105 transition-transform shrink-0">
          রকেট স্পিড 🚀
        </span>
      </motion.div>
    </motion.div>
  );
}
