/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRightIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExposureRoadmapTeaser, ExposureRoadmapModal } from './components/ExposureRoadmap';
import { FAQTeaserBar, BrutalistFAQModal } from './components/BrutalistFAQ';
import { CohortCalloutCard } from './components/CohortCalloutCard';
import { WhatsAppCommunityCard } from './components/WhatsAppCommunityCard';
import { ApplyPage } from './pages/ApplyPage';
import { BrutalistFooter } from './components/BrutalistFooter';
import { DiagnosticModal } from './components/DiagnosticModal';

export default function App() {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [menuChecked, setMenuChecked] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [roadmapModalOpen, setRoadmapModalOpen] = useState(false);
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [diagnosticModalOpen, setDiagnosticModalOpen] = useState(false);

  // Client-side lightweight routing
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      const h = window.location.hash;
      return p === '/apply' || h === '#/apply' || h === '#apply' ? '/apply' : '/';
    }
    return '/';
  });

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      if (path === '/apply') {
        window.history.pushState({}, '', '/apply');
      } else {
        window.history.pushState({}, '', '/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentPath(path);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      const h = window.location.hash;
      const isApply = p === '/apply' || h === '#/apply' || h === '#apply';
      setCurrentPath(isApply ? '/apply' : '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scrollspy to accurately detect active section for navbar underline
  useEffect(() => {
    const sectionIds = ['approach', 'roadmap', 'about', 'who-it-is-for', 'faq', 'cohort'];
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

  // If user navigated to /apply, render the dedicated distraction-free ApplyPage
  if (currentPath === '/apply') {
    return <ApplyPage onBack={() => navigate('/')} />;
  }

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
                Public Speaking Mastery — Next Cohort Enrolling Now
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
                <button
                  type="button"
                  onClick={() => setRoadmapModalOpen(true)}
                  className="cursor-pointer"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#FFFFFF',
                    padding: '0 12px',
                    minHeight: '38px',
                    font: 'inherit',
                    fontWeight: 500,
                    fontSize: '14.5px',
                    display: 'flex',
                    alignItems: 'center',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Roadmap ↗
                </button>
              </li>
              <li>
                <a
                  className={activeSection === 'about' ? 'is-underlined' : ''}
                  href="#about"
                >
                  About
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
                <button
                  type="button"
                  onClick={() => setFaqModalOpen(true)}
                  className="cursor-pointer"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#FFFFFF',
                    padding: '0 12px',
                    minHeight: '38px',
                    font: 'inherit',
                    fontWeight: 500,
                    fontSize: '14.5px',
                    display: 'flex',
                    alignItems: 'center',
                    whiteSpace: 'nowrap'
                  }}
                >
                  FAQ ↗
                </button>
              </li>
            </ul>
            <div className="nav__actions">
              <button
                type="button"
                className="btn btn--primary nav__btn hidden md:inline-flex"
                onClick={() => navigate('/apply')}
              >
                Join Cohort
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
                  <div className="chm-27__row"><a href="#roadmap" onClick={(e) => { e.preventDefault(); setMenuChecked(false); setRoadmapModalOpen(true); }}><b>02</b>EXPOSURE ROADMAP<span aria-hidden="true">↗</span></a></div>
                  <div className="chm-27__row"><a href="#who-it-is-for" onClick={() => setMenuChecked(false)}><b>03</b>WHO IT'S FOR<span aria-hidden="true">→</span></a></div>
                  <div className="chm-27__row"><a href="#faq" onClick={(e) => { e.preventDefault(); setMenuChecked(false); setFaqModalOpen(true); }}><b>04</b>FAQ INQUIRIES<span aria-hidden="true">↗</span></a></div>
                  <div className="chm-27__row"><button type="button" onClick={() => { setMenuChecked(false); navigate('/apply'); }} className="w-full text-left bg-transparent border-none p-0 cursor-pointer font-inherit text-inherit"><b>05</b>APPLY FOR COHORT<span aria-hidden="true">→</span></button></div>
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
          <section className="hero" aria-labelledby="hero-title">
            {/* Desktop Hero Shapes */}
            <div className="hero__shapes hero__shapes--desktop" aria-hidden="true">
              <span
                className="shape shape--circle"
                style={{ left: '-258px', top: '-101px', width: '312px', height: '312px', background: '#FF0000' }}
              />
              <svg
                className="shape"
                style={{ left: '284px', top: '-49px', width: '356px', height: '378px' }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon points="50,0 100,38 81,100 19,100 0,38" fill="#FFE500" />
              </svg>
              <span
                className="shape shape--circle"
                style={{ left: '1418px', top: '-49px', width: '343px', height: '343px', background: '#8fd4ee' }}
              />
              <span
                className="shape"
                style={{ left: '1621px', top: '327px', width: '370px', height: '370px', background: '#FFE500', transform: 'rotate(14deg)' }}
              />
              <svg
                className="shape"
                style={{ left: '62px', top: '288px', width: '322px', height: '353px' }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon points="0,0 100,48 12,100" fill="#00E575" />
              </svg>
              <svg
                className="shape"
                id="star"
                style={{ left: '1373px', top: '667px', width: '352px', height: '344px' }}
                viewBox="-50 -50 100 100"
              >
                <polygon fill="#FF4071" points={starPoints} />
              </svg>
              <span
                className="shape shape--circle"
                style={{ left: '-228px', top: '744px', width: '313px', height: '313px', background: '#FF4071' }}
              />
              <span
                className="shape shape--circle"
                style={{ left: '242px', top: '643px', width: '343px', height: '343px', background: '#FF3B30' }}
              />
              <span
                className="shape shape--circle"
                style={{ left: '470px', top: '715px', width: '190px', height: '190px', background: '#FFFFFF' }}
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
              <h1 id="hero-title">Stop Learning About Public Speaking. Start Speaking.</h1>
              <p className="hero__lede">We don't teach communication theory.</p>

              <div className="hero__actions">
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => navigate('/apply')}
                >
                  <span>Get started</span>
                  <ArrowRight className="size-4 stroke-[2.5]" />
                </button>
                <a className="btn btn--dark" href="#about">
                  <span>Learn more</span>
                </a>
              </div>
            </div>
          </section>

          {/* What we do */}
          <section className="section" id="about">
            <span id="manifesto" style={{ display: 'block', position: 'relative', top: '-80px', visibility: 'hidden' }} />
            <h2>What We Do</h2>
            <p>
              POLOMO is a practical confidence and exposure platform built for people who{' '}
              <span style={{ background: 'var(--yellow)', color: '#111118', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                freeze, sweat, or feel deeply uncomfortable
              </span>{' '}
              when speaking in front of others.
            </p>
            <p>
              <strong style={{ color: 'var(--accent-red)' }}>We don't teach communication theory.</strong> We don't host traditional lectures where you sit quietly and take notes. Instead, we provide an active environment where you step into the spotlight, face your hesitation, and build{' '}
              <span style={{ color: 'var(--green)', fontWeight: 600 }}>
                genuine stage presence through real-world repetition.
              </span>
            </p>
          </section>

          {/* How we do it */}
          <section className="section">
            <h2>How We Do It</h2>
            <p>Confidence isn't built by listening; it’s built by doing. Our approach replaces textbooks with active desensitization and high-frequency execution:</p>
          </section>

          {/* Our approach */}
          <div className="approach-wrap" id="approach">
            <span id="shop" style={{ display: 'block', position: 'relative', top: '-80px', visibility: 'hidden' }} />
            <section className="approach" aria-labelledby="approach-title">
              <div className="approach__head">
                <h2 id="approach-title">Our approach</h2>
                <button
                  type="button"
                  className="btn btn--dark"
                  onClick={() => navigate('/apply')}
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
            </section>
          </div>

          {/* 4-Stage Exposure Roadmap Teaser Strip */}
          <ExposureRoadmapTeaser onOpenModal={() => setRoadmapModalOpen(true)} />

          {/* Why we do it */}
          <section className="section section--alt">
            <h2>Why We Do It (The POLOMO Philosophy)</h2>
            <p>
              Traditional public-speaking courses fail because they treat speaking like an academic subject. They teach you about structure, body language, and voice modulation, but they leave you paralyzed the moment all eyes turn toward you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-[840px] mx-auto w-full">
              {/* Card 1: The Problem (Warm Paper Slab with Electric Red Accent) */}
              <article className="relative flex flex-col justify-between bg-[#FAF8F5] border-3 border-black text-[#0A0A0C] rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0_#FF3366] md:[transform:rotate(-1.5deg)] hover:md:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200">
                <span
                  className="card__dot"
                  aria-hidden="true"
                  style={{ top: '22px', right: '22px', width: '22px', height: '22px', background: '#FF3366', border: '2px solid #000' }}
                />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FF3366] text-white border border-black shadow-[1px_1px_0_#000]">
                      The Obstacle
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0C] tracking-tight mb-1">
                    The Academic Trap
                  </h3>
                  <p className="text-neutral-700 font-medium text-sm leading-relaxed mb-4">
                    Why studying lectures and communication theory never eliminates the stage freeze.
                  </p>
                  
                  <ul className="space-y-2.5 text-sm text-[#0A0A0C] font-semibold list-none p-0 m-0">
                    <li className="flex items-start gap-2.5">
                      <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-black stroke-[3]" />
                      <span>Treats performance anxiety like an intellectual puzzle, not a physiological reaction.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-black stroke-[3]" />
                      <span>Knowing how a bicycle works doesn’t stop you from falling when you first ride it.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-black stroke-[3]" />
                      <span>Sitting passively taking notes creates false confidence that vanishes under live scrutiny.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <a
                    className="pill cursor-pointer"
                    href="#about"
                    style={{ marginTop: 0 }}
                  >
                    <span>The Theory Trap</span>
                    <ArrowRight className="size-3.5 stroke-[2.5]" />
                  </a>
                </div>
              </article>

              {/* Card 2: Our Belief (Arctic White Slab with Cyber Gold Accent) */}
              <article className="relative flex flex-col justify-between bg-white border-3 border-black text-[#111118] rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0_#FFE500] md:[transform:rotate(1.5deg)] hover:md:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200">
                <span
                  className="card__dot"
                  aria-hidden="true"
                  style={{ top: '22px', right: '22px', width: '22px', height: '22px', background: '#FFE500', border: '2px solid #000' }}
                />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black text-[#FFE500]">
                      Our Belief
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#111118] tracking-tight mb-1">
                    Active Desensitization
                  </h3>
                  <p className="text-zinc-700 font-normal text-sm leading-relaxed mb-4">
                    Confidence is a physical reflex built exclusively through repetition.
                  </p>

                  <ul className="space-y-2.5 text-sm text-[#111118] font-medium list-none p-0 m-0">
                    <li className="flex items-start gap-2.5">
                      <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-black stroke-[3]" />
                      <span>You get on the bike: speak frequently in low-stakes rooms until panic recedes.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-black stroke-[3]" />
                      <span>Physical immersion retrains the nervous system to stay steady under eye contact.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-black stroke-[3]" />
                      <span>Immediate real-world reps replace textbooks with instinctive stage command.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => navigate('/apply')}
                    className="pill cursor-pointer"
                    style={{ marginTop: 0 }}
                  >
                    <span>Experience Protocol</span>
                    <ArrowRight className="size-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </article>
            </div>
          </section>

          {/* Immediate feedback */}
          <section className="section section--yellow">
            <h2>Immediate Feedback</h2>
            <p>Constructive, real-time feedback helps you course-correct your posture, pacing, and presence instantly.</p>
          </section>

          {/* Who it's for (Expanded to 3 Pop-Neobrutalist Feature Cards Matching Our Approach) */}
          <section className="section" id="who-it-is-for">
            <span id="drops" style={{ display: 'block', position: 'relative', top: '-80px', visibility: 'hidden' }} />
            <h2>Who POLOMO Is For</h2>
            <p>
              Designed specifically for high-stakes communicators who need real-world performance reflexes, not lecture slides:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-[1100px] mx-auto w-full">
              
              {/* Persona 1: Students & Graduates (Periwinkle Sky #C7D2FE) */}
              <article className="relative flex flex-col justify-between bg-[#C7D2FE] border-3 border-black text-[#111118] rounded-2xl p-6 sm:p-7 shadow-[6px_6px_0_#000] md:[transform:rotate(-1.5deg)] hover:md:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200">
                <span
                  className="card__dot"
                  aria-hidden="true"
                  style={{ top: '22px', right: '22px', width: '22px', height: '22px', background: '#FF0000' }}
                />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black text-white">
                      Academia &amp; Entry
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#111118] tracking-tight mb-1">
                    Students &amp; Graduates
                  </h3>
                  <p className="text-[#181820] font-normal text-sm leading-relaxed mb-4">
                    Thesis defenses, capstone presentations, and high-pressure job interviews.
                  </p>

                  <ul className="space-y-2 text-xs sm:text-sm text-[#111118] font-medium list-none p-0 m-0">
                    <li className="flex items-start gap-2">
                      <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-black stroke-[3]" />
                      <span>Defend thesis and capstone without vocal trembling.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-black stroke-[3]" />
                      <span>Conquer interview jitters and answer curveball prompts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-black stroke-[3]" />
                      <span>Eliminate memory blanking in front of professors.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => navigate('/apply')}
                    className="pill cursor-pointer"
                    style={{ marginTop: 0 }}
                  >
                    <span>Student track</span>
                    <ArrowRight className="size-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </article>

              {/* Persona 2: Professionals & Seekers (Solar Canary #FFE500) */}
              <article className="relative flex flex-col justify-between bg-[#FFE500] border-3 border-black text-[#111118] rounded-2xl p-6 sm:p-7 shadow-[6px_6px_0_#000] md:[transform:rotate(2deg)] hover:md:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200">
                <span
                  className="card__dot"
                  aria-hidden="true"
                  style={{ top: '22px', right: '22px', width: '22px', height: '22px', background: '#111118' }}
                />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black text-white">
                      Career &amp; Visibility
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#111118] tracking-tight mb-1">
                    Professionals &amp; Seekers
                  </h3>
                  <p className="text-[#181820] font-normal text-sm leading-relaxed mb-4">
                    Commanding team meetings, leadership reviews, and unscripted Q&amp;A.
                  </p>

                  <ul className="space-y-2 text-xs sm:text-sm text-[#111118] font-medium list-none p-0 m-0">
                    <li className="flex items-start gap-2">
                      <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-black stroke-[3]" />
                      <span>Stop staying muted in meetings when you have solutions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-black stroke-[3]" />
                      <span>Pitch ideas seamlessly to executive stakeholders.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-black stroke-[3]" />
                      <span>Handle tough challenge questions without retreating.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => navigate('/apply')}
                    className="pill cursor-pointer"
                    style={{ marginTop: 0 }}
                  >
                    <span>Join a pod</span>
                    <ArrowRight className="size-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </article>

              {/* Persona 3: Founders & Creators (Electric Berry / Coral #FF3366) */}
              <article className="relative flex flex-col justify-between bg-[#FF3366] border-3 border-black text-white rounded-2xl p-6 sm:p-7 shadow-[6px_6px_0_#000] md:[transform:rotate(-1.2deg)] hover:md:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200">
                <span
                  className="card__dot"
                  aria-hidden="true"
                  style={{ top: '22px', right: '22px', width: '22px', height: '22px', background: '#FFFFFF' }}
                />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black text-white">
                      Pitches &amp; Stages
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
                    Founders &amp; Creators
                  </h3>
                  <p className="text-white/90 font-normal text-sm leading-relaxed mb-4">
                    Investor pitches, demo days, podcasts, and live auditorium scrutiny.
                  </p>

                  <ul className="space-y-2 text-xs sm:text-sm text-white font-medium list-none p-0 m-0">
                    <li className="flex items-start gap-2">
                      <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-white stroke-[3]" />
                      <span>Pitch your company with undeniable conviction and fire.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-white stroke-[3]" />
                      <span>Own the stage whether addressing 10 or 1,000 live listeners.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-white stroke-[3]" />
                      <span>Navigate harsh investor critique and public scrutiny calmly.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => navigate('/apply')}
                    className="pill cursor-pointer"
                    style={{ marginTop: 0 }}
                  >
                    <span>Explore stages</span>
                    <ArrowRight className="size-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </article>

            </div>

            {/* Reassurance Note */}
            <div className="border-l-4 border-[#FFE500] bg-[#FFE500]/5 px-5 py-4 rounded-r-xl mt-4">
              <p className="text-sm leading-relaxed text-zinc-300 m-0">
                <strong className="text-[#FFE500]">Note:</strong> POLOMO is a practical skill and exposure program. It is designed to build performance confidence through active participation, not medical treatment or psychological therapy.
              </p>
            </div>
          </section>

          {/* Brutalist FAQ Compact Callout Bar */}
          <FAQTeaserBar onOpenModal={() => setFaqModalOpen(true)} />

          {/* Zero-Risk WhatsApp Practice Community */}
          <WhatsAppCommunityCard
            onBookDiagnostic={() => setDiagnosticModalOpen(true)}
          />

          {/* Cohort Application High-Impact Callout Card (replaces heavy on-page form) */}
          <CohortCalloutCard
            onApply={() => navigate('/apply')}
            onOpenDiagnostic={() => setDiagnosticModalOpen(true)}
          />

        </div>
      </main>

      {/* Bespoke Neo-Brutalist Kinetic Footer */}
      <BrutalistFooter
        onOpenRoadmap={() => setRoadmapModalOpen(true)}
        onOpenFaq={() => setFaqModalOpen(true)}
        onOpenDiagnostic={() => setDiagnosticModalOpen(true)}
        onApply={() => navigate('/apply')}
      />

      {/* 4-Stage Exposure Roadmap Modal */}
      <ExposureRoadmapModal
        isOpen={roadmapModalOpen}
        onClose={() => setRoadmapModalOpen(false)}
        onApply={() => navigate('/apply')}
      />

      {/* Brutalist FAQ Modal */}
      <BrutalistFAQModal
        isOpen={faqModalOpen}
        onClose={() => setFaqModalOpen(false)}
      />

      {/* 1-on-1 Confidence Diagnostic Booking Modal */}
      <DiagnosticModal
        isOpen={diagnosticModalOpen}
        onClose={() => setDiagnosticModalOpen(false)}
      />
    </>
  );
}
