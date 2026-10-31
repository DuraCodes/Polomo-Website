import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldAlert, Sparkles, Volume2, Users, Monitor, Mic2, X, Layers, ExternalLink } from 'lucide-react';

export interface StagePhase {
  id: string;
  step: string;
  title: string;
  badge: string;
  badgeColor: string;
  shadowColor: string;
  icon: React.ComponentType<{ className?: string }>;
  stakes: 'Zero Stakes' | 'Low Stakes' | 'Medium Stakes' | 'High Stakes';
  frequency: string;
  environment: string;
  nervousSystemGoal: string;
  weeklyDrills: string[];
  repsTarget: string;
}

export const PHASES: StagePhase[] = [
  {
    id: 'solo',
    step: '01',
    title: 'Micro-Exposure & Desensitization',
    badge: 'Solo Habit',
    badgeColor: '#8FD4EE',
    shadowColor: '#8FD4EE',
    icon: Volume2,
    stakes: 'Zero Stakes',
    frequency: 'Daily (3-5 mins)',
    environment: 'Private audio reps & mirror prompts',
    nervousSystemGoal: 'Extinguish the initial panic spike when speaking spontaneously without notes.',
    weeklyDrills: [
      '60-second unscripted stream-of-consciousness drills',
      'Sudden topic injection with 3-second recovery breathing',
      'Vocal projection drills without self-censoring'
    ],
    repsTarget: '21 Reps / Week'
  },
  {
    id: 'pod',
    step: '02',
    title: 'Progressive Exposure Pods',
    badge: 'Safe Peer Room',
    badgeColor: '#00E575',
    shadowColor: '#00E575',
    icon: Users,
    stakes: 'Low Stakes',
    frequency: '2x / Week (45 mins)',
    environment: '4-6 person curated pod with dedicated facilitator',
    nervousSystemGoal: 'Maintain eye contact and steady diaphragm support while real human eyes observe you.',
    weeklyDrills: [
      '2-minute round-robin presentations with live eye contact',
      'Intentional pause tolerance (holding 4 seconds of silence without rushing)',
      'Constructive instant feedback on posture and vocal tremors'
    ],
    repsTarget: '8 Live Peer Rounds'
  },
  {
    id: 'virtual-stage',
    step: '03',
    title: 'Simulated Virtual Spotlight',
    badge: 'Adrenaline Pressure',
    badgeColor: '#FFE500',
    shadowColor: '#FFE500',
    icon: Monitor,
    stakes: 'Medium Stakes',
    frequency: 'Weekly Live Lab',
    environment: 'Full cohort virtual stage (25-40 attendees)',
    nervousSystemGoal: 'Overcome mental blanks and unexpected curveballs without fleeing the spotlight.',
    weeklyDrills: [
      'Hot-seat rapid fire Q&A with devil’s advocate questions',
      'Recovering gracefully from mid-sentence memory lapses',
      'Pacing technical ideas under artificial countdown clocks'
    ],
    repsTarget: '4 Full Stage Trials'
  },
  {
    id: 'live-room',
    step: '04',
    title: 'The Real-World Room Spotlight',
    badge: 'True Mastery',
    badgeColor: '#FF4071',
    shadowColor: '#FF0000',
    icon: Mic2,
    stakes: 'High Stakes',
    frequency: 'Showcase Capstone',
    environment: 'In-person / live audience showcase with unscripted scrutiny',
    nervousSystemGoal: 'Transform residual adrenaline from crippling freeze into dynamic stage command.',
    weeklyDrills: [
      'Commanding the physical room and owning spatial movement',
      'Handling live audience skepticism, laughter, and silence',
      'Deliver final thesis or founder pitch with undeniable presence'
    ],
    repsTarget: 'Capstone Graduation'
  }
];

