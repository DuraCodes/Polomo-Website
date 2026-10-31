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

// 1. Compact On-Page Teaser Strip (reduces ~500px of vertical space)
export const ExposureRoadmapTeaser: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  return (
    <section className="section" id="roadmap" aria-labelledby="roadmap-title">
      <div className="border-3 border-white bg-[#101018] rounded-2xl p-5 sm:p-7 shadow-[8px_8px_0_#8FD4EE] relative overflow-hidden">
        {/* Background Halftone Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1.2px, transparent 1.3px)',
            backgroundSize: '16px 16px'
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded bg-[#FF0000] text-white border border-white">
                4-Stage Protocol
              </span>
              <span className="text-xs font-semibold text-zinc-400">
                Biological Exposure Ladder
              </span>
            </div>
            <h3 id="roadmap-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight m-0">
              The Exposure Roadmap
            </h3>
            <p className="text-zinc-300 text-sm mt-1 max-w-xl leading-relaxed">
              How we retrain your nervous system from private 60-second micro-reps to commanding a live auditorium.
            </p>

            {/* 4-Step Mini Pipeline Preview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
              {PHASES.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.id}
                    onClick={onOpenModal}
                    className="p-2.5 rounded-lg border-2 border-white/20 bg-black/50 hover:border-white transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="text-[10px] font-black px-1.5 py-0.5 rounded border border-black"
                        style={{ background: p.badgeColor, color: '#111118' }}
                      >
                        {p.step}
                      </span>
                      <Icon className="size-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs font-bold text-white leading-tight block truncate">
                      {p.badge}
                    </span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">
                      {p.stakes}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trigger Button */}
          <div className="shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={onOpenModal}
              className="btn btn--primary text-sm font-bold py-3 px-6 shadow-[4px_4px_0_#FFF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none w-full md:w-auto flex items-center justify-center gap-2 cursor-pointer"
              style={{ margin: 0 }}
            >
              <Layers className="size-4" />
              <span>Inspect Full Protocol &amp; Drills</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// 2. Full Interactive Roadmap Modal (neobrutalism.dev dialog spec)
export const ExposureRoadmapModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
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
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-roadmap-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-4xl border-3 border-white bg-[#12121a] rounded-2xl shadow-[10px_10px_0_#8FD4EE] overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Window Bar */}
        <header className="flex items-center justify-between p-4 sm:p-5 border-b-3 border-white bg-[#181824] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-[#FF0000] text-white border border-white">
              PROTOCOL SPEC
            </span>
            <span id="modal-roadmap-title" className="text-base sm:text-lg font-black text-white tracking-tight">
              4-Stage Biological Exposure Roadmap
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-white bg-[#FF0000] text-white font-black text-xs cursor-pointer shadow-[3px_3px_0_#FFF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-[#e60000] transition-colors"
            aria-label="Close roadmap modal"
          >
            <X className="size-4 stroke-[3]" />
            <span>CLOSE</span>
          </button>
        </header>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {/* Phase Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {PHASES.map((phase, idx) => {
              const isActive = idx === activePhaseIndex;
              const Icon = phase.icon;
              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    isActive
                      ? 'border-white bg-[#1c1c28] translate-x-[2px] translate-y-[2px]'
                      : 'border-white/20 bg-black/40 hover:border-white/60'
                  }`}
                  style={{
                    boxShadow: isActive ? `4px 4px 0 ${phase.shadowColor}` : 'none'
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-[10px] font-black px-1.5 py-0.5 rounded border border-black"
                      style={{ background: phase.badgeColor, color: '#111118' }}
                    >
                      PHASE {phase.step}
                    </span>
                    <Icon className="size-3.5 text-white" />
                  </div>
                  <span className="text-xs font-bold text-white block truncate">{phase.badge}</span>
                  <span className="text-[10px] text-zinc-400 block">{phase.stakes}</span>
                </button>
              );
            })}
          </div>

          {/* Active Phase Details Card */}
          <div className="border-2 border-white/40 bg-black/50 rounded-xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#8FD4EE] uppercase tracking-wider block mb-1">
                  Step {activePhase.step} of 04
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white m-0">
                  {activePhase.title}
                </h4>
              </div>
              <span className="text-xs font-black px-3 py-1 rounded bg-[#FFE500] text-black border border-black">
                {activePhase.repsTarget}
              </span>
            </div>

            {/* Target Alert Callout */}
            <div className="border-l-4 border-[#FF0000] bg-[#FF0000]/10 p-3.5 rounded-r-lg">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#FF0000] block mb-1 flex items-center gap-1.5">
                <ShieldAlert className="size-3.5" />
                Physiological Target
              </span>
              <p className="text-xs sm:text-sm font-medium text-zinc-200 leading-relaxed m-0">
                {activePhase.nervousSystemGoal}
              </p>
            </div>

            {/* Schedule & Environment Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-zinc-400 block text-[10px] font-bold uppercase mb-0.5">Cadence &amp; Time</span>
                <span className="text-white font-bold">{activePhase.frequency}</span>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-zinc-400 block text-[10px] font-bold uppercase mb-0.5">Environment</span>
                <span className="text-white font-bold">{activePhase.environment}</span>
              </div>
            </div>

            {/* Tactical Drills */}
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-white block mb-2.5 flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-[#FFE500]" />
                Tactical Drills Executed
              </span>
              <ul className="space-y-2">
                {activePhase.weeklyDrills.map((drill, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                    <span className="size-4 rounded bg-[#00E575] text-[#111118] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-black">
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
        <footer className="p-4 sm:p-5 border-t-3 border-white bg-[#181824] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-zinc-400 font-medium">
            Next cohort begins with Phase 01 calibration exercises.
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="btn btn--dark text-xs font-bold py-2 px-4 cursor-pointer"
              style={{ margin: 0 }}
            >
              Close Roadmap
            </button>
            <a
              href="#cohort"
              onClick={onClose}
              className="btn btn--primary text-xs font-bold py-2 px-5 flex items-center gap-1.5 w-full sm:w-auto justify-center"
              style={{ margin: 0 }}
            >
              <span>Apply For Cohort</span>
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
