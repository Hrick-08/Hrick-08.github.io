# Build Guide — Hrick Developer Portfolio

Build a production-quality personal developer portfolio for **Hritabrata Das ("Hrick")** as a monorepo.

The design direction should sit between:
- Dale Larroder — https://www.dalelarroder.com/
- Khanh Nguyen — https://khanhnguyen.design/

Do NOT copy either site's exact design, layout, assets, text, or implementation.

The target aesthetic is:

**minimal + editorial + technical + personal**

The portfolio should feel like a carefully designed digital publication created by a developer, NOT like a generic developer portfolio template.

---

# 1. PROJECT STRUCTURE

Use this monorepo structure:

```text
/
├── frontend/
└── backend/
```

Keep the backend directory named exactly:

```text
backend/
```

The frontend directory must be:

```text
frontend/
```

Both applications should be independently runnable and deployable.

---

# 2. TECHNOLOGY STACK

## Frontend

Use:

- Next.js
- TypeScript
- Tailwind CSS
- Motion / Framer Motion for subtle animation
- Modern component architecture
- Responsive design
- SEO optimization
- Accessible semantic HTML

Use Next.js App Router.

Prefer React Server Components wherever client-side functionality is not required.

Only use client components where interaction, browser APIs, or the live GitHub connection requires them.

## Backend

Use:

- Python
- FastAPI
- Uvicorn
- Pydantic / pydantic-settings
- PostgreSQL where persistence is required
- Async-first implementation
- Docker-ready architecture

The backend will eventually be deployed independently at:

```text
https://api.hrick.in
```

The backend's local directory must nevertheless remain:

```text
backend/
```

The frontend should communicate with the backend through an environment-configured API URL.

Do NOT hardcode localhost or production URLs into application logic.

---

# 3. BACKEND — GITHUB ACTIVITY SYSTEM

The backend's primary dynamic responsibility is powering GitHub activity for the portfolio.

The intended architecture is:

```text
GitHub
   │
   │ repository events
   ▼
GitHub App Webhook
   │
   ▼
FastAPI backend
   │
   ├── validate webhook signature
   ├── parse event
   ├── normalize activity
   ├── persist activity
   └── broadcast update
           │
           ▼
       WebSocket
           │
           ▼
       Next.js frontend
```

The frontend must NOT communicate directly with GitHub for private/authenticated operations.

GitHub App credentials and webhook secrets must remain server-side.

---

# 4. GITHUB APP

Design the backend around a GitHub App.

Use environment variables:

```env
GITHUB_APP_ID=
GITHUB_PRIVATE_KEY=
GITHUB_WEBHOOK_SECRET=
GITHUB_INSTALLATION_ID=
```

Never commit private keys, secrets, tokens, or `.env` files.

Create a dedicated GitHub service/client abstraction.

GitHub-specific logic should not be scattered throughout API route handlers.

A suitable structure is:

```text
backend/
├── app/
│   ├── main.py
│   ├── config.py
│   │
│   ├── api/
│   │   ├── github.py
│   │   ├── activity.py
│   │   └── webhooks.py
│   │
│   ├── services/
│   │   ├── github_service.py
│   │   ├── activity_service.py
│   │   └── realtime_service.py
│   │
│   ├── models/
│   ├── schemas/
│   ├── db/
│   └── core/
│
├── tests/
├── Dockerfile
├── requirements.txt
├── .env.example
└── README.md
```

Adapt the structure if a better architecture is appropriate, but keep responsibilities clearly separated.

---

# 5. GITHUB WEBHOOK

Create:

```http
POST /webhooks/github
```

The endpoint must:

- Validate GitHub's HMAC SHA-256 webhook signature.
- Use `X-Hub-Signature-256`.
- Reject invalid signatures.
- Never trust webhook payloads without verification.
- Return appropriate HTTP status codes.
- Avoid logging secrets or sensitive payload information.

