import React from 'react';
import { ArrowRight, ArrowUp } from 'lucide-react';

interface BrutalistFooterProps {
  onOpenRoadmap: () => void;
  onOpenFaq: () => void;
  onOpenDiagnostic: () => void;
  onApply?: () => void;
  onOpenAdmin?: () => void;
}

export const BrutalistFooter: React.FC<BrutalistFooterProps> = ({
  onOpenRoadmap,
  onOpenFaq,
  onOpenDiagnostic,
  onApply,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0a0a0f] text-white border-t-3 border-white relative z-20 font-sans">
      
      {/* Main Top Horizon (Spacious, Minimalist, High-Contrast) */}
      <div className="max-w-[1488px] mx-auto px-6 sm:px-10 lg:px-14 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Brand & Ethos Column (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6 max-w-xl">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/white_transparent_logo-2_6e69edc6.png"
                alt="POLOMO"
                className="h-9 w-auto object-contain"
              />
              <span className="font-extrabold text-2xl tracking-tight text-white uppercase">
                POLOMO<span className="text-[#FF0000]">.</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#FF0000] text-white border border-white/40">
                Stage Labs
              </span>
            </div>

            <p className="text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed m-0">
              Confidence is a physical reflex built through live repetition, not intellectual lectures. We desensitize the stage freeze through high-frequency micro-reps.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onApply || (() => { const el = document.getElementById('cohort'); el?.scrollIntoView({ behavior: 'smooth' }); })}
                className="btn btn--primary"
                style={{
                  fontSize: '14px',
                  padding: '10px 22px',
                  boxShadow: '4px 4px 0px 0px #FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                }}
              >
                <span>Join Next Cohort</span>
                <ArrowRight className="size-4 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Right Navigation Columns (6 cols split into 2 clean columns) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 w-full">
            
            {/* Column 1: Platform Console */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#FF0000]" aria-hidden="true" />
                <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-400 m-0">
                  Platform
                </h3>
              </div>

              <ul className="space-y-2.5 list-none p-0 m-0 text-sm font-medium">
                <li>
                  <a
                    href="#approach"
                    className="text-zinc-300 hover:text-white hover:underline underline-offset-4 decoration-[#FF0000] decoration-2 transition-colors block py-0.5"
                  >
                    Our Method &amp; Protocol
                  </a>
                </li>
                <li>
                  <a
                    href="#who-it-is-for"
                    className="text-zinc-300 hover:text-white hover:underline underline-offset-4 decoration-[#FF0000] decoration-2 transition-colors text-left bg-transparent border-none p-0 font-medium text-sm cursor-pointer block py-0.5"
                  >
                    Who It's For
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-zinc-300 hover:text-white hover:underline underline-offset-4 decoration-[#FFE500] decoration-2 transition-colors text-left bg-transparent border-none p-0 font-medium text-sm cursor-pointer block py-0.5"
                  >
                    Frequently Answered Questions
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenDiagnostic}
                    className="text-zinc-300 hover:text-white hover:underline underline-offset-4 decoration-[#00E575] decoration-2 transition-colors text-left bg-transparent border-none p-0 font-medium text-sm cursor-pointer block py-0.5"
                  >
                    10-Min Diagnostic Call ↗
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onApply || (() => { const el = document.getElementById('cohort'); el?.scrollIntoView({ behavior: 'smooth' }); })}
                    className="text-zinc-300 hover:text-white hover:underline underline-offset-4 decoration-[#8FD4EE] decoration-2 transition-colors text-left bg-transparent border-none p-0 font-medium text-sm cursor-pointer block py-0.5"
                  >
                    Cohort Intake Terminal ↗
                  </button>
                </li>
                {onOpenAdmin && (
                  <li>
                    <button
                      type="button"
                      onClick={onOpenAdmin}
                      className="text-zinc-400 hover:text-[#FFE500] hover:underline underline-offset-4 decoration-[#FFE500] decoration-2 transition-colors text-left bg-transparent border-none p-0 font-medium text-xs uppercase tracking-wider cursor-pointer block py-0.5"
                    >
                      ⚙ Mission Control Switchboard
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Column 2: Who It's For */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#FFE500]" aria-hidden="true" />
                <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-400 m-0">
                  Who It's For
                </h3>
              </div>

              <ul className="space-y-2.5 list-none p-0 m-0 text-sm font-medium">
                <li>
                  <a
                    href="#who-it-is-for"
                    className="group inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors py-0.5"
                  >
                    <span className="size-1.5 rounded-full bg-[#8FD4EE]" />
                    <span className="group-hover:underline underline-offset-4 decoration-[#8FD4EE] decoration-2">
                      Students &amp; Graduates
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#who-it-is-for"
                    className="group inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors py-0.5"
                  >
                    <span className="size-1.5 rounded-full bg-[#FFE500]" />
                    <span className="group-hover:underline underline-offset-4 decoration-[#FFE500] decoration-2">
                      Professionals &amp; Seekers
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#who-it-is-for"
                    className="group inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors py-0.5"
                  >
                    <span className="size-1.5 rounded-full bg-[#FF4071]" />
                    <span className="group-hover:underline underline-offset-4 decoration-[#FF4071] decoration-2">
                      Founders &amp; Creators
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://chat.whatsapp.com/invite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors py-0.5"
                  >
                    <span className="size-1.5 rounded-full bg-[#00E575]" />
                    <span className="text-[#00E575] font-semibold group-hover:underline underline-offset-4 decoration-[#00E575] decoration-2">
                      WhatsApp Speaking Circle ↗
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-zinc-400 hover:text-white transition-colors block py-0.5 text-xs uppercase tracking-wider font-semibold"
                  >
                    The POLOMO Manifesto
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Ledger (Crisp, Monolithic Baseline) */}
      <div className="w-full border-t border-white/15 bg-black/60 px-6 sm:px-10 lg:px-14 py-6 text-xs text-zinc-400 font-medium">
        <div className="max-w-[1488px] mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          
          <div className="flex flex-wrap items-center gap-2.5 text-center md:text-left">
            <span className="text-white font-bold tracking-tight">
              &copy; {new Date().getFullYear()} POLOMO LABS.
            </span>
            <span>All rights reserved.</span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="text-zinc-400">Practical exposure and desensitization platform.</span>
          </div>

          <div className="text-[11px] text-zinc-400 border border-white/15 px-3 py-1.5 bg-[#121218] text-center md:text-left max-w-md leading-relaxed">
            <strong className="text-white">Notice:</strong> Practical skill and behavioral exposure program. Not clinical medical treatment or psychological therapy.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-white bg-[#FF0000] text-white font-extrabold text-xs uppercase tracking-wider shadow-[3px_3px_0_#FFFFFF] hover:bg-[#e60000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#FFFFFF] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Top</span>
            <ArrowUp className="size-3.5 stroke-[3]" />
          </button>

        </div>
      </div>

    </footer>
  );
};
