import React, { useState } from 'react';
import { ArrowDown, CheckCircle2 } from 'lucide-react';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  tag: string;
  accent: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'freeze',
    question: 'What happens if I freeze or panic during a live pod?',
    answer: 'Freezing is not a failure at POLOMO—it is the entire reason we exist. Unlike standard courses where freezing feels humiliating, our pods are specifically trained in freeze de-escalation. Your facilitator guides you through a 5-second physiological reset (reset breath, gaze focal shift, and low-pressure re-entry). You are never rushed off the stage or judged.',
    tag: 'Safety Protocol',
    accent: '#FF3366'
  },
  {
    id: 'toastmasters',
    question: 'How is POLOMO different from Toastmasters or academic speaking clubs?',
    answer: 'Traditional speaking clubs operate like parliamentary committees: long formal speeches, rigid grammar counters, and evaluation speeches analyzing speech structure. POLOMO treats public speaking like boxing or martial arts—we don’t study theory; we run high-frequency, active exposure micro-drills to physically desensitize the nervous system to live audience scrutiny.',
    tag: 'Methodology',
    accent: '#FFE500'
  },
  {
    id: 'crowd-size',
    question: 'Do I have to stand in front of huge crowds right away?',
    answer: 'Never. That is why standard courses fail. We follow graduated exposure: you start with zero-stakes 60-second private audio drills in Week 1, graduate to a tight 4-person supportive pod in Weeks 2–4, expand to the virtual group in Weeks 5–6, and only step onto a live real-world stage when your baseline heart rate remains steady.',
    tag: 'Progression',
    accent: '#00E575'
  },
  {
    id: 'commitment',
    question: 'What is the required weekly time commitment?',
    answer: 'POLOMO is designed for busy students, founders, and professionals: 5 minutes daily of private micro-reps via our prompt drills, plus two 45-minute live exposure pod sessions each week. Total commitment is under 2.5 hours per week, focused 100% on active execution rather than reading lecture slides.',
    tag: 'Schedule',
    accent: '#8FD4EE'
  },
  {
    id: 'therapy',
    question: 'Is POLOMO group psychotherapy or medical anxiety treatment?',
    answer: 'No. POLOMO is a practical communication exposure and performance training program. We build physical stage reflexes through graduated repetition. While exposure therapy principles inspire our structured ladder, we do not diagnose, prescribe, or provide medical or mental health counseling.',
    tag: 'Scope & Boundary',
    accent: '#FF4071'
  },
  {
    id: 'beginners',
    question: 'Can I join if I have never spoken publicly before in my life?',
    answer: 'Yes. In fact, over 65% of our cohort members describe themselves as severe stage avoiders who previously faked sickness or stayed muted in Zoom calls to avoid talking. The first phase is calibrated specifically for zero-experience beginners.',
    tag: 'Eligibility',
    accent: '#C7D2FE'
  }
];