Handle at minimum:

- `push`
- `create`
- `delete`
- `pull_request`

Optionally support:

- `issues`
- `release`

Only implement additional events if they provide meaningful portfolio activity.

---

# 6. PUSH EVENT PROCESSING

For GitHub `push` events, extract and normalize:

- repository name
- repository URL
- branch/ref
- commit SHA
- commit message
- author
- timestamp
- commit URL
- additions
- deletions
- changed files where available

Do not expose raw GitHub webhook payloads directly to the frontend.

Create an internal normalized activity schema.

Example:

```json
{
  "type": "commit",
  "repository": "exposr",
  "repository_url": "https://github.com/Hrick-08/exposr",
  "branch": "main",
  "sha": "8f31c2a",
  "message": "Improve connection reuse",
  "author": "Hrick",
  "timestamp": "2026-09-12T00:00:00Z",
  "url": "https://github.com/...",
  "additions": 20,
  "deletions": 8
}
```

Keep the schema stable and frontend-friendly.

---

# 7. DATABASE

Use PostgreSQL for persistent GitHub activity.

Create an activity model containing at least:

```text
id
event_type
repository
repository_url
branch
commit_sha
commit_message
author
timestamp
url
additions
deletions
created_at
```

Add suitable indexes for:

- repository
- timestamp
- commit SHA

Prevent duplicate commit/activity records using an appropriate uniqueness strategy.

Do not introduce Redis unless it is genuinely useful.

If Redis is used later for pub/sub or distributed WebSocket broadcasting, isolate that functionality behind a service abstraction.

---

# 8. REAL-TIME ACTIVITY

The portfolio must display new GitHub activity without requiring a page refresh.

Use WebSockets.

Create:

```http
WS /ws/activity
```

Flow:

```text
GitHub push
     ↓
Webhook
     ↓
FastAPI
     ↓
Persist activity
     ↓
Broadcast normalized event
     ↓
Connected frontend clients
```

When a new push is processed, broadcast an event such as:

```json
{
  "type": "commit",
  "repository": "exposr",
  "branch": "main",
  "sha": "8f31c2a",
  "message": "Improve connection reuse",
  "author": "Hrick",
  "timestamp": "2026-09-12T00:00:00Z",
  "url": "https://github.com/..."
}
```

The WebSocket implementation must:

- support multiple clients
- handle disconnects gracefully
- remove dead connections
- never crash because one client disconnects
- avoid blocking webhook processing
- avoid duplicate broadcasts where possible
- support reconnecting clients

If the application later runs multiple backend instances, make the realtime layer replaceable with Redis/pub-sub rather than tightly coupling the code to in-memory broadcasting.

---

# 9. REST API

Create:

```http
GET /api/activity
```

Support query parameters:

```text
limit
repository
branch
since
```

Example response:

```json
{
  "items": [
    {
      "type": "commit",
      "repository": "exposr",
      "branch": "main",
      "message": "Improve connection reuse",
      "sha": "8f31c2a",
      "author": "Hrick",
      "timestamp": "2026-09-12T00:00:00Z",
      "url": "https://github.com/..."
    }
  ]
}
```

Also create:

```http
GET /api/activity/latest
```

Return the latest activity.

Create:

```http
GET /api/github/repos
```

Return repositories that are configured to appear on the portfolio.

Do not expose private repositories unless explicitly configured.

Create:

```http
GET /api/health
```

Return backend health/status.

Use Pydantic response models for all public API responses.

---

# 10. CORS AND SECURITY

Configure CORS through environment variables.

Example:

```env
CORS_ORIGINS=http://localhost:3000
```

Production should use the actual frontend origin.

Do NOT use wildcard CORS in production.

Implement:

- environment-based secrets
- webhook signature validation
- request validation
- safe error responses
- structured logging
- no secret leakage
- no stack traces in production
- sensible rate limiting where appropriate

---

