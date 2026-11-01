import React, { useState, useEffect } from 'react';
import { Settings, Sheet, Calendar, Users, Check, ExternalLink, LogOut, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logout, getAccessToken } from '../services/googleAuth';
import { initOrCreateSheet, getStoredSheetId, setStoredSheetId } from '../services/googleSheets';

interface AdminControlDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cohortStatus: 'DIAGNOSTIC' | 'OPEN' | 'WAITLIST';
  onStatusChange: (status: 'DIAGNOSTIC' | 'OPEN' | 'WAITLIST') => void;
  capacities: {
    student: number;
    professional: number;
    founder: number;
  };
  onCapacitiesChange: (capacities: { student: number; professional: number; founder: number }) => void;
}

export const AdminControlDrawer: React.FC<AdminControlDrawerProps> = ({
  isOpen,
  onClose,
  cohortStatus,
  onStatusChange,
  capacities,
  onCapacitiesChange,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sheetId, setSheetId] = useState<string | null>(getStoredSheetId());
  const [isInitializingSheet, setIsInitializingSheet] = useState(false);
  const [sheetInput, setSheetInput] = useState('');

  useEffect(() => {
    const unsub = initAuth((user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        // Auto initialize spreadsheet if needed
        if (!sheetId) {
          setIsInitializingSheet(true);
          const newId = await initOrCreateSheet(res.accessToken);
          setSheetId(newId);
          setIsInitializingSheet(false);
        }
      }
    } catch (err) {
      console.error('Sign in failed:', err);
      setIsInitializingSheet(false);
    }
  };

  const handleCreateNewSheet = async () => {
    const token = await getAccessToken();
    if (!token) return handleSignIn();

    setIsInitializingSheet(true);
    try {
      const newId = await initOrCreateSheet(token);
      setSheetId(newId);
    } catch (err) {
      console.error('Error creating sheet:', err);
    } finally {
      setIsInitializingSheet(false);
    }
  };

  const handleLinkExistingSheet = () => {
    if (sheetInput.trim()) {
      // Extract sheet ID if full URL pasted
      const match = sheetInput.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      const id = match ? match[1] : sheetInput.trim();
      setStoredSheetId(id);
      setSheetId(id);
      setSheetInput('');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[620px] my-auto max-h-[92vh] max-h-[92dvh] bg-[#121218] border-3 border-white shadow-[8px_8px_0_#FFE500] rounded-none overflow-hidden text-white flex flex-col font-sans">
        
        {/* Header Bar */}
        <header className="flex items-center justify-between p-4 bg-[#14141c] border-b-3 border-white shrink-0">
          <div className="flex items-center gap-2.5">
            <Settings className="size-5 text-[#FFE500]" />
            <h3 className="font-extrabold text-sm sm:text-base tracking-wider text-white">
              POLOMO Mission Control
            </h3>
          </div>
          <button
            type="button"
            className="flex items-center justify-center min-h-[36px] px-3 border-2 border-white bg-transparent text-white font-bold text-xs uppercase cursor-pointer hover:bg-white/10"
            onClick={onClose}
          >
            Close ✕
          </button>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">

          {/* 1. Google Account Connection */}
          <div className="p-4 bg-[#181824] border-2 border-white/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Connected Google Account
              </span>
              {currentUser ? (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#00E575] text-black flex items-center gap-1">
                  <ShieldCheck className="size-3" /> Connected
                </span>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#FF0000] text-white">
                  Not Connected
                </span>
              )}
            </div>

            {currentUser ? (
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{currentUser.displayName || 'Director'}</div>
                  <div className="text-xs text-zinc-400">{currentUser.email}</div>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="px-3 py-1.5 border border-white/30 text-xs text-zinc-300 hover:text-white hover:border-white transition-colors flex items-center gap-1"
                >
                  <LogOut className="size-3" /> Disconnect
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs text-zinc-300 mb-3">
                  Connect your Google account to automatically synchronize applicant records into your Google Sheet and 10-minute slots into Google Calendar.
                </p>
                <Button
                  type="button"
                  onClick={handleSignIn}
                  variant="primary"
                  size="sm"
                  className="font-bold uppercase tracking-wider text-xs"
                >
                  Sign in with Google Workspace →
                </Button>
              </div>
            )}
          </div>

          {/* 2. Cohort Availability State Switchboard */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Website Cohort Intake Status (Live Switch)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                {
                  id: 'DIAGNOSTIC',
                  label: 'Diagnostic & Pre-Launch',
                  desc: 'Focus on 10-min calls + WhatsApp group',
                  color: 'border-[#FFE500] text-[#FFE500]',
                },
                {
                  id: 'OPEN',
                  label: 'Paid Cohort Open',
                  desc: 'Active pod enrollment open',
                  color: 'border-[#00E575] text-[#00E575]',
                },
                {
                  id: 'WAITLIST',
                  label: 'Pods Full / Waitlist',
                  desc: 'Current batch at maximum capacity',
                  color: 'border-[#FF4071] text-[#FF4071]',
                },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onStatusChange(s.id as any)}
                  className={`p-3 text-left border-2 cursor-pointer transition-all ${
                    cohortStatus === s.id
                      ? `${s.color} bg-white/10 shadow-[3px_3px_0_#FFFFFF]`
                      : 'border-white/20 bg-black/40 text-zinc-400 hover:border-white/50'
                  }`}
                >
                  <div className="text-xs font-black uppercase mb-1">{s.label}</div>
                  <div className="text-[11px] text-zinc-400 leading-snug">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Section Capacity & Pod Subsets */}
          <div className="border-t border-white/15 pt-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Section Capacities &amp; Pod Subsets (Pods = 12 Seats)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#181822] border border-white/20">
                <div className="text-xs font-bold text-[#8FD4EE] uppercase">Students &amp; Graduates</div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    min="12"
                    step="12"
                    value={capacities.student}
                    onChange={(e) =>
                      onCapacitiesChange({ ...capacities, student: Number(e.target.value) || 12 })
                    }
                    className="w-16 bg-black border border-white/30 text-white text-center font-bold px-2 py-1 text-sm"
                  />
                  <span className="text-xs text-zinc-400">Total Seats</span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 font-semibold">
                  = {Math.ceil(capacities.student / 12)} Pods of 12
                </div>
              </div>

              <div className="p-3 bg-[#181822] border border-white/20">
                <div className="text-xs font-bold text-[#FFE500] uppercase">Professionals &amp; Seekers</div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    min="12"
                    step="12"
                    value={capacities.professional}
                    onChange={(e) =>
                      onCapacitiesChange({ ...capacities, professional: Number(e.target.value) || 12 })
                    }
                    className="w-16 bg-black border border-white/30 text-white text-center font-bold px-2 py-1 text-sm"
                  />
                  <span className="text-xs text-zinc-400">Total Seats</span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 font-semibold">
                  = {Math.ceil(capacities.professional / 12)} Pods of 12
                </div>
              </div>

              <div className="p-3 bg-[#181822] border border-white/20">
                <div className="text-xs font-bold text-[#FF4071] uppercase">Founders &amp; Creators</div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    min="12"
                    step="12"
                    value={capacities.founder}
                    onChange={(e) =>
                      onCapacitiesChange({ ...capacities, founder: Number(e.target.value) || 12 })
                    }
                    className="w-16 bg-black border border-white/30 text-white text-center font-bold px-2 py-1 text-sm"
                  />
                  <span className="text-xs text-zinc-400">Total Seats</span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 font-semibold">
                  = {Math.ceil(capacities.founder / 12)} Pods of 12
                </div>
              </div>
            </div>
          </div>

          {/* 4. Google Sheets Database Links */}
          <div className="border-t border-white/15 pt-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Google Sheets Database
              </span>
              {sheetId && (
                <a
                  href={`https://docs.google.com/spreadsheets/d/${sheetId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#00E575] hover:underline flex items-center gap-1"
                >
                  Open in Google Sheets <ExternalLink className="size-3" />
                </a>
              )}
            </div>

            {sheetId ? (
              <div className="p-3 bg-black/40 border border-white/20 text-xs text-zinc-300 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white">Connected Sheet ID:</span>
                  <div className="font-mono text-[11px] text-zinc-400 truncate max-w-[280px]">
                    {sheetId}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStoredSheetId('');
                    setSheetId(null);
                  }}
                  className="text-[11px] text-zinc-400 hover:text-white underline"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  type="button"
                  disabled={isInitializingSheet}
                  onClick={handleCreateNewSheet}
                  className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sheet className="size-4" />
                  {isInitializingSheet ? 'Creating Google Sheet...' : 'Auto-Create POLOMO Sheet in Google Drive'}
                </button>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Or paste existing Google Sheet URL or ID..."
                    value={sheetInput}
                    onChange={(e) => setSheetInput(e.target.value)}
                    className="flex-1 bg-[#181822] border border-white/30 text-xs px-3 py-2 text-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleLinkExistingSheet}
                    className="px-3 py-2 bg-white text-black font-bold text-xs uppercase"
                  >
                    Link
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