export const BrutalistFAQ: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>('freeze');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'safety' | 'method' | 'schedule'>('all');

  const toggleItem = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = FAQS.filter((faq) => {
    if (selectedCategory === 'safety') return faq.id === 'freeze' || faq.id === 'therapy';
    if (selectedCategory === 'method') return faq.id === 'toastmasters' || faq.id === 'crowd-size';
    if (selectedCategory === 'schedule') return faq.id === 'commitment' || faq.id === 'beginners';
    return true;
  });

  return (
    <div className="approach-wrap scroll-mt-28" id="faq">
      <section className="border-[3px] border-black bg-white text-[#111118] rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 lg:p-7 shadow-[6px_6px_0_#000000]" aria-labelledby="faq-section-title">
        
        {/* Header - Scaled to match Our Approach blueprint */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5 pb-3 sm:pb-3.5 border-b-2 border-black/10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFE500] text-black border border-black shadow-[1.5px_1.5px_0_#000]">
                Common Hesitations
              </span>
              <span className="text-[11px] font-bold text-neutral-600">
                Direct Answers
              </span>
            </div>
            <h2 id="faq-section-title" className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0A0A0C] tracking-tight leading-[1.2] m-0">
              Frequently Answered Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-[#181820] font-medium mt-1 max-w-xl leading-snug m-0">
              Direct, no-spin answers to the questions people ask right before stepping into their first live exposure pod.
            </p>
          </div>

          <a
            href="#cohort"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-black bg-black hover:bg-[#FF3366] text-white font-extrabold text-xs uppercase tracking-wider shadow-[2px_2px_0_#FFE500] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer no-underline shrink-0"
          >
            <span>Jump to Admissions</span>
            <ArrowDown className="size-3.5 stroke-[2.5] text-white" />
          </a>
        </div>

        {/* Quick Filter Bar - Compact */}
        <div className="flex flex-wrap items-center gap-2 mb-3.5 sm:mb-4">
          <span className="text-[11px] font-mono font-bold text-neutral-600 uppercase tracking-wider mr-0.5">
            Filter:
          </span>
          {[
            { id: 'all', label: 'All Inquiries (6)' },
            { id: 'safety', label: 'Safety & Freezing (2)' },
            { id: 'method', label: 'Methodology & Pods (2)' },
            { id: 'schedule', label: 'Time & Eligibility (2)' },
          ].map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`text-[11px] font-bold px-3 py-1 rounded-full border-2 border-black transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-black text-[#FFE500] shadow-[2px_2px_0_#FFE500]'
                    : 'bg-[#FAF8F5] text-[#181820] hover:bg-neutral-100 shadow-[1px_1px_0_#000]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* On-Page Accordion Stack - Compact cards matching 18px radius and tight padding */}
        <div className="space-y-2 sm:space-y-2.5">
          {filteredFaqs.map((faq, index) => {
            const isOpen = activeId === faq.id;
            return (
              <div
                key={faq.id}
                className="border-2 border-black rounded-[16px] sm:rounded-[18px] overflow-hidden transition-all bg-[#FAF8F5] shadow-[3px_3px_0_#000]"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleItem(faq.id)}
                  className="w-full py-2.5 px-3.5 sm:py-3 sm:px-4 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-white transition-colors select-none"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                    <span className="font-mono text-[11px] font-black text-black bg-white px-2 py-0.5 rounded border border-black shrink-0 shadow-[1px_1px_0_#000]">
                      0{index + 1}
                    </span>
                    <span
                      className="size-2.5 rounded-full border border-black shrink-0 hidden sm:block"
                      style={{ background: faq.accent }}
                      aria-hidden="true"
                    />
                    <h3 className="text-sm sm:text-[15.5px] font-bold text-[#0A0A0C] m-0 leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-black border border-black shadow-[1px_1px_0_#000] hidden md:inline-block">
                      {faq.tag}
                    </span>
                    <span
                      className={`size-6 sm:size-7 rounded-lg border-2 border-black flex items-center justify-center font-black text-sm shrink-0 transition-transform duration-200 shadow-[1.5px_1.5px_0_#000] ${
                        isOpen ? 'bg-[#FFE500] text-black rotate-45' : 'bg-black text-white'
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-3.5 pt-2 sm:px-5 sm:pb-4 border-t border-black/10 bg-white animate-in fade-in-50 duration-150">
                    <p className="text-xs sm:text-[13.5px] text-[#181820] font-medium leading-relaxed m-0">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Strip - Compact field note */}
        <div className="border-2 border-black bg-[#FAF8F5] rounded-xl px-4 py-2 mt-3.5 sm:mt-4 shadow-[2px_2px_0_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold text-[#181820]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-black stroke-[2.5] shrink-0" />
            <span className="text-[11.5px] sm:text-xs">Have a specific edge-case or upcoming deadline? Ask in your 10-min free audit.</span>
          </div>
          <a
            href="#cohort"
            className="text-black underline font-black hover:text-[#FF3366] transition-colors text-xs shrink-0"
          >
            Review Admissions Criteria →
          </a>
        </div>

      </section>
    </div>
  );
};

// Backwards-compatibility alias so any existing import does not break
export const FAQTeaserBar = BrutalistFAQ;
