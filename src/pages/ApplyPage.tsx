import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUp, Shield, CheckCircle2 } from 'lucide-react';
import { CohortApplicationForm } from '../components/CohortApplicationForm';

interface ApplyPageProps {
  onBack: () => void;
}

export const ApplyPage: React.FC<ApplyPageProps> = ({ onBack }) => {
  // Scroll to top upon mounting
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0A0A0C] flex flex-col font-sans selection:bg-[#FFE500] selection:text-black">
      
      {/* 1. Minimalist Focused Header */}
      <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b-[2.5px] border-black px-4 sm:px-8 py-3.5 shadow-[0_2px_0_#000]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          
          {/* Logo & Platform Tag */}
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-3 bg-transparent border-none p-0 cursor-pointer group"
          >
            <span className="font-black text-2xl tracking-tight text-[#0A0A0C] uppercase">
              POLOMO<span className="text-[#FF3366]">.</span>
            </span>
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFE500] text-black border-2 border-black shadow-[1px_1px_0_#000]">
              Intake
            </span>
          </button>

          {/* Tactile Return Button - Neobrutalism.dev Pill */}
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black rounded-full bg-white hover:bg-neutral-100 text-black font-extrabold text-xs uppercase tracking-wider shadow-[2px_2px_0_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
          >
            <ArrowLeft className="size-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Return to Overview</span>
            <span className="sm:hidden">Back</span>
          </button>

        </div>
      </header>

      {/* 2. Main Intake Terminal Canvas */}
      <main className="flex-1 max-w-[1100px] mx-auto w-full px-4 sm:px-8 py-10 sm:py-14">
        
        {/* Telemetry Status Ribbon - Clean Light Neobrutalism Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-5 border-b-2 border-black/10">
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E575] opacity-75" />
              <span className="relative inline-flex rounded-full size-3 bg-[#00E575] border border-black" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-[#0A0A0C]">
              Live Enrollment: <strong className="text-black bg-[#00E575] px-2 py-0.5 rounded border border-black">Cohort 08 (Active)</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-neutral-700">
            <span className="flex items-center gap-1.5">
              <Shield className="size-4 text-black" />
              12-Person Micro-Pods
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-black" />
              Zero Public Theory
            </span>
          </div>
        </div>

        {/* The Reusable Complete Application Terminal Form */}
        <CohortApplicationForm />

      </main>

      {/* 3. Minimalist Footer */}
      <footer className="w-full border-t-[2.5px] border-black bg-white px-6 sm:px-10 py-6 text-xs text-neutral-600 font-medium mt-auto">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-2 text-center md:text-left">
            <span className="text-black font-black">
              &copy; {new Date().getFullYear()} POLOMO LABS.
            </span>
            <span>All rights reserved.</span>
            <span className="hidden sm:inline text-black/20">•</span>
            <span className="text-neutral-500">Admissions &amp; Pod Placement switchboard.</span>
          </div>

          <div className="text-[11px] text-neutral-700 border-2 border-black rounded-lg px-3 py-1.5 bg-[#FAF8F5] text-center md:text-left leading-relaxed font-semibold">
            <strong className="text-black">Notice:</strong> Practical exposure and desensitization program. Not clinical therapy.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border-2 border-black rounded-full bg-white hover:bg-neutral-100 text-black font-extrabold text-xs uppercase tracking-wider shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer transition-all"
          >
            <span>Top</span>
            <ArrowUp className="size-3 stroke-[2.5]" />
          </button>

        </div>
      </footer>

    </div>
  );
};
