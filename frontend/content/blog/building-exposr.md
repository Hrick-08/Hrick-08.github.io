---
title: "Building Exposr: A Reverse Tunneling CLI in Python"
date: "2026-09-12"
description: "How I built a reverse TCP/UDP tunneling tool using asyncio, and what I learned about networking along the way."
tags: ["Python", "Networking", "asyncio", "CLI"]
published: true
---

If you've ever wanted to show a friend something running on `localhost` without deploying it anywhere, you've probably reached for ngrok or one of its clones. I wanted to understand how that magic actually works under the hood, so instead of just using a tool like that, I built my own: **Exposr**, a reverse TCP/UDP tunneling CLI written in Python.

It's live on PyPI (`pip install exposr`), currently sitting at v0.5.4, and it's very much an experimental proof of concept — but it works, and building it taught me more about networking than any course could have.

## The Core Idea

The basic problem Exposr solves: your laptop is behind NAT, has no public IP, and you want the outside world to hit a port on it anyway. The classic trick is to flip the connection direction. Instead of the internet connecting *to* you, your machine connects *out* to a relay server you control, and keeps that connection alive. When a public request comes in on the relay, it gets forwarded back down that tunnel to your local service.

So the architecture ended up with two pieces:

- **An agent** that runs on your local machine, dials out to the relay, and forwards traffic to whatever local port you're exposing.
- **A relay server** sitting on a public IP, which accepts incoming public connections and pipes them through to the right agent.

## Why asyncio

I built this on Python's `asyncio` rather than threads, mostly because the connection model made more sense as coroutines than as blocking sockets. The agent maintains one persistent **control connection** to the relay — this is the heartbeat of the whole system, used for registration and coordination — and then opens a **separate data connection for every incoming public connection**. That separation was one of the trickier design decisions: mixing control messages and raw tunneled bytes on the same socket gets messy fast, so keeping them apart made the protocol much easier to reason about, at the cost of a bit more connection overhead.

Each simultaneous connection gets tagged with a UUID so the relay and agent can keep track of which data connection maps to which public client, since there can be many of these open at once.

## Getting It Actually Running

I deployed and tested the relay on an Azure `Standard_B1s` VM in Central India, running Ubuntu 24.04 — about as bare-bones a box as you can get, which was actually useful for forcing the code to be efficient rather than relying on generous specs.

Some of the features I ended up needing to build in, once I started actually using it day to day:

- Dynamic public port registration, with a fallback range in case the requested port is taken
- Automatic agent reconnection, because relay connections *will* drop and you don't want to manually restart the agent every time
- Colored logging, mostly for my own sanity while debugging connection state
- A CLI interface to tie all of this together

## The Performance Reality Check

Once v0.4 was stable enough, I benchmarked it against a direct (non-tunneled) baseline, and the numbers were humbling:

- **Latency:** 547.77ms tunneled vs 80.80ms direct — roughly 435ms of protocol overhead
- **Throughput:** dropped from 12.4 req/s direct to 1.8 req/s tunneled

That's a big hit, and it was a useful reminder that "it works" and "it works well" are very different bars. A lot of that overhead almost certainly comes from the double-hop connection model (control + per-connection data sockets) and the lack of any connection pooling or multiplexing — there's real room to optimize here, and it's high on the list of things to revisit.

## What's Missing (On Purpose, For Now)

Exposr is explicitly a proof of concept, and it shows in the current limitation list:

- No encryption or TLS — traffic between agent and relay is currently plaintext
- No domain or subdomain routing — you get a raw port, not a nice `yourapp.exposr.dev` URL
- No user accounts or dashboard
- No rate limiting

None of these were oversights so much as scope decisions — I wanted to get the core tunneling mechanism working and correct before layering on the things that make a tool production-ready.

## What's Next

The roadmap I'm working from includes:

- TLS encryption end-to-end
- Domain support, so tunnels get a real hostname
- CLI commands for checking status and managing active tunnels


If you want to use it yourself, the docs are at [https://exposr.hrick.in](https://exposr.hrick.in), and the source is on PyPI. It's not going to replace ngrok anytime soon, but as a way to actually understand reverse tunneling instead of just consuming it as a black box, it's been one of the more rewarding things I've built.