# 11. BACKEND CONFIGURATION

Create:

```text
backend/.env.example
```

with:

```env
GITHUB_APP_ID=
GITHUB_PRIVATE_KEY=
GITHUB_WEBHOOK_SECRET=
GITHUB_INSTALLATION_ID=

DATABASE_URL=

CORS_ORIGINS=http://localhost:3000
```

Create a clean settings system using Pydantic settings.

Never access environment variables ad hoc throughout the application.

---

# 12. FRONTEND — DESIGN DIRECTION

Build a highly polished personal developer portfolio.

The design should combine:

## Dale Larroder

Take inspiration from:

- restraint
- typography
- whitespace
- minimal navigation
- concise copy
- developer-first presentation
- projects as proof of ability

## Khanh Nguyen

Take inspiration from:

- editorial composition
- numbered sections
- chapters
- strong visual hierarchy
- grids
- subtle borders
- intentional typography
- the feeling of moving through a designed publication

Do not clone either website.

Create an original visual identity.

---

# 13. DESIGN PRINCIPLES

The site should be:

- minimal
- editorial
- technical
- sophisticated
- personal
- slightly experimental
- extremely clean

Avoid:

- generic portfolio templates
- SaaS landing-page styling
- excessive gradients
- excessive glassmorphism
- giant 3D objects
- floating laptops
- skill percentage bars
- huge logo walls
- excessive cards
- unnecessary icons
- animated blobs
- visual clutter
- excessive parallax
- cursor-following gimmicks

The layout itself should provide the visual identity.

Typography, whitespace, grid, borders, scale, and composition should do most of the work.

---

# 14. COLOR SYSTEM

Use a restrained monochrome palette.

Default direction:

- warm/off-white background
- near-black primary text
- muted gray secondary text
- subtle border gray
- one restrained accent color

Support dark mode.

Do not use a rainbow palette.

Dark mode should feel deliberately designed rather than simply inverted.

---

# 15. TYPOGRAPHY

Typography is one of the main design elements.

Use a high-quality modern sans-serif.

Optionally pair it with:

- a serif display face
OR
- a monospace font for technical metadata.

Use monospace sparingly for things like:

```text
01
2026
main
8f31c2a
Python
FastAPI
```

Large headings should feel editorial.

Avoid excessive font weights.

Create a consistent typography scale.

---

# 16. NAVIGATION

Keep navigation extremely minimal.

Concept:

```text
Hrick

01. About
02. Work
03. Now
04. Contact

GitHub ↗
LinkedIn ↗
```

Desktop can use a persistent/simple top navigation.

Mobile should use a compact, elegant navigation.

Navigation should never dominate the page.

---

# 17. HERO

Do NOT use a generic:

> Hi, I'm Hrick, I'm a passionate developer...

Instead use short, confident copy.

Direction:

```text
Hrick

Software engineer & builder.

I build software, APIs, AI systems,
and things for the web.

GitHub ↗
LinkedIn ↗
```

The exact copy may be refined during implementation.

The hero should have substantial whitespace.

Make the typography carry the section.

---

# 18. ABOUT

Create an editorial About section.

Include:

- who I am
- what I build
- what I am interested in
- current education
- relevant experience

Keep it concise.

Do not turn it into a long biography.

---

# 19. SELECTED WORK

This is the most important section of the site.

Projects should receive significantly more visual attention than the skills section.

Use large editorial project entries rather than small cards.

## Project 01 — R.I.S.H.I.

Technologies:

```text
Electron
Qdrant
RAG
Whisper
OpenClaw
EC2
Python
```

Description:

An autonomous AI companion capable of executing real tasks across devices through a unified backend.

Highlights:

- multi-provider LLM routing
- long-term RAG memory
- web search
- image generation
- file management
- email
- autonomous task execution

## Project 02 — Closetly

Technologies:

```text
React
Tailwind
Node/Express
FastAPI
MongoDB
Qdrant
Cloudinary
```

