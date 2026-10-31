/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';

export default function App() {
  const [bannerDismissed, setBannerDismissed] = useState(false);

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
              style={{
                background: 'transparent',
                width: 'auto',
                height: '38px',
                margin: '0 14px 0 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <img
                src="/assets/aistudio/white_transparent_logo-2_6e69edc6.png"
                alt="POLOMO"
                style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
              />
            </a>
            <ul className="nav__links">
              <li><a className="is-underlined" href="#approach">Our Method</a></li>
              <li><a className="is-underlined" href="#about">About</a></li>
              <li><a className="is-underlined" href="#who-it-is-for">Who It's For</a></li>
            </ul>
            <ul className="nav__actions">
              <li>
                <a
                  className="btn btn--primary"
                  href="#get-started"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.2',
                    padding: '8px 18px',
                    minHeight: '38px',
                    letterSpacing: '0px',
                    fontWeight: 600,
                  }}
                >
                  Join Cohort
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="top">
        <div className="stack">

          {/* Hero */}
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero__shapes" aria-hidden="true">
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

            <div className="hero__content">
              <h1 id="hero-title">Stop Learning About Public Speaking. Start Speaking.</h1>
              <p className="hero__lede">We don't teach communication theory.</p>

              <div className="hero__actions">
                <a className="btn btn--primary" href="#get-started">
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
            <h2>What We Do</h2>
            <p>POLOMO is a practical confidence and exposure platform built for people who freeze, sweat, or feel deeply uncomfortable when speaking in front of others.</p>
            <p>We don't teach communication theory. We don't host traditional lectures where you sit quietly and take notes. Instead, we provide an active environment where you step into the spotlight, face your hesitation, and build genuine stage presence through real-world repetition.</p>
          </section>

          {/* How we do it */}
          <section className="section">
            <h2>How We Do It</h2>
            <p>Confidence isn't built by listening; it’s built by doing. Our approach replaces textbooks with active desensitization and high-frequency execution:</p>
          </section>

          {/* Our approach */}
          <div className="approach-wrap" id="approach">
            <section className="approach" aria-labelledby="approach-title">
              <div className="approach__head">
                <h2 id="approach-title">Our approach</h2>
                <a className="btn btn--dark" id="get-started" href="#get-started">
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
            <p>Traditional public-speaking courses fail because they treat speaking like an academic subject. They teach you about structure, body language, and voice modulation, but they leave you paralyzed the moment all eyes turn toward you.</p>
            <p>The Problem: Knowing how a bicycle works doesn’t stop you from falling when you first ride one. You have to get on the bike.</p>
            <p>Our Belief: You don’t become comfortable speaking by studying communication. You become comfortable by actually speaking—over and over again—until the fear loses its grip.</p>
          </section>

          {/* Immediate feedback */}
          <section className="section section--yellow">
            <h2>Immediate Feedback</h2>
            <p>Constructive, real-time feedback helps you course-correct your posture, pacing, and presence instantly.</p>
          </section>

          {/* Who it's for */}
          <section className="section" id="who-it-is-for">
            <h2>Who POLOMO Is For</h2>
            <p>
              <strong>Students &amp; Graduates:</strong> Master your project defenses, seminar presentations, and job interviews without your voice shaking.
            </p>
            <p>
              <strong>Professionals &amp; Job Seekers:</strong> Command attention in meetings, pitch ideas seamlessly, and stand out when it matters most.
            </p>
            <p>
              <strong>Entrepreneurs &amp; Creators:</strong> Sell your vision with conviction and handle live audience scrutiny with ease.
            </p>
            <p style={{ opacity: 0.85, fontSize: 'clamp(16px, 0.5vw + 12px, 22px)' }}>
              <em>Note:</em> POLOMO is a practical skill and exposure program. It is designed to build performance confidence through active participation, not medical treatment or psychological therapy.
            </p>
          </section>

          {/* Ready to Step Into the Spotlight? */}
          <section className="section section--orange">
            <h2>Ready to Step Into the Spotlight?</h2>
            <p>Stop hiding behind slides and scripts. Join a community of people learning to own the room.</p>
            <div>
              <a className="btn" style={{ background: '#FFFFFF', color: '#111118' }} href="#get-started">
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
                <a className="btn btn--primary" href="#get-started">
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
