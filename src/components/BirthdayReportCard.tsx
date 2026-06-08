/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { CheckCircle2, Award, Zap, Percent, Clock, AlertOctagon } from "lucide-react";
import { synth } from "./AudioSynth";

interface BirthdayReportCardProps {
  friendName: string;
}

export default function BirthdayReportCard({ friendName }: BirthdayReportCardProps) {
  const reportItems = [
    {
      id: "survival",
      label: "আরেকটা বছর বেঁচে থাকার অর্জন",
      valText: "সাফল্যজনক! ✅",
      value: 100,
      icon: CheckCircle2,
      color: "from-emerald-500 to-teal-500",
      description: "কোনো বড় দুর্ঘটনা ছাড়াই আরও ৩৬৫ দিন পার করার জন্য পুরস্কার প্রাপ্য!"
    },
    {
      id: "annoying",
      label: "বন্ধুদের বিরক্ত করার অভিজ্ঞতা",
      valText: "Expert Level 😎",
      value: 100,
      icon: Award,
      color: "from-purple-500 to-indigo-600",
      description: "অফটাইমে কল দেওয়া এবং আজব কথা বার্তা বলায় তুই একজন অভিজ্ঞ প্রফেশনাল।"
    },
    {
      id: "laughing",
      label: "অযথা হাসাহাসি",
      valText: "100%",
      value: 100,
      icon: Percent,
      color: "from-amber-400 to-orange-500",
      description: "যেকোনো সিরিয়াস মুহূর্তে হাসির ভেংচি কেটে পরিবেশ হালকা করার রেকর্ড।"
    },
    {
      id: "billionaire",
      label: "কোটিপতি হওয়ার অগ্রগতি",
      valText: "Loading... ⏳",
      value: 12,
      icon: Clock,
      color: "from-teal-400 to-emerald-500 animate-pulse",
      description: "কবে ধনী হবি আর আমাদের খাওয়াবি সেই আশায় দিন গুনছি..."
    },
    {
      id: "madness",
      label: "পাগলামির লেভেল",
      valText: "Maximum 🔥",
      value: 100,
      icon: Zap,
      color: "from-rose-500 to-red-600",
      description: "থার্মোমিটার ফাটানো লেভেলের পাগলামি, যার বৈজ্ঞানিক ব্যাখ্যা কারো জানা নেই।"
    }
  ];

  const handleInteract = () => {
    synth.playClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      id="birthday-report-card"
      className="bg-slate-800/50 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-705 relative overflow-hidden backdrop-blur-md"
    >
      {/* Decorative background watermark */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900/40 rounded-full flex items-center justify-center translate-x-12 -translate-y-12 select-none pointer-events-none">
        <AlertOctagon className="w-24 h-24 text-slate-700/10" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-700/50 pb-5">
        <div>
          <span className="bg-pink-500/10 text-pink-400 border border-pink-500/20 text-[11px] px-3 py-1 rounded-full font-bold font-sans inline-block mb-2">
            মেধা ও পাগলামি মূল্যায়ন
          </span>
          <h2 className="text-2xl md:text-3xl font-black font-display text-slate-100 leading-tight">
            📊 অফিসিয়াল জন্মদিন রিপোর্ট
          </h2>
        </div>
        <div className="text-left md:text-right">
          <span className="text-xs text-slate-550 font-mono block">মেডিকেল আইডি: BG-2026-F</span>
          <span className="text-xs font-semibold text-slate-350 font-sans">মূল্যায়িত ব্যক্তি: {friendName}</span>
        </div>
      </div>

      <div className="space-y-4">
        {reportItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onMouseEnter={handleInteract}
              className="group p-4 bg-slate-900/40 hover:bg-slate-900/80 rounded-2xl transition-all duration-300 border border-slate-750/50 hover:border-pink-500/30 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} text-slate-950 shadow-md`}>
                    <Icon className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-200 font-sans text-sm md:text-base">
                      {item.label}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans group-hover:text-slate-300 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
                <span className="text-xs md:text-sm font-extrabold text-pink-400 font-sans whitespace-nowrap bg-slate-900 px-3 py-1.5 rounded-lg shadow-sm border border-slate-700/60 group-hover:scale-105 transition-transform">
                  {item.valText}
                </span>
              </div>

              {/* Progress bar line */}
              <div className="w-full h-2 bg-slate-800 rounded-full mt-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Funny Footnote */}
      <div className="mt-6 p-4 bg-amber-950/20 border border-amber-900/30 text-amber-200 rounded-2xl text-xs font-sans flex items-center gap-2.5 leading-relaxed backdrop-blur-sm">
        <span className="text-lg">📢</span>
        <span>
          <strong>সতর্কবার্তা:</strong> ১০০% পাগলামির কারণে এই রিপোর্ট কার্ডের কোনো আইনি গ্রহণযোগ্যতা নেই। রিপোর্ট নিয়ে আপত্তি থাকলে আগামী ৩০ দিনের মধ্যে আন্টির কাছে অভিযোগ দায়ের কর।
        </span>
      </div>
    </motion.div>
  );
}