Description:

A full-stack fashion intelligence platform combining computer vision, visual search, outfit generation, product matching, and a RAG fashion agent.

Live:

```text
https://closetly.hrick.in
```

## Project 03 — Exposr

Technologies:

```text
Python
asyncio
TCP/UDP
Azure
```

Description:

A reverse TCP/UDP tunneling CLI that exposes local services publicly through a persistent relay agent.

Highlights:

- dynamic public ports
- automatic agent reconnection
- UUID-based data channels
- concurrent connections
- Azure relay infrastructure

The resume identifies Exposr as a published PyPI project and includes performance benchmarking details. Use those facts where appropriate, but do not exaggerate them.

---

# 20. PROJECT DATA MODEL

Make project content data-driven.

Create something like:

```text
frontend/
└── data/
    └── projects.ts
```

Each project should support:

```ts
title
year
description
technologies
github
liveUrl
image
featured
highlights
```

Do not repeatedly hardcode project markup.

Projects should be rendered through reusable components.

Design the data model so additional projects can be added later without changing the project UI.

---

# 21. PROJECT VISUALS

Each project should have a large visual area.

If real screenshots/assets are not available:

- create tasteful empty/placeholder visual treatment
- make the component ready to accept real images
- do NOT invent fake product screenshots
- do NOT imply features that do not exist

Project visuals should respond subtly to hover.

Example:

Normal:
- image at natural scale

Hover:
- tiny scale increase
- subtle metadata movement
- arrow movement

Keep the interaction understated.

---

# 22. LIVE GITHUB ACTIVITY

This is a major differentiator.

Create an editorial section such as:

```text
Recent activity
```

or:

```text
Building in public
```

It should not look like a monitoring dashboard.

Example:

```text
RECENT ACTIVITY

12 SEP 2026

exposr
Improve connection reuse

main · 8f31c2a

────────────────────────

11 SEP 2026

api.hrick.in
Add GitHub webhook handling

main · 1ac92ef
```

New activity should appear without refreshing the page.

Frontend flow:

1. Fetch initial activity through REST.
2. Render the initial list.
3. Establish WebSocket connection.
4. Receive normalized events.
5. Insert new events into the list.
6. Gracefully reconnect if the connection drops.
7. Avoid duplicates.

Use:

```env
NEXT_PUBLIC_API_URL=
```

Production WebSocket endpoint:

```text
wss://api.hrick.in/ws/activity
```

Local endpoint:

```text
ws://localhost:8000/ws/activity
```

Do not hardcode either value.

The live status indicator should be extremely subtle.

For example:

```text
● LIVE
```

Do not turn the section into a DevOps dashboard.

---

# 23. EXPERIENCE

Include:

```text
Web Developer
Google Developer Groups On Campus — Chitkara University
Aug 2024 – Present
```

Use concise portfolio-oriented copy.

Relevant facts from the resume include:

- built 2+ web platforms
- supported a community of 150+ student developers
- full-stack development for community events/workshops
- increased participation in Google tech programs by 40%
- mentored junior members
- participated in coding/design/aptitude competitions
- placed 3rd among 20+ teams in the Agentic Sprint Hackathon

Do not reproduce the resume word-for-word.

Transform it into polished portfolio copy.

Do not invent additional achievements.

---

# 24. TECHNICAL STACK

Do NOT create a giant grid of technology logos.

Use an editorial text-based treatment.

Example:

```text
I work across

LANGUAGES
Python · TypeScript · JavaScript · C++ · Java · SQL

WEB
React · Next.js · Node · Express · FastAPI

AI
RAG · Qdrant · LLM APIs · Agentic AI · Whisper

INFRASTRUCTURE
Docker · AWS · Azure · GCP · GitHub
```

Use the actual technologies supported by the resume.

The stack should communicate breadth without becoming a skills-wall.

---

# 25. CURRENTLY / NOW

Create a compact "Now" section.

Example direction:

```text
CURRENTLY

Building
R.I.S.H.I. and Exposr

Learning
Systems, AI infrastructure and better
full-stack architecture

Exploring
Agentic systems, networking and developer tools
```

Make the content easy to update from a single data file.

Do not claim activities that are not supported by the project information.

---

# 26. CONTACT

Keep this extremely minimal.

Direction:

```text
Have an idea?

Let's build it.

Email
GitHub
LinkedIn
```

Use:

```text
hritabratadas8@gmail.com
github.com/Hrick-08
linkedin.com/in/hritabrata-das
```

Do NOT display the phone number publicly unless it is explicitly configured as a public contact field.

---

# 27. FOOTER

Minimal:

```text
Hrick © 2026

Built with Next.js + FastAPI

GitHub ↗
LinkedIn ↗
```

---

# 28. ANIMATION

Use Motion / Framer Motion carefully.

Initial load:

- subtle staggered typography reveal
- navigation appears naturally
- hero content fades/slides a few pixels

On scroll:

- subtle section reveal
- small project image transitions

On hover:

- links move slightly
- arrows move slightly
- project media reacts subtly

Do NOT:

- animate everything
- use huge parallax
- use cursor-following effects
- use spinning objects
- use excessive blur
- use unnecessary loading animations

The site must remain visually strong with animations disabled.

Respect:

```text
prefers-reduced-motion
```

---

# 29. RESPONSIVE DESIGN

Design mobile-first.

Test at:

```text
375px
390px
768px
1024px
1440px
1920px
```

Desktop:

- editorial grid
- large typography
- generous margins
- project imagery

Tablet:

- preserve hierarchy
- reduce spacing appropriately

Mobile:

- natural typography scaling
- compact navigation
- vertical project layouts
- no horizontal overflow
- appropriately sized touch targets

The mobile version should feel intentionally designed, not like a collapsed desktop version.

---

# 30. SEO

Use Next.js metadata.

Title:

```text
Hrick — Software Engineer & Builder
```

Description:

```text
A personal portfolio showcasing Hrick's software projects, experiments, and work across web development, AI, backend systems and infrastructure.
```

Add:

- OpenGraph metadata
- Twitter/X metadata
- favicon
- robots.txt
- sitemap
- semantic HTML

---

# 31. PERFORMANCE

The site should be extremely fast.

Use:

- Next.js image optimization
- lazy loading where appropriate
- minimal client-side JavaScript
- Server Components wherever possible
- avoid unnecessary dependencies
- avoid loading animation libraries globally
- only the GitHub activity component should require a persistent client connection

Do not sacrifice performance for decorative effects.

---

# 32. CODE QUALITY

Use strict TypeScript.

Keep components small and composable.

Suggested structure:

```text
frontend/
├── app/
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── hero/
│   ├── about/
│   ├── projects/
│   ├── activity/
│   ├── experience/
│   ├── stack/
│   ├── now/
│   └── contact/
├── data/
│   ├── projects.ts
│   └── site.ts
├── lib/
├── public/
└── ...
```

Adapt this structure where appropriate.

Avoid a giant `page.tsx`.

Use reusable primitives.

Avoid duplicated markup.

---

# 33. ENVIRONMENT CONFIGURATION

Create:

```text
frontend/.env.example
```

with:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Create:

```text
backend/.env.example
```

with:

```env
GITHUB_APP_ID=
GITHUB_PRIVATE_KEY=
GITHUB_WEBHOOK_SECRET=
GITHUB_INSTALLATION_ID=
DATABASE_URL=
CORS_ORIGINS=http://localhost:3000
```

Never commit `.env`.

Configure `.gitignore` correctly.

---

# 34. LOCAL DEVELOPMENT

The root README must explain:

## Backend

```bash
cd backend

python -m venv .venv
```

Activate the virtual environment and install:

