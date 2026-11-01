import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface BrutalistFooterProps {
  onOpenFaq?: () => void;
  onOpenDiagnostic?: () => void;
  onApply?: () => void;
}

/**
 * Open-Source Inspired Animated Social Media Icons
 * Sources:
 * - 21st.dev & Magic UI: Spring-physics icon dock architecture & magnetic elevation
 * - Uiverse.io: Multi-layered brand hover transitions & kinetic SVG rotation
 * - Motion Primitives (Julien Thibeaut): Elastic micro-interactions with compositor-only properties
 * Note: Pure icon geometry with zero extraneous text as specified.
 */
interface SocialItem {
  id: string;
  name: string;
  href: string;
  hoverBg: string;
  hoverGlow: string;
  hoverText: string;
  icon: (props: { className?: string }) => React.ReactElement;
}

const WHATSAPP_URL = 'https://chat.whatsapp.com/LHcbvetC4sRG8Sr7hAk2Uq?s=cl&p=a&mlu=4&ilr=4';

const SOCIAL_ITEMS: SocialItem[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    href: 'https://www.tiktok.com/@polomoconcept',
    hoverBg: 'hover:bg-black',
    hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(254,44,85,0.55),0_0_12px_rgba(37,244,238,0.55)]',
    hoverText: 'group-hover:text-white',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.69a6.34 6.34 0 0 0 6.34 6.31 6.34 6.34 0 0 0 6.34-6.31V9.26a8.28 8.28 0 0 0 5-1.63v-3.44a8.2 8.2 0 0 1-1.09 2.5z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    href: 'https://www.instagram.com/polomo_concept/',
    hoverBg: 'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]',
    hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(220,39,67,0.55)]',
    hoverText: 'group-hover:text-white',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Practice Circle',
    href: WHATSAPP_URL,
    hoverBg: 'hover:bg-[#25D366]',
    hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(37,211,102,0.6)]',
    hoverText: 'group-hover:text-black',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.031 0C5.405 0 .025 5.38.025 12.005c0 2.115.55 4.18 1.597 5.993L0 24l6.19-1.624c1.748.954 3.722 1.456 5.836 1.456 6.626 0 12.006-5.38 12.006-12.005C24.032 5.38 18.657 0 12.031 0zm0 21.99c-1.802 0-3.568-.485-5.109-1.4l-.366-.217-3.795.996 1.013-3.699-.239-.38A9.97 9.97 0 0 1 2.046 12.005c0-5.506 4.48-9.986 9.985-9.986 5.506 0 9.986 4.48 9.986 9.986 0 5.506-4.48 9.985-9.986 9.985zm5.474-7.487c-.3-.15-1.774-.875-2.048-.975-.274-.1-.473-.15-.672.15-.2.3-.772.975-.947 1.175-.175.2-.349.225-.649.075-.3-.15-1.267-.467-2.414-1.49-1.077-.96-1.805-2.146-2.016-2.508-.212-.362-.023-.558.127-.707.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.672-1.62-9.2-2.218-.242-.582-.488-.503-.672-.512-.174-.009-.374-.011-.573-.011-.2 0-.524.075-.798.375s-1.047 1.023-1.047 2.495c0 1.472 1.072 2.894 1.222 3.094.15.2 2.11 3.222 5.112 4.52 3.002 1.298 3.002.865 3.548.815.548-.05 1.774-.725 2.023-1.425.25-.7.25-1.3.175-1.425-.075-.125-.274-.2-.574-.35z" />
      </svg>
    ),
  },
];

