import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Ticket, User, Mail, Calendar, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

interface FormData {
  track: 'student' | 'professional' | 'founder';
  name: string;
  email: string;
  symptoms: string[];
  schedule: 'weekday' | 'weekend';
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

export const CohortApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    track: 'professional',
    name: '',
    email: '',
    symptoms: ['Total brain freeze / blanking'],
    schedule: 'weekday',
    goal: ''
  });

  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    date: string;
    track: string;
    podName: string;
    schedule: string;
  } | null>(null);

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleToggleSymptom = (symptom: string) => {
    setFormData((prev) => {
      const exists = prev.symptoms.includes(symptom);
      if (exists) {
        return { ...prev, symptoms: prev.symptoms.filter((s) => s !== symptom) };
      } else {
        return { ...prev, symptoms: [...prev.symptoms, symptom] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
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
      podName: formData.track === 'founder' ? 'Pod Vulcan (Cohort 08)' : 'Pod Apex (Cohort 08)',
      schedule: formData.schedule === 'weekday' ? 'Tuesday & Thursday 7:00 PM EST' : 'Saturday & Sunday 10:30 AM EST'
    });
  };

  return (
    <section className="section" id="cohort" aria-labelledby="cohort-title">
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded bg-[#FF0000] text-white border-2 border-white shadow-[3px_3px_0_#FFF]">
            Cohort 08 Enrolling
          </span>
          <span className="text-xs font-bold text-black bg-[#FFE500] px-2.5 py-1 rounded border-2 border-black flex items-center gap-1.5 shadow-[2px_2px_0_#000]">
            <Flame className="size-3.5 text-[#FF0000]" /> Only 4 Pod Seats Remaining
          </span>
        </div>
        <h2 id="cohort-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Secure Your Exposure Pod Seat
        </h2>
        <p className="text-zinc-300 text-base sm:text-lg max-w-2xl leading-relaxed">
          Pods are strictly capped at 4–6 peers to ensure maximum active speaking time. Fill out this intake application to match with your facilitator and cohort tier.
        </p>
      </div>

      <div className="max-w-4xl mx-auto w-full">
        {submittedTicket ? (
          /* Success Ticket State (Neo-Brutalist Boarding Pass) */
          <div className="border-4 border-white bg-[#14141e] rounded-2xl p-6 sm:p-9 shadow-[10px_10px_0_#00E575] relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b-3 border-dashed border-white/30 gap-4">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-xl bg-[#00E575] border-3 border-black flex items-center justify-center font-black text-2xl text-[#111118] shadow-[3px_3px_0_#000]">
                  ✓
                </div>
                <div>
                  <span className="text-[11px] font-black tracking-widest uppercase text-[#00E575] block">
                    Application Confirmed
                  </span>
                  <h3 className="text-2xl font-black text-white m-0">
                    Exposure Pod Pass Issued
                  </h3>
                </div>
              </div>
              <div className="bg-black/70 px-4 py-2 rounded-lg border-2 border-white/20 font-mono text-sm font-bold text-[#FFE500]">
                {submittedTicket.id}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-white/10">
              <div className="bg-black/50 p-4 rounded-xl border border-white/10">
                <span className="text-zinc-400 text-xs block mb-1 font-bold">Applicant</span>
                <span className="text-white font-extrabold text-lg">{formData.name}</span>
                <span className="text-zinc-400 text-xs block mt-0.5 truncate">{formData.email}</span>
              </div>
              <div className="bg-black/50 p-4 rounded-xl border border-white/10">
                <span className="text-zinc-400 text-xs block mb-1 font-bold">Assigned Pod</span>
                <span className="text-[#00E575] font-extrabold text-lg">{submittedTicket.podName}</span>
                <span className="text-zinc-400 text-xs block mt-0.5">{submittedTicket.track}</span>
              </div>
              <div className="bg-black/50 p-4 rounded-xl border border-white/10">
                <span className="text-zinc-400 text-xs block mb-1 font-bold">Session Cadence</span>
                <span className="text-white font-bold text-sm leading-tight block">{submittedTicket.schedule}</span>
                <span className="text-[#FFE500] text-xs font-bold block mt-1">Starting Nov 15</span>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                <ShieldCheck className="size-4 text-[#00E575] shrink-0" />
                <span>An orientation briefing and low-stakes audio calibration drill have been queued to your inbox.</span>
              </div>
              <button
                type="button"
                onClick={() => setSubmittedTicket(null)}
                className="btn btn--dark text-xs font-bold py-2.5 px-5 whitespace-nowrap cursor-pointer"
                style={{ margin: 0 }}
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          /* Intake Application Form */
          <form
            onSubmit={handleSubmit}
            className="border-3 border-white bg-[#12121a] rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0_#FF0000] relative"
          >
            {/* 1. Track Selector */}
            <div className="mb-7">
              <label className="text-xs font-black uppercase tracking-wider text-white mb-3 block flex items-center gap-2">
                <span className="size-5 rounded bg-white text-black flex items-center justify-center font-bold text-xs">1</span>
                Select Your Audience Track
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'student', title: 'Students & Grads', desc: 'Thesis, Capstone, Interviews', color: '#8FD4EE' },
                  { id: 'professional', title: 'Career Professionals', desc: 'Team meetings, Executive reviews', color: '#FFE500' },
                  { id: 'founder', title: 'Founders & Creators', desc: 'Investor pitches, Keynote stages', color: '#FF4071' }
                ].map((t) => {
                  const isSelected = formData.track === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, track: t.id as any })}
                      className={`p-4 rounded-xl border-2 text-left cursor-pointer transition-all duration-150 ${
                        isSelected
                          ? 'border-white bg-[#1c1c28] translate-x-[2px] translate-y-[2px]'
                          : 'border-white/20 bg-black/40 hover:border-white/50'
                      }`}
                      style={{
                        boxShadow: isSelected ? `4px 4px 0 ${t.color}` : 'none'
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-white">{t.title}</span>
                        {isSelected && (
                          <span
                            className="size-3 rounded-full border border-black"
                            style={{ background: t.color }}
                          />
                        )}
                      </div>
                      <span className="text-xs text-zinc-400 font-medium leading-tight block">
                        {t.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Primary Freeze Triggers */}
            <div className="mb-7">
              <label className="text-xs font-black uppercase tracking-wider text-white mb-2 block flex items-center gap-2">
                <span className="size-5 rounded bg-white text-black flex items-center justify-center font-bold text-xs">2</span>
                What happens when you speak in public? (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2.5 mt-2">
                {SYMPTOM_OPTIONS.map((sym) => {
                  const isChecked = formData.symptoms.includes(sym);
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => handleToggleSymptom(sym)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold border-2 transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#FF0000] text-white border-white shadow-[2px_2px_0_#FFF]'
                          : 'bg-black/60 text-zinc-300 border-white/25 hover:border-white/60'
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
              <label className="text-xs font-black uppercase tracking-wider text-white mb-3 block flex items-center gap-2">
                <span className="size-5 rounded bg-white text-black flex items-center justify-center font-bold text-xs">3</span>
                Your Details &amp; Preferred Pod Schedule
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-xs font-bold text-zinc-300 mb-1 block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="size-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      id="name"
                      type="text"
                      placeholder="e.g. Jordan Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/60 border-2 border-white/30 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    />
                  </div>
                  {errors.name && <span className="text-[11px] font-bold text-red-400 mt-1 block">{errors.name}</span>}
                </div>

                <div>
                  <label htmlFor="email" className="text-xs font-bold text-zinc-300 mb-1 block">
                    Email Address (For Pod Schedule &amp; Orientation)
                  </label>
                  <div className="relative">
                    <Mail className="size-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      id="email"
                      type="email"
                      placeholder="jordan@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/60 border-2 border-white/30 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                    />
                  </div>
                  {errors.email && <span className="text-[11px] font-bold text-red-400 mt-1 block">{errors.email}</span>}
                </div>
              </div>

              {/* Schedule Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <label
                  onClick={() => setFormData({ ...formData, schedule: 'weekday' })}
                  className={`p-3.5 rounded-xl border-2 flex items-center gap-3 cursor-pointer select-none transition-all ${
                    formData.schedule === 'weekday'
                      ? 'border-white bg-[#1c1c28] shadow-[3px_3px_0_#FFE500]'
                      : 'border-white/20 bg-black/40 hover:border-white/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="schedule"
                    checked={formData.schedule === 'weekday'}
                    onChange={() => {}}
                    className="accent-[#FF0000] size-4"
                  />
                  <div>
                    <span className="font-bold text-xs text-white block">Weekday Evenings</span>
                    <span className="text-[11px] text-zinc-400">Tue &amp; Thu at 7:00 PM EST</span>
                  </div>
                </label>

                <label
                  onClick={() => setFormData({ ...formData, schedule: 'weekend' })}
                  className={`p-3.5 rounded-xl border-2 flex items-center gap-3 cursor-pointer select-none transition-all ${
                    formData.schedule === 'weekend'
                      ? 'border-white bg-[#1c1c28] shadow-[3px_3px_0_#00E575]'
                      : 'border-white/20 bg-black/40 hover:border-white/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="schedule"
                    checked={formData.schedule === 'weekend'}
                    onChange={() => {}}
                    className="accent-[#FF0000] size-4"
                  />
                  <div>
                    <span className="font-bold text-xs text-white block">Weekend Mornings</span>
                    <span className="text-[11px] text-zinc-400">Sat &amp; Sun at 10:30 AM EST</span>
                  </div>
                </label>
              </div>

              {/* 1-Sentence Goal */}
              <div className="mt-4">
                <label htmlFor="goal" className="text-xs font-bold text-zinc-300 mb-1 block">
                  Upcoming High-Stakes Event (Optional)
                </label>
                <input
                  id="goal"
                  type="text"
                  placeholder="e.g. Master thesis defense in 4 weeks, or weekly product reviews without tremors"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full bg-black/60 border-2 border-white/30 rounded-xl py-2.5 px-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-zinc-400">
                🔒 No credit card required to apply. Pod match notification sent within 24 hours.
              </span>
              <button
                type="submit"
                className="btn btn--primary text-sm font-bold py-3 px-8 shadow-[4px_4px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none w-full sm:w-auto"
                style={{ margin: 0 }}
              >
                Submit Cohort Application &rarr;
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
