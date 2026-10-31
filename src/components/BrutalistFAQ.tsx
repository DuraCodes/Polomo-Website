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

// 1. Compact On-Page Teaser Bar (saves ~500px of vertical space)
export const FAQTeaserBar: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  return (
    <section className="section py-4" id="faq" aria-labelledby="faq-teaser-title">
      <div className="border-3 border-white bg-[#14141e] rounded-xl p-5 shadow-[6px_6px_0_#FFE500] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="size-10 rounded-lg bg-[#FFE500] border-2 border-black flex items-center justify-center text-[#111118] shrink-0 font-black text-lg shadow-[2px_2px_0_#000]">
            ?
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FFE500]">
                Quick Clarifications
              </span>
              <span className="text-zinc-500 text-xs">• 6 Answers</span>
            </div>
            <h3 id="faq-teaser-title" className="text-base sm:text-lg font-bold text-white m-0">
              Questions about panic freezing, pod sizes, or weekly time commitments?
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenModal}
          className="btn text-xs font-black py-2.5 px-5 rounded-lg border-2 border-black bg-[#FFE500] text-[#111118] hover:bg-[#e6ce00] shadow-[3px_3px_0_#FFF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shrink-0 w-full md:w-auto flex items-center justify-center gap-2 cursor-pointer"
          style={{ margin: 0 }}
        >
          <BookOpen className="size-3.5 stroke-[2.5]" />
          <span>Read Full FAQ Modal</span>
          <ArrowRight className="size-3.5 stroke-[2.5]" />
        </button>
      </div>
    </section>
  );
};

// 2. Full Brutalist FAQ Modal (neobrutalism.dev dialog spec)
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
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-faq-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-3xl border-3 border-white bg-[#12121a] rounded-2xl shadow-[10px_10px_0_#FFE500] overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Window Bar */}
        <header className="flex items-center justify-between p-4 sm:p-5 border-b-3 border-white bg-[#181824] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-[#FFE500] text-[#111118] border border-black font-mono">
              FAQ DIRECT
            </span>
            <span id="modal-faq-title" className="text-base sm:text-lg font-black text-white tracking-tight">
              Frequently Answered Inquiries
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-white bg-[#FF0000] text-white font-black text-xs cursor-pointer shadow-[3px_3px_0_#FFF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-[#e60000] transition-colors"
            aria-label="Close FAQ modal"
          >
            <X className="size-4 stroke-[3]" />
            <span>CLOSE</span>
          </button>
        </header>

        {/* Modal Scrollable Accordion Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-3.5">
          {FAQS.map((item, index) => {
            const isOpen = !!openIds[item.id];
            return (
              <div
                key={item.id}
                className={`border-2 transition-all duration-150 rounded-xl overflow-hidden bg-[#161622] ${
                  isOpen ? 'border-white' : 'border-white/30 hover:border-white/80'
                }`}
                style={{
                  boxShadow: isOpen ? `4px 4px 0 ${item.accent}` : 'none'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left cursor-pointer gap-3 select-none hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="font-mono text-xs font-bold text-zinc-400 shrink-0">
                      0{index + 1}
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                      <h4 className="text-sm sm:text-base font-bold text-white m-0">
                        {item.question}
                      </h4>
                      <span
                        className="text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-black w-max"
                        style={{
                          background: item.accent,
                          color: item.accent === '#FFFFFF' || item.accent === '#FFE500' || item.accent === '#8FD4EE' ? '#111118' : '#FFFFFF'
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Indicator Box */}
                  <span
                    className={`size-6 rounded border-2 border-white flex items-center justify-center font-bold text-sm shrink-0 transition-transform duration-150 ${
                      isOpen ? 'bg-[#FF0000] text-white rotate-45' : 'bg-black text-white'
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-white/10 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    <p className="m-0 bg-black/50 p-3 rounded-lg border border-white/10">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer Bridge */}
        <footer className="p-4 sm:p-5 border-t-3 border-white bg-[#181824] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-zinc-400 font-medium">
            Still have an edge case or upcoming presentation deadline?
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="btn btn--dark text-xs font-bold py-2 px-4 cursor-pointer"
              style={{ margin: 0 }}
            >
              Close
            </button>
            <a
              href="#cohort"
              onClick={onClose}
              className="btn btn--primary text-xs font-bold py-2 px-5 flex items-center gap-1.5 w-full sm:w-auto justify-center"
              style={{ margin: 0 }}
            >
              <span>Go to Application</span>
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
