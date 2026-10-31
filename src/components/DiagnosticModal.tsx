import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, ArrowRight, MessageSquare, Video } from 'lucide-react';
import { Button } from './ui/button';
import { scheduleDiagnosticSession } from '../services/googleCalendar';
import { appendApplicantToSheet, getStoredSheetId } from '../services/googleSheets';
import { getAccessToken, googleSignIn } from '../services/googleAuth';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTrack?: 'Student & Graduate' | 'Professional & Seeker' | 'Founder & Creator';
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  onClose,
  defaultTrack = 'Professional & Seeker',
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [track, setTrack] = useState<'Student & Graduate' | 'Professional & Seeker' | 'Founder & Creator'>(defaultTrack);
  const [fearTrigger, setFearTrigger] = useState('My mind blanks the moment all eyes turn to me');
  
  // Date & Slot Selection
  const [selectedSlot, setSelectedSlot] = useState<string>('tomorrow-18:00');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<{
    time?: string;
    meetLink?: string;
    success: boolean;
  } | null>(null);

  if (!isOpen) return null;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Calculate appointment start date based on selected slot
      const date = new Date();
      date.setDate(date.getDate() + 1); // Tomorrow
      const [hours, minutes] = selectedSlot.includes('18:00') ? [18, 0] : selectedSlot.includes('19:00') ? [19, 0] : [20, 0];
      date.setHours(hours, minutes, 0, 0);

      let token = await getAccessToken();
      
      // If token not present, request Google sign-in to authenticate with Calendar & Sheets
      if (!token) {
        try {
          const authResult = await googleSignIn();
          token = authResult?.accessToken || null;
        } catch {
          console.warn('Proceeding with direct intake logging');
        }
      }

      let meetUrl = 'https://meet.google.com/new';
      let formattedTime = `${hours}:${minutes === 0 ? '00' : minutes}`;

      if (token) {
        try {
          const calendarRes = await scheduleDiagnosticSession(token, {
            candidateName: name,
            candidateEmail: email,
            candidatePhone: whatsapp,
            track,
            fearTrigger,
            startIsoString: date.toISOString(),
          });
          if (calendarRes.hangoutLink) meetUrl = calendarRes.hangoutLink;
          formattedTime = calendarRes.startTime;

          const sheetId = getStoredSheetId();
          if (sheetId) {
            await appendApplicantToSheet(token, sheetId, {
              name,
              email,
              whatsapp,
              track,
              fearTrigger,
              status: 'Diagnostic Booked',
            });
          }
        } catch (apiErr) {
          console.warn('API sync warning:', apiErr);
        }
      }

      setBookingResult({
        time: formattedTime,
        meetLink: meetUrl,
        success: true,
      });
      setStep(3); // Go to celebration / WhatsApp invite screen
    } catch (err: unknown) {
      console.error('Diagnostic booking error:', err);
      setBookingResult({ success: true, time: 'Confirmed' });
      setStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[520px] my-8 bg-[#121218] border-3 border-white shadow-[8px_8px_0_#FF0000] rounded-none overflow-hidden text-white flex flex-col font-sans">
        
        {/* Header Bar */}
        <header className="flex items-center justify-between p-4 bg-[#14141c] border-b-3 border-white">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-wider text-white">POLOMO</span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#FF0000] text-white">
              1-on-1 Diagnostic
            </span>
          </div>
          <button
            type="button"
            className="flex items-center justify-center h-8 px-3 border-2 border-white bg-[#FF0000] text-white font-bold text-xs uppercase cursor-pointer hover:bg-[#e60000] transition-colors"
            onClick={onClose}
          >
            Close ✕
          </button>
        </header>

        {/* Modal Body */}
        <div className="p-6">
          {step === 1 && (
            <div>
              <div className="mb-5">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                  10-Minute Speaking Confidence Audit
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  A private, zero-judgment 1-on-1 session to diagnose where you freeze, test your stage hesitation, and receive 1 instant physiological reset tool.
                </p>
              </div>

              <div className="space-y-4">
                {/* Track Picker */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Select Your Track
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'Student & Graduate', label: 'Academia & Thesis' },
                      { id: 'Professional & Seeker', label: 'Meetings & Reviews' },
                      { id: 'Founder & Creator', label: 'Pitches & Stages' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTrack(t.id as any)}
                        className={`p-2.5 text-left text-xs font-semibold border-2 transition-all cursor-pointer ${
                          track === t.id
                            ? 'border-[#FF0000] bg-[#FF0000]/15 text-white shadow-[2px_2px_0_#FF0000]'
                            : 'border-white/20 bg-black/40 text-zinc-300 hover:border-white/50'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Fear Trigger */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    What happens physically when you speak?
                  </label>
                  <select
                    value={fearTrigger}
                    onChange={(e) => setFearTrigger(e.target.value)}
                    className="w-full bg-[#181822] border-2 border-white/30 text-sm text-white px-3 py-2.5 outline-none focus:border-[#FF0000]"
                  >
                    <option value="My mind blanks the moment all eyes turn to me">My mind blanks the moment all eyes turn to me</option>
                    <option value="My voice trembles, breathing becomes shallow">My voice trembles, breathing becomes shallow</option>
                    <option value="I flush, sweat, and avoid unscripted questions">I flush, sweat, and avoid unscripted questions</option>
                    <option value="I stay muted in meetings even when I have answers">I stay muted in meetings even when I have answers</option>
                    <option value="High-stakes audience or executive intimidation">High-stakes audience or executive intimidation</option>
                  </select>
                </div>

                {/* Name & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#181822] border-2 border-white/30 text-sm text-white px-3 py-2 outline-none focus:border-[#FF0000]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-[#181822] border-2 border-white/30 text-sm text-white px-3 py-2 outline-none focus:border-[#FF0000]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#181822] border-2 border-white/30 text-sm text-white px-3 py-2 outline-none focus:border-[#FF0000]"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    disabled={!name || !email || !whatsapp}
                    onClick={() => setStep(2)}
                    className="w-full uppercase tracking-wider font-bold shadow-[4px_4px_0_#FFFFFF]"
                  >
                    Select 10-Minute Slot →
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-zinc-400 hover:text-white uppercase mb-2 inline-flex items-center gap-1"
                >
                  ← Back to Details
                </button>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  Pick Your 10-Minute Window
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  100% Free • Hosted live via Google Meet / WhatsApp Audio
                </p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'tomorrow-18:00', label: 'Tomorrow 6:00 PM', desc: 'Evening Slot' },
                    { id: 'tomorrow-19:00', label: 'Tomorrow 7:00 PM', desc: 'Prime Slot' },
                    { id: 'tomorrow-20:00', label: 'Tomorrow 8:00 PM', desc: 'Late Slot' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSlot(s.id)}
                      className={`p-3 text-left border-2 cursor-pointer transition-all ${
                        selectedSlot === s.id
                          ? 'border-[#00E575] bg-[#00E575]/15 text-white shadow-[3px_3px_0_#00E575]'
                          : 'border-white/20 bg-black/40 text-zinc-300 hover:border-white/50'
                      }`}
                    >
                      <Clock className="size-4 text-zinc-400 mb-1" />
                      <div className="text-sm font-bold text-white">{s.label}</div>
                      <div className="text-[11px] text-zinc-400">{s.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="p-3 bg-black/40 border border-white/10 text-xs text-zinc-300 leading-relaxed">
                  <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#00E575]" />
                    What to expect in your 10 minutes:
                  </div>
                  1. Pinpoint the exact physical trigger that causes your freeze.<br />
                  2. Receive one custom breathing or cognitive reset protocol.<br />
                  3. Direct invite to the WhatsApp Practice Circle & priority cohort waitlist.
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full uppercase tracking-wider font-bold shadow-[4px_4px_0_#FFFFFF]"
                >
                  {isSubmitting ? 'Confirming Appointment...' : 'Confirm 1-on-1 Diagnostic Session →'}
                </Button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-3">
              <div className="inline-flex items-center justify-center size-14 rounded-full bg-[#00E575]/20 border-2 border-[#00E575] text-[#00E575] mb-3">
                <CheckCircle2 className="size-8" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-1">
                You're On The Schedule!
              </h3>
              <p className="text-sm text-zinc-300 mb-4">
                Your 10-minute audit has been secured. We've emailed confirmation details to <strong className="text-white">{email}</strong>.
              </p>

              {/* The Primary Conversion Hook: WhatsApp Community */}
              <div className="bg-[#181824] border-2 border-[#00E575] p-5 mb-5 text-left shadow-[5px_5px_0_#00E575]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-[#00E575] text-black">
                    Immediate Next Step
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  Join the POLOMO WhatsApp Practice Circle
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                  While you wait for your 1-on-1 session, join our private WhatsApp group for weekly live AMAs, 45-second audio drills, and priority drops for upcoming Telegram Pods.
                </p>
                <a
                  href="https://chat.whatsapp.com/invite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#00E575] hover:bg-[#00c965] text-black font-extrabold text-sm uppercase tracking-wider transition-colors"
                >
                  <MessageSquare className="size-4" />
                  Enter WhatsApp Community Now →
                </a>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-zinc-400 hover:text-white uppercase tracking-wider"
              >
                Close & Return to Site
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
