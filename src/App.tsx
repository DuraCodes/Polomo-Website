/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function App() {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [menuChecked, setMenuChecked] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Scrollspy to accurately detect active section for navbar underline
  useEffect(() => {
    const sectionIds = ['approach', 'about', 'who-it-is-for', 'cohort'];
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
            </ul>
            <div className="nav__actions">
              <a
                className="btn btn--primary nav__btn"
                href="#cohort"
                onClick={() => setMenuChecked(false)}
              >
                Join Cohort
              </a>
              <label
                htmlFor="chm27-t"
                className={`chm-27__plate nav__plate-toggle ${menuChecked ? 'is-checked' : ''}`}
                aria-label={menuChecked ? 'Close navigation menu' : 'Open navigation menu'}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuChecked((prev) => !prev);
                }}
              >
                <span className="chm-27__ico" aria-hidden="true"><i></i><i></i><i></i></span>
                <span className="chm-27__lbl chm-27__lbl--m" aria-hidden="true">MENU</span>
                <span className="chm-27__lbl chm-27__lbl--c" aria-hidden="true">CLOSE</span>
              </label>
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
            <section className="chm-27" aria-label="Brutalist bordered menu demo">
              <div className="chm-27__stage">
                <input
                  type="checkbox"
                  id="chm27-t"
                  className="chm-27__state"
                  checked={menuChecked}
                  onChange={(e) => setMenuChecked(e.target.checked)}
                />
                <header className="chm-27__bar">
                  <span className="chm-27__brand">RAW—GOODS<i className="chm-27__reg" aria-hidden="true">®</i></span>
                  <label
                    htmlFor="chm27-t"
                    className="chm-27__plate"
                    onClick={() => setMenuChecked((prev) => !prev)}
                  >
                    <span className="chm-27__ico" aria-hidden="true"><i></i><i></i><i></i></span>
                    <span className="chm-27__lbl chm-27__lbl--m" aria-hidden="true">MENU</span>
                    <span className="chm-27__lbl chm-27__lbl--c" aria-hidden="true">CLOSE</span>
                  </label>
                </header>
                <nav className="chm-27__menu" aria-label="Site">
                  <div className="chm-27__row"><a href="#shop" onClick={() => setMenuChecked(false)}><b>01</b>SHOP ALL<span aria-hidden="true">→</span></a></div>
                  <div className="chm-27__row"><a href="#drops" onClick={() => setMenuChecked(false)}><b>02</b>DROPS<span aria-hidden="true">→</span></a></div>
                  <div className="chm-27__row"><a href="#manifesto" onClick={() => setMenuChecked(false)}><b>03</b>MANIFESTO<span aria-hidden="true">→</span></a></div>
                  <div className="chm-27__row"><a href="#faq" onClick={() => setMenuChecked(false)}><b>04</b>FAQ<span aria-hidden="true">→</span></a></div>
                </nav>
                <div className="chm-27__page" aria-hidden="true">
                  <div className="chm-27__badge">EST. 2026<br />NO COOKIES<br />NO TRACKING</div>
                  <div className="chm-27__box"></div>
                </div>
                <div className="chm-27__ticker" aria-hidden="true"><div className="chm-27__tape"><span>FREE SHIPPING OVER $80 ★ PRESS THE PLATE ★ EVERYTHING HAS A BORDER ★&nbsp;</span><span>FREE SHIPPING OVER $80 ★ PRESS THE PLATE ★ EVERYTHING HAS A BORDER ★&nbsp;</span></div></div>
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
                <a className="btn btn--primary" href="#cohort">
                  Get started
                  <svg viewBox="0 0 30 17" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 8.5h27M21 1.5l7 7-7 7" />
                  </svg>
                </a>
                <a className="btn btn--dark" href="#about">Learn more</a>
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
                <a className="btn btn--dark" href="#cohort">
                  Get started
                  <svg viewBox="0 0 30 17" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 8.5h27M21 1.5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              <div className="approach__cards">
                <article className="card card--sky">
                  <span className="card__dot" aria-hidden="true"></span>
                  <div className="card__body">
                    <h3 className="card__title">Daily Speaking Reps</h3>
                    <p className="card__text">You get micro-opportunities to speak every single day. This constant frequency builds instant habit and eliminates overthinking.</p>
                  </div>
                  <a className="pill" href="#daily-reps">
                    Daily reps
                    <svg viewBox="0 0 26 11" fill="none" stroke="#111118" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 5.5h23M19 1l5 4.5-5 4.5" />
                    </svg>
                  </a>
                </article>

                <article className="card card--green">
                  <div className="card__body">
                    <h3 className="card__title">Progressive Exposure Pods</h3>
                    <p className="card__text">You are placed into small, supportive peer groups led by dedicated facilitators, ensuring you are never thrown into the deep end alone.</p>
                  </div>
                  <a className="pill" href="#pods">
                    Join a pod
                    <svg viewBox="0 0 26 11" fill="none" stroke="#111118" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 5.5h23M19 1l5 4.5-5 4.5" />
                    </svg>
                  </a>
                </article>

                <article className="card card--orange">
                  <div className="card__body">
                    <h3 className="card__title">Real-World and Virtual Stages</h3>
                    <p className="card__text">You practice across both virtual environments and physical spaces—stepping onto real stages, managing eye contact, and projecting your voice in front of live audiences.</p>
                  </div>
                  <a className="pill" href="#stages">
                    Real stages
                    <svg viewBox="0 0 26 11" fill="none" stroke="#111118" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 5.5h23M19 1l5 4.5-5 4.5" />
                    </svg>
                  </a>
                </article>
              </div>
            </section>
          </div>

          {/* Why we do it */}
          <section className="section section--alt">
            <h2>Why We Do It (The POLOMO Philosophy)</h2>
            <p>
              Traditional public-speaking courses fail because they treat speaking like an academic subject. They teach you about structure, body language, and voice modulation, but they leave you paralyzed the moment all eyes turn toward you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 max-w-[620px] mx-auto w-full">
              {/* Card 1: The Problem (Solid Coral-Red #FF3B30 - Compact ~30% Reduced) */}
              <Card
                variant="coral"
                size="xs"
                className="relative flex flex-col justify-between shadow-2xl h-full md:[transform:rotate(-1.2deg)] hover:md:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200"
              >
                <div>
                  <CardHeader className="space-y-1 pb-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black text-white">
                        The Problem
                      </span>
                    </div>
                    <CardTitle className="text-lg sm:text-[19px] text-white">The Academic Trap</CardTitle>
                    <CardDescription className="text-white font-medium text-[13px] leading-relaxed mt-0.5" style={{ color: '#FFFFFF' }}>
                      Why studying lectures and theory never eliminates the stage freeze.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-1 pb-1">
                    <ul className="grid gap-2 py-1 text-[13px] text-white font-medium">
                      <li className="flex gap-2">
                        <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-white stroke-[2.5]" />
                        <span>Treats performance anxiety like an intellectual puzzle, not a physiological reaction.</span>
                      </li>
                      <li className="flex gap-2">
                        <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-white stroke-[2.5]" />
                        <span>Knowing how a bicycle works doesn’t stop you from falling when you first ride it.</span>
                      </li>
                      <li className="flex gap-2">
                        <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-white stroke-[2.5]" />
                        <span>Sitting passively taking notes creates false confidence that vanishes under live scrutiny.</span>
                      </li>
                    </ul>
                  </CardContent>
                </div>
                <CardFooter className="pt-3">
                  <a className="pill" href="#about" style={{ marginTop: 0, padding: '6px 14px', fontSize: '13px', minHeight: '32px' }}>
                    The Theory Trap &rarr;
                  </a>
                </CardFooter>
              </Card>

              {/* Card 2: Our Belief (Solid Arctic White - Compact ~30% Reduced) */}
              <Card
                variant="white"
                size="xs"
                className="relative flex flex-col justify-between shadow-2xl h-full md:[transform:rotate(1.2deg)] hover:md:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200"
              >
                <span className="card__dot" aria-hidden="true" style={{ top: '16px', right: '16px', width: '22px', height: '22px' }} />
                <div>
                  <CardHeader className="space-y-1 pb-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FF0000] text-white">
                        Our Belief
                      </span>
                    </div>
                    <CardTitle className="text-lg sm:text-[19px] text-[#111118]">Active Desensitization</CardTitle>
                    <CardDescription className="text-[#111118] font-medium text-[13px] leading-relaxed mt-0.5" style={{ color: '#111118' }}>
                      Confidence is a physical reflex built exclusively through repetition.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-1 pb-1">
                    <ul className="grid gap-2 py-1 text-[13px] text-[#111118] font-medium">
                      <li className="flex gap-2">
                        <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-[#111118] stroke-[2.5]" />
                        <span>You get on the bike: speak frequently in low-stakes rooms until panic recedes.</span>
                      </li>
                      <li className="flex gap-2">
                        <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-[#111118] stroke-[2.5]" />
                        <span>Physical immersion retrains the nervous system to stay steady under eye contact.</span>
                      </li>
                      <li className="flex gap-2">
                        <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-[#111118] stroke-[2.5]" />
                        <span>Immediate real-world reps replace textbooks with instinctive stage command.</span>
                      </li>
                    </ul>
                  </CardContent>
                </div>
                <CardFooter className="pt-3">
                  <a className="btn btn--primary" href="#get-started" style={{ fontSize: '13px', padding: '6px 14px', minHeight: '32px', marginTop: 0 }}>
                    Experience The Protocol &rarr;
                  </a>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Immediate feedback */}
          <section className="section section--yellow">
            <h2>Immediate Feedback</h2>
            <p>Constructive, real-time feedback helps you course-correct your posture, pacing, and presence instantly.</p>
          </section>

          {/* Who it's for */}
          <section className="section" id="who-it-is-for">
            <span id="drops" style={{ display: 'block', position: 'relative', top: '-80px', visibility: 'hidden' }} />
            <h2>Who POLOMO Is For</h2>
            <p>
              Designed specifically for high-stakes communicators who need real-world performance reflexes, not lecture slides:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 max-w-[800px] mx-auto w-full">
              {/* Persona 1: Students & Graduates (Solid Arctic Cyan #8FD4EE - Compact ~30% Reduced) */}
              <Card
                variant="cyan"
                size="xs"
                className="relative flex flex-col justify-between shadow-2xl h-full md:[transform:rotate(-1.2deg)] hover:md:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200"
              >
                <div>
                  <CardHeader className="space-y-1 pb-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#111118] text-white">
                        Academia &amp; Entry
                      </span>
                    </div>
                    <CardTitle className="text-lg sm:text-[19px] text-[#111118]">Students &amp; Graduates</CardTitle>
                    <CardDescription className="text-[#111118] font-medium text-[13px] leading-relaxed mt-0.5" style={{ color: '#111118' }}>
                      Project defenses, seminar presentations, and high-pressure job interviews.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-1 pb-1">
                    <ul className="grid gap-2 py-1 text-[13px] text-[#111118] font-medium">
                      <li className="flex gap-2">
                        <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-[#111118] stroke-[2.5]" />
                        <span>Defend thesis and capstone projects without vocal trembling.</span>
                      </li>
                      <li className="flex gap-2">
                        <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-[#111118] stroke-[2.5]" />
                        <span>Conquer interview jitters and answer behavioral curveballs calmly.</span>
                      </li>
                      <li className="flex gap-2">
                        <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-[#111118] stroke-[2.5]" />
                        <span>Eliminate memory blanking when presenting to professors.</span>
                      </li>
                    </ul>
                  </CardContent>
                </div>
                <CardFooter className="pt-3">
                  <a className="pill" href="#who-it-is-for" style={{ marginTop: 0, padding: '6px 14px', fontSize: '13px', minHeight: '32px' }}>
                    Student track &rarr;
                  </a>
                </CardFooter>
              </Card>

              {/* Persona 2: Professionals & Seekers (Solid Cyber Canary Yellow #FFE500 - Compact ~30% Reduced) */}
              <Card
                variant="yellow"
                size="xs"
                className="relative flex flex-col justify-between shadow-2xl h-full md:[transform:rotate(1.2deg)] hover:md:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200"
              >
                <div>
                  <CardHeader className="space-y-1 pb-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#111118] text-white">
                        Career &amp; Visibility
                      </span>
                    </div>
                    <CardTitle className="text-lg sm:text-[19px] text-[#111118]">Professionals &amp; Seekers</CardTitle>
                    <CardDescription className="text-[#111118] font-medium text-[13px] leading-relaxed mt-0.5" style={{ color: '#111118' }}>
                      Commanding team meetings, leadership reviews, and unscripted Q&amp;A.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-1 pb-1">
                    <ul className="grid gap-2 py-1 text-[13px] text-[#111118] font-medium">
                      <li className="flex gap-2">
                        <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-[#111118] stroke-[2.5]" />
                        <span>Stop staying muted in meetings when you have valuable solutions.</span>
                      </li>
                      <li className="flex gap-2">
                        <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-[#111118] stroke-[2.5]" />
                        <span>Pitch ideas seamlessly to executive stakeholders with presence.</span>
                      </li>
                      <li className="flex gap-2">
                        <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-[#111118] stroke-[2.5]" />
                        <span>Handle unexpected challenge questions without flushing or retreating.</span>
                      </li>
                    </ul>
                  </CardContent>
                </div>
                <CardFooter className="pt-3">
                  <a className="pill" href="#who-it-is-for" style={{ marginTop: 0, padding: '6px 14px', fontSize: '13px', minHeight: '32px' }}>
                    Join a pod &rarr;
                  </a>
                </CardFooter>
              </Card>

              {/* Persona 3: Founders & Creators (Solid Hot Strawberry Pink #FF4071 - Compact ~30% Reduced) */}
              <Card
                variant="pink"
                size="xs"
                className="relative flex flex-col justify-between shadow-2xl h-full md:[transform:rotate(-1deg)] hover:md:[transform:rotate(0deg)_scale(1.02)] transition-all duration-200"
              >
                <div>
                  <CardHeader className="space-y-1 pb-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black text-white">
                        Pitches &amp; Stages
                      </span>
                    </div>
                    <CardTitle className="text-lg sm:text-[19px] text-white">Founders &amp; Creators</CardTitle>
                    <CardDescription className="text-white font-medium text-[13px] leading-relaxed mt-0.5" style={{ color: '#FFFFFF' }}>
                      Investor pitches, demo days, podcasts, and live audience scrutiny.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-1 pb-1">
                    <ul className="grid gap-2 py-1 text-[13px] text-white font-medium">
                      <li className="flex gap-2">
                        <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-white stroke-[2.5]" />
                        <span>Pitch your business with undeniable conviction and energy.</span>
                      </li>
                      <li className="flex gap-2">
                        <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-white stroke-[2.5]" />
                        <span>Own the stage whether addressing 10 or 1,000 live listeners.</span>
                      </li>
                      <li className="flex gap-2">
                        <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-white stroke-[2.5]" />
                        <span>Navigate harsh investor critique and public scrutiny with poise.</span>
                      </li>
                    </ul>
                  </CardContent>
                </div>
                <CardFooter className="pt-3">
                  <a className="pill" href="#who-it-is-for" style={{ marginTop: 0, padding: '6px 14px', fontSize: '13px', minHeight: '32px' }}>
                    Explore stages &rarr;
                  </a>
                </CardFooter>
              </Card>
            </div>

            {/* Reassurance Note */}
            <div className="border-l-4 border-[#FFE500] bg-[#FFE500]/5 px-5 py-4 rounded-r-xl mt-4">
              <p className="text-sm leading-relaxed text-zinc-300 m-0">
                <strong className="text-[#FFE500]">Note:</strong> POLOMO is a practical skill and exposure program. It is designed to build performance confidence through active participation, not medical treatment or psychological therapy.
              </p>
            </div>
          </section>

          {/* Ready to Step Into the Spotlight? */}
          <section className="section section--orange" id="cohort">
            <span id="faq" style={{ display: 'block', position: 'relative', top: '-80px', visibility: 'hidden' }} />
            <h2>Ready to Step Into the Spotlight?</h2>
            <p>Stop hiding behind slides and scripts. Join a community of people learning to own the room.</p>
            <div>
              <a className="btn" style={{ background: '#FFFFFF', color: '#111118' }} href="#cohort">
                Secure Your Spot in Our Next Cohort
                <svg viewBox="0 0 30 17" fill="none" stroke="#111118" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1 8.5h27M21 1.5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </section>

        </div>
      </main>

      <footer className="site-footer">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '1488px' }}>
          {/* Top row: Brand & Navigation columns */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px' }}>
            {/* Brand column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '440px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src="/assets/aistudio/Logo_white_transparent_a0ecbf7f.png"
                  alt="POLOMO"
                  style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
                />
                <span className="site-footer__brand">POLOMO</span>
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', lineHeight: '28px', color: 'var(--ink)' }}>
                Stop learning about public speaking — start doing it. Real stages, micro-reps, and active exposure.
              </p>
              <div style={{ paddingTop: '8px' }}>
                <a className="btn btn--primary" href="#cohort">
                  Get started
                  <svg viewBox="0 0 30 17" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 8.5h27M21 1.5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links column 1: Platform */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 400, margin: 0 }}>
                Platform
              </h3>
              <ul className="site-footer__links" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><a href="#about">About POLOMO</a></li>
                <li><a href="#approach">Our Method</a></li>
                <li><a href="#daily-reps">Daily Speaking Reps</a></li>
                <li><a href="#pods">Exposure Pods</a></li>
                <li><a href="#stages">Virtual &amp; Real Stages</a></li>
              </ul>
            </div>

            {/* Links column 2: Audience Tracks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 400, margin: 0 }}>
                Who It's For
              </h3>
              <ul className="site-footer__links" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><a href="#who-it-is-for">Students &amp; Graduates</a></li>
                <li><a href="#who-it-is-for">Professionals &amp; Job Seekers</a></li>
                <li><a href="#who-it-is-for">Entrepreneurs &amp; Creators</a></li>
                <li><a href="#signin">Member Sign In</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom row: Divider, copyright, disclaimer & back to top */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(17, 17, 24, 0.15)',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
              color: 'var(--ink)',
              opacity: 0.85,
            }}
          >
            <span>&copy; {new Date().getFullYear()} POLOMO. All rights reserved.</span>
            <span style={{ maxWidth: '520px', fontSize: '13px', lineHeight: '18px' }}>
              Practical confidence and active desensitization platform. Not medical treatment or psychological therapy.
            </span>
            <a
              href="#top"
              className="pill"
              style={{ marginTop: 0 }}
            >
              Back to top &uarr;
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
