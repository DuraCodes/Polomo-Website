import React from 'react';
import { ArrowRight, Flame, CheckCircle2, Radio } from 'lucide-react';

interface CohortCalloutCardProps {
  onApply: () => void;
  onOpenDiagnostic: () => void;
}

export const CohortCalloutCard: React.FC<CohortCalloutCardProps> = ({
  onApply,
  onOpenDiagnostic,
}) => {
  return (
    <section className="section" id="cohort" aria-labelledby="cohort-callout-title">
      <div className="border-[2.5px] border-black bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[8px_8px_0_#000] relative overflow-hidden">
        
        {/* Subtle Warm Graph Accent in Corner */}
        <div
          className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#FFE500]/30 pointer-events-none blur-2xl"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl">
          
          {/* Header Badges - Minimalist Neobrutalism.dev Pill Tags */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#FF3366] text-white border-2 border-black shadow-[2px_2px_0_#000]">
              Cohort 08 Enrolling
            </span>
            <span className="text-xs font-black text-black bg-[#FFE500] px-3.5 py-1 rounded-full border-2 border-black flex items-center gap-1.5 shadow-[2px_2px_0_#000]">
              <Flame className="size-3.5 text-black" /> Only 4 Pod Seats Remaining
            </span>
          </div>

          {/* Headline */}
          <h2 id="cohort-callout-title" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0C] tracking-tight leading-[1.15] mb-4">
            Ready to Step Into the Spotlight? <br />
            <span className="bg-[#FFE500] px-2 py-0.5 rounded-lg border-2 border-black shadow-[3px_3px_0_#000] inline-block mt-1">
              Your Stage Is Waiting.
            </span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-neutral-700 font-medium leading-relaxed max-w-2xl mb-8">
            Traditional public-speaking courses fail because you cannot learn courage from slides. Join our next 6-week progressive exposure pod: intimate 4–6 peer rooms, zero judgment, and active micro-reps from Day 1.
          </p>

          {/* Action Row - Neobrutalism.dev Rounded Pill Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
            <button
              type="button"
              onClick={onApply}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black hover:bg-[#FF3366] text-white font-extrabold text-sm sm:text-base rounded-full border-2 border-black shadow-[4px_4px_0_#FFE500] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
            >
              <span>Apply for Cohort 08</span>
              <ArrowRight className="size-5 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={onOpenDiagnostic}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-neutral-100 text-black border-2 border-black font-extrabold text-sm rounded-full shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
            >
              <Radio className="size-4 text-[#FF3366]" />
              <span>Book 10-Min Audit ↗</span>
            </button>
          </div>

          {/* Proof Badges - Clean Minimalist Checklist */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-5 border-t-2 border-black/10 text-xs sm:text-sm font-bold text-neutral-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-black stroke-[2.5]" />
              <span>4–6 Peer Groups (Strictly Capped)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-black stroke-[2.5]" />
              <span>100% Practical Speaking Drills</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-black stroke-[2.5]" />
              <span>Dedicated Facilitator Feedback</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
