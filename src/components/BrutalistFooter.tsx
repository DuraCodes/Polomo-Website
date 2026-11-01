import React from 'react';
import { ArrowUp } from 'lucide-react';

interface BrutalistFooterProps {
  onOpenRoadmap?: () => void;
  onOpenFaq?: () => void;
  onOpenDiagnostic?: () => void;
  onApply?: () => void;
  onOpenAdmin?: () => void;
}

export const BrutalistFooter: React.FC<BrutalistFooterProps> = ({
  onOpenDiagnostic,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0a0a0f] text-white border-t-2 border-white/15 font-sans relative z-20">
      <div className="max-w-[1488px] mx-auto px-6 sm:px-10 lg:px-14 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          
          {/* Brand - Clean Logo + One-Line Ethos */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <a href="#top" aria-label="POLOMO home" className="inline-block transition-transform hover:scale-105">
              <img
                src="/assets/aistudio/white_transparent_logo-2_6e69edc6.png"
                alt="POLOMO"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </a>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-xs sm:text-sm text-neutral-400 font-medium">
              Practical confidence through live repetition
            </span>
          </div>

          {/* Core Navigation Links - Consistent with Header Nav */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold" aria-label="Footer Navigation">
            <a
              href="#approach"
              className="text-neutral-300 hover:text-white hover:underline decoration-[#FF0000] decoration-2 underline-offset-6 transition-colors"
            >
              Our Method
            </a>
            <a
              href="#who-it-is-for"
              className="text-neutral-300 hover:text-white hover:underline decoration-[#FF0000] decoration-2 underline-offset-6 transition-colors"
            >
              Who It's For
            </a>
            <a
              href="#faq"
              className="text-neutral-300 hover:text-white hover:underline decoration-[#FF0000] decoration-2 underline-offset-6 transition-colors"
            >
              FAQ
            </a>
            {onOpenDiagnostic && (
              <button
                type="button"
                onClick={onOpenDiagnostic}
                className="text-neutral-300 hover:text-white hover:underline decoration-[#FFE500] decoration-2 underline-offset-6 transition-colors bg-transparent border-none p-0 cursor-pointer font-semibold text-sm"
              >
                Free Diagnostic
              </button>
            )}
            <a
              href="https://chat.whatsapp.com/invite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00E575] hover:text-[#00c965] hover:underline decoration-[#00E575] decoration-2 underline-offset-6 transition-colors font-bold"
            >
              WhatsApp Circle ↗
            </a>
          </nav>
        </div>

        {/* Bottom Line: Clean Copyright & Back-to-Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-neutral-500 font-medium">
          <div className="flex items-center gap-3">
            <span>&copy; {new Date().getFullYear()} POLOMO. All rights reserved.</span>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-neutral-600 hover:text-neutral-400 transition-colors text-[11px] cursor-pointer bg-transparent border-none p-0"
                aria-label="Admin switchboard"
              >
                • Admin
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 hover:border-white text-xs font-bold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer min-h-[36px]"
          >
            <span>Top</span>
            <ArrowUp className="size-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
