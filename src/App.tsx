/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRightIcon, ArrowRight, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExposureRoadmapModal } from './components/ExposureRoadmap';
import { BrutalistFAQ } from './components/BrutalistFAQ';
import { CohortCalloutCard } from './components/CohortCalloutCard';
import { BrutalistFooter } from './components/BrutalistFooter';
import { DiagnosticModal } from './components/DiagnosticModal';
import { AdminControlDrawer } from './components/AdminControlDrawer';

export default function App() {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [menuChecked, setMenuChecked] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [roadmapModalOpen, setRoadmapModalOpen] = useState(false);
  const [diagnosticModalOpen, setDiagnosticModalOpen] = useState(false);
  const [adminDrawerOpen, setAdminDrawerOpen] = useState(false);
  const [cohortStatus, setCohortStatus] = useState<'DIAGNOSTIC' | 'OPEN' | 'WAITLIST'>('DIAGNOSTIC');
  const [capacities, setCapacities] = useState({
    student: 24,
    professional: 36,
    founder: 12,
  });
  const [selectedTrack, setSelectedTrack] = useState<'student' | 'professional' | 'founder'>('professional');
  const [activeArchetype, setActiveArchetype] = useState<'student' | 'professional' | 'founder'>('professional');

  const scrollToAdmissions = (track?: 'student' | 'professional' | 'founder') => {
    if (track) {
      setSelectedTrack(track);
      setActiveArchetype(track);
    }
    const el = document.getElementById('cohort') || document.getElementById('admissions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scrollspy to accurately detect active section for navbar underline
  useEffect(() => {
    const sectionIds = ['approach', 'who-it-is-for', 'faq', 'cohort'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 180;
      let current = '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - offset;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close hamburger menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuChecked(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // 14-point star points computed exactly as in the original code
  const starPoints = useMemo(() => {
    const points: string[] = [];
    const spikes = 14;
    const outer = 48;
    const inner = 30;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = (Math.PI * i) / spikes - Math.PI / 2;
      points.push(`${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`);
    }
    return points.join(' ');
  }, []);

  return (
    <>
      {/* Announcement banner */}
      {!bannerDismissed && (
        <div className="banner" id="banner" role="region" aria-label="Announcement">
          <div className="banner__track" id="bannerTrack">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="banner__item"
                aria-hidden={i > 0 ? 'true' : undefined}
              >
                Public Speaking Mastery — Free 60-Second Speaking Diagnostic &amp; Community Pass Now Open
              </span>
            ))}
          </div>
          <div className="banner__close-wrap">
            <button
              className="banner__close"
              id="bannerClose"
              type="button"
              aria-label="Close announcement"
              onClick={() => setBannerDismissed(true)}
            >
              <span>
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 9 9"
                  fill="none"
                  stroke="#FF0000"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M1 1l7 7M8 1L1 8" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="site-header">
        <div className="site-header__inner">
          <nav className="nav" aria-label="Main">
            <a
              className="nav__home"
              href="#top"
              aria-label="POLOMO home"
              onClick={() => setMenuChecked(false)}
            >
              <img
                src="/assets/aistudio/white_transparent_logo-2_6e69edc6.png"
                alt="POLOMO"
                className="nav__logo"
              />
            </a>
            <ul className="nav__links">
              <li>
                <a
                  className={activeSection === 'approach' ? 'is-underlined' : ''}
                  href="#approach"
                >
                  Our Method
                </a>
              </li>
              <li>
                <a
                  className={activeSection === 'who-it-is-for' ? 'is-underlined' : ''}
                  href="#who-it-is-for"
                >
                  Who It's For
                </a>
              </li>
              <li>
                <a
                  className={activeSection === 'faq' ? 'is-underlined' : ''}
                  href="#faq"
                >
                  FAQ
                </a>
              </li>
            </ul>
            <div className="nav__actions">
              <button
                type="button"
                className="btn btn--primary nav__btn hidden md:inline-flex"
                onClick={() => scrollToAdmissions()}
              >
                Free Diagnostic
              </button>
              <button
                type="button"
                className={`chm-27__plate nav__plate-toggle ${menuChecked ? 'is-checked' : ''}`}
                aria-label={menuChecked ? 'Close navigation menu' : 'Open navigation menu'}
                onClick={() => setMenuChecked((prev) => !prev)}
              >
                <span className="chm-27__ico" aria-hidden="true"><i></i><i></i><i></i></span>
                <span className="chm-27__lbl chm-27__lbl--m" aria-hidden="true">MENU</span>
                <span className="chm-27__lbl chm-27__lbl--c" aria-hidden="true">CLOSE</span>
              </button>
            </div>
          </nav>

          {/* Brutalist Bordered Hamburger Menu Overlay (chm-27) */}
          <div
            className={`chm-27-overlay ${menuChecked ? 'is-open' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setMenuChecked(false);
              }
            }}
          >
            <section className="chm-27" aria-label="Navigation menu">
              <div className="chm-27__stage">
                <input
                  type="checkbox"
                  id="chm27-t"
                  className="chm-27__state"
                  checked={menuChecked}
                  onChange={(e) => setMenuChecked(e.target.checked)}
                />
                <header className="chm-27__bar">
                  <span className="chm-27__brand">POLOMO<i className="chm-27__reg" aria-hidden="true">®</i></span>
                  <button
                    type="button"
                    className="chm-27__plate"
                    aria-label="Close navigation menu"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuChecked(false);
                    }}
                  >
                    <span className="chm-27__ico" aria-hidden="true"><i></i><i></i><i></i></span>
                    <span className="chm-27__lbl chm-27__lbl--m" aria-hidden="true">MENU</span>
                    <span className="chm-27__lbl chm-27__lbl--c" aria-hidden="true">CLOSE</span>
                  </button>
                </header>
                <nav className="chm-27__menu" aria-label="Site">
                  <div className="chm-27__row"><a href="#approach" onClick={() => setMenuChecked(false)}><b>01</b>OUR METHOD<span aria-hidden="true">→</span></a></div>
                  <div className="chm-27__row"><a href="#who-it-is-for" onClick={() => setMenuChecked(false)}><b>02</b>WHO IT'S FOR<span aria-hidden="true">→</span></a></div>
                  <div className="chm-27__row"><a href="#faq" onClick={() => setMenuChecked(false)}><b>03</b>FAQ INQUIRIES<span aria-hidden="true">→</span></a></div>
                  <div className="chm-27__row"><button type="button" onClick={() => { setMenuChecked(false); scrollToAdmissions(); }} className="w-full text-left bg-transparent border-none p-0 cursor-pointer font-inherit text-inherit"><b>04</b>FREE DIAGNOSTIC PASS<span aria-hidden="true">→</span></button></div>
                  <div className="chm-27__foot">
                    <div className="chm-27__badge">
                      ZERO THEORY<br />ACTIVE EXPOSURE<br />DAILY SPEAKING REPS
                    </div>
                    <span className="chm-27__subtext">
                      NEXT COHORT ENROLLING • 12 SEATS PER POD
                    </span>
                  </div>
                </nav>
                <div className="chm-27__ticker" aria-hidden="true"><div className="chm-27__tape"><span>STOP LEARNING, START SPEAKING ★ NEXT COHORT ENROLLING ★ REAL STAGE PRESENCE ★&nbsp;</span><span>STOP LEARNING, START SPEAKING ★ NEXT COHORT ENROLLING ★ REAL STAGE PRESENCE ★&nbsp;</span></div></div>
              </div>
            </section>
          </div>
        </div>
      </header>

      <main id="top">
        <div className="stack">

          {/* Hero */}
          <section className={`hero ${bannerDismissed ? 'hero--full' : ''}`} aria-labelledby="hero-title">
            {/* Desktop Hero Shapes */}
            <div className="hero__shapes hero__shapes--desktop" aria-hidden="true">
              <span
                className="shape shape--circle"
                style={{ left: '-120px', top: '-60px', width: '220px', height: '220px', background: '#FF0000', opacity: 0.6 }}
              />
              <svg
                className="shape"
                style={{ left: '20px', top: '-40px', width: '180px', height: '190px', opacity: 0.55 }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon points="50,0 100,38 81,100 19,100 0,38" fill="#FFE500" />
              </svg>
              <span
                className="shape shape--circle"
                style={{ right: '-30px', top: '-25px', width: '210px', height: '210px', background: '#8fd4ee', opacity: 0.85 }}
              />
              <span
                className="shape"
                style={{ right: '16px', top: '150px', width: '180px', height: '180px', background: '#FFE500', transform: 'rotate(14deg)', opacity: 0.85 }}
              />
              <svg
                className="shape"
                style={{ left: '16px', top: '140px', width: '180px', height: '190px', opacity: 0.85 }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon points="0,0 100,48 12,100" fill="#00E575" />
              </svg>
              <svg
                className="shape"
                id="star"
                style={{ right: '80px', top: '280px', width: '160px', height: '160px', opacity: 0.7 }}
                viewBox="-50 -50 100 100"
              >
                <polygon fill="#FF4071" points={starPoints} />
              </svg>
              <span
                className="shape shape--circle"
                style={{ left: '-60px', top: '290px', width: '160px', height: '160px', background: '#FF4071', opacity: 0.6 }}
              />
              <span
                className="shape shape--circle"
                style={{ left: '80px', top: '290px', width: '150px', height: '150px', background: '#FF3B30', opacity: 0.5 }}
              />
              <span
                className="shape shape--circle"
                style={{ left: '210px', top: '320px', width: '80px', height: '80px', background: '#FFFFFF', opacity: 0.7 }}
              />
            </div>

            {/* Mobile Hero Shapes - Proportionally scaled and framed for small viewports */}
            <div className="hero__shapes hero__shapes--mobile" aria-hidden="true">
              {/* Top Left Yellow Angle */}
              <svg
                className="shape"
                style={{ left: '-12px', top: '-10px', width: '92px', height: '96px' }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon points="0,0 100,28 65,100 0,72" fill="#FFE500" />
              </svg>
              {/* Top Right Arctic Cyan Circle */}
              <span
                className="shape shape--circle"
                style={{ right: '-18px', top: '12px', width: '80px', height: '80px', background: '#8FD4EE' }}
              />
              {/* Mid Left Coral-Red Circle & White Dot */}
              <span
                className="shape shape--circle"
                style={{ left: '-30px', top: '42%', width: '96px', height: '96px', background: '#FF3B30' }}
              />
              <span
                className="shape shape--circle"
                style={{ left: '38px', top: '53%', width: '44px', height: '44px', background: '#FFFFFF' }}
              />
              {/* Mid Right Hot Pink Star */}
              <svg
                className="shape"
                style={{ right: '-16px', top: '44%', width: '92px', height: '92px' }}
                viewBox="-50 -50 100 100"
              >
                <polygon fill="#FF4071" points={starPoints} />
              </svg>
              {/* Bottom Left Green Accent */}
              <svg
                className="shape"
                style={{ left: '10px', bottom: '10px', width: '64px', height: '70px' }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon points="0,0 100,48 12,100" fill="#00E575" />
              </svg>
              {/* Bottom Right Yellow Rotated Tile */}
              <span
                className="shape"
                style={{
                  right: '12px',
                  bottom: '14px',
                  width: '52px',
                  height: '52px',
                  background: '#FFE500',
                  transform: 'rotate(14deg)',
                  borderRadius: '10px'
                }}
              />
            </div>

            <div className="hero__content">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#FFE500] text-black border-2 border-black shadow-[2px_2px_0_#FFFFFF]">
                  Free 60-Second Speaking Diagnostic · Zero Passive Lectures
                </span>
              </div>
              <h1 id="hero-title">Stop Learning About Public Speaking. Start Speaking.</h1>
              <p className="hero__lede">
                A practical exposure lab for students, professionals, and founders who freeze under audience scrutiny. Run your free diagnostic, identify your freeze triggers, and unlock your practice pod pass.
              </p>

              {/* Dual-Action Conversion Console (neobrutalism.dev hierarchy) */}
              <div className="hero__actions">
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => scrollToAdmissions()}
                >
                  <span>Run Free Diagnostic</span>
                  <ArrowRight className="size-4 stroke-[3]" />
                </button>
                <button
                  type="button"
                  className="btn btn--dark"
                  onClick={() => setDiagnosticModalOpen(true)}
                >
                  <Radio className="size-4 text-[#00E575] animate-pulse" />
                  <span>Book 10-Min Free Audit ↗</span>
                </button>
              </div>
            </div>
          </section>

          {/* Our approach - Stretches edge-to-edge from left to right */}
          <section className="approach scroll-mt-20 min-h-screen min-h-[100dvh] flex flex-col justify-center" id="approach" aria-labelledby="approach-title">
            <div className="approach__inner">
              <div className="approach__head">
                <h2 id="approach-title">Our approach</h2>
                <button
                  type="button"
                  className="btn btn--dark"
                  onClick={() => scrollToAdmissions()}
                >
                  <span>Get started</span>
                  <ArrowRight className="size-4 stroke-[2.5]" />
                </button>
              </div>

              <div className="approach__cards">
                <article className="card card--sky">
                  <span className="card__dot" aria-hidden="true"></span>
                  <div className="card__body">
                    <h3 className="card__title">Daily Speaking Reps</h3>
                    <p className="card__text">You get micro-opportunities to speak every single day. This constant frequency builds instant habit and eliminates overthinking.</p>
                  </div>
                  <a className="pill" href="#cohort">
                    <span>Daily reps</span>
                    <ArrowRight className="size-3.5 stroke-[2.5]" />
                  </a>
                </article>

                <article className="card card--green">
                  <div className="card__body">
                    <h3 className="card__title">Progressive Exposure Pods</h3>
                    <p className="card__text">You are placed into small, supportive peer groups led by dedicated facilitators, ensuring you are never thrown into the deep end alone.</p>
                  </div>
                  <a className="pill" href="#cohort">
                    <span>Join a pod</span>
                    <ArrowRight className="size-3.5 stroke-[2.5]" />
                  </a>
                </article>

                <article className="card card--orange">
                  <div className="card__body">
                    <h3 className="card__title">Real-World and Virtual Stages</h3>
                    <p className="card__text">You practice across both virtual environments and physical spaces—stepping onto real stages, managing eye contact, and projecting your voice in front of live audiences.</p>
                  </div>
                  <a className="pill" href="#cohort">
                    <span>Real stages</span>
                    <ArrowRight className="size-3.5 stroke-[2.5]" />
                  </a>
                </article>
              </div>
            </div>
          </section>

          {/* Who it's for - Full-Bleed Manila Dossier Board Stretching Edge-to-Edge */}
          <section
            className="w-full min-h-screen min-h-[100dvh] flex flex-col justify-center bg-[#FAF7EE] border-b-[3px] border-black py-8 sm:py-12 lg:py-14 px-[var(--gutter)] scroll-mt-20 relative overflow-hidden"
            id="who-it-is-for"
            aria-labelledby="who-title"
          >
            <div className="w-full max-w-[1488px] mx-auto relative">
              {/* Section Header - Clean blueprint exactly matching Our Approach */}
              <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 flex-wrap">
                <h2 id="who-title" className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#0A0A0C] tracking-tight leading-tight m-0 font-display">
                  Who it's for
                </h2>
                <button
                  type="button"
                  className="btn btn--dark"
                  onClick={() => scrollToAdmissions()}
                >
                  <span>Get started</span>
                  <ArrowRight className="size-4 stroke-[2.5]" />
                </button>
              </div>

              {/* Mobile / Small Screen Segmented Archetype Switcher */}
              <div className="md:hidden flex p-1.5 bg-black/10 rounded-xl gap-1 mb-4 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setActiveArchetype('student')}
                  className={`flex-1 py-2 px-2 text-xs sm:text-sm font-black rounded-lg transition-all cursor-pointer ${
                    activeArchetype === 'student'
                      ? 'bg-[#C7D2FE] text-[#111118] border-2 border-black shadow-[2px_2px_0_#000]'
                      : 'text-neutral-700 hover:text-black border-2 border-transparent'
                  }`}
                >
                  🎓 Students
                </button>
                <button
                  type="button"
                  onClick={() => setActiveArchetype('professional')}
                  className={`flex-1 py-2 px-2 text-xs sm:text-sm font-black rounded-lg transition-all cursor-pointer ${
                    activeArchetype === 'professional'
                      ? 'bg-[#FFE500] text-[#111118] border-2 border-black shadow-[2px_2px_0_#000]'
                      : 'text-neutral-700 hover:text-black border-2 border-transparent'
                  }`}
                >
                  💼 Pros
                </button>
                <button
                  type="button"
                  onClick={() => setActiveArchetype('founder')}
                  className={`flex-1 py-2 px-2 text-xs sm:text-sm font-black rounded-lg transition-all cursor-pointer ${
                    activeArchetype === 'founder'
                      ? 'bg-[#FF3366] text-white border-2 border-black shadow-[2px_2px_0_#000]'
                      : 'text-neutral-700 hover:text-black border-2 border-transparent'
                  }`}
                >
                  🚀 Founders
                </button>
              </div>

              {/* Mobile Single Card View (Active Persona Only) */}
              <div className="md:hidden">
                {activeArchetype === 'student' && (
                  <article className="relative flex flex-col justify-between bg-[#C7D2FE] border-[3px] border-black text-[#111118] rounded-[20px] p-5 shadow-[4px_4px_0_#000] animate-in fade-in-50 duration-150">
                    <span
                      className="absolute top-4 right-4 size-7 rounded-full bg-[#FF0000] border-2 border-black"
                      aria-hidden="true"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black text-white">
                          Academia &amp; Entry
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-[#111118] tracking-tight mb-2 pr-8">
                        Students &amp; Graduates
                      </h3>
                      <p className="text-[#181820] font-normal text-sm sm:text-base leading-relaxed mb-3">
                        Thesis defenses, capstone presentations, and high-pressure job interviews.
                      </p>
                      <ul className="space-y-2 text-sm text-[#111118] font-medium list-none p-0 m-0">
                        <li className="flex items-start gap-2">
                          <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-black stroke-[3]" />
                          <span>Defend thesis and capstone without vocal trembling.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-black stroke-[3]" />
                          <span>Conquer interview jitters and answer curveball prompts.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => scrollToAdmissions('student')}
                        className="pill cursor-pointer w-full justify-center text-sm font-bold py-2.5"
                        style={{ marginTop: 0 }}
                      >
                        <span>Select Student Track</span>
                        <ArrowRight className="size-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </article>
                )}

                {activeArchetype === 'professional' && (
                  <article className="relative flex flex-col justify-between bg-[#FFE500] border-[3px] border-black text-[#111118] rounded-[20px] p-5 shadow-[4px_4px_0_#000] animate-in fade-in-50 duration-150">
                    <span
                      className="absolute top-4 right-4 size-7 rounded-full bg-[#111118] border-2 border-black"
                      aria-hidden="true"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black text-white">
                          Career &amp; Visibility
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-[#111118] tracking-tight mb-2 pr-8">
                        Professionals &amp; Seekers
                      </h3>
                      <p className="text-[#181820] font-normal text-sm sm:text-base leading-relaxed mb-3">
                        Commanding team meetings, leadership reviews, and unscripted Q&amp;A.
                      </p>
                      <ul className="space-y-2 text-sm text-[#111118] font-medium list-none p-0 m-0">
                        <li className="flex items-start gap-2">
                          <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-black stroke-[3]" />
                          <span>Stop staying muted in meetings when you have solutions.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-black stroke-[3]" />
                          <span>Pitch ideas seamlessly to executive stakeholders.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => scrollToAdmissions('professional')}
                        className="pill cursor-pointer w-full justify-center text-sm font-bold py-2.5"
                        style={{ marginTop: 0 }}
                      >
                        <span>Select Professional Track</span>
                        <ArrowRight className="size-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </article>
                )}

                {activeArchetype === 'founder' && (
                  <article className="relative flex flex-col justify-between bg-[#FF3366] border-[3px] border-black text-white rounded-[20px] p-5 shadow-[4px_4px_0_#000] animate-in fade-in-50 duration-150">
                    <span
                      className="absolute top-4 right-4 size-7 rounded-full bg-white border-2 border-black"
                      aria-hidden="true"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black text-white">
                          Pitches &amp; Stages
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-tight mb-2 pr-8">
                        Founders &amp; Creators
                      </h3>
                      <p className="text-white/95 font-normal text-sm sm:text-base leading-relaxed mb-3">
                        Investor pitches, demo days, podcasts, and live auditorium scrutiny.
                      </p>
                      <ul className="space-y-2 text-sm text-white font-medium list-none p-0 m-0">
                        <li className="flex items-start gap-2">
                          <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-white stroke-[3]" />
                          <span>Pitch your company with undeniable conviction and fire.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-white stroke-[3]" />
                          <span>Own the stage whether addressing 10 or 1,000 live listeners.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => scrollToAdmissions('founder')}
                        className="pill cursor-pointer w-full justify-center text-sm font-bold py-2.5"
                        style={{ marginTop: 0 }}
                      >
                        <span>Select Founder Track</span>
                        <ArrowRight className="size-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </article>
                )}
              </div>

              {/* Desktop 3-Card Grid - Clear, readable typography matching Our Approach */}
              <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-5 w-full">
                
                {/* Persona 1: Students & Graduates */}
                <article className="relative flex flex-col justify-between bg-[#C7D2FE] border-[3px] border-black text-[#111118] rounded-[20px] p-5 lg:p-6 min-h-[310px] lg:min-h-[330px] shadow-[4px_4px_0_#000] lg:[transform:rotate(-1deg)] hover:lg:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200">
                  <span
                    className="card__dot"
                    aria-hidden="true"
                    style={{ top: '18px', right: '18px', width: '28px', height: '28px', background: '#FF0000', border: '2px solid #000' }}
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black text-white">
                        Academia &amp; Entry
                      </span>
                    </div>
                    <h3 className="text-xl lg:text-[23px] font-black text-[#111118] tracking-tight mb-2 pr-8 leading-snug">
                      Students &amp; Graduates
                    </h3>
                    <p className="text-[#181820] font-normal text-sm sm:text-[14.5px] leading-relaxed mb-3">
                      Thesis defenses, capstone presentations, and high-pressure job interviews.
                    </p>

                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#111118] font-medium list-none p-0 m-0">
                      <li className="flex items-start gap-2">
                        <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-black stroke-[3]" />
                        <span>Defend thesis without vocal trembling.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-black stroke-[3]" />
                        <span>Conquer interview jitters &amp; curveballs.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-black stroke-[3]" />
                        <span>Eliminate sudden mental blanking.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 mt-auto">
                    <button
                      type="button"
                      onClick={() => scrollToAdmissions('student')}
                      className="pill cursor-pointer text-sm font-bold py-2 px-4"
                      style={{ marginTop: 0 }}
                    >
                      <span>Student track</span>
                      <ArrowRight className="size-4 stroke-[2.5]" />
                    </button>
                  </div>
                </article>

                {/* Persona 2: Professionals & Seekers */}
                <article className="relative flex flex-col justify-between bg-[#FFE500] border-[3px] border-black text-[#111118] rounded-[20px] p-5 lg:p-6 min-h-[310px] lg:min-h-[330px] shadow-[4px_4px_0_#000] lg:[transform:rotate(1.2deg)] hover:lg:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200">
                  <span
                    className="card__dot"
                    aria-hidden="true"
                    style={{ top: '18px', right: '18px', width: '28px', height: '28px', background: '#111118', border: '2px solid #000' }}
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black text-white">
                        Career &amp; Visibility
                      </span>
                    </div>
                    <h3 className="text-xl lg:text-[23px] font-black text-[#111118] tracking-tight mb-2 pr-8 leading-snug">
                      Professionals &amp; Seekers
                    </h3>
                    <p className="text-[#181820] font-normal text-sm sm:text-[14.5px] leading-relaxed mb-3">
                      Commanding meetings, executive reviews, and unscripted Q&amp;A.
                    </p>

                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#111118] font-medium list-none p-0 m-0">
                      <li className="flex items-start gap-2">
                        <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-black stroke-[3]" />
                        <span>Stop staying muted when you have answers.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-black stroke-[3]" />
                        <span>Pitch ideas to executive stakeholders.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-black stroke-[3]" />
                        <span>Handle tough pushback with composure.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 mt-auto">
                    <button
                      type="button"
                      onClick={() => scrollToAdmissions('professional')}
                      className="pill cursor-pointer text-sm font-bold py-2 px-4"
                      style={{ marginTop: 0 }}
                    >
                      <span>Join a pod</span>
                      <ArrowRight className="size-4 stroke-[2.5]" />
                    </button>
                  </div>
                </article>

                {/* Persona 3: Founders & Creators */}
                <article className="relative flex flex-col justify-between bg-[#FF3366] border-[3px] border-black text-white rounded-[20px] p-5 lg:p-6 min-h-[310px] lg:min-h-[330px] shadow-[4px_4px_0_#000] lg:[transform:rotate(-1deg)] hover:lg:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200">
                  <span
                    className="card__dot"
                    aria-hidden="true"
                    style={{ top: '18px', right: '18px', width: '28px', height: '28px', background: '#FFFFFF', border: '2px solid #000' }}
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black text-white">
                        Pitches &amp; Stages
                      </span>
                    </div>
                    <h3 className="text-xl lg:text-[23px] font-black text-white tracking-tight mb-2 pr-8 leading-snug">
                      Founders &amp; Creators
                    </h3>
                    <p className="text-white/95 font-normal text-sm sm:text-[14.5px] leading-relaxed mb-3">
                      Investor pitches, demo days, podcasts, and live auditorium scrutiny.
                    </p>

                    <ul className="space-y-1.5 text-xs sm:text-sm text-white font-medium list-none p-0 m-0">
                      <li className="flex items-start gap-2">
                        <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-white stroke-[3]" />
                        <span>Pitch your startup with conviction.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-white stroke-[3]" />
                        <span>Command stages of 10 or 1,000 listeners.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-white stroke-[3]" />
                        <span>Navigate harsh investor critique calmly.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 mt-auto">
                    <button
                      type="button"
                      onClick={() => scrollToAdmissions('founder')}
                      className="pill cursor-pointer text-sm font-bold py-2 px-4"
                      style={{ marginTop: 0 }}
                    >
                      <span>Explore stages</span>
                      <ArrowRight className="size-4 stroke-[2.5]" />
                    </button>
                  </div>
                </article>

              </div>
            </div>
          </section>

          {/* On-Page Brutalist FAQ Accordion */}
          <BrutalistFAQ />

          {/* Cohort Application High-Impact Admissions Terminal (Unified On-Page Form & Diagnostic) */}
          <CohortCalloutCard
            cohortStatus={cohortStatus}
            initialTrack={selectedTrack}
          />

        </div>
      </main>

      {/* Bespoke Neo-Brutalist Kinetic Footer */}
      <BrutalistFooter
        onOpenRoadmap={() => setRoadmapModalOpen(true)}
        onOpenFaq={() => { const el = document.getElementById('faq'); el?.scrollIntoView({ behavior: 'smooth' }); }}
        onOpenDiagnostic={() => setDiagnosticModalOpen(true)}
        onApply={() => scrollToAdmissions()}
        onOpenAdmin={() => setAdminDrawerOpen(true)}
      />

      {/* 4-Stage Exposure Roadmap Modal */}
      <ExposureRoadmapModal
        isOpen={roadmapModalOpen}
        onClose={() => setRoadmapModalOpen(false)}
        onApply={() => { setRoadmapModalOpen(false); scrollToAdmissions(); }}
      />

      {/* 1-on-1 Confidence Diagnostic Booking Modal */}
      <DiagnosticModal
        isOpen={diagnosticModalOpen}
        onClose={() => setDiagnosticModalOpen(false)}
      />

      {/* Admin Mission Control Drawer */}
      <AdminControlDrawer
        isOpen={adminDrawerOpen}
        onClose={() => setAdminDrawerOpen(false)}
        cohortStatus={cohortStatus}
        onStatusChange={setCohortStatus}
        capacities={capacities}
        onCapacitiesChange={setCapacities}
      />
    </>
  );
}
