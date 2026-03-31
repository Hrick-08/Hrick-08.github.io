import { useState, useEffect, useCallback, useRef } from 'react';

/* ═══════════════════════════════════════════
   RESUME DATA — .txt FILES
   ═══════════════════════════════════════════ */
const FILES = [
  {
    id: 'about',
    name: 'about_me.txt',
    icon: '📄',
    content: `# ═══════════════════════════════════════════════════
# about_me.txt
# ═══════════════════════════════════════════════════

Name:       Hritabrata Das
Phone:      +91-9382058536
Email:      hritabratadas8@gmail.com

LinkedIn:   linkedin.com/in/hritabrata-das
GitHub:     github.com/Hrick-08
Portfolio:  hrick.me

# ───────────────────────────────────────────────────
# "Building intelligent systems, one commit at a time."
# ───────────────────────────────────────────────────`,
  },
  {
    id: 'education',
    name: 'education.txt',
    icon: '🎓',
    content: `# ═══════════════════════════════════════════════════
# education.txt
# ═══════════════════════════════════════════════════

[1] Chitkara University
    Location:       Rajpura, Punjab, India
    Degree:         B.E. CSE — AI & ML Specialization
    CGPA:           9.42 / 10
    Duration:       Aug 2024 – May 2028

[2] The G.V.E.A.
    Location:       Balurghat, West Bengal, India
    Board:          Primary – High School (CISCE)
    Score:          86%
    Activities:     Spoken English, Competitive Debating
    Duration:       Jun 2008 – Mar 2024

# ───────────────────────────────────────────────────
# "Education is the passport to the future."
# ───────────────────────────────────────────────────`,
  },
  {
    id: 'experience',
    name: 'experience.txt',
    icon: '💼',
    content: `# ═══════════════════════════════════════════════════
# experience.txt
# ═══════════════════════════════════════════════════

ROLE:       Web Developer
ORG:        Google Developer Groups (GDG) On Campus
            Chitkara University
PERIOD:     Aug 2024 – Present
LOCATION:   Rajpura, Punjab, India

KEY CONTRIBUTIONS:
  • Built and shipped 2+ web platforms for GDG On
    Campus, supporting 150+ student developers
  • Led full-stack development for 3+ community
    events/workshops, increasing participation
    in Google tech by 40%
  • Mentored junior members; conducted 2+ internal
    code review sessions per semester

# ─── ACHIEVEMENTS ─────────────────────────────────

  • Secured top-3 finishes in 4+ intra-college
    competitions (coding, design, aptitude)
  • Placed 3rd among 20+ teams in the Agentic
    Sprint Hackathon, leading a team to deliver
    a functional autonomous AI agent in 24 hours

# ───────────────────────────────────────────────────
# "Ship fast, learn faster."
# ───────────────────────────────────────────────────`,
  },
  {
    id: 'projects',
    name: 'projects.txt',
    icon: '🚀',
    content: `# ═══════════════════════════════════════════════════
# projects.txt
# ═══════════════════════════════════════════════════

[1] R.I.S.H.I.
    Stack:      Electron, Qdrant, RAG, Whisper,
                OpenClaw, EC2, Python
    Period:     March 2025 – Present
    GitHub:     github.com/Hrick-08/R.I.S.H.I.

    • Personal AI companion with multi-provider
      LLM routing across 6+ models (Claude,
      DeepSeek, Llama, Mixtral, Azure, Gemini,
      GPT-4o, Nvidia NIM)
    • Long-term memory via RAG over Qdrant
      vector DB
    • Core runs on AWS EC2, orchestrated via
      OpenClaw middleware; GPT-4o as primary brain,
      Gemini for search/embeddings
    • Capabilities: web search, image generation,
      file ops, email, TTS/STT, Telegram bot
      + desktop TUI

─────────────────────────────────────────────────────

[2] CFOX.ai
    Stack:      FastAPI, Next.js, PostgreSQL, AI/ML
    Period:     Jan 2025 – Mar 2025
    GitHub:     github.com/Hrick-08/agenticsprint-fe

    • AI-powered CFO platform aggregating 5+
      financial data streams in real time
    • Automated financial reporting pipeline;
      cut manual overhead by ~60% for SMB clients
    • Built 3+ conversational AI workflows with
      LLM-based dialogue, cutting response latency
      by 35%

─────────────────────────────────────────────────────

[3] Shramo.ai
    Stack:      React.js, FastAPI, Twilio,
                React Native
    Period:     Jan 2025 – Present
    GitHub:     github.com/Hrick-08/Shramo_RN

    • Integrated Twilio Media Streams API for
      AI-driven voice calling; handles 100+
      simultaneous sessions
    • Cross-platform React Native app
      (iOS & Android); reduced feature access
      time by 50% vs web-only

# ───────────────────────────────────────────────────
# "Talk is cheap. Show me the code." — Linus Torvalds
# ───────────────────────────────────────────────────`,
  },
  {
    id: 'skills',
    name: 'skills.txt',
    icon: '🛠️',
    content: `# ═══════════════════════════════════════════════════
# skills.txt
# ═══════════════════════════════════════════════════

LANGUAGES:
  Python, JavaScript, TypeScript, C++, Java,
  SQL (PostgreSQL), HTML, CSS

FRAMEWORKS & LIBRARIES:
  React, Next.js, React Native, Node.js,
  Express.js, FastAPI, Django, Flask,
  Tailwind CSS, NumPy, Pandas, Matplotlib,
  Scikit-Learn

AI & ML:
  RAG, Vector Databases (Qdrant),
  LLM Integration (OpenRouter, Azure, Gemini),
  faster-whisper, Piper TTS,
  Agentic AI Systems

TOOLS & CLOUD:
  Git, GitHub, Docker, Redis, Twilio,
  Razorpay, REST APIs, Oracle Cloud,
  Microsoft Azure, AWS EC2,
  Google Cloud Platform

# ───────────────────────────────────────────────────
# "The best tool is the one you know how to use."
# ───────────────────────────────────────────────────`,
  },
  {
    id: 'certifications',
    name: 'certifications.txt',
    icon: '🏅',
    content: `# ═══════════════════════════════════════════════════
# certifications.txt
# ═══════════════════════════════════════════════════

[1] Microsoft AI Fundamentals (AZ-900 AI)
    Issuer:     Microsoft
    Verified:   Credly
    Link:       https://www.credly.com/badges/6455ba0b-6457-48ab-b33a-7490785ca1cb/linked_in_profile

[2] Microsoft Azure Fundamentals (AZ-900)
    Issuer:     Microsoft
    Verified:   Credly
    Link:       https://www.credly.com/badges/da97194b-1180-465d-bd80-0f6759628284/linked_in_profile

[3] Microsoft Azure Data Fundamentals (DP-900)
    Issuer:     Microsoft
    Verified:   Credly
    Link:       https://www.credly.com/earner/earned/badge/eba2c1d6-3b90-492a-ad5b-7132bcbd44e6

[4] Design Thinking
    Issuer:     University of Virginia
    Platform:   Coursera
    Link:       https://www.coursera.org/account/accomplishments/specialization/TS4012GW0MI3

[5] Introduction to Cyber Security
    Issuer:     (Credly verified)
    Link:       https://www.credly.com/badges/cd3d17b0-0436-4814-9b3d-81a001e661e3/linked_in_profile

# ───────────────────────────────────────────────────
# "Never stop learning."
# ───────────────────────────────────────────────────`,
  },
];