export const BrutalistFooter: React.FC<BrutalistFooterProps> = ({
  onOpenFaq,
  onOpenDiagnostic,
  onApply,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#090A0F] text-white border-t border-white/10 font-sans relative z-20">
      <div className="max-w-[1488px] mx-auto px-6 sm:px-10 lg:px-14 py-12 sm:py-16">
        
        {/* Main Grid: Clean 3-Column Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Core Ethos (5 Cols) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <a
                href="#top"
                aria-label="POLOMO home"
                className="inline-block transition-transform duration-200 hover:scale-[1.03]"
              >
                <img
                  src="/assets/aistudio/white_transparent_logo-2_6e69edc6.png"
                  alt="POLOMO"
                  className="h-9 sm:h-10 w-auto object-contain"
                />
              </a>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-md font-normal">
                A high-exposure confidence incubator for students, professionals, and founders who freeze when the room looks up.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <span className="font-semibold text-white tracking-wide">ZERO THEORY</span>
              <span className="text-white/20" aria-hidden="true">·</span>
              <span className="font-semibold text-[#00E575] tracking-wide">ACTIVE EXPOSURE</span>
              <span className="text-white/20" aria-hidden="true">·</span>
              <span className="font-semibold text-[#FFE500] tracking-wide">12 SEATS / POD</span>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">
              Program &amp; Access
            </div>
            <nav className="flex flex-col space-y-2.5 text-sm font-semibold" aria-label="Footer Quick Links">
              <a
                href="#approach"
                className="text-neutral-300 hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5 w-fit"
              >
                Our Method
              </a>
              <a
                href="#who-it-is-for"
                className="text-neutral-300 hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5 w-fit"
              >
                Who It's For
              </a>

              {onOpenFaq ? (
                <button
                  type="button"
                  onClick={onOpenFaq}
                  className="text-neutral-300 hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5 w-fit bg-transparent border-none p-0 cursor-pointer font-semibold text-sm text-left"
                >
                  FAQ Inquiries
                </button>
              ) : (
                <a
                  href="#faq"
                  className="text-neutral-300 hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5 w-fit"
                >
                  FAQ Inquiries
                </a>
              )}
              {onOpenDiagnostic && (
                <button
                  type="button"
                  onClick={onOpenDiagnostic}
                  className="text-[#FFE500] hover:text-[#fff066] transition-colors duration-150 inline-flex items-center gap-1 w-fit bg-transparent border-none p-0 cursor-pointer font-semibold text-sm text-left"
                >
                  1-on-1 Diagnostic Pass
                  <ArrowUpRight className="size-3.5 stroke-[2.5]" />
                </button>
              )}
              {onApply && (
                <button
                  type="button"
                  onClick={onApply}
                  className="text-[#FF0000] hover:text-[#ff3333] transition-colors duration-150 inline-flex items-center gap-1 w-fit bg-transparent border-none p-0 cursor-pointer font-bold text-sm text-left"
                >
                  Admissions Terminal
                  <ArrowUpRight className="size-3.5 stroke-[2.5]" />
                </button>
              )}
            </nav>
          </div>

          {/* Column 3: Animated Social Media Dock (TikTok, Instagram, WhatsApp - Strictly Pure Icons) */}
          <div className="md:col-span-4 flex flex-col justify-start space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Official Channels
            </div>
            <p className="text-xs text-neutral-400 font-medium leading-relaxed max-w-sm">
              Follow POLOMO for unscripted stage reps, real student breakdowns, and weekly speaking challenges.
            </p>

            {/* Strictly Icon-Only Non-Generic Animated Buttons */}
            <div
              className="flex items-center gap-3 pt-1"
              role="list"
              aria-label="Official Social Media Profiles"
            >
              {SOCIAL_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    role="listitem"
                    whileHover={{ y: -5, scale: 1.14 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 17 }}
                    className={`group relative flex items-center justify-center size-12 sm:size-13 rounded-2xl bg-[#121218] border-2 border-white/15 text-neutral-300 transition-all duration-200 cursor-pointer ${item.hoverBg} ${item.hoverGlow} ${item.hoverText} hover:border-transparent select-none`}
                  >
                    {/* Ambient Glow Aura */}
                    <span
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Animated SVG Glyph */}
                    <span className="relative z-10 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-[6deg]">
                      <Icon className="size-5 sm:size-5.5 shrink-0" />
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* WhatsApp Community Quick Link Pill */}
            <div className="pt-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full max-w-sm p-3 rounded-xl bg-[#121218] border-2 border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#25D366]/10 text-white transition-all duration-200 group text-xs font-semibold"
              >
                <div className="flex items-center gap-2.5">
                  <span className="size-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-neutral-200 group-hover:text-white transition-colors">Join Verified WhatsApp Circle</span>
                </div>
                <ArrowUpRight className="size-4 text-[#25D366] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Utility Bar: Copyright & Back-to-Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-neutral-500 font-medium">
          <div className="flex flex-wrap items-center gap-3">
            <span>&copy; {new Date().getFullYear()} POLOMO. All rights reserved.</span>
            <span className="hidden sm:inline text-white/10" aria-hidden="true">|</span>
            <span>Real exposure. Zero simulation.</span>
          </div>

          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top of page"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 hover:border-white text-xs font-bold text-neutral-300 hover:text-white bg-[#121218] hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="size-3.5 stroke-[2.5] transition-transform duration-200 group-hover:-translate-y-0.5" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
};