// 1. Compact On-Page Teaser Strip (HyperUI Connected Steps + Neobrutalism Spec)
export const ExposureRoadmapTeaser: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  return (
    <section className="section" id="roadmap" aria-labelledby="roadmap-title">
      <div className="border-[2.5px] border-black bg-white rounded-3xl p-6 sm:p-8 shadow-[7px_7px_0_#000] relative overflow-hidden">
        
        {/* Subtle Warm Graph Accent */}
        <div
          className="absolute -right-16 -top-16 w-60 h-60 rounded-full bg-[#C7D2FE]/40 pointer-events-none blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full bg-[#00E575] text-black border-2 border-black shadow-[2px_2px_0_#000]">
                4-Stage Protocol
              </span>
              <span className="text-xs font-bold text-neutral-600">
                Biological Exposure Ladder
              </span>
            </div>
            
            <h3 id="roadmap-title" className="text-2xl sm:text-3xl font-black text-[#0A0A0C] tracking-tight m-0">
              The Exposure Roadmap
            </h3>
            <p className="text-neutral-700 text-sm font-medium mt-1.5 max-w-xl leading-relaxed">
              How we retrain your nervous system from private 60-second micro-reps to commanding a live auditorium.
            </p>

            {/* HyperUI-Style Connected Step Sequence */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {PHASES.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.id}
                    onClick={onOpenModal}
                    className="p-3.5 rounded-2xl border-2 border-black bg-[#FAF8F5] hover:bg-white transition-all cursor-pointer group flex flex-col justify-between shadow-[3px_3px_0_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[10px] font-black px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0_#000]"
                        style={{ background: p.badgeColor, color: '#0A0A0C' }}
                      >
                        {p.step}
                      </span>
                      <Icon className="size-4 text-neutral-700 group-hover:text-black transition-colors" />
                    </div>
                    <span className="text-xs font-black text-[#0A0A0C] leading-snug block truncate">
                      {p.badge}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-bold block mt-1">
                      {p.stakes}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trigger Button - Neobrutalism.dev Pill CTA */}
          <div className="shrink-0 w-full lg:w-auto">
            <button
              type="button"
              onClick={onOpenModal}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full border-2 border-black bg-black text-white hover:bg-[#FF3366] font-extrabold text-sm shadow-[4px_4px_0_#FFE500] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              style={{ margin: 0 }}
            >
              <Layers className="size-4 stroke-[2.5]" />
              <span>Inspect Protocol &amp; Drills</span>
              <ArrowRight className="size-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// 2. Full Interactive Roadmap Modal (Neobrutalism.dev Dialog Spec)
export const ExposureRoadmapModal: React.FC<{ isOpen: boolean; onClose: () => void; onApply?: () => void }> = ({
  isOpen,
  onClose,
  onApply
}) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const activePhase = PHASES[activePhaseIndex];

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
      aria-labelledby="modal-roadmap-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-4xl border-[3px] border-black bg-white rounded-3xl shadow-[10px_10px_0_#000] overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Window Bar */}
        <header className="flex items-center justify-between p-4 sm:p-5 border-b-[2.5px] border-black bg-[#FAF8F5] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#00E575] text-black border-2 border-black shadow-[2px_2px_0_#000]">
              Protocol Spec
            </span>
            <span id="modal-roadmap-title" className="text-base sm:text-lg font-black text-[#0A0A0C] tracking-tight">
              4-Stage Biological Exposure Roadmap
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-black bg-white hover:bg-neutral-100 text-black font-extrabold text-xs cursor-pointer shadow-[2px_2px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            aria-label="Close roadmap modal"
          >
            <X className="size-4 stroke-[3]" />
            <span>Close</span>
          </button>
        </header>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6 bg-white">
          {/* Phase Selector Tabs (Neobrutalism Tab Matrix) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PHASES.map((phase, idx) => {
              const isActive = idx === activePhaseIndex;
              const Icon = phase.icon;
              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`p-3.5 rounded-2xl border-2 border-black text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FFE500] shadow-[4px_4px_0_#000] translate-x-[1px] translate-y-[1px]'
                      : 'bg-[#FAF8F5] hover:bg-neutral-100 shadow-[2px_2px_0_#000]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-[10px] font-black px-2 py-0.5 rounded-full border border-black bg-white text-black"
                    >
                      PHASE {phase.step}
                    </span>
                    <Icon className="size-4 text-black" />
                  </div>
                  <span className="text-xs font-black text-[#0A0A0C] block truncate">{phase.badge}</span>
                  <span className="text-[11px] text-neutral-600 font-bold block mt-0.5">{phase.stakes}</span>
                </button>
              );
            })}
          </div>

          {/* Active Phase Details Card */}
          <div className="border-2 border-black bg-[#FAF8F5] rounded-3xl p-5 sm:p-7 space-y-5 shadow-[4px_4px_0_#000]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-extrabold text-[#FF3366] uppercase tracking-wider block mb-1">
                  Step {activePhase.step} of 04
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-[#0A0A0C] m-0">
                  {activePhase.title}
                </h4>
              </div>
              <span className="text-xs font-black px-3.5 py-1 rounded-full bg-[#FFE500] text-black border-2 border-black shadow-[2px_2px_0_#000]">
                {activePhase.repsTarget}
              </span>
            </div>

            {/* Target Alert Callout */}
            <div className="border-2 border-black bg-white p-4 rounded-2xl shadow-[3px_3px_0_#000]">
              <span className="text-[11px] font-black uppercase tracking-wider text-black block mb-1 flex items-center gap-1.5">
                <ShieldAlert className="size-4 text-[#FF3366]" />
                Physiological Target
              </span>
              <p className="text-xs sm:text-sm font-semibold text-neutral-700 leading-relaxed m-0">
                {activePhase.nervousSystemGoal}
              </p>
            </div>

            {/* Schedule & Environment Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-white rounded-2xl border-2 border-black shadow-[2px_2px_0_#000]">
                <span className="text-neutral-500 block text-[10px] font-black uppercase mb-1">Cadence &amp; Time</span>
                <span className="text-[#0A0A0C] font-extrabold text-sm">{activePhase.frequency}</span>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border-2 border-black shadow-[2px_2px_0_#000]">
                <span className="text-neutral-500 block text-[10px] font-black uppercase mb-1">Environment</span>
                <span className="text-[#0A0A0C] font-extrabold text-sm">{activePhase.environment}</span>
              </div>
            </div>

            {/* Tactical Drills */}
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-black block mb-3 flex items-center gap-1.5">
                <Sparkles className="size-4 text-black" />
                Tactical Drills Executed
              </span>
              <ul className="space-y-2.5 m-0 p-0 list-none">
                {activePhase.weeklyDrills.map((drill, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-800 font-bold bg-white p-3 rounded-xl border-2 border-black shadow-[2px_2px_0_#000]">
                    <span className="size-5 rounded-full bg-[#00E575] text-black font-black text-xs flex items-center justify-center shrink-0 border border-black">
                      ✓
                    </span>
                    <span>{drill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer Bridge to Application */}
        <footer className="p-4 sm:p-5 border-t-[2.5px] border-black bg-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-neutral-600 font-semibold">
            Next cohort begins with Phase 01 calibration exercises.
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-bold py-2.5 px-5 rounded-full border-2 border-black bg-white hover:bg-neutral-100 text-black shadow-[2px_2px_0_#000] cursor-pointer"
            >
              Close Roadmap
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onApply) onApply();
              }}
              className="text-xs font-extrabold py-2.5 px-6 rounded-full border-2 border-black bg-black text-white hover:bg-[#FF3366] shadow-[3px_3px_0_#FFE500] flex items-center gap-1.5 w-full sm:w-auto justify-center cursor-pointer transition-all"
            >
              <span>Apply For Cohort</span>
              <ArrowRight className="size-3.5 stroke-[2.5]" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
