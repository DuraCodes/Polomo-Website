import React from 'react';
import { Radio, Mic, Sparkles, ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';

interface WhatsAppCommunityCardProps {
  onBookDiagnostic: () => void;
  whatsappInviteUrl?: string;
}

export const WhatsAppCommunityCard: React.FC<WhatsAppCommunityCardProps> = ({
  onBookDiagnostic,
  whatsappInviteUrl = 'https://chat.whatsapp.com/invite',
}) => {
  return (
    <section className="section" id="community" aria-labelledby="community-title">
      <div className="relative border-3 border-white bg-[#12121a] rounded-2xl p-6 sm:p-10 shadow-[10px_10px_0_#00E575] overflow-hidden">
        
        {/* Subtle Neobrutalist Grid / Halftone Texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(rgba(0, 229, 117, 0.4) 1.2px, transparent 1.3px)',
            backgroundSize: '20px 20px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded bg-[#00E575] text-black border-2 border-black shadow-[2px_2px_0_#000]">
              Zero-Risk Community
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded bg-white/10 text-white border border-white/25">
              Free WhatsApp Practice Circle
            </span>
          </div>

          <h2 id="community-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Not Ready for the Spotlight Yet? <br />
            <span className="text-[#00E575]">Start With Our Free Practice Circle.</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mb-8">
            Public speaking anxiety shrinks through low-stakes repetition, not solitary overthinking. Join our private community to observe, listen, or take your very first micro-reps in a safe, judgment-free space.
          </p>

          {/* 3 Pop-Neobrutalist Cards Matching "Our Approach" Spec */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            
            {/* Card 1: Weekly Live AMAs (Neon Green #00E575) */}
            <article className="relative flex flex-col justify-between bg-[#00E575] border-3 border-black text-[#111118] rounded-2xl p-6 shadow-[6px_6px_0_#000] md:[transform:rotate(-1.2deg)] hover:md:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200">
              <span
                className="card__dot"
                aria-hidden="true"
                style={{ top: '20px', right: '20px', width: '20px', height: '20px', background: '#111118' }}
              />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-black text-[#00E575]">
                    Live Audio
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#111118] tracking-tight mb-1">
                  Weekly Live AMAs
                </h3>
                <p className="text-[#181820] font-medium text-xs sm:text-sm leading-relaxed mb-4">
                  Hop onto weekly live group audio calls. Ask unscripted questions, listen to breakdowns, or volunteer for 60 seconds of gentle coaching.
                </p>
              </div>

              <div className="pt-4">
                <a
                  href={whatsappInviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill cursor-pointer"
                  style={{ marginTop: 0 }}
                >
                  <span>Listen in</span>
                  <ArrowRight className="size-3.5 stroke-[2.5]" />
                </a>
              </div>
            </article>

            {/* Card 2: 45-Sec Voice Drills (Solar Gold #FFE500) */}
            <article className="relative flex flex-col justify-between bg-[#FFE500] border-3 border-black text-[#111118] rounded-2xl p-6 shadow-[6px_6px_0_#000] md:[transform:rotate(1.5deg)] hover:md:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200">
              <span
                className="card__dot"
                aria-hidden="true"
                style={{ top: '20px', right: '20px', width: '20px', height: '20px', background: '#FF0000' }}
              />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-black text-white">
                    Micro-Habit
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#111118] tracking-tight mb-1">
                  45-Sec Voice Drills
                </h3>
                <p className="text-[#181820] font-medium text-xs sm:text-sm leading-relaxed mb-4">
                  Bite-sized audio prompts dropped mid-week. Record a quick voice note answering a surprise prompt to build unscripted impromptu reflexes.
                </p>
              </div>

              <div className="pt-4">
                <a
                  href={whatsappInviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill cursor-pointer"
                  style={{ marginTop: 0 }}
                >
                  <span>Practice voice</span>
                  <ArrowRight className="size-3.5 stroke-[2.5]" />
                </a>
              </div>
            </article>

            {/* Card 3: Priority Pod Drops (Hot Pink #FF3366) */}
            <article className="relative flex flex-col justify-between bg-[#FF3366] border-3 border-black text-white rounded-2xl p-6 shadow-[6px_6px_0_#000] md:[transform:rotate(-1deg)] hover:md:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200">
              <span
                className="card__dot"
                aria-hidden="true"
                style={{ top: '20px', right: '20px', width: '20px', height: '20px', background: '#FFFFFF' }}
              />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-black text-white">
                    Early Access
                  </span>
                </div>
                <h3 className="text-xl font-black text-white tracking-tight mb-1">
                  Priority Pod Drops
                </h3>
                <p className="text-white/95 font-medium text-xs sm:text-sm leading-relaxed mb-4">
                  When new small-group exposure pods open, active community members receive 48-hour priority registration before public launch.
                </p>
              </div>

              <div className="pt-4">
                <a
                  href={whatsappInviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill cursor-pointer"
                  style={{ marginTop: 0 }}
                >
                  <span>Get priority</span>
                  <ArrowRight className="size-3.5 stroke-[2.5]" />
                </a>
              </div>
            </article>

          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={whatsappInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#00E575] hover:bg-[#00c965] text-black font-extrabold text-sm sm:text-base uppercase tracking-wider border-2 border-black shadow-[4px_4px_0_#FFFFFF] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_#FFFFFF] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            >
              <MessageSquare className="size-5 stroke-[2.5]" />
              <span>Enter WhatsApp Community</span>
              <ArrowRight className="size-4 stroke-[2.5]" />
            </a>

            <button
              type="button"
              onClick={onBookDiagnostic}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#14141e] hover:bg-[#1e1e2c] text-white border-2 border-white font-extrabold text-sm uppercase tracking-wider shadow-[4px_4px_0_#FFE500] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_#FFE500] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
            >
              <Radio className="size-4 text-[#00E575] animate-pulse" />
              <span>Or Book 10-Min 1-on-1 Diagnostic</span>
            </button>
          </div>

          {/* Proof Badges */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-5 mt-6 border-t border-white/10 text-xs font-semibold text-zinc-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-[#00E575]" />
              <span>Free to join &amp; participate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-[#FFE500]" />
              <span>No mandatory speaking requirement</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-[#FF3366]" />
              <span>Supportive, moderated peer circle</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