/* ═══════════════════════════════════════════
   ICON GRID POSITIONS
   ═══════════════════════════════════════════ */
const ICON_POSITIONS = [
  { row: 0, col: 0 },
  { row: 1, col: 0 },
  { row: 2, col: 0 },
  { row: 3, col: 0 },
  { row: 0, col: 1 },
  { row: 1, col: 1 },
];

/* ═══════════════════════════════════════════
   CSS STYLES (embedded)
   ═══════════════════════════════════════════ */
const STYLES = `
/* ── BOOT ANIMATION ─────────────────────── */
@keyframes bootFadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes ubuntuLogoSpin {
  0% { transform: rotate(0deg); opacity: 0.3; }
  50% { opacity: 1; }
  100% { transform: rotate(360deg); opacity: 0.3; }
}
@keyframes bootPulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
@keyframes dotBounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}
@keyframes slideUpDock {
  from { transform: translateX(-50%) translateY(80px); opacity: 0; }
  to { transform: translateX(-50%) translateY(0); opacity: 1; }
}
@keyframes fadeInDesktop {
  from { opacity: 0; transform: scale(1.02); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes windowOpen {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes windowClose {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.85); }
}
@keyframes activitiesOverview {
  from { opacity: 0; transform: scale(1.1); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* ── BOOT SCREEN ────────────────────────── */
.boot-screen {
  position: fixed; inset: 0;
  background: #1a1a1a;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  z-index: 99999;
  transition: opacity 0.8s ease;
}
.boot-screen.fade-out {
  opacity: 0; pointer-events: none;
}
.boot-logo {
  width: 80px; height: 80px;
  border-radius: 50%;
  background: conic-gradient(#E95420 0deg 120deg, #77216F 120deg 240deg, #5E2750 240deg 360deg);
  animation: ubuntuLogoSpin 2s ease-in-out infinite;
  margin-bottom: 32px;
}
.boot-dots {
  display: flex; gap: 8px;
}
.boot-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #E95420;
  animation: dotBounce 1.4s ease-in-out infinite;
}
.boot-dot:nth-child(2) { animation-delay: 0.16s; }
.boot-dot:nth-child(3) { animation-delay: 0.32s; }
.boot-text {
  margin-top: 24px;
  font-size: 13px;
  color: #888;
  font-weight: 300;
  letter-spacing: 1px;
  animation: bootPulse 2s ease-in-out infinite;
}

/* ── DESKTOP ────────────────────────────── */
.desktop {
  width: 100vw; height: 100vh;
  // background: radial-gradient(ellipse at 30% 20%, #2d2d2d 0%, #1a1a1a 50%, #111 100%);
  background-image: url('/background.webp');
  background-size: cover;
  background-position: center;
  position: relative; overflow: hidden;
  animation: fadeInDesktop 1s ease;
}
.desktop-noise {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none; z-index: 0;
}
.desktop-gradient-accent {
  position: absolute;
  width: 500px; height: 500px;
  top: -150px; right: -100px;
  background: radial-gradient(circle, rgba(233,84,32,0.06) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
}

/* ── TOP BAR ────────────────────────────── */
.topbar {
  position: absolute; top: 0; left: 0; right: 0;
  height: 32px;
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex; align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  z-index: 1000;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  font-size: 13px; font-weight: 400;
}
.topbar-left {
  display: flex; align-items: center; gap: 12px;
}
.activities-btn {
  padding: 3px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 13px;
  color: #ddd;
}
.activities-btn:hover {
  background: rgba(255,255,255,0.12);
}
.topbar-center {
  position: absolute; left: 50%; transform: translateX(-50%);
  font-weight: 500; font-size: 13px; color: #ddd;
  letter-spacing: 0.2px;
}
.topbar-right {
  display: flex; align-items: center; gap: 14px;
  color: #bbb; font-size: 14px;
}
.topbar-icon {
  font-size: 14px; cursor: pointer;
  transition: color 0.2s;
}
.topbar-icon:hover { color: #fff; }

/* ── DESKTOP ICONS ──────────────────────── */
.desktop-icons {
  position: absolute;
  top: 52px; left: 24px;
  display: grid;
  grid-template-columns: repeat(2, 90px);
  grid-template-rows: repeat(4, 95px);
  gap: 12px;
  z-index: 10;
}
.desktop-icon {
  width: 90px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: flex-start;
  padding: 10px 4px 6px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
  text-align: center;
  gap: 4px;
}
.desktop-icon:hover {
  background: rgba(53, 132, 228, 0.25);
}
.desktop-icon.selected {
  background: rgba(53, 132, 228, 0.35);
  outline: 1.5px solid rgba(53, 132, 228, 0.6);
}
.desktop-icon-emoji {
  font-size: 38px;
  line-height: 1;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4));
}
.desktop-icon-label {
  font-size: 11px;
  color: #eee;
  text-shadow: 0 1px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.5);
  word-wrap: break-word;
  max-width: 80px;
  line-height: 1.3;
  font-weight: 400;
}

/* ── EDITOR WINDOW ──────────────────────── */
.editor-window {
  position: absolute;
  min-width: 500px; min-height: 360px;
  background: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 12px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06);
  display: flex; flex-direction: column;
  overflow: hidden;
  animation: windowOpen 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.editor-window.closing {
  animation: windowClose 0.2s ease forwards;
}
.editor-window.inactive {
  box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04);
}

/* ── TITLE BAR ──────────────────────────── */
.titlebar {
  height: 40px;
  background: #2d2d2d;
  display: flex; align-items: center;
  padding: 0 12px;
  cursor: grab;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  transition: background 0.2s;
}
.titlebar.active {
  background: #353535;
}
.titlebar:active { cursor: grabbing; }
.titlebar-buttons {
  display: flex; gap: 7px;
  margin-right: 14px;
}
.titlebar-btn {
  width: 13px; height: 13px;
  border-radius: 50%;
  border: none; cursor: pointer;
  transition: filter 0.15s, transform 0.1s;
  position: relative;
  display: flex; align-items: center; justify-content: center;
}
.titlebar-btn:hover { filter: brightness(1.2); transform: scale(1.1); }
.titlebar-btn:active { transform: scale(0.95); }
.titlebar-btn.close { background: #f44; }
.titlebar-btn.minimize { background: #fb0; }
.titlebar-btn.maximize { background: #0b4; }
.titlebar-btn.close:hover { background: #f55; }
.titlebar-btn.minimize:hover { background: #fc3; }
.titlebar-btn.maximize:hover { background: #2d6; }
.titlebar-btn::after {
  content: '';
  display: block;
  opacity: 0;
  transition: opacity 0.15s;
}
.titlebar-buttons:hover .titlebar-btn::after {
  opacity: 1;
}
.titlebar-btn.close::after {
  content: '×'; font-size: 11px; font-weight: 700; color: #600;
}
.titlebar-btn.minimize::after {
  content: '−'; font-size: 11px; font-weight: 700; color: #630;
}
.titlebar-btn.maximize::after {
  content: '+'; font-size: 10px; font-weight: 700; color: #063;
}
.titlebar-title {
  flex: 1;
  text-align: center;
  font-size: 13px;
  color: #aaa;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 56px;
}
.titlebar.active .titlebar-title {
  color: #ddd;
}

/* ── EDITOR BODY ────────────────────────── */
.editor-body {
  flex: 1;
  display: flex;
  overflow: auto;
  background: #1e1e1e;
}
.editor-body::-webkit-scrollbar { width: 8px; }
.editor-body::-webkit-scrollbar-track { background: transparent; }
.editor-body::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }
.editor-body::-webkit-scrollbar-thumb:hover { background: #555; }

.line-numbers {
  padding: 16px 0;
  background: #252525;
  border-right: 1px solid #333;
  text-align: right;
  flex-shrink: 0;
  min-width: 48px;
}
.line-num {
  padding: 0 12px 0 8px;
  font-family: 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.65;
  color: #555;
}
.editor-content {
  padding: 16px 20px;
  flex: 1;
  font-family: 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.65;
  white-space: pre;
  color: #d4d4d4;
}
.editor-content .comment {
  color: #6a9955;
}
.editor-content .header-line {
  color: #E95420;
  font-weight: 700;
}
.editor-content .bracket {
  color: #569cd6;
}
.editor-content .bullet-line {
  color: #dcdcaa;
}
.editor-content .label {
  color: #9cdcfe;
}
.editor-content .value {
  color: #ce9178;
}
.editor-content .divider {
  color: #555;
}
.editor-link-view {
  color: #4ec9b0 !important;
  text-decoration: none !important;
  background: rgba(78, 201, 176, 0.1);
  border: 1px solid rgba(78, 201, 176, 0.3);
  border-radius: 3px;
  padding: 0px 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.editor-link-view:hover {
  background: rgba(78, 201, 176, 0.2) !important;
  border-color: rgba(78, 201, 176, 0.6) !important;
  color: #6ee7d4 !important;
}

/* ── EDITOR STATUS BAR ──────────────────── */
.editor-statusbar {
  height: 26px;
  background: #252525;
  border-top: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  font-size: 11px;
  color: #777;
  flex-shrink: 0;
}

/* ── DOCK ───────────────────────────────── */
.dock {
  position: absolute;
  bottom: 8px;
  left: 50%; transform: translateX(-50%);
  display: flex; align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.08);
  z-index: 900;
  overflow: visible; /* ← ADD THIS */
  animation: slideUpDock 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both;
}
.dock-item {
  width: 48px; height: 48px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 26px;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}
.dock-item:hover {
  transform: scale(1.2) translateY(-6px);
}
.dock-item:active {
  transform: scale(1.05) translateY(-2px);
}
.dock-item-dot {
  position: absolute;
  bottom: -2px;
  width: 4px; height: 4px;
  border-radius: 50%;
  background: #E95420;
}
.dock-separator {
  width: 1px; height: 32px;
  background: rgba(255,255,255,0.12);
  margin: 0 4px;
}
.dock-tooltip {
  position: absolute;
  bottom: 56px;
  background: rgba(0,0,0,0.85);
  color: #ddd;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.15s, transform 0.15s;
}
.dock-item:hover .dock-tooltip {
  opacity: 1;
  transform: translateY(0);
}

/* ── TASKBAR CHIPS (minimized windows) ──── */
.taskbar-chip {
  display: flex; align-items: center; gap: 6px;
  padding: 4px 10px;
  border-radius: 8px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  font-size: 11px;
  color: #bbb;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.taskbar-chip:hover {
  background: rgba(255,255,255,0.12);
  color: #fff;
}

/* ── ACTIVITIES OVERVIEW ────────────────── */
.activities-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  animation: activitiesOverview 0.3s ease;
}
.activities-title {
  font-size: 28px;
  font-weight: 300;
  color: #ddd;
  letter-spacing: 2px;
}
.activities-subtitle {
  font-size: 14px;
  color: #888;
  margin-top: -12px;
}
.activities-grid {
  display: flex; gap: 16px; flex-wrap: wrap;
  justify-content: center;
  max-width: 600px;
}
.activities-card {
  width: 110px; height: 90px;
  border-radius: 12px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, border-color 0.2s;
}
.activities-card:hover {
  background: rgba(233,84,32,0.15);
  border-color: rgba(233,84,32,0.3);
  transform: translateY(-2px);
}
.activities-card-icon { font-size: 28px; }
.activities-card-label { font-size: 10px; color: #aaa; text-align: center; padding: 0 4px; }

/* ── RESIZE HANDLE ──────────────────────── */
.resize-handle {
  position: absolute;
  bottom: 0; right: 0;
  width: 16px; height: 16px;
  cursor: nwse-resize;
  z-index: 10;
}
.resize-handle::after {
  content: '';
  position: absolute;
  bottom: 4px; right: 4px;
  width: 8px; height: 8px;
  border-right: 2px solid #555;
  border-bottom: 2px solid #555;
  opacity: 0;
  transition: opacity 0.2s;
}
.editor-window:hover .resize-handle::after {
  opacity: 1;
}

/* ── RIGHT-CLICK CONTEXT MENU ───────────── */
.context-menu {
  position: fixed;
  background: #353535;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 6px 0;
  min-width: 200px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  z-index: 5000;
  animation: windowOpen 0.15s ease;
}
.context-menu-item {
  padding: 7px 16px;
  font-size: 12.5px;
  color: #ddd;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.1s;
}
.context-menu-item:hover {
  background: rgba(233,84,32,0.2);
}
.context-menu-sep {
  height: 1px;
  background: rgba(255,255,255,0.08);
  margin: 4px 0;
}

/* ── SYSTEM INFO MODAL ──────────────────── */
.sysinfo-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 3000;
  display: flex; align-items: center; justify-content: center;
  animation: activitiesOverview 0.25s ease;
}
.sysinfo-modal {
  background: #1a1a1a;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  box-shadow: 0 24px 64px rgba(0,0,0,0.7);
  padding: 32px 36px;
  min-width: 540px;
  max-width: 620px;
  display: flex;
  gap: 32px;
  align-items: flex-start;
  font-family: 'Ubuntu Mono', monospace;
  font-size: 13px;
  position: relative;
}
.sysinfo-close {
  position: absolute;
  top: 14px; right: 16px;
  background: none; border: none;
  color: #666; font-size: 18px;
  cursor: pointer; line-height: 1;
  transition: color 0.15s;
}
.sysinfo-close:hover { color: #ddd; }
.sysinfo-ascii {
  color: #E95420;
  font-size: 11px;
  line-height: 1.4;
  flex-shrink: 0;
  white-space: pre;
  user-select: none;
}
.sysinfo-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.sysinfo-title {
  font-size: 16px;
  font-weight: 700;
  color: #E95420;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
}
.sysinfo-divider {
  border: none;
  border-top: 1px solid rgba(233,84,32,0.3);
  margin: 6px 0 8px;
}
.sysinfo-row {
  display: flex;
  gap: 0;
  line-height: 1.7;
}
.sysinfo-key {
  color: #E95420;
  font-weight: 700;
  min-width: 110px;
  flex-shrink: 0;
}
.sysinfo-val {
  color: #ccc;
}
.sysinfo-val a {
  color: #569cd6;
  text-decoration: none;
}
.sysinfo-val a:hover { text-decoration: underline; }
.sysinfo-palette {
  display: flex;
  gap: 6px;
  margin-top: 10px;
}
.sysinfo-swatch {
  width: 16px; height: 16px;
  border-radius: 50%;
}
`;

