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
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#FF3366] text-white border-2 border-black shadow-[2px_2px_0_#000]">
            Cohort 08 Enrolling
          </span>
          <span className="text-xs font-black text-black bg-[#FFE500] px-3.5 py-1 rounded-full border-2 border-black flex items-center gap-1.5 shadow-[2px_2px_0_#000]">
            <Flame className="size-3.5 text-black" /> Only 4 Pod Seats Remaining
          </span>
        </div>
        <h2 id="cohort-title" className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A0A0C] tracking-tight">
          Secure Your Exposure Pod Seat
        </h2>
        <p className="text-neutral-700 text-base sm:text-lg max-w-2xl font-medium leading-relaxed">
          Pods are strictly capped at 4–6 peers to ensure maximum active speaking time. Fill out this intake application to match with your facilitator and cohort tier.
        </p>
      </div>

      <div className="max-w-4xl mx-auto w-full">
        {submittedTicket ? (
          /* Success Ticket State (Neobrutalism.dev Boarding Pass) */
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

            <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs font-bold text-neutral-700">
                <ShieldCheck className="size-4 text-[#00E575] shrink-0 stroke-[2.5]" />
                <span>An orientation briefing and low-stakes audio calibration drill have been queued to your inbox.</span>
              </div>
              <button
                type="button"
                onClick={() => setSubmittedTicket(null)}
                className="text-xs font-bold py-2.5 px-5 rounded-full border-2 border-black bg-white hover:bg-neutral-100 text-black shadow-[2px_2px_0_#000] cursor-pointer"
                style={{ margin: 0 }}
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          /* Intake Application Form (Neobrutalism Clean Form Architecture) */
          <form
            onSubmit={handleSubmit}
            className="border-[3px] border-black bg-white rounded-3xl p-6 sm:p-9 shadow-[8px_8px_0_#000] relative"
          >
            {/* 1. Track Selector */}
            <div className="mb-8">
              <label className="text-xs font-black uppercase tracking-wider text-[#0A0A0C] mb-3.5 block flex items-center gap-2">
                <span className="size-5 rounded-full bg-black text-white flex items-center justify-center font-black text-xs">1</span>
                Select Your Audience Track
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {[
                  { id: 'student', title: 'Students & Grads', desc: 'Thesis, Capstone, Interviews' },
                  { id: 'professional', title: 'Career Professionals', desc: 'Team meetings, Executive reviews' },
                  { id: 'founder', title: 'Founders & Creators', desc: 'Investor pitches, Keynote stages' }
                ].map((t) => {
                  const isSelected = formData.track === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, track: t.id as any })}
                      className={`p-4 sm:p-4.5 rounded-2xl border-2 border-black text-left cursor-pointer transition-all duration-150 ${
                        isSelected
                          ? 'bg-[#FFE500] shadow-[4px_4px_0_#000] translate-x-[1px] translate-y-[1px]'
                          : 'bg-[#FAF8F5] hover:bg-neutral-100 shadow-[2px_2px_0_#000]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-black text-sm text-[#0A0A0C]">{t.title}</span>
                        {isSelected && (
                          <span className="size-3 rounded-full bg-black" />
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
            <div className="mb-8">
              <label className="text-xs font-black uppercase tracking-wider text-[#0A0A0C] mb-3 block flex items-center gap-2">
                <span className="size-5 rounded-full bg-black text-white flex items-center justify-center font-black text-xs">2</span>
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
                      className={`px-4 py-2 rounded-full text-xs font-bold border-2 border-black transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-black text-[#FFE500] border-black shadow-[3px_3px_0_#FFE500]'
                          : 'bg-[#FAF8F5] text-neutral-800 hover:bg-neutral-100 shadow-[2px_2px_0_#000]'
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
            <div className="mb-8">
              <label className="text-xs font-black uppercase tracking-wider text-[#0A0A0C] mb-3.5 block flex items-center gap-2">
                <span className="size-5 rounded-full bg-black text-white flex items-center justify-center font-black text-xs">3</span>
                Your Details &amp; Preferred Pod Schedule
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-xs font-bold text-neutral-700 mb-1.5 block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="size-4 text-neutral-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      id="name"
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
                  <label htmlFor="email" className="text-xs font-bold text-neutral-700 mb-1.5 block">
                    Email Address (For Pod Schedule &amp; Orientation)
                  </label>
                  <div className="relative">
                    <Mail className="size-4 text-neutral-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      id="email"
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
                  className={`p-4 rounded-2xl border-2 border-black flex items-center gap-3 cursor-pointer select-none transition-all ${
                    formData.schedule === 'weekday'
                      ? 'bg-[#FFE500] shadow-[3px_3px_0_#000]'
                      : 'bg-[#FAF8F5] hover:bg-neutral-100 shadow-[2px_2px_0_#000]'
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
                  className={`p-4 rounded-2xl border-2 border-black flex items-center gap-3 cursor-pointer select-none transition-all ${
                    formData.schedule === 'weekend'
                      ? 'bg-[#00E575] shadow-[3px_3px_0_#000]'
                      : 'bg-[#FAF8F5] hover:bg-neutral-100 shadow-[2px_2px_0_#000]'
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

              {/* 1-Sentence Goal */}
              <div className="mt-4">
                <label htmlFor="goal" className="text-xs font-bold text-neutral-700 mb-1.5 block">
                  Upcoming High-Stakes Event (Optional)
                </label>
                <input
                  id="goal"
                  type="text"
                  placeholder="e.g. Master thesis defense in 4 weeks, or weekly product reviews without tremors"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full bg-[#FAF8F5] border-2 border-black rounded-xl py-2.5 px-4 text-sm text-[#0A0A0C] font-semibold placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0_#000] transition-all"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-black/10">
              <span className="text-xs text-neutral-600 font-medium">
                🔒 No credit card required to apply. Pod match notification sent within 24 hours.
              </span>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-black bg-black text-white hover:bg-[#FF3366] font-extrabold text-sm shadow-[4px_4px_0_#FFE500] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none w-full sm:w-auto cursor-pointer transition-all"
                style={{ margin: 0 }}
              >
                <span>Submit Cohort Application</span>
                <ArrowRight className="size-4 stroke-[2.5]" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
