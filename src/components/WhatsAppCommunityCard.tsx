import React from 'react';
import { MessageSquare, Mic, Radio, Users, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

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
      <div className="relative border-3 border-white bg-[#121218] p-6 sm:p-10 shadow-[8px_8px_0_#00E575] overflow-hidden">
        
        {/* Background Dot Texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#00E575 1.2px, transparent 1.3px)',
            backgroundSize: '20px 20px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 bg-[#00E575] text-black">
              Zero-Risk Community
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-white/10 text-white border border-white/20">
              Free WhatsApp Group
            </span>
          </div>

          <h2 id="community-title" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Not Ready for the Spotlight Yet? <br />
            <span className="text-[#00E575]">Start With Our Free Practice Circle.</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mb-8">
            Public speaking anxiety shrinks through low-stakes repetition, not solitary overthinking. Join our private WhatsApp community to observe, listen, or take your very first micro-reps in a safe, judgment-free environment.
          </p>

          {/* 3 Pillars of the WhatsApp Community */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#181822] border-2 border-white/15 p-4 sm:p-5 hover:border-[#00E575] transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="size-8 rounded-full bg-[#00E575]/20 text-[#00E575] flex items-center justify-center font-bold">
                  <Radio className="size-4" />
                </span>
                <h3 className="text-base font-bold text-white">Weekly Live AMAs</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Hop onto our weekly live group audio calls. Ask unscripted questions, listen to live breakdowns, or volunteer for 60 seconds of gentle coaching.
              </p>
            </div>

            <div className="bg-[#181822] border-2 border-white/15 p-4 sm:p-5 hover:border-[#FFE500] transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="size-8 rounded-full bg-[#FFE500]/20 text-[#FFE500] flex items-center justify-center font-bold">
                  <Mic className="size-4" />
                </span>
                <h3 className="text-base font-bold text-white">45-Sec Voice Drills</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Bite-sized audio prompts dropped mid-week. Record a quick voice note answering a surprise question to build instant impromptu reflexes.
              </p>
            </div>

            <div className="bg-[#181822] border-2 border-white/15 p-4 sm:p-5 hover:border-[#FF4071] transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="size-8 rounded-full bg-[#FF4071]/20 text-[#FF4071] flex items-center justify-center font-bold">
                  <Sparkles className="size-4" />
                </span>
                <h3 className="text-base font-bold text-white">Priority Pod Drops</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                When new 12-person Telegram exposure pods open, community members receive 48-hour early enrollment access before the public.
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={whatsappInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#00E575] hover:bg-[#00c965] text-black font-extrabold text-sm uppercase tracking-wider shadow-[4px_4px_0_#FFFFFF] transition-all"
            >
              <MessageSquare className="size-4.5 stroke-[2.5]" />
              Enter WhatsApp Community
              <ArrowRight className="size-4 stroke-[2.5]" />
            </a>

            <button
              type="button"
              onClick={onBookDiagnostic}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer"
            >
              Or Book 10-Min 1-on-1 Diagnostic
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
