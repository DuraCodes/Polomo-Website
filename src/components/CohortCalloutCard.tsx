import React, { useState } from 'react';
import {
  ArrowRight,
  Flame,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  User,
  Mail,
  Calendar,
  Sparkles,
  Video,
  Clock
} from 'lucide-react';

export interface CohortCalloutCardProps {
  cohortStatus?: 'DIAGNOSTIC' | 'OPEN' | 'WAITLIST';
  whatsappInviteUrl?: string;
  initialTrack?: 'student' | 'professional' | 'founder';
}

interface FormData {
  track: 'student' | 'professional' | 'founder';
  name: string;
  email: string;
  symptoms: string[];
  schedule: 'weekday' | 'weekend';
  includeDiagnostic: boolean;
  goal: string;
}

const SYMPTOM_OPTIONS = [
  'Vocal trembling / voice shake',
  'Total brain freeze / blanking',
  'Sweating & flushing',
  'Racing heart under eye contact',
  'Fear of unscripted curveball Q&A',
  'Rushing through slides to escape'
];

export const CohortCalloutCard: React.FC<CohortCalloutCardProps> = ({
  cohortStatus = 'OPEN',
  whatsappInviteUrl = 'https://chat.whatsapp.com/invite',
  initialTrack = 'professional',
}) => {
  const [formData, setFormData] = useState<FormData>({
    track: initialTrack,
    name: '',
    email: '',
    symptoms: ['Total brain freeze / blanking', 'Racing heart under eye contact'],
    schedule: 'weekday',
    includeDiagnostic: true,
    goal: ''
  });

  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    date: string;
    track: string;
    podName: string;
    schedule: string;
    diagnosticIncluded: boolean;
  } | null>(null);

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleToggleSymptom = (symptom: string) => {
    setFormData((prev) => {
      const exists = prev.symptoms.includes(symptom);
      return {
        ...prev,
        symptoms: exists
          ? prev.symptoms.filter((s) => s !== symptom)
          : [...prev.symptoms, symptom]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Valid email is required for pod orientation invitation';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const ticketId = `POL-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackNames = {
      student: 'Academia & Thesis Defense',
      professional: 'Executive Meetings & Visibility',
      founder: 'Investor Pitch & Mainstage'
    };

    setSubmittedTicket({
      id: ticketId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      track: trackNames[formData.track],
      podName: formData.track === 'founder' ? 'Pod Vulcan (Cohort 08)' : formData.track === 'student' ? 'Pod Beacon (Cohort 08)' : 'Pod Apex (Cohort 08)',
      schedule: formData.schedule === 'weekday' ? 'Tuesday & Thursday 7:00 PM EST' : 'Saturday & Sunday 10:30 AM EST',
      diagnosticIncluded: formData.includeDiagnostic
    });
  };

  return (
    <div className="approach-wrap scroll-mt-28" id="cohort">
      <section className="border-[3px] border-black bg-[#FAF8F5] text-[#111118] rounded-[28px] p-6 sm:p-9 lg:p-12 shadow-[8px_8px_0_#000] relative overflow-hidden" aria-labelledby="cohort-callout-title">
        
        {/* Subtle Warm Graph Accent in Corner */}
        <div
          className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-[#FFE500]/25 pointer-events-none blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full">
          <div className="lg:grid lg:grid-cols-12 lg:gap-10 lg:items-start">
            
            {/* Left Column: Context, Hook, Proof & WhatsApp Community (On desktop) */}
            <div className="lg:col-span-5 flex flex-col justify-between mb-8 lg:mb-0">
              <div>
                {/* Header Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {cohortStatus === 'WAITLIST' ? (
                    <>
                      <span className="text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#FF4071] text-white border-2 border-black shadow-[2px_2px_0_#000]">
                        Cohort 08 Full
                      </span>
                      <span className="text-[11px] font-black text-black bg-[#FFE500] px-3.5 py-1 rounded-full border-2 border-black flex items-center gap-1.5 shadow-[2px_2px_0_#000]">
                        Waitlist Active
                      </span>
                    </>
                  ) : cohortStatus === 'DIAGNOSTIC' ? (
                    <>
                      <span className="text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#FFE500] text-black border-2 border-black shadow-[2px_2px_0_#000]">
                        Diagnostic &amp; Intake
                      </span>
                      <span className="text-[11px] font-black text-white bg-black px-3.5 py-1 rounded-full border-2 border-black flex items-center gap-1.5 shadow-[2px_2px_0_#000]">
                        <Flame className="size-3 text-[#FFE500]" /> 10-Min Free Audits
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#FF3366] text-white border-2 border-black shadow-[2px_2px_0_#000]">
                        Cohort 08 Enrolling
                      </span>
                      <span className="text-[11px] font-black text-black bg-[#FFE500] px-3.5 py-1 rounded-full border-2 border-black flex items-center gap-1.5 shadow-[2px_2px_0_#000]">
                        <Flame className="size-3 text-black" /> 4 Seats Left
                      </span>
                    </>
                  )}
                  <span className="text-xs font-bold text-neutral-600 ml-auto">
                    Starts Nov 15th
                  </span>
                </div>

                {/* Headline - Scaled to match Our Approach */}
                <h2 id="cohort-callout-title" className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0A0A0C] tracking-tight leading-[1.2] mb-3">
                  Ready to Step Into the Spotlight? <br />
                  <span className="bg-[#FFE500] px-3 py-0.5 rounded-lg border-2 border-black shadow-[2px_2px_0_#000] inline-block mt-1">
                    Your Stage Is Waiting.
                  </span>
                </h2>

                {/* Description */}
                <p className="text-base sm:text-lg text-[#181820] font-medium leading-relaxed mb-7">
                  Traditional public-speaking courses fail because courage cannot be learned from slide decks. Intimate 4–6 peer rooms, zero judgment, and active micro-reps from Day 1.
                </p>

                {/* Proof Badges - Clean Minimalist Checklist */}
                <div className="space-y-3 p-5 rounded-[20px] bg-white border-2 border-black shadow-[3px_3px_0_#000] mb-7 text-sm font-bold text-[#181820]">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-5 text-black stroke-[2.5]" />
                    <span>4–6 Peer Groups (Strictly Capped)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-5 text-black stroke-[2.5]" />
                    <span>100% Practical Speaking Micro-Drills</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-5 text-black stroke-[2.5]" />
                    <span>Dedicated Facilitator Feedback</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Community Card (On Desktop Left Column) */}
              <div className="hidden lg:block border-2 border-black bg-white rounded-[20px] p-5 shadow-[3px_3px_0_#00E575]">
                <div className="flex items-start gap-3.5">
                  <div className="size-10 rounded-xl bg-[#00E575] border-2 border-black flex items-center justify-center text-black shrink-0 shadow-[1.5px_1.5px_0_#000]">
                    <MessageSquare className="size-5 stroke-[2.5]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-black bg-[#00E575] px-2 py-0.5 rounded border border-black">
                        Free Community
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-[#0A0A0C] m-0">
                      POLOMO WhatsApp Practice Circle
                    </h4>
                    <p className="text-xs text-[#181820] font-medium mt-1 leading-snug">
                      Weekly audio AMAs &amp; 45s voice prompts. Observe with zero speaking requirement.
                    </p>
                    <a
                      href={whatsappInviteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black bg-[#00E575] hover:bg-[#00c965] text-black font-extrabold text-xs uppercase tracking-wider shadow-[2px_2px_0_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all"
                    >
                      <span>Join WhatsApp Circle</span>
                      <ArrowRight className="size-3.5 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Embedded Admissions Terminal Console */}
            <div className="lg:col-span-7">
              {submittedTicket ? (
              /* Success Boarding Pass */
              <div className="border-[3px] border-black bg-white rounded-3xl p-6 sm:p-9 shadow-[8px_8px_0_#000] relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b-2 border-dashed border-black/30 gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="size-12 rounded-2xl bg-[#00E575] border-2 border-black flex items-center justify-center font-black text-2xl text-black shadow-[3px_3px_0_#000]">
                      ✓
                    </div>
                    <div>
                      <span className="text-[11px] font-black tracking-wider uppercase text-black bg-[#00E575] px-2.5 py-0.5 rounded-full border border-black inline-block">
                        Application Confirmed
                      </span>
                      <h3 className="text-2xl font-black text-[#0A0A0C] m-0 mt-1">
                        Exposure Pod Pass Issued
                      </h3>
                    </div>
                  </div>
                  <div className="bg-[#FFE500] px-4 py-2 rounded-xl border-2 border-black font-mono text-sm font-black text-black shadow-[2px_2px_0_#000]">
                    {submittedTicket.id}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b-2 border-black/10">
                  <div className="bg-[#FAF8F5] p-4 rounded-2xl border-2 border-black shadow-[2px_2px_0_#000]">
                    <span className="text-neutral-500 text-xs block mb-1 font-bold">Applicant</span>
                    <span className="text-[#0A0A0C] font-black text-lg block">{formData.name}</span>
                    <span className="text-neutral-600 text-xs block mt-0.5 truncate font-medium">{formData.email}</span>
                  </div>
                  <div className="bg-[#FAF8F5] p-4 rounded-2xl border-2 border-black shadow-[2px_2px_0_#000]">
                    <span className="text-neutral-500 text-xs block mb-1 font-bold">Assigned Pod</span>
                    <span className="text-[#0A0A0C] font-black text-lg block">{submittedTicket.podName}</span>
                    <span className="text-neutral-600 text-xs block mt-0.5 font-medium">{submittedTicket.track}</span>
                  </div>
                  <div className="bg-[#FAF8F5] p-4 rounded-2xl border-2 border-black shadow-[2px_2px_0_#000]">
                    <span className="text-neutral-500 text-xs block mb-1 font-bold">Session Cadence</span>
                    <span className="text-[#0A0A0C] font-black text-sm leading-tight block">{submittedTicket.schedule}</span>
                    <span className="text-black bg-[#FFE500] px-2 py-0.5 rounded text-xs font-black inline-block mt-1 border border-black">Starting Nov 15</span>
                  </div>
                </div>

                {submittedTicket.diagnosticIncluded && (
                  <div className="mt-5 p-3.5 rounded-xl border-2 border-black bg-[#FFE500]/30 flex items-center gap-3">
                    <Video className="size-5 text-black shrink-0 stroke-[2.5]" />
                    <span className="text-xs font-bold text-black">
                      1-on-1 Diagnostic Call Included — Your facilitator will email your private Google Meet calibration link within 24 hours.
                    </span>
                  </div>
                )}

                <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-neutral-700">
                    <ShieldCheck className="size-4 text-[#00E575] shrink-0 stroke-[2.5]" />
                    <span>An orientation briefing and low-stakes audio calibration drill have been queued to your inbox.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmittedTicket(null)}
                    className="text-xs font-black py-2.5 px-5 rounded-full border-2 border-black bg-white hover:bg-neutral-100 text-black shadow-[2px_2px_0_#000] cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              /* High-Converting Embedded Application Terminal */
              <form
                onSubmit={handleSubmit}
                className="border-[3px] border-black bg-white rounded-3xl p-6 sm:p-9 shadow-[8px_8px_0_#000] relative"
              >
                {/* 1. Track Selector */}
                <div className="mb-7">
                  <label className="text-xs font-black uppercase tracking-wider text-[#0A0A0C] mb-3 block flex items-center gap-2">
                    <span className="size-5 rounded-full bg-black text-white flex items-center justify-center font-black text-xs">1</span>
                    Select Your Speaking Track
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'student', title: 'Students & Grads', desc: 'Thesis defenses, Capstone & Interviews' },
                      { id: 'professional', title: 'Career Professionals', desc: 'Team meetings, Executive reviews' },
                      { id: 'founder', title: 'Founders & Creators', desc: 'Investor pitches, Keynote stages' }
                    ].map((t) => {
                      const isSelected = formData.track === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, track: t.id as any })}
                          className={`p-4 rounded-2xl border-2 border-black text-left cursor-pointer transition-all duration-150 ${
                            isSelected
                              ? 'bg-[#FFE500] shadow-[3px_3px_0_#000] translate-x-[1px] translate-y-[1px]'
                              : 'bg-[#FAF8F5] hover:bg-neutral-100 shadow-[2px_2px_0_#000]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-black text-sm text-[#0A0A0C]">{t.title}</span>
                            {isSelected && (
                              <span className="size-3 rounded-full bg-black shrink-0" />
                            )}
                          </div>
                          <span className="text-xs text-neutral-600 font-medium leading-tight block">
                            {t.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Primary Freeze Triggers */}
                <div className="mb-7">
                  <label className="text-xs font-black uppercase tracking-wider text-[#0A0A0C] mb-3 block flex items-center gap-2">
                    <span className="size-5 rounded-full bg-black text-white flex items-center justify-center font-black text-xs">2</span>
                    What happens when you speak under scrutiny? (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {SYMPTOM_OPTIONS.map((sym) => {
                      const isChecked = formData.symptoms.includes(sym);
                      return (
                        <button
                          key={sym}
                          type="button"
                          onClick={() => handleToggleSymptom(sym)}
                          className={`px-3.5 py-2 rounded-full text-xs font-bold border-2 border-black transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-black text-[#FFE500] border-black shadow-[2px_2px_0_#FFE500]'
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

                {/* 3. Contact & Schedule Inputs */}
                <div className="mb-7">
                  <label className="text-xs font-black uppercase tracking-wider text-[#0A0A0C] mb-3 block flex items-center gap-2">
                    <span className="size-5 rounded-full bg-black text-white flex items-center justify-center font-black text-xs">3</span>
                    Your Information &amp; Schedule Cadence
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="intake-name" className="text-xs font-bold text-neutral-700 mb-1.5 block">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="size-4 text-neutral-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          id="intake-name"
                          type="text"
                          placeholder="e.g. Jordan Miller"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#FAF8F5] border-2 border-black rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#0A0A0C] font-semibold placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0_#000] transition-all"
                        />
                      </div>
                      {errors.name && <span className="text-[11px] font-bold text-[#FF3366] mt-1 block">{errors.name}</span>}
                    </div>

                    <div>
                      <label htmlFor="intake-email" className="text-xs font-bold text-neutral-700 mb-1.5 block">
                        Email Address (For Pod Invite &amp; Orientation)
                      </label>
                      <div className="relative">
                        <Mail className="size-4 text-neutral-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          id="intake-email"
                          type="email"
                          placeholder="jordan@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#FAF8F5] border-2 border-black rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#0A0A0C] font-semibold placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0_#000] transition-all"
                        />
                      </div>
                      {errors.email && <span className="text-[11px] font-bold text-[#FF3366] mt-1 block">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Schedule Selection - Neobrutalism Radio Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    <label
                      onClick={() => setFormData({ ...formData, schedule: 'weekday' })}
                      className={`p-3.5 rounded-2xl border-2 border-black flex items-center gap-3 cursor-pointer select-none transition-all ${
                        formData.schedule === 'weekday'
                          ? 'bg-[#FFE500] shadow-[3px_3px_0_#000]'
                          : 'bg-[#FAF8F5] hover:bg-neutral-100 shadow-[1.5px_1.5px_0_#000]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="schedule"
                        checked={formData.schedule === 'weekday'}
                        onChange={() => {}}
                        className="accent-black size-4"
                      />
                      <div>
                        <span className="font-black text-xs text-[#0A0A0C] block">Weekday Evenings</span>
                        <span className="text-[11px] text-neutral-600 font-semibold">Tue &amp; Thu at 7:00 PM EST</span>
                      </div>
                    </label>

                    <label
                      onClick={() => setFormData({ ...formData, schedule: 'weekend' })}
                      className={`p-3.5 rounded-2xl border-2 border-black flex items-center gap-3 cursor-pointer select-none transition-all ${
                        formData.schedule === 'weekend'
                          ? 'bg-[#00E575] shadow-[3px_3px_0_#000]'
                          : 'bg-[#FAF8F5] hover:bg-neutral-100 shadow-[1.5px_1.5px_0_#000]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="schedule"
                        checked={formData.schedule === 'weekend'}
                        onChange={() => {}}
                        className="accent-black size-4"
                      />
                      <div>
                        <span className="font-black text-xs text-[#0A0A0C] block">Weekend Mornings</span>
                        <span className="text-[11px] text-neutral-600 font-semibold">Sat &amp; Sun at 10:30 AM EST</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* 4. Unified Diagnostic Intake Perk Box */}
                <div className="mb-7 p-4 sm:p-5 rounded-2xl border-2 border-black bg-[#FAF8F5] shadow-[3px_3px_0_#000]">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.includeDiagnostic}
                      onChange={(e) => setFormData({ ...formData, includeDiagnostic: e.target.checked })}
                      className="accent-black size-5 mt-0.5 shrink-0 rounded cursor-pointer"
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-black text-sm text-[#0A0A0C]">
                          Include Free 1-on-1 Stage Anxiety Diagnostic Audit
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#FFE500] text-black border border-black">
                          Free Intake Perk
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 font-medium leading-relaxed m-0">
                        A private 10-minute video calibration session with a lead facilitator before Day 1 to map your baseline heart rate, physical tremor triggers, and personalized exposure goals.
                      </p>
                    </div>
                  </label>
                </div>

                {/* 1-Sentence Goal (Optional) */}
                <div className="mb-8">
                  <label htmlFor="intake-goal" className="text-xs font-bold text-neutral-700 mb-1.5 block">
                    Upcoming High-Stakes Speaking Event (Optional)
                  </label>
                  <input
                    id="intake-goal"
                    type="text"
                    placeholder="e.g. Master thesis defense in 4 weeks, or board review without throat clamping"
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full bg-[#FAF8F5] border-2 border-black rounded-xl py-2.5 px-4 text-sm text-[#0A0A0C] font-semibold placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0_#000] transition-all"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-black/10">
                  <span className="text-xs text-neutral-600 font-medium">
                    🔒 No payment required to apply. Pod assignment confirmed within 24 hours.
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-black bg-black text-white hover:bg-[#FF3366] font-extrabold text-sm shadow-[4px_4px_0_#FFE500] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none w-full sm:w-auto cursor-pointer transition-all"
                  >
                    <span>Claim Pod Seat &amp; Issue Pass</span>
                    <ArrowRight className="size-4 stroke-[2.5]" />
                  </button>
                </div>
              </form>
              )}
            </div>
            {/* End Right Column */}

          </div>
          {/* End Grid */}

          {/* Mobile WhatsApp Practice Circle Fallback (Placed below the form so it never pushes inputs down) */}
          <div className="lg:hidden mt-6 border-2 border-black bg-white rounded-2xl p-4 shadow-[3px_3px_0_#00E575]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="size-9 rounded-xl bg-[#00E575] border-2 border-black flex items-center justify-center text-black shrink-0 shadow-[1.5px_1.5px_0_#000]">
                  <MessageSquare className="size-4 stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9px] font-black uppercase tracking-wider text-black bg-[#00E575] px-1.5 py-0.2 rounded border border-black">
                      Free Community
                    </span>
                    <span className="text-[11px] font-bold text-neutral-500">Not ready for a full pod?</span>
                  </div>
                  <h4 className="text-xs font-black text-[#0A0A0C] m-0">
                    POLOMO WhatsApp Practice Circle
                  </h4>
                  <p className="text-[11px] text-neutral-600 font-medium mt-0.5 leading-snug">
                    Weekly live audio AMAs and zero-pressure prompts.
                  </p>
                </div>
              </div>

              <a
                href={whatsappInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border-2 border-black bg-[#00E575] hover:bg-[#00c965] text-black font-extrabold text-[11px] uppercase tracking-wider shadow-[1.5px_1.5px_0_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all"
              >
                <span>Enter WhatsApp Circle</span>
                <ArrowRight className="size-3 stroke-[2.5]" />
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
