# PRODUCT.md — Syed Ibrahim Ali, portfolio ("The Machine")

Captured from the approved design brainstorm rather than a fresh interview; every
answer below came from the user directly in that session.

## What this is

A personal portfolio for **Syed Ibrahim Ali**, a fullstack engineer. One page, one
continuous scroll. Replaces an existing portfolio at `../client/`, which stays live
until this ships.

## Who it is for

Two audiences, deliberately both:

1. **Recruiters and hiring managers.** Skim for ~30 seconds. Win = they read the
   projects and make contact. They punish anything that delays content.
2. **Creative / design-led studios.** The site itself is the portfolio piece.
   Win = they screenshot and share it. They reward spectacle.

**The governing rule that resolves the conflict:** every 3D moment must *reveal*
content, never gate it. Spectacle is the delivery mechanism for the work, not a
curtain in front of it.

## Mode

**Experience.** The visitor is inside the work. The artifact leads from the first
viewport and the interface recedes — but content stays fully readable, indexed,
and reachable in one click, because of the recruiter audience.

## Product truth

- **Positioning:** "I build systems, not websites." Backed by real work — escrow
  with milestone-gated payment release and time-bound review windows, cron-driven
  background ingestion with a paginated API, large-dataset virtualization.
- **Concept:** "The Machine." Components scatter in dark space, converge and
  assemble into a working system as the visitor scrolls, then data flows through it.
  Each project is a module that detaches from the machine for inspection.
  The metaphor is derived from the work — it is not decoration.
- **Centerpiece:** the Influencer Marketplace (escrow). A payment travels the state
  machine: held → review window ticking → milestone met → released.
- **Distinctions:** NASA Ames Research Center; National Space Society space
  settlement conference.
- **Deliberately excluded:** academic records / CGPA. They live in the resume PDF,
  which is one click away on every screen. Also never published: address, phone,
  DOB, ID numbers.

## Constraints

- **Stack is fixed by the user:** Next.js, Three.js via React Three Fiber,
  framer-motion, lucide-react, pnpm, TypeScript, Tailwind v4.
- **`react` pinned to 19.2.3** — R3F 9.7.0 peers `>=19 <19.3` and 19.3 breaks at
  runtime. `three` pinned to 0.186.0 (postprocessing ceiling).
- **Mobile gets the same story at lower fidelity** — tiered quality, never a
  degraded or broken experience. Roughly half of visitors arrive on a phone.
- **Tier 0 (reduced-motion / no WebGL) must be a complete site**, not a fallback
  stub. It is also the SEO baseline.
- All copy lives in real DOM behind the canvas. `drei <Html>` is banned for content.
- One scroll authority (Lenis). Exactly one rAF in the app.
- No deadline. Built in phases; Phase 0 ends with a shippable site before any canvas.

## Success criteria

- A recruiter can reach any project's detail in one click and read it with the
  canvas disabled.
- A studio reviewer finds at least one moment worth screenshotting.
- 60fps at 1440p desktop; no jank on a mid-range phone.
- The site is interactive and playful — visitors should *do* things, not just watch.
