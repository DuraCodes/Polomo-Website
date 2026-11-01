import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, User, Mail, Phone, MessageSquare, Zap } from 'lucide-react';

export interface CohortCalloutCardProps {
  cohortStatus?: 'DIAGNOSTIC' | 'OPEN' | 'WAITLIST';
  whatsappInviteUrl?: string;
  initialTrack?: 'student' | 'professional' | 'founder';
}

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  track: 'student' | 'professional' | 'founder';
  symptom: string;
}

const SYMPTOM_OPTIONS = [
  'Total brain freeze / blanking',
  'Vocal trembling / voice shake',
  'Racing heart under eye contact',
  'Fear of unscripted curveball Q&A',
  'Sweating & flushing',
  'Rushing slides to escape'
];

interface DiagnosticResult {
  id: string;
  date: string;
  track: string;
  podName: string;
  profileName: string;
  resetProtocol: string;
  protocolKey: string;
}

export const CohortCalloutCard: React.FC<CohortCalloutCardProps> = ({
  whatsappInviteUrl = 'https://chat.whatsapp.com/invite',
  initialTrack = 'professional',
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    whatsapp: '',
    track: initialTrack,
    symptom: 'Total brain freeze / blanking'
  });

  useEffect(() => {
    if (initialTrack) {
      setFormData((prev) => ({ ...prev, track: initialTrack }));
    }
  }, [initialTrack]);

  const [submittedTicket, setSubmittedTicket] = useState<DiagnosticResult | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; whatsapp?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; whatsapp?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Valid email is required for your diagnostic report';
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required for pod access';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const ticketId = `POL-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackNames = {
      student: 'Students & Grads Pod',
      professional: 'Career Professionals Pod',
      founder: 'Founders & Pitch Pod'
    };

    // Calculate dynamic diagnostic profile based on selected freeze symptom
    let profileName = 'High-Arousal Freeze Responder';
    let protocolKey = 'Physiological Double-Inhale & Composure Anchor';
    let resetProtocol = 'Inhale deeply through your nose, take a second micro-sip of air at the top, then exhale slowly through pursed lips. Instantly resets the vagus nerve and lowers heart rate before you speak.';

    if (formData.symptom.includes('blanking')) {
      profileName = 'Audience Scrutiny Blanker';
      protocolKey = '3-Second Micro-Anchor Phrase';
      resetProtocol = 'When thoughts vanish, use the anchor: "Let me frame the core priority here." This buys 3 seconds for prefrontal cortex re-engagement while projecting supreme executive control.';
    } else if (formData.symptom.includes('trembling')) {
      profileName = 'Vocal Motor Tension Responder';
      protocolKey = 'Diaphragm Vibration Release';
      resetProtocol = 'Drop your shoulders and hum a low pitch for 2 seconds before unmuting. This activates the recurrent laryngeal nerve, relaxing vocal cord spasm immediately.';
    } else if (formData.symptom.includes('Rushing')) {
      profileName = 'Adrenaline Rush Escape Responder';
      protocolKey = 'Grounding Foot Lock & Silent Cadence';
      resetProtocol = 'Plant both feet flat on the floor. Take a 2-second deliberate pause between key sentences. To an audience, deliberate pauses look like absolute authority.';
    }

    setSubmittedTicket({
      id: ticketId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      track: trackNames[formData.track],
      podName: formData.track === 'founder' ? 'Pod Vulcan (Founder Beta)' : formData.track === 'student' ? 'Pod Beacon (Student Beta)' : 'Pod Apex (Executive Beta)',
      profileName,
      resetProtocol,
      protocolKey
    });
  };

  return (
    <section
      className="w-full min-h-screen min-h-[100dvh] bg-[#0D0D12] text-white border-b-[3px] border-black flex flex-col justify-center py-10 sm:py-14 lg:py-16 px-[var(--gutter)] scroll-mt-20 relative overflow-hidden"
      id="cohort"
      aria-labelledby="cohort-callout-title"
    >
      <div className="w-full max-w-[860px] mx-auto relative z-10">
        
        {/* Header - Clean Neo-Brutalist blueprint */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 flex-wrap">
          <h2
            id="cohort-callout-title"
            className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-white tracking-tight leading-tight m-0 font-display"
          >
            Speaking Diagnostic &amp; Practice Pass
          </h2>
          <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#FFE500] text-black border-2 border-black shadow-[2px_2px_0_#FFFFFF]">
            Free 60-Sec Diagnostic · Instant Biological Resets
          </span>
        </div>

        {submittedTicket ? (
          /* Instant Lead Magnet Payoff: Diagnostic Result + WhatsApp Bridge */
          <div className="border-[3px] border-black bg-white rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0_#FFE500] relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-[#111118]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b-2 border-dashed border-black/30 gap-3">
              <div className="flex items-center gap-3.5">
                <div className="size-12 rounded-xl bg-[#00E575] border-[2.5px] border-black flex items-center justify-center font-black text-xl text-black shadow-[2px_2px_0_#000]">
                  ✓
                </div>
                <div>
                  <span className="text-xs font-black tracking-wider uppercase text-black bg-[#FFE500] px-2.5 py-0.5 rounded-full border border-black inline-block">
                    Diagnostic Complete
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0C] m-0 mt-1 font-display">
                    {submittedTicket.profileName}
                  </h3>
                </div>
              </div>
              <div className="bg-black text-[#FFE500] px-4 py-2 rounded-xl border-[2.5px] border-black font-mono text-sm font-black shadow-[2px_2px_0_#FFE500]">
                {submittedTicket.id}
              </div>
            </div>

            {/* Immediate Biological Reset Breakdown (The Payoff) */}
            <div className="my-5 p-4 sm:p-5 rounded-xl border-2 border-black bg-[#FAF7EE] shadow-[3px_3px_0_#000]">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="size-4 text-[#FF3366] fill-[#FF3366]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#0A0A0C]">
                  Your Emergency Biological Reset: {submittedTicket.protocolKey}
                </span>
              </div>
              <p className="text-sm sm:text-[15px] font-medium text-neutral-800 leading-relaxed m-0">
                {submittedTicket.resetProtocol}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 py-4 border-b-2 border-black/10">
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border-2 border-black shadow-[2px_2px_0_#000]">
                <span className="text-neutral-500 text-xs block font-extrabold uppercase tracking-wider mb-0.5">Member</span>
                <span className="text-[#0A0A0C] font-black text-base block truncate">{formData.name}</span>
                <span className="text-neutral-600 text-xs block truncate font-medium">{formData.email}</span>
              </div>
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border-2 border-black shadow-[2px_2px_0_#000]">
                <span className="text-neutral-500 text-xs block font-extrabold uppercase tracking-wider mb-0.5">Assigned Practice Pod</span>
                <span className="text-[#0A0A0C] font-black text-base block truncate">{submittedTicket.podName}</span>
                <span className="text-emerald-700 text-xs block font-bold mt-0.5">Weekly Voice Drills (Listen or Speak)</span>
              </div>
            </div>

            {/* The Bridge into WhatsApp Community */}
            <div className="pt-5 flex justify-center">
              <a
                href={whatsappInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full border-2 border-black bg-[#25D366] hover:bg-[#20ba59] text-black font-black text-sm sm:text-base uppercase tracking-wider shadow-[4px_4px_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all w-full sm:w-auto text-center"
              >
                <MessageSquare className="size-5 stroke-[3]" />
                <span>Open WhatsApp &amp; Join Practice Pod ↗</span>
              </a>
            </div>

            <div className="mt-4 pt-3 border-t border-black/10 text-center sm:text-right">
              <button
                type="button"
                onClick={() => setSubmittedTicket(null)}
                className="text-xs font-bold text-neutral-600 underline underline-offset-4 hover:text-black cursor-pointer"
              >
                Run Another Diagnostic
              </button>
            </div>
          </div>
        ) : (
          /* Main 3-Step Diagnostic Terminal (Less is More) */
          <form
            onSubmit={handleSubmit}
            className="border-[3px] border-black bg-white rounded-2xl p-6 sm:p-8 lg:p-9 shadow-[6px_6px_0_#FFE500] relative text-[#111118]"
          >
            {/* 1. Track Selector */}
            <div className="mb-5">
              <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#0A0A0C] mb-2.5 block">
                1. SELECT YOUR SPEAKING FOCUS
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'student', title: 'Students & Grads', desc: 'Theses & interviews', color: 'bg-[#C7D2FE]' },
                  { id: 'professional', title: 'Professionals', desc: 'Meetings & reviews', color: 'bg-[#FFE500]' },
                  { id: 'founder', title: 'Founders & Creators', desc: 'Pitches & keynotes', color: 'bg-[#FF3366]' }
                ].map((t) => {
                  const isSelected = formData.track === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, track: t.id as any })}
                      className={`p-3 rounded-xl border-2 border-black text-left cursor-pointer transition-all ${
                        isSelected
                          ? `${t.color} text-black shadow-[3px_3px_0_#000] translate-x-[-1px] translate-y-[-1px]`
                          : 'bg-[#FAF8F5] text-neutral-800 hover:bg-neutral-100 shadow-[1.5px_1.5px_0_#000]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-black text-sm ${isSelected && t.id === 'founder' ? 'text-white' : 'text-[#0A0A0C]'}`}>
                          {t.title}
                        </span>
                        {isSelected && (
                          <span className={`size-2.5 rounded-full ${t.id === 'founder' ? 'bg-white' : 'bg-black'} shrink-0`} />
                        )}
                      </div>
                      <span className={`text-xs block truncate mt-0.5 font-medium ${isSelected && t.id === 'founder' ? 'text-white/90' : 'text-neutral-600'}`}>
                        {t.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Primary Freeze Symptom Selection */}
            <div className="mb-5">
              <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#0A0A0C] mb-2 block">
                2. WHAT HAPPENS UNDER SCRUTINY? (SELECT YOUR #1 TRIGGER)
              </label>
              <div className="flex flex-wrap gap-2">
                {SYMPTOM_OPTIONS.map((sym) => {
                  const isChecked = formData.symptom === sym;
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => setFormData({ ...formData, symptom: sym })}
                      className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-bold border-2 border-black transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-black text-[#FFE500] shadow-[2px_2px_0_#FFE500] translate-x-[-1px] translate-y-[-1px]'
                          : 'bg-[#FAF8F5] text-neutral-800 hover:bg-neutral-100 shadow-[1.5px_1.5px_0_#000]'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {sym}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Your Info & WhatsApp Pod Access */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="intake-name" className="block text-[11px] font-black uppercase tracking-wider text-neutral-800 mb-1">
                  FULL NAME <span className="text-[#FF0000]">*</span>
                </label>
                <div className="relative">
                  <User className="size-4 text-neutral-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    id="intake-name"
                    type="text"
                    placeholder="e.g. Jordan Miller"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF8F5] border-2 border-black rounded-xl py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-[#0A0A0C] font-bold placeholder:text-neutral-400 shadow-[2px_2px_0_#000] focus:outline-none focus:bg-white focus:translate-x-[-1px] focus:translate-y-[-1px] focus:shadow-[4px_4px_0_#000] transition-all"
                  />
                </div>
                {errors.name && <span className="text-[11px] font-bold text-[#FF0000] mt-1 block">{errors.name}</span>}
              </div>

              <div>
                <label htmlFor="intake-email" className="block text-[11px] font-black uppercase tracking-wider text-neutral-800 mb-1">
                  EMAIL ADDRESS <span className="text-[#FF0000]">*</span>
                </label>
                <div className="relative">
                  <Mail className="size-4 text-neutral-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    id="intake-email"
                    type="email"
                    placeholder="jordan@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF8F5] border-2 border-black rounded-xl py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-[#0A0A0C] font-bold placeholder:text-neutral-400 shadow-[2px_2px_0_#000] focus:outline-none focus:bg-white focus:translate-x-[-1px] focus:translate-y-[-1px] focus:shadow-[4px_4px_0_#000] transition-all"
                  />
                </div>
                {errors.email && <span className="text-[11px] font-bold text-[#FF0000] mt-1 block">{errors.email}</span>}
              </div>
            </div>

            {/* WhatsApp Number Field */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="intake-whatsapp" className="block text-[11px] font-black uppercase tracking-wider text-neutral-800">
                  WHATSAPP NUMBER <span className="text-[#FF0000]">*</span>
                </label>
                <span className="text-[10px] font-semibold text-neutral-500">
                  🔒 Zero spam. Used only for your diagnostic &amp; pod invite.
                </span>
              </div>
              <div className="relative">
                <Phone className="size-4 text-neutral-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  id="intake-whatsapp"
                  type="tel"
                  placeholder="e.g. +1 (555) 019-2834"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full bg-[#FAF8F5] border-2 border-black rounded-xl py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-[#0A0A0C] font-bold placeholder:text-neutral-400 shadow-[2px_2px_0_#000] focus:outline-none focus:bg-white focus:translate-x-[-1px] focus:translate-y-[-1px] focus:shadow-[4px_4px_0_#000] transition-all"
                />
              </div>
              {errors.whatsapp && <span className="text-[11px] font-bold text-[#FF0000] mt-1 block">{errors.whatsapp}</span>}
            </div>

            {/* Submit Action */}
            <div className="pt-5 border-t-2 border-black/10 flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-full border-2 border-black bg-[#FFE500] hover:bg-[#25D366] text-black font-black text-sm sm:text-base uppercase tracking-wider shadow-[4px_4px_0_#000] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-[6px_6px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_#000] w-full sm:w-auto cursor-pointer transition-all"
              >
                <span>Generate Diagnostic &amp; Claim Pod Pass</span>
                <ArrowRight className="size-4 stroke-[3]" />
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