/* ═══════════════════════════════════════════
   HELPER: Parse .txt content into styled spans
   ═══════════════════════════════════════════ */
function parseTextContent(text) {
  const lines = text.split('\n');
  let currentContext = '';

  const linkify = (textStr, defaultClass) => {
    const tokens = textStr.split(/(\s+)/);
    return tokens.map((token, idx) => {
      if (!token.trim()) {
        return <span key={idx}>{token}</span>;
      }

      let href = null;
      if (token.includes('@') && !token.startsWith('@')) {
        href = `mailto:${token}`;
      } else if (/^\+?[0-9-]{10,20}$/.test(token)) {
        href = `tel:${token}`;
      } else if (/\.(com|me|net|io|org|co|ai)(\/[\w.-]*)*\/?$/.test(token) || token.startsWith('http://') || token.startsWith('https://')) {
        href = token.startsWith('http') ? token : `https://${token}`;
      }

      if (href) {
        return (
          <a
            key={idx}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="editor-link"
            onClick={(e) => e.stopPropagation()}
            style={{ color: '#569cd6', textDecoration: 'underline', cursor: 'pointer' }}
          >
            {token}
          </a>
        );
      }
      return <span key={idx} className={defaultClass || undefined}>{token}</span>;
    });
  };

  // Special renderer for Link: lines — shows "View" badge instead of raw URL
  const renderLinkLine = (line) => {
    const colonIdx = line.indexOf(':');
    // label is everything up to and including first colon, e.g. "    Link:"
    const label = line.slice(0, colonIdx + 1);
    const rest = line.slice(colonIdx + 1).trim();

    // rest should be the URL
    const href = rest.startsWith('http') ? rest : `https://${rest}`;

    return (
      <>
        <span className="label">{label}</span>
        <span>{'       '}</span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="editor-link-view"
          onClick={(e) => e.stopPropagation()}
        >
          View ↗
        </a>
      </>
    );
  };

  return lines.map((line, i) => {
    const trimmed = line.trim();
    if (trimmed === '') {
      currentContext = '';
      return <div key={i} className="editor-empty-line">{'\u00A0'}</div>;
    }

    if (/^#/.test(line)) {
      currentContext = 'comment';
      return <div key={i}>{linkify(line, 'comment')}</div>;
    }

    if (/^─+$/.test(trimmed) || /^═+$/.test(trimmed)) {
      currentContext = '';
      return <div key={i} className="divider">{line}</div>;
    }

    if (/^\[/.test(trimmed)) {
      currentContext = '';
      return <div key={i}>{linkify(line, 'bracket')}</div>;
    }

    if (/^[A-Z][A-Z &/]+:$/.test(trimmed)) {
      currentContext = 'value';
      return <div key={i} className="header-line">{line}</div>;
    }

    if (/^\s*•/.test(line)) {
      currentContext = 'bullet-line';
      return <div key={i}>{linkify(line, 'bullet-line')}</div>;
    }

    // ── Special case: Link: label with a URL value ──
    if (/^\s*Link:/.test(line)) {
      currentContext = 'value';
      return <div key={i}>{renderLinkLine(line)}</div>;
    }

    if (/^\s*[A-Z][a-zA-Z0-9_ ]*?:/.test(line) && !line.includes('http')) {
      const colonIdx = line.indexOf(':');
      const label = line.slice(0, colonIdx + 1);
      const val = line.slice(colonIdx + 1);
      currentContext = 'value';
      return (
        <div key={i}>
          <span className="label">{label}</span>
          {linkify(val, 'value')}
        </div>
      );
    }

    if (currentContext === 'bullet-line') {
      return <div key={i}>{linkify(line, 'bullet-line')}</div>;
    } else if (currentContext === 'value') {
      return <div key={i}>{linkify(line, 'value')}</div>;
    } else if (currentContext === 'comment') {
      return <div key={i}>{linkify(line, 'comment')}</div>;
    } else {
      return <div key={i}>{linkify(line, '')}</div>;
    }
  });
}

/* ═══════════════════════════════════════════
   COMPONENT: EditorWindow
   ═══════════════════════════════════════════ */
function EditorWindow({ file, windowState, onClose, onMinimize, onMaximize, onFocus, onDragStart, onResizeStart, isActive, zIndex }) {
  const { x, y, w, h, maximized } = windowState;
  const lines = file.content.split('\n');

  const style = maximized
    ? { top: 32, left: 0, width: '100vw', height: 'calc(100vh - 32px)', zIndex, borderRadius: 0 }
    : { top: y, left: x, width: w, height: h, zIndex };

  return (
    <div
      className={`editor-window ${isActive ? '' : 'inactive'}`}
      style={style}
      onMouseDown={onFocus}
      id={`window-${file.id}`}
    >
      <div
        className={`titlebar ${isActive ? 'active' : ''}`}
        onMouseDown={(e) => {
          if (e.target.closest('.titlebar-btn')) return;
          onDragStart(e);
        }}
        onDoubleClick={onMaximize}
      >
        <div className="titlebar-buttons">
          <button className="titlebar-btn close" onClick={onClose} title="Close" />
          <button className="titlebar-btn minimize" onClick={onMinimize} title="Minimize" />
          <button className="titlebar-btn maximize" onClick={onMaximize} title="Maximize" />
        </div>
        <div className="titlebar-title">
          {file.icon} {file.name} — Text Editor
        </div>
      </div>
      <div className="editor-body">
        <div className="line-numbers">
          {lines.map((_, i) => (
            <div key={i} className="line-num">{i + 1}</div>
          ))}
        </div>
        <div className="editor-content">
          {parseTextContent(file.content)}
        </div>
      </div>
      <div className="editor-statusbar">
        <span>Ln {lines.length}, Col 1</span>
        <span>UTF-8 &nbsp;·&nbsp; Plain Text &nbsp;·&nbsp; {file.name}</span>
      </div>
      {!maximized && (
        <div className="resize-handle" onMouseDown={onResizeStart} />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP COMPONENT
   ═══════════════════════════════════════════ */
export default function App() {
  const [booted, setBooted] = useState(false);
  const [bootFade, setBootFade] = useState(false);
  const [time, setTime] = useState('');
  const [openWindows, setOpenWindows] = useState({});
  const [windowOrder, setWindowOrder] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showActivities, setShowActivities] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [showSystemInfo, setShowSystemInfo] = useState(false);
  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const clickTimerRef = useRef({});
  const windowCounterRef = useRef(0);

  useEffect(() => {
    const t1 = setTimeout(() => setBootFade(true), 2200);
    const t2 = setTimeout(() => setBooted(true), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
        + '  ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    update();
    const iv = setInterval(update, 10000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const handler = () => setContextMenu(null);
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  const openFile = useCallback((fileId) => {
    setOpenWindows(prev => {
      if (prev[fileId]) {
        if (prev[fileId].minimized) {
          return { ...prev, [fileId]: { ...prev[fileId], minimized: false } };
        }
        return prev;
      }
      windowCounterRef.current++;
      const offset = (windowCounterRef.current % 6) * 30;
      return {
        ...prev,
        [fileId]: {
          x: 220 + offset,
          y: 60 + offset,
          w: 640,
          h: 480,
          minimized: false,
          maximized: false,
        }
      };
    });
    setWindowOrder(prev => {
      const filtered = prev.filter(id => id !== fileId);
      return [...filtered, fileId];
    });
    setActiveWindowId(fileId);
    setShowActivities(false);
  }, []);

  const closeWindow = useCallback((fileId) => {
    const el = document.getElementById(`window-${fileId}`);
    if (el) {
      el.classList.add('closing');
      setTimeout(() => {
        setOpenWindows(prev => {
          const next = { ...prev };
          delete next[fileId];
          return next;
        });
        setWindowOrder(prev => prev.filter(id => id !== fileId));
        setActiveWindowId(prev => prev === fileId ? null : prev);
      }, 200);
    } else {
      setOpenWindows(prev => {
        const next = { ...prev };
        delete next[fileId];
        return next;
      });
      setWindowOrder(prev => prev.filter(id => id !== fileId));
    }
  }, []);

  const minimizeWindow = useCallback((fileId) => {
    setOpenWindows(prev => ({
      ...prev,
      [fileId]: { ...prev[fileId], minimized: true }
    }));
    setActiveWindowId(prev => prev === fileId ? null : prev);
  }, []);

  const maximizeWindow = useCallback((fileId) => {
    setOpenWindows(prev => ({
      ...prev,
      [fileId]: { ...prev[fileId], maximized: !prev[fileId]?.maximized }
    }));
  }, []);

  const focusWindow = useCallback((fileId) => {
    setWindowOrder(prev => {
      const filtered = prev.filter(id => id !== fileId);
      return [...filtered, fileId];
    });
    setActiveWindowId(fileId);
  }, []);

  const handleIconClick = useCallback((fileId) => {
    const now = Date.now();
    const last = clickTimerRef.current[fileId] || 0;
    if (now - last < 400) {
      openFile(fileId);
      setSelectedIcon(null);
      clickTimerRef.current[fileId] = 0;
    } else {
      setSelectedIcon(fileId);
      clickTimerRef.current[fileId] = now;
    }
  }, [openFile]);

  const handleDragStart = useCallback((fileId) => (e) => {
    e.preventDefault();
    const win = openWindows[fileId];
    if (!win || win.maximized) return;
    dragRef.current = { fileId, startX: e.clientX - win.x, startY: e.clientY - win.y };

    const onMove = (ev) => {
      if (!dragRef.current) return;
      const { fileId: fid, startX, startY } = dragRef.current;
      setOpenWindows(prev => ({
        ...prev,
        [fid]: { ...prev[fid], x: ev.clientX - startX, y: Math.max(32, ev.clientY - startY) }
      }));
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [openWindows]);

  const handleResizeStart = useCallback((fileId) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    const win = openWindows[fileId];
    if (!win) return;
    resizeRef.current = { fileId, startX: e.clientX, startY: e.clientY, startW: win.w, startH: win.h };

    const onMove = (ev) => {
      if (!resizeRef.current) return;
      const { fileId: fid, startX, startY, startW, startH } = resizeRef.current;
      const newW = Math.max(400, startW + (ev.clientX - startX));
      const newH = Math.max(300, startH + (ev.clientY - startY));
      setOpenWindows(prev => ({
        ...prev,
        [fid]: { ...prev[fid], w: newW, h: newH }
      }));
    };
    const onUp = () => {
      resizeRef.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [openWindows]);

  const handleDesktopContext = useCallback((e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const minimizedWindows = Object.entries(openWindows).filter(([, ws]) => ws.minimized);
  const visibleWindows = Object.entries(openWindows).filter(([, ws]) => !ws.minimized);

  return (
    <>
      <style>{STYLES}</style>

      {!booted && (
        <div className={`boot-screen ${bootFade ? 'fade-out' : ''}`}>
          <div className="boot-logo" />
          <div className="boot-dots">
            <div className="boot-dot" />
            <div className="boot-dot" />
            <div className="boot-dot" />
          </div>
          <div className="boot-text">ubuntu</div>
        </div>
      )}

      {booted && (
        <div
          className="desktop"
          onContextMenu={handleDesktopContext}
          onClick={() => { setSelectedIcon(null); }}
        >
          <div className="desktop-noise" />
          <div className="desktop-gradient-accent" />

          <div className="topbar">
            <div className="topbar-left">
              <div className="activities-btn" onClick={(e) => { e.stopPropagation(); setShowActivities(v => !v); }}>
                Activities
              </div>
              {activeWindowId && openWindows[activeWindowId] && !openWindows[activeWindowId].minimized && (
                <span style={{ fontSize: 12, color: '#999' }}>
                  {FILES.find(f => f.id === activeWindowId)?.name} — Text Editor
                </span>
              )}
            </div>
            <div className="topbar-center">{time}</div>
            <div className="topbar-right">
              <span className="topbar-icon" title="Wi-Fi">⟠</span>
              <span className="topbar-icon" title="Volume">♪</span>
              <span className="topbar-icon" title="Battery">⚡</span>
              <span className="topbar-icon" title="Power">⏻</span>
            </div>
          </div>

          <div className="desktop-icons" onClick={(e) => e.stopPropagation()}>
            {FILES.map((file, idx) => (
              <div
                key={file.id}
                className={`desktop-icon ${selectedIcon === file.id ? 'selected' : ''}`}
                style={{ gridRow: ICON_POSITIONS[idx].row + 1, gridColumn: ICON_POSITIONS[idx].col + 1 }}
                onClick={(e) => { e.stopPropagation(); handleIconClick(file.id); }}
                onDoubleClick={(e) => { e.stopPropagation(); openFile(file.id); }}
              >
                <span className="desktop-icon-emoji">{file.icon}</span>
                <span className="desktop-icon-label">{file.name}</span>
              </div>
            ))}
          </div>

          {visibleWindows.map(([fileId, ws]) => {
            const file = FILES.find(f => f.id === fileId);
            if (!file) return null;
            const zIdx = windowOrder.indexOf(fileId) + 100;
            return (
              <EditorWindow
                key={fileId}
                file={file}
                windowState={ws}
                isActive={activeWindowId === fileId}
                zIndex={zIdx}
                onClose={() => closeWindow(fileId)}
                onMinimize={() => minimizeWindow(fileId)}
                onMaximize={() => maximizeWindow(fileId)}
                onFocus={() => focusWindow(fileId)}
                onDragStart={handleDragStart(fileId)}
                onResizeStart={handleResizeStart(fileId)}
              />
            );
          })}

          <div className="dock" onClick={(e) => e.stopPropagation()}>
            {FILES.map(file => {
              const isOpen = !!openWindows[file.id] && !openWindows[file.id]?.minimized;
              return (
                <div
                  key={file.id}
                  className="dock-item"
                  onClick={() => {
                    if (openWindows[file.id]) {
                      if (openWindows[file.id].minimized) {
                        openFile(file.id);
                      } else {
                        focusWindow(file.id);
                      }
                    } else {
                      openFile(file.id);
                    }
                  }}
                >
                  <span>{file.icon}</span>
                  {isOpen && <div className="dock-item-dot" />}
                  <div className="dock-tooltip">{file.name}</div>
                </div>
              );
            })}

            {minimizedWindows.length > 0 && <div className="dock-separator" />}
            {minimizedWindows.map(([fileId]) => {
              const file = FILES.find(f => f.id === fileId);
              if (!file) return null;
              return (
                <div
                  key={`min-${fileId}`}
                  className="taskbar-chip"
                  onClick={() => openFile(fileId)}
                >
                  {file.icon} {file.name}
                </div>
              );
            })}
          </div>

          {showActivities && (
            <div className="activities-overlay" onClick={() => setShowActivities(false)}>
              <div className="activities-title">Activities</div>
              <div className="activities-subtitle">Click a file to open it</div>
              <div className="activities-grid" onClick={(e) => e.stopPropagation()}>
                {FILES.map(file => (
                  <div
                    key={file.id}
                    className="activities-card"
                    onClick={() => openFile(file.id)}
                  >
                    <span className="activities-card-icon">{file.icon}</span>
                    <span className="activities-card-label">{file.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {contextMenu && (
            <div
              className="context-menu"
              style={{ top: contextMenu.y, left: contextMenu.x }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="context-menu-item" onClick={() => { FILES.forEach(f => openFile(f.id)); setContextMenu(null); }}>
                📂 &nbsp;Open All Files
              </div>
              <div className="context-menu-sep" />
              {FILES.map(file => (
                <div
                  key={file.id}
                  className="context-menu-item"
                  onClick={() => { openFile(file.id); setContextMenu(null); }}
                >
                  {file.icon} &nbsp;Open {file.name}
                </div>
              ))}
              <div className="context-menu-sep" />
              <div className="context-menu-item" onClick={() => { setShowActivities(true); setContextMenu(null); }}>
                🔍 &nbsp;Activities Overview
              </div>
              <div className="context-menu-item" onClick={() => { setShowSystemInfo(true); setContextMenu(null); }}>
                ⚙️ &nbsp;Settings
              </div>
            </div>
          )}
          {/* ── SYSTEM INFO MODAL ── */}
{showSystemInfo && (
  <div className="sysinfo-overlay" onClick={() => setShowSystemInfo(false)}>
    <div className="sysinfo-modal" onClick={e => e.stopPropagation()}>
      <button className="sysinfo-close" onClick={() => setShowSystemInfo(false)}>✕</button>

      {/* ASCII art logo */}
      <div className="sysinfo-ascii">{`
   ██╗  ██╗
   ██║  ██║
   ███████║
   ██╔══██║
   ██║  ██║
   ╚═╝  ╚═╝
  hrick.me
      `}</div>

      {/* Info rows */}
      <div className="sysinfo-right">
        <div className="sysinfo-title">hritabrata@portfolio</div>
        <hr className="sysinfo-divider" />

        {[
          ['OS',       'Ubuntu 24.04 LTS (Portfolio Edition)'],
          ['Host',     'Chitkara University — B.E. CSE AI & ML'],
          ['Kernel',   'hrick-kernel 4.0.0-stable'],
          ['Uptime',   'Since Aug 2024'],
          ['Shell',    'bash — FastAPI · Next.js · Python'],
          ['Role',     'Web Dev @ GDG On Campus'],
          ['CPU',      'Intel i5 12th Gen'],
          ['GPU',      'NVIDIA RTX 4050 (120W)'],
          ['Memory',   '16 GB RAM'],
          ['Stack',    'React · Node · FastAPI · Qdrant · AWS'],
          ['Projects', 'R.I.S.H.I. · CFOX.ai · Shramo.ai · SplitIn'],
          ['GitHub',   <a href="https://github.com/Hrick-08" target="_blank" rel="noopener noreferrer">github.com/Hrick-08</a>],
          ['Portfolio',<a href="https://hrick.me" target="_blank" rel="noopener noreferrer">hrick.me</a>],
        ].map(([key, val]) => (
          <div className="sysinfo-row" key={key}>
            <span className="sysinfo-key">{key}</span>
            <span className="sysinfo-val">{val}</span>
          </div>
        ))}

        <div className="sysinfo-palette">
          {['#E95420','#77216F','#5E2750','#569cd6','#4ec9b0','#dcdcaa','#6a9955','#ce9178'].map(c => (
            <div key={c} className="sysinfo-swatch" style={{ background: c }} title={c} />
          ))}
        </div>
      </div>
    </div>
  </div>
)}
        </div>
      )}
    </>
  );
}