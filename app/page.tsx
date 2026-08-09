"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ============================================
   TYPES
   ============================================ */
interface GuestbookEntry {
  name: string;
  message: string;
  date: string;
}

/* ============================================
   DEFAULT GUESTBOOK ENTRIES
   ============================================ */
const DEFAULT_ENTRIES: GuestbookEntry[] = [
  {
    name: "webhead99",
    message: "love the site!! the vibes are immaculate ✨",
    date: "Aug 8, 2026",
  },
  {
    name: "MJ_fan_2099",
    message:
      "with great power comes great web design! 10/10 🕷️",
    date: "Aug 5, 2026",
  },
  {
    name: "retroSurfer",
    message: "this is so nostalgic, reminds me of the old internet :'D",
    date: "Jul 28, 2026",
  },
  {
    name: "spidey_stan",
    message: "found this through the webring!! amazing site, keep it up!",
    date: "Jul 15, 2026",
  },
];

/* ============================================
   MAIN PAGE COMPONENT
   ============================================ */
export default function Home() {
  const [theme, setTheme] = useState<"red" | "blue">("red");
  const [guestbookEntries, setGuestbookEntries] =
    useState<GuestbookEntry[]>(DEFAULT_ENTRIES);
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [hitCount] = useState(() => Math.floor(Math.random() * 9000) + 1337);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ---- Theme toggle ----
  useEffect(() => {
    if (theme === "blue") {
      document.documentElement.setAttribute("data-theme", "blue");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "red" ? "blue" : "red"));
  }, []);

  // ---- Cursor trail effect ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number;
      y: number;
      alpha: number;
      size: number;
      vx: number;
      vy: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          alpha: 0.8,
          size: 2 + Math.random() * 3,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
        });
      }
      if (particles.length > 40) {
        particles.splice(0, particles.length - 40);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.alpha -= 0.02;
        p.x += p.vx;
        p.y += p.vy;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "#1a0505";
        ctx.strokeStyle = "#f4c430";
        ctx.lineWidth = 0.5;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#f4c430";
        ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
        ctx.strokeRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
        ctx.restore();
      }
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // ---- Guestbook submit ----
  const handleGuestbookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    setGuestbookEntries((prev) => [
      { name: guestName.trim(), message: guestMessage.trim(), date: dateStr },
      ...prev,
    ]);
    setGuestName("");
    setGuestMessage("");
  };

  // ---- Smooth scroll to section ----
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Cursor trail */}
      <canvas ref={canvasRef} className="cursor-trail-canvas" />

      {/* Construction ribbon */}
      <div className="construction-ribbon">🛠️ under construction 🛠️</div>

      {/* Floating doodles (decorative) */}
      <div className="doodle doodle-star" style={{ top: "15%", left: "3%" }}>
        ✦
      </div>
      <div className="doodle doodle-web" style={{ top: "35%", right: "2%" }}>
        🕸️
      </div>
      <div
        className="doodle doodle-star"
        style={{ top: "55%", left: "1%", animationDelay: "2s" }}
      >
        ★
      </div>
      <div
        className="doodle doodle-web"
        style={{ top: "75%", right: "4%", animationDelay: "3s" }}
      >
        🕷️
      </div>
      <div
        className="doodle doodle-star"
        style={{ top: "90%", left: "5%", animationDelay: "1s" }}
      >
        ✧
      </div>

      <div className="site-wrapper">
        {/* ========== HEADER ========== */}
        <header className="site-header">
          <div className="header-content">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/kuro-chibi.png"
              alt="Chibi Kuro Tetsuro from Haikyuu"
              className="header-chibi"
            />
            <h1>hrick&apos;s hideout ✦</h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/rimuru-chibi.png"
              alt="Chibi Rimuru from Tensura"
              className="header-chibi header-chibi-right"
            />
          </div>
          <div className="marquee-container">
            <span className="marquee-text">
              ★ welcome to my hideout ~~ dev projects · anime · manga · gaming ~~ ★
              est. 2024 ~~ best viewed at 800×600 ~~ haikyuu enjoyer · isekai addict · code shipper ~~
              ★ welcome to my hideout ~~ dev projects · anime · manga · gaming ~~ ★
              est. 2024 ~~ best viewed at 800×600 ~~ haikyuu enjoyer · isekai addict · code shipper ~~
            </span>
          </div>
        </header>

        {/* ========== 3-COLUMN LAYOUT ========== */}
        <div className="site-content">
          {/* ---- LEFT SIDEBAR ---- */}
          <aside className="sidebar sidebar-left">
            {/* PIC LOG */}
            <div className="retro-box">
              <h3 className="box-title">✦ pic log ✦</h3>
              <div className="featured-image-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/kise-chibi.png"
                  alt="Featured: Chibi Kise Ryouta from Kuroko no Basket"
                />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "6px",
                  textAlign: "center",
                  marginTop: "6px",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                ☆ art of the day ☆
              </p>
            </div>

            {/* UPDATES — live feed */}
            <div className="retro-box">
              <h3 className="box-title">✦ updates ✦</h3>
              <div className="feed-item">
                <span className="feed-date">⚡ aug 10</span>
                rewatching Re:Zero S1 for the 4th time, no regrets
              </div>
              <div className="feed-item">
                <span className="feed-date">⚡ aug 8</span>
                new layout dropped — y2k vibes activated
              </div>
              <div className="feed-item">
                <span className="feed-date">⚡ aug 7</span>
                shipped a new GDG on campus workshop 🚀
              </div>
              <div className="feed-item">
                <span className="feed-date">⚡ aug 5</span>
                added guestbook + blog section!!
              </div>
              <div className="feed-item">
                <span className="feed-date">⚡ aug 3</span>
                finally beat my USUM nuzlocke 😭🏆
              </div>
              <div className="feed-item">
                <span className="feed-date">⚡ jul 28</span>
                CFOX.ai demo went great, investors impressed
              </div>
              <a href="/updates" className="feed-link">view all updates →</a>
            </div>

            {/* THEME TOGGLE */}
            <div className="retro-box">
              <h3 className="box-title">✦ settings ✦</h3>
              <button
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label="Toggle color theme"
              >
                🎨 {theme === "red" ? "go blue" : "go red"}
              </button>
              <div className="hit-counter mt-sm">
                visitors: {hitCount.toString().padStart(6, "0")}
              </div>
            </div>

            {/* DISCLAIMER */}
            <div className="disclaimer-badge">
              ⚠️ not affiliated with Marvel™
              <br />
              (obviously lol)
              <br />
              just a fan being a fan
            </div>

            {/* 88x31 BADGES */}
            <div className="badge-stack">
              <div className="pixel-badge badge-red">
                spidey fan
                <br />
                since 2024
              </div>
              <div className="pixel-badge badge-blue">
                swing by
                <br />
                anytime!
              </div>
              <div className="pixel-badge badge-gold">
                best viewed
                <br />
                800×600
              </div>
              <div className="pixel-badge badge-dark">
                🕷️ RSS
                <br />
                feed
              </div>
              <div className="pixel-badge badge-red">
                made with
                <br />
                ❤️ &amp; ☕
              </div>
            </div>
          </aside>

          {/* ---- MAIN CONTENT ---- */}
          <main className="main-panel">
            <div className="retro-box">
              {/* Welcome */}
              <section className="welcome-section" id="welcome">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/drstone-chibi.png"
                  alt="Chibi Senku from Dr. Stone"
                  className="swing-chibi"
                />
                <h2 className="welcome-heading">welcome to my hideout... ✦</h2>
                <p className="welcome-blurb">
                  hey! welcome to my chaotic corner of the internet ✦ this is
                  where i dump dev projects, anime opinions that nobody asked
                  for, pokémon nonsense, manhwa rambles, sports anime debates,
                  and whatever else lives rent-free in my head. take your time,
                  look around — grab some web goodies on your way out!
                  <br />
                  <br />
                  this site is my digital scrapbook — messy, loud, and full
                  of personality. just like my browser tabs. if you&apos;re into
                  coding, haikyuu, isekai, manga, or just vintage internet vibes,
                  you&apos;re in the right place. 🔥
                </p>
              </section>

              <div className="web-divider" />

              {/* About */}
              <section id="about">
                <h2 className="section-title">✦ about me ✦</h2>
                <p className="about-text">
                  CSE (AI &amp; ML) student at Chitkara University, Punjab —
                  and your friendly neighborhood web developer who happens to be
                  way too into spider-man. building things for the web is ironic
                  for a spidey fan, i know.
                  <br />
                  <br />
                  web dev lead @ GDG On Campus Chitkara — built &amp; shipped 2+
                  platforms for our 150+ dev community, led dev for 3+ events
                  (boosted participation ~40%), and mentor juniors through code
                  reviews. snagged 3rd place at the Agentic Sprint Hackathon
                  (20+ teams) building an autonomous AI agent in 24 hrs.
                  <br />
                  <br />
                  when i&apos;m not shipping code, i&apos;m deep into anime —
                  and not just isekai. i watch everything. fantasy amazes me,
                  but dr. stone? that&apos;s a once-in-a-century type anime for
                  me. it literally made me read the manga of an anime for the
                  first time, and i was so hooked i completed the entire manga
                  in just a couple of days. absolute masterpiece.
                  <br />
                  <br />
                  i&apos;m also big into sports anime — haikyuu is my absolute
                  favorite, with <strong>kuro tetsuro</strong> being my fav
                  character (that scheming cat grin, come on). i love kuroko no
                  basket and blue lock too. there&apos;s something about
                  copy-sters that gets me — <strong>kise ryouta</strong> from
                  kuroko is peak. i also love characters like{" "}
                  <strong>yuu otosaka</strong> from charlotte, and lazy geniuses
                  like <strong>nagi seishiro</strong> from blue lock. pokémon
                  (USUM supremacy), manhwa, gaming — it&apos;s all part of the
                  same chaotic brain.
                </p>
                <p className="about-text" style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "8px" }}>
                  <strong style={{ color: "var(--text-gold)" }}>stack:</strong>{" "}
                  Python · JS/TS · C++ · Java · SQL · React · Next.js · React
                  Native · FastAPI · Django · Flask · Tailwind · Docker · Redis
                  · RAG/vector DBs
                  <br />
                  <strong style={{ color: "var(--text-gold)" }}>certs:</strong>{" "}
                  MS AI Fundamentals · Azure Fundamentals · Azure Data
                  Fundamentals · Power BI Data Analyst · Design Thinking (UVA)
                  · Intro to Cyber Security
                </p>
                <div className="about-stats">
                  <div className="stat-box">
                    <span className="stat-value">9.49</span>
                    <span className="stat-label">CGPA</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-value">3+</span>
                    <span className="stat-label">shipped projects</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-value">∞</span>
                    <span className="stat-label">cups of coffee</span>
                  </div>
                </div>
              </section>

              <div className="web-divider" />

              {/* Projects */}
              <section id="projects">
                <h2 className="section-title">✦ projects ✦</h2>
                <p className="about-text">
                  here&apos;s where the actual ~productive~ stuff lives. i build
                  things for the web (the irony is not lost on me). check out
                  what i&apos;ve shipped:
                </p>
                <div className="project-grid">
                  <div className="project-card">
                    <span className="project-tag">ai companion</span>
                    <h3 className="project-name">🤖 R.I.S.H.I.</h3>
                    <p className="project-desc">
                      personal AI companion with multi-LLM routing across 6+
                      models and long-term memory via RAG. built with Electron,
                      Qdrant, Whisper, OpenClaw &amp; AWS EC2.
                    </p>
                    <a href="#" className="project-link">
                      → view project
                    </a>
                  </div>
                  <div className="project-card">
                    <span className="project-tag">fintech · ai</span>
                    <h3 className="project-name">📊 CFOX.ai</h3>
                    <p className="project-desc">
                      AI-powered CFO platform with real-time financial insights
                      and automated reporting — cut manual overhead ~60%. built
                      with FastAPI, Next.js &amp; PostgreSQL.
                    </p>
                    <a href="#" className="project-link">
                      → view project
                    </a>
                  </div>
                  <div className="project-card">
                    <span className="project-tag">voice ai · mobile</span>
                    <h3 className="project-name">📞 Shramo.ai</h3>
                    <p className="project-desc">
                      AI voice calling platform handling 100+ simultaneous
                      sessions. cross-platform app built with React Native,
                      FastAPI &amp; Twilio Media Streams.
                    </p>
                    <a href="#" className="project-link">
                      → view project
                    </a>
                  </div>
                </div>
              </section>

              <div className="web-divider" />

              {/* Shrines */}
              <section id="shrines">
                <h2 className="section-title">✦ shrines ✦</h2>
                <p className="about-text">
                  my little altars of appreciation for the things i love.
                  not just one fandom — it&apos;s the whole multiverse in here 💖
                </p>
                <div className="shrine-grid">
                  <div className="shrine-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/kuro-chibi.png" alt="Kuro Tetsuro" className="shrine-card-chibi" />
                    <span className="shrine-name">haikyuu!!</span>
                    <span className="shrine-callout">
                      fave: <strong>Kuro Tetsuro</strong>
                      <span className="fave-badge">🔥 fave</span>
                    </span>
                  </div>
                  <div className="shrine-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/drstone-chibi.png" alt="Senku Ishigami" className="shrine-card-chibi" />
                    <span className="shrine-name">dr. stone</span>
                    <span className="shrine-callout">once-in-a-century anime 🧪</span>
                  </div>
                  <div className="shrine-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/rimuru-chibi.png" alt="Rimuru Tempest" className="shrine-card-chibi" />
                    <span className="shrine-name">isekai</span>
                    <span className="shrine-callout">Re:Zero · Konosuba · Tensura</span>
                  </div>
                  <div className="shrine-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/kise-chibi.png" alt="Kise Ryouta" className="shrine-card-chibi" />
                    <span className="shrine-name">kuroko no basket</span>
                    <span className="shrine-callout">
                      fave: <strong>Kise Ryouta</strong>
                      <span className="fave-badge">✨ copy-ster</span>
                    </span>
                  </div>
                  <div className="shrine-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/nagi-chibi.png" alt="Nagi Seishiro" className="shrine-card-chibi" />
                    <span className="shrine-name">blue lock</span>
                    <span className="shrine-callout">
                      fave: <strong>Nagi Seishiro</strong>
                      <span className="fave-badge">😴 lazy genius</span>
                    </span>
                  </div>
                  <div className="shrine-card">
                    <span className="shrine-icon">🕷️</span>
                    <span className="shrine-name">spider-man</span>
                  </div>
                  <div className="shrine-card">
                    <span className="shrine-icon">⚡</span>
                    <span className="shrine-name">pokémon</span>
                    <span className="shrine-callout">USUM supremacy 🏆</span>
                  </div>
                  <div className="shrine-card">
                    <span className="shrine-icon">📖</span>
                    <span className="shrine-name">manhwa</span>
                    <span className="shrine-callout">
                      fave: <strong>Jaegyeon Na</strong>
                      <span className="fave-badge">🔥 fave</span>
                      <br />
                      Lookism · TBATE · Greatest Estate Dev
                    </span>
                  </div>
                  <div className="shrine-card">
                    <span className="shrine-icon">🌸</span>
                    <span className="shrine-name">charlotte</span>
                    <span className="shrine-callout">
                      fave: <strong>Yuu Otosaka</strong>
                    </span>
                  </div>
                  <div className="shrine-card">
                    <span className="shrine-icon">🎮</span>
                    <span className="shrine-name">gaming</span>
                    <span className="shrine-callout">GW2 · every 3DS+Switch pokémon</span>
                  </div>
                  <div className="shrine-card">
                    <span className="shrine-icon">👔</span>
                    <span className="shrine-name">my suits</span>
                  </div>
                </div>

                {/* Character Gallery */}
                <h3 className="section-title" style={{ marginTop: "20px", fontSize: "1.4rem" }}>
                  ✦ character hall of fame ✦
                </h3>
                <div className="chibi-gallery">
                  <div className="chibi-gallery-item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/kuro-chibi.png" alt="Kuro Tetsuro" />
                    <span className="chibi-gallery-label">kuro tetsuro</span>
                  </div>
                  <div className="chibi-gallery-item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/kise-chibi.png" alt="Kise Ryouta" />
                    <span className="chibi-gallery-label">kise ryouta</span>
                  </div>
                  <div className="chibi-gallery-item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/nagi-chibi.png" alt="Nagi Seishiro" />
                    <span className="chibi-gallery-label">nagi seishiro</span>
                  </div>
                  <div className="chibi-gallery-item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/drstone-chibi.png" alt="Senku Ishigami" />
                    <span className="chibi-gallery-label">senku ishigami</span>
                  </div>
                  <div className="chibi-gallery-item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/rimuru-chibi.png" alt="Rimuru Tempest" />
                    <span className="chibi-gallery-label">rimuru tempest</span>
                  </div>
                  <div className="chibi-gallery-item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/spidy-chibi1.png" alt="Spider-Man" />
                    <span className="chibi-gallery-label">spider-man</span>
                  </div>
                </div>
              </section>

              <div className="web-divider" />

              {/* Blog */}
              <section id="blog">
                <h2 className="section-title">✦ blog ✦</h2>
                <p className="about-text">
                  longer-form thoughts, project writeups, anime rambles, and dev
                  learnings. the updates feed is for quick pings — this is where
                  i actually explain things.
                </p>
                <div className="blog-list">
                  <article className="blog-card">
                    <div className="blog-card-header">
                      <h3 className="blog-card-title">building R.I.S.H.I. — lessons from multi-LLM routing</h3>
                      <span className="blog-card-date">Aug 6, 2026</span>
                    </div>
                    <p className="blog-card-excerpt">
                      how i wired 6+ language models into a single companion app
                      with RAG-powered long-term memory, and why the hard part
                      wasn&apos;t the AI...
                    </p>
                    <a href="/blog" className="blog-card-link">read more →</a>
                  </article>
                  <article className="blog-card">
                    <div className="blog-card-header">
                      <h3 className="blog-card-title">why USUM is the best pokémon game (a hill i will die on)</h3>
                      <span className="blog-card-date">Jul 22, 2026</span>
                    </div>
                    <p className="blog-card-excerpt">
                      ultra necrozma alone justifies this take. but let me walk
                      you through every reason USUM deserves the crown...
                    </p>
                    <a href="/blog" className="blog-card-link">read more →</a>
                  </article>
                  <article className="blog-card">
                    <div className="blog-card-header">
                      <h3 className="blog-card-title">Re:Zero S1 rewatch #4 — things i missed</h3>
                      <span className="blog-card-date">Jul 10, 2026</span>
                    </div>
                    <p className="blog-card-excerpt">
                      on my fourth rewatch i finally caught the foreshadowing in
                      episode 7 and i can&apos;t believe i missed it three times...
                    </p>
                    <a href="/blog" className="blog-card-link">read more →</a>
                  </article>
                </div>
              </section>

              <div className="web-divider" />

              {/* Guestbook */}
              <section id="guestbook">
                <h2 className="section-title">✦ guestbook ✦</h2>
                <p className="about-text">
                  sign my guestbook! leave a message, say hi, or just let me
                  know you swung by 🕸️
                </p>
                <form
                  className="guestbook-form"
                  onSubmit={handleGuestbookSubmit}
                >
                  <input
                    type="text"
                    className="guestbook-input"
                    placeholder="your name..."
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    maxLength={30}
                    aria-label="Your name"
                  />
                  <textarea
                    className="guestbook-textarea"
                    placeholder="leave a message..."
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    maxLength={200}
                    aria-label="Your message"
                  />
                  <button type="submit" className="guestbook-submit">
                    🕸️ sign guestbook
                  </button>
                </form>
                <div className="guestbook-entries">
                  {guestbookEntries.map((entry, idx) => (
                    <div key={`${entry.name}-${idx}`} className="guestbook-entry">
                      <div className="entry-header">
                        <span className="entry-name">{entry.name}</span>
                        <span className="entry-date">{entry.date}</span>
                      </div>
                      <p className="entry-message">{entry.message}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </main>

          {/* ---- RIGHT SIDEBAR ---- */}
          <aside className="sidebar sidebar-right">
            {/* About Me nav */}
            <nav className="retro-box nav-box" aria-label="About Me navigation">
              <h3 className="box-title">✦ about me ✦</h3>
              <ul className="nav-list">
                <li>
                  <a
                    className="nav-link"
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("about");
                    }}
                  >
                    about
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link"
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("projects");
                    }}
                  >
                    projects
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#">
                    gaming
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#">
                    my suits 👔
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link"
                    href="#shrines"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("shrines");
                    }}
                  >
                    shrines
                  </a>
                </li>
              </ul>
            </nav>

            {/* For You nav */}
            <nav className="retro-box nav-box" aria-label="For You navigation">
              <h3 className="box-title">✦ for you ✦</h3>
              <ul className="nav-list">
                <li>
                  <a className="nav-link" href="#">
                    resources
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link"
                    href="#guestbook"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("guestbook");
                    }}
                  >
                    guestbook
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/updates">
                    updates
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link"
                    href="#blog"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("blog");
                    }}
                  >
                    blog
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#">
                    web goodies
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#">
                    downloads
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#">
                    webring
                  </a>
                </li>
              </ul>
            </nav>

            {/* Site nav */}
            <nav className="retro-box nav-box" aria-label="Site navigation">
              <h3 className="box-title">✦ site ✦</h3>
              <ul className="nav-list">
                <li>
                  <a className="nav-link" href="#">
                    credits
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#">
                    changelog
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#">
                    ko-fi ☕
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#">
                    sitemap
                  </a>
                </li>
              </ul>
            </nav>

            {/* Mini chibi decoration */}
            <div className="text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/nagi-chibi.png"
                alt="Chibi Nagi Seishiro chilling"
                style={{
                  width: "80px",
                  height: "auto",
                  filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))",
                  opacity: 0.7,
                  animation: "float 5s ease-in-out infinite",
                }}
              />
            </div>
          </aside>
        </div>

        {/* ========== FOOTER ========== */}
        <footer className="site-footer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/kise-chibi.png"
            alt=""
            className="footer-chibi"
          />
          <p className="footer-text">
            hrick&apos;s hideout © 2026 · built with ❤️ and too much
            coffee
          </p>
          <p className="footer-small">
            powered by caffeine and anime binges · not responsible for any
            isekai-related side effects
          </p>
        </footer>
      </div>
    </>
  );
}
