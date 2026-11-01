import React, { useState, useEffect } from 'react';
import { HelpCircle, Sparkles, MessageCircleQuestion, X, ArrowRight, BookOpen } from 'lucide-react';

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
    accent: '#FF0000'
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
    answer: 'Never. That is why standard courses fail. We follow the 4-Stage Exposure Roadmap: you start with zero-stakes 60-second private audio drills in Week 1, graduate to a tight 4-person supportive pod in Weeks 2–4, expand to the virtual group in Weeks 5–6, and only step onto a live real-world stage when your baseline heart rate remains steady.',
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
    accent: '#FFFFFF'
  }
];

// 1. Full On-Page Accessible Neo-Brutalist Accordion (neobrutalism.dev Accordion Spec)
export const FAQTeaserBar: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    freeze: true,
    toastmasters: false,
    'crowd-size': false,
    commitment: false,
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="section py-8" id="faq" aria-labelledby="faq-section-title">
      <div className="border-[3px] border-black bg-white rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0_#000000]">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b-2 border-black/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full bg-[#FFE500] text-black border-2 border-black shadow-[1.5px_1.5px_0_#000]">
                Common Hesitations
              </span>
              <span className="text-xs font-bold text-neutral-600">
                Direct Answers
              </span>
            </div>
            <h2 id="faq-section-title" className="text-2xl sm:text-4xl font-black text-[#0A0A0C] tracking-tight m-0">
              Frequently Answered Questions
            </h2>
            <p className="text-neutral-700 text-sm sm:text-base font-medium mt-1.5 max-w-xl leading-relaxed">
              Everything you need to know about stage freeze protocol, cohort cadence, and zero-judgment practice.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenModal}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black bg-[#FAF8F5] hover:bg-neutral-100 text-black font-extrabold text-xs uppercase tracking-wider shadow-[2px_2px_0_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
          >
            <BookOpen className="size-3.5 stroke-[2.5]" />
            <span>Open Dedicated FAQ Window ↗</span>
          </button>
        </div>

        {/* Accordion Stack (neobrutalism.dev Accordion structure) */}
        <div className="space-y-3.5">
          {FAQS.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="border-2 border-black rounded-2xl overflow-hidden transition-all bg-[#FAF8F5] shadow-[3px_3px_0_#000]"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-white transition-colors select-none"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="size-3 rounded-full border border-black shrink-0 hidden sm:block"
                      style={{ background: faq.accent }}
                      aria-hidden="true"
                    />
                    <h3 className="text-sm sm:text-base font-black text-[#0A0A0C] m-0">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-black border border-black shadow-[1px_1px_0_#000] hidden md:inline-block">
                      {faq.tag}
                    </span>
                    <span className={`size-7 rounded-lg border-2 border-black flex items-center justify-center font-black text-sm transition-transform duration-200 ${
                      isOpen ? 'bg-[#FFE500] text-black rotate-45' : 'bg-black text-white'
                    }`}>
                      +
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t-2 border-black/10 bg-white">
                    <p className="text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed m-0 pt-2">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// 2. Full Brutalist FAQ Modal (neobrutalism.dev dialog spec with crisp white canvas)
export const BrutalistFAQModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    freeze: true
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-faq-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-3xl border-[3px] border-black bg-white rounded-3xl shadow-[10px_10px_0_#000] overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Window Bar */}
        <header className="flex items-center justify-between p-4 sm:p-5 border-b-[2.5px] border-black bg-[#FAF8F5] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFE500] text-black border-2 border-black shadow-[2px_2px_0_#000]">
              FAQ Direct
            </span>
            <span id="modal-faq-title" className="text-base sm:text-lg font-black text-[#0A0A0C] tracking-tight">
              Frequently Answered Inquiries
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-black bg-white hover:bg-neutral-100 text-black font-extrabold text-xs cursor-pointer shadow-[2px_2px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            aria-label="Close FAQ modal"
          >
            <X className="size-4 stroke-[3]" />
            <span>Close</span>
          </button>
        </header>

        {/* Modal Scrollable Accordion Content */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-3.5 bg-white">
          {FAQS.map((item, index) => {
            const isOpen = !!openIds[item.id];
            return (
              <div
                key={item.id}
                className="border-2 border-black rounded-2xl overflow-hidden bg-white shadow-[4px_4px_0_#000] transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-4 sm:p-4.5 text-left cursor-pointer gap-3 select-none hover:bg-[#FAF8F5] transition-colors"
                >
                  <div className="flex items-center gap-3.5 flex-1">
                    <span className="font-mono text-xs font-black text-black bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-black shrink-0">
                      0{index + 1}
                    </span>
                    <h4 className="text-sm sm:text-base font-extrabold text-[#0A0A0C] m-0 leading-snug">
                      {item.question}
                    </h4>
                  </div>

                  {/* Indicator Box - Neobrutalism.dev Toggle Icon */}
                  <span
                    className={`size-7 rounded-lg border-2 border-black flex items-center justify-center font-black text-sm shrink-0 transition-transform duration-150 shadow-[2px_2px_0_#000] ${
                      isOpen ? 'bg-[#FFE500] text-black rotate-45' : 'bg-black text-white'
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium bg-[#FAF8F5] border-t-2 border-black/10">
                    <p className="m-0 pt-2">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer Bridge */}
        <footer className="p-4 sm:p-5 border-t-[2.5px] border-black bg-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-neutral-600 font-semibold">
            Still have an edge case or upcoming presentation deadline?
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-bold py-2.5 px-5 rounded-full border-2 border-black bg-white hover:bg-neutral-100 text-black shadow-[2px_2px_0_#000] cursor-pointer"
            >
              Close
            </button>
            <a
              href="#cohort"
              onClick={onClose}
              className="text-xs font-extrabold py-2.5 px-6 rounded-full border-2 border-black bg-black text-white hover:bg-[#FF3366] shadow-[3px_3px_0_#FFE500] flex items-center gap-1.5 w-full sm:w-auto justify-center transition-all"
            >
              <span>Go to Application</span>
              <ArrowRight className="size-3.5 stroke-[2.5]" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
