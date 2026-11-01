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
import { BrutalistFAQ } from './components/BrutalistFAQ';
import { CohortCalloutCard } from './components/CohortCalloutCard';
import { BrutalistFooter } from './components/BrutalistFooter';
import { DiagnosticModal } from './components/DiagnosticModal';
import { TextEffect } from './components/motion-primitives/text-effect';
import { AnimatedBackground } from './components/motion-primitives/animated-background';
import { Tilt } from './components/motion-primitives/tilt';
import { BlurFade } from './components/magicui/blur-fade';
import { NumberTicker } from './components/magicui/number-ticker';

export default function App() {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [menuChecked, setMenuChecked] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [diagnosticModalOpen, setDiagnosticModalOpen] = useState(false);
  const [cohortStatus, setCohortStatus] = useState<'DIAGNOSTIC' | 'OPEN' | 'WAITLIST'>('DIAGNOSTIC');
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

  // Prevent background scrolling and lock body when mobile menu is open
  useEffect(() => {
    if (menuChecked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuChecked]);

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
      {/* Announcement banner - hidden when mobile menu is active to prevent bleed-through */}
      {!bannerDismissed && !menuChecked && (
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
        <div className="site-header__inner mt-2 sm:mt-3">
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
            <ul className="nav__links hidden lg:flex">
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
                className="btn btn--primary nav__btn hidden lg:inline-flex"
                onClick={() => scrollToAdmissions()}
              >
                Free Diagnostic
              </button>
              <button
                type="button"
                className={`chm-27__plate nav__plate-toggle inline-flex lg:hidden ${menuChecked ? 'is-checked' : ''}`}
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
                    <div className="chm-27__status-pill">
                      <span className="chm-27__status-dot" aria-hidden="true"></span>
                      <span className="chm-27__subtext">
                        NEXT COHORT ENROLLING • 12 SEATS PER POD
                      </span>
                    </div>
                  </div>
                </nav>
              </div>
            </section>
          </div>
        </div>
      </header>

      <main id="top">
        <div className="stack">

          {/* Hero */}
          <section className="hero pt-20 pb-12 md:pt-28 md:pb-20 flex flex-col items-center justify-center relative overflow-hidden" aria-labelledby="hero-title">
            {/* Desktop Hero Shapes - Framed along perimeter to never overlap copy */}
            <div className="hero__shapes hero__shapes--desktop pointer-events-none select-none z-0" aria-hidden="true">
              <span
                className="shape shape--circle"
                style={{ left: '-100px', top: '-40px', width: '220px', height: '220px', background: '#FF0000', opacity: 0.45 }}
              />
              <svg
                className="shape"
                style={{ left: '40px', top: '10px', width: '150px', height: '160px', opacity: 0.45 }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon points="50,0 100,38 81,100 19,100 0,38" fill="#FFE500" />
              </svg>
              <span
                className="shape shape--circle"
                style={{ right: '-40px', top: '-25px', width: '200px', height: '200px', background: '#8fd4ee', opacity: 0.65 }}
              />
              <span
                className="shape"
                style={{ right: '20px', top: '40%', width: '120px', height: '120px', background: '#FFE500', transform: 'rotate(14deg)', opacity: 0.65, borderRadius: '14px' }}
              />
              <svg
                className="shape"
                style={{ left: '20px', top: '40%', width: '130px', height: '140px', opacity: 0.65 }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon points="0,0 100,48 12,100" fill="#00E575" />
              </svg>
              <svg
                className="shape"
                id="star"
                style={{ right: '40px', bottom: '24px', width: '130px', height: '130px', opacity: 0.55 }}
                viewBox="-50 -50 100 100"
              >
                <polygon fill="#FF4071" points={starPoints} />
              </svg>
              <span
                className="shape shape--circle"
                style={{ left: '-40px', bottom: '20px', width: '130px', height: '130px', background: '#FF4071', opacity: 0.45 }}
              />
              <span
                className="shape shape--circle"
                style={{ left: '50px', bottom: '12px', width: '90px', height: '90px', background: '#FF3B30', opacity: 0.35 }}
              />
            </div>

            {/* Mobile Hero Shapes - Proportionally scaled and framed along perimeter to never obstruct text copy */}
            <div className="hero__shapes hero__shapes--mobile pointer-events-none select-none z-0" aria-hidden="true">
              {/* Top Left Yellow Angle */}
              <svg
                className="shape"
                style={{ left: '-10px', top: '-10px', width: '60px', height: '64px', opacity: 0.45 }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon points="0,0 100,28 65,100 0,72" fill="#FFE500" />
              </svg>
              {/* Top Right Arctic Cyan Circle */}
              <span
                className="shape shape--circle"
                style={{ right: '-16px', top: '10px', width: '60px', height: '60px', background: '#8FD4EE', opacity: 0.55 }}
              />
              {/* Bottom Left Green Accent */}
              <svg
                className="shape"
                style={{ left: '-10px', bottom: '10px', width: '54px', height: '58px', opacity: 0.5 }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon points="0,0 100,48 12,100" fill="#00E575" />
              </svg>
              {/* Bottom Right Hot Pink Star */}
              <svg
                className="shape"
                style={{ right: '-12px', bottom: '10px', width: '58px', height: '58px', opacity: 0.45 }}
                viewBox="-50 -50 100 100"
              >
                <polygon fill="#FF4071" points={starPoints} />
              </svg>
            </div>

            <div className="hero__content relative z-20 flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 max-w-4xl mx-auto px-4 w-full">
              <div className="flex items-center justify-center w-full px-2">
                <span className="text-[10px] sm:text-xs md:text-[13px] font-black uppercase tracking-wider px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#FFE500] text-black border-2 border-black shadow-[2px_2px_0_#FFFFFF] text-center max-w-full leading-tight inline-flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
                  <span>Free 60-Sec Diagnostic</span>
                  <span>•</span>
                  <span><NumberTicker value={12} className="font-black text-black" /> Seats Per Pod</span>
                  <span className="hidden min-[420px]:inline">•</span>
                  <span className="hidden min-[420px]:inline">Zero Passive Lectures</span>
                </span>
              </div>
              <h1 id="hero-title" className="sr-only">
                Stop Learning About Public Speaking. Start Speaking.
              </h1>
              <TextEffect
                as="h1"
                per="word"
                preset="fade-in-blur"
                speedReveal={1.2}
                className="font-black text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] sm:leading-[1.0] lg:leading-[0.96] tracking-[-0.035em] max-w-4xl mx-auto text-white"
                aria-hidden="true"
              >
                Stop Learning About Public Speaking. Start Speaking.
              </TextEffect>
              <TextEffect
                as="p"
                per="line"
                preset="fade"
                delay={0.2}
                className="hero__lede font-editorial text-[#E4E4E7] text-base sm:text-lg lg:text-[19px] max-w-[65ch] mx-auto leading-[1.65] text-center"
              >
                A practical exposure lab for students, professionals, and founders who freeze under audience scrutiny. Run your free diagnostic, identify your freeze triggers, and unlock your practice pod pass.
              </TextEffect>

              {/* Dual-Action Conversion Console (neobrutalism.dev hierarchy) */}
              <div className="hero__actions flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mt-2 sm:mt-3">
                <button
                  type="button"
                  className="btn btn--primary w-full sm:w-auto min-h-[48px]"
                  onClick={() => scrollToAdmissions()}
                >
                  <span>Run Free Diagnostic</span>
                  <ArrowRight className="size-4 stroke-[3]" />
                </button>
                <button
                  type="button"
                  className="btn btn--dark w-full sm:w-auto min-h-[48px]"
                  onClick={() => setDiagnosticModalOpen(true)}
                >
                  <Radio className="size-4 text-[#00E575] animate-pulse" />
                  <span>Book 10-Min Free Audit ↗</span>
                </button>
              </div>
            </div>
          </section>

          {/* Our approach - Stretches edge-to-edge from left to right */}
          <section className="approach scroll-mt-20 py-12 sm:py-16 lg:py-20 lg:min-h-screen lg:min-h-[100dvh] flex flex-col justify-center" id="approach" aria-labelledby="approach-title">
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
                    <h3 className="card__title tracking-[-0.025em] font-black">Daily Speaking Reps</h3>
                    <p className="card__text font-editorial text-[15px] sm:text-[16px] text-[#181820] leading-relaxed max-w-[55ch]">You get micro-opportunities to speak every single day. This constant frequency builds instant habit and eliminates overthinking.</p>
                  </div>
                  <a className="pill" href="#cohort">
                    <span>Daily reps</span>
                    <ArrowRight className="size-3.5 stroke-[2.5]" />
                  </a>
                </article>

                <article className="card card--green">
                  <div className="card__body">
                    <h3 className="card__title tracking-[-0.025em] font-black">Progressive Exposure Pods</h3>
                    <p className="card__text font-editorial text-[15px] sm:text-[16px] text-[#181820] leading-relaxed max-w-[55ch]">You are placed into small, supportive peer groups led by dedicated facilitators, ensuring you are never thrown into the deep end alone.</p>
                  </div>
                  <a className="pill" href="#cohort">
                    <span>Join a pod</span>
                    <ArrowRight className="size-3.5 stroke-[2.5]" />
                  </a>
                </article>

                <article className="card card--orange">
                  <div className="card__body">
                    <h3 className="card__title tracking-[-0.025em] font-black">Real-World and Virtual Stages</h3>
                    <p className="card__text font-editorial text-[15px] sm:text-[16px] text-[#181820] leading-relaxed max-w-[55ch]">You practice across both virtual environments and physical spaces—stepping onto real stages, managing eye contact, and projecting your voice in front of live audiences.</p>
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
            className="w-full py-12 sm:py-16 lg:py-20 lg:min-h-screen lg:min-h-[100dvh] flex flex-col justify-center bg-[#F5F3EC] border-b-[3px] border-black px-[var(--gutter)] scroll-mt-20 relative overflow-hidden"
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
                  className="btn btn--dark min-h-[44px]"
                  onClick={() => scrollToAdmissions()}
                >
                  <span>Get started</span>
                  <ArrowRight className="size-4 stroke-[2.5]" />
                </button>
              </div>

              {/* Mobile / Tablet Segmented Archetype Switcher (Under 1024px) with Motion-Primitives AnimatedBackground */}
              <div className="lg:hidden p-1.5 bg-black/10 rounded-xl mb-5 border-2 border-black max-w-xl mx-auto">
                <div className="flex gap-1.5">
                  <AnimatedBackground
                    defaultValue={activeArchetype}
                    className="rounded-lg bg-black shadow-[2px_2px_0_#000]"
                    transition={{
                      type: 'spring',
                      bounce: 0.15,
                      duration: 0.35,
                    }}
                    onValueChange={(id) => {
                      if (id) setActiveArchetype(id as any);
                    }}
                  >
                    {[
                      { id: 'student', label: 'Students' },
                      { id: 'professional', label: 'Professionals' },
                      { id: 'founder', label: 'Founders' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        data-id={tab.id}
                        type="button"
                        className="flex-1 min-h-[44px] py-2 px-2 sm:px-4 text-xs sm:text-sm font-black transition-colors cursor-pointer flex items-center justify-center text-neutral-800 data-[checked=true]:text-white select-none"
                      >
                        <span className="truncate">{tab.label}</span>
                      </button>
                    ))}
                  </AnimatedBackground>
                </div>
              </div>

              {/* Mobile & Tablet Single Card View (Active Persona Only) */}
              <div className="lg:hidden max-w-2xl mx-auto">
                {activeArchetype === 'student' && (
                  <article className="relative flex flex-col justify-between bg-[#C7D2FE] border-[3px] border-black text-[#111118] rounded-[20px] p-5 sm:p-7 shadow-[4px_4px_0_#000] animate-in fade-in-50 duration-150">
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

              {/* Desktop 3-Card Grid - Clear, readable typography matching Our Approach (active on >= 1024px) */}
              <div className="hidden lg:grid lg:grid-cols-3 gap-5 lg:gap-6 w-full">
                
                {/* Persona 1: Students & Graduates */}
                <Tilt rotationFactor={6} isRevese={true} className="h-full">
                  <article className="relative flex flex-col justify-between bg-[#C7D2FE] border-[3px] border-black text-[#111118] rounded-[20px] p-5 lg:p-6 min-h-[310px] lg:min-h-[330px] h-full shadow-[4px_4px_0_#000] lg:[transform:rotate(-1deg)] hover:lg:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200">
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
                      <h3 className="text-xl lg:text-[23px] font-black text-[#111118] tracking-[-0.02em] mb-2 pr-8 leading-snug">
                        Students &amp; Graduates
                      </h3>
                      <p className="text-[#181820] font-editorial text-[15px] sm:text-[15.5px] leading-relaxed mb-3 max-w-[50ch]">
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
                </Tilt>

                {/* Persona 2: Professionals & Seekers */}
                <Tilt rotationFactor={6} isRevese={true} className="h-full">
                  <article className="relative flex flex-col justify-between bg-[#FFE500] border-[3px] border-black text-[#111118] rounded-[20px] p-5 lg:p-6 min-h-[310px] lg:min-h-[330px] h-full shadow-[4px_4px_0_#000] lg:[transform:rotate(1.2deg)] hover:lg:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200">
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
                      <h3 className="text-xl lg:text-[23px] font-black text-[#111118] tracking-[-0.02em] mb-2 pr-8 leading-snug">
                        Professionals &amp; Seekers
                      </h3>
                      <p className="text-[#181820] font-editorial text-[15px] sm:text-[15.5px] leading-relaxed mb-3 max-w-[50ch]">
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
                </Tilt>

                {/* Persona 3: Founders & Creators */}
                <Tilt rotationFactor={6} isRevese={true} className="h-full">
                  <article className="relative flex flex-col justify-between bg-[#FF3366] border-[3px] border-black text-white rounded-[20px] p-5 lg:p-6 min-h-[310px] lg:min-h-[330px] h-full shadow-[4px_4px_0_#000] lg:[transform:rotate(-1deg)] hover:lg:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200">
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
                      <h3 className="text-xl lg:text-[23px] font-black text-white tracking-[-0.02em] mb-2 pr-8 leading-snug">
                        Founders &amp; Creators
                      </h3>
                      <p className="text-white/95 font-editorial text-[15px] sm:text-[15.5px] leading-relaxed mb-3 max-w-[50ch]">
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
                </Tilt>

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
        onOpenFaq={() => { const el = document.getElementById('faq'); el?.scrollIntoView({ behavior: 'smooth' }); }}
        onOpenDiagnostic={() => setDiagnosticModalOpen(true)}
        onApply={() => scrollToAdmissions()}
      />

      {/* 1-on-1 Confidence Diagnostic Booking Modal */}
      <DiagnosticModal
        isOpen={diagnosticModalOpen}
        onClose={() => setDiagnosticModalOpen(false)}
      />
    </>
  );
}