```bash
pip install -r requirements.txt
```

Run:

```bash
uvicorn app.main:app --reload --port 8000
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend should run on the normal Next.js development port.

Document:

1. backend setup
2. frontend setup
3. environment variables
4. GitHub App creation
5. GitHub App installation
6. webhook configuration
7. webhook testing
8. WebSocket testing
9. production deployment

---

# 35. DOCKER

Create Dockerfiles for both applications where appropriate.

The backend must be independently deployable.

The frontend must be independently deployable.

The production architecture should support:

```text
GitHub
    │
    │ HTTPS webhook
    ▼
api.hrick.in
    │
    ▼
FastAPI
    │
    ├── PostgreSQL
    │
    └── WebSocket
            │
            ▼
       Portfolio frontend
```

Production frontend configuration:

```env
NEXT_PUBLIC_API_URL=https://api.hrick.in
```

Production WebSocket:

```text
wss://api.hrick.in/ws/activity
```

The backend directory remains:

```text
backend/
```

Only the deployed hostname is:

```text
api.hrick.in
```

---

# 36. PERSONAL INFORMATION

Use the following verified information:

```text
Name:
Hritabrata Das

Preferred display name:
Hrick

Degree:
B.E. Computer Science and Engineering
AI & ML Specialization

University:
Chitkara University, Rajpura, Punjab

CGPA:
9.49 / 10

Expected graduation:
May 2028

GitHub:
github.com/Hrick-08

Portfolio:
hrick.in

LinkedIn:
linkedin.com/in/hritabrata-das

Email:
hritabratadas8@gmail.com
```

Experience:

```text
Web Developer
Google Developer Groups On Campus — Chitkara University
Aug 2024 – Present
```

Projects:

```text
R.I.S.H.I.
Closetly
Exposr
```

Use the resume as the factual source for project and experience claims.

Do not invent:

- companies
- employment
- awards
- clients
- testimonials
- project metrics
- technologies
- accomplishments

---

# 37. DESIGN QUALITY CHECK

Before considering the site complete, evaluate it against these questions:

### Does it look like a generic developer portfolio?

If yes, redesign it.

### Does it look like a SaaS landing page?

If yes, simplify it.

### Does the typography carry the design?

It should.

### Is whitespace intentional?

It should be.

### Are projects the main proof of ability?

They should be.

### Can someone understand what Hrick builds within 10 seconds?

They should.

### Does the GitHub live activity feel integrated into the portfolio?

It should.

### Does the page still look good without animation?

It should.

### Is every section necessary?

If not, remove it.

The final result should feel:

**sophisticated, restrained, technical, editorial, personal, slightly experimental, and extremely clean.**

It should NOT feel:

**corporate, flashy, template-like, overanimated, or cluttered.**

---

# 38. IMPLEMENTATION ORDER

Build the application in this order:

1. Set up monorepo
2. Set up FastAPI backend
3. Set up configuration system
4. Set up database layer
5. Implement GitHub App service
6. Implement webhook signature validation
7. Implement push event processing
8. Implement normalized activity model
9. Implement persistence
10. Implement WebSocket broadcasting
11. Implement REST activity endpoints
12. Set up Next.js frontend
13. Build typography/design system
14. Build navigation
15. Build hero
16. Build About
17. Build Projects
18. Build live GitHub activity
19. Build Experience
20. Build Stack
21. Build Now
22. Build Contact
23. Build footer
24. Add responsive behavior
25. Add subtle animation
26. Add SEO
27. Add loading/error/empty states
28. Integrate frontend/backend
29. Add Docker/deployment configuration
30. Write complete README
31. Test the complete application

Do not stop at scaffolding.

Implement the actual working application.

If functionality depends on credentials that are not available yet, implement the complete integration around environment variables and provide setup instructions rather than replacing it with fake/mock logic.

The finished repository should be production-oriented, maintainable, and ready for continued development.
