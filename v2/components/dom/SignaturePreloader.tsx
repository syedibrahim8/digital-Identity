"use client";

import { useEffect, useId, useRef, useSyncExternalStore, type CSSProperties } from "react";
import { SIGNATURE } from "@/content/signature";

/**
 * The opening: Ibrahim's own signature written onto the vellum, then lifted
 * away to reveal the sheet.
 *
 * Every frame shows the real ink. Each stroke is the outline traced from the
 * scan, seen through a mask whose pen path draws itself with
 * stroke-dashoffset — so the thickness, pooling and wobble of the hand survive
 * instead of being redrawn at one uniform width.
 *
 * Why it costs the page nothing:
 *
 *  - The motion is CSS. Drawing starts on first paint, before hydration, and
 *    the veil hides itself (`visibility: hidden`) even if JS never arrives.
 *    JavaScript only adds skip-on-input and removes the node afterwards.
 *    framer-motion is deliberately not used: its pathLength runs in a JS frame
 *    loop (this app keeps exactly one) and could not start until hydration.
 *  - The portfolio renders underneath from the first byte; this only covers it.
 *  - An inline script decides before paint whether to play: once per tab
 *    session, never on a deep link (#hash, ?module=). Without JS it never shows.
 *  - The decision is per document, so client-side navigation back to the home
 *    page never replays it.
 */

/** Blank vellum before the pen touches down. */
const LEAD_MS = 100;
/** The finished signature rests before it lifts. */
const HOLD_MS = 280;
/** The signature rises and fades. */
const LIFT_MS = 560;
/**
 * The veil clears once the signature is mostly gone, so a half-faded
 * signature never sits over a half-revealed page.
 */
const VEIL_DELAY_MS = 200;
const VEIL_MS = 520;

const EXIT_AT = LEAD_MS + SIGNATURE.duration + HOLD_MS;

const SESSION_KEY = "sig-preloader";

/* Runs while the HTML is parsed, before the preloader can paint. */
const DECIDE = `(function(){var el=document.currentScript.parentNode;try{if(location.hash||/[?&]module=/.test(location.search)||sessionStorage.getItem("${SESSION_KEY}"))return;sessionStorage.setItem("${SESSION_KEY}","1")}catch(e){}el.setAttribute("data-play","")})()`;

const EXIT_ANIMATIONS = new Set(["sig-lift", "sig-veil"]);

/*
 * Whether the preloader is still on screen.
 *
 * The server always emits the markup (the inline script decides whether it
 * shows); the client reads what that script decided. useSyncExternalStore
 * renders the server snapshot during hydration and swaps after, so a visit
 * that does not play drops the node without a hydration mismatch.
 */
type Phase = "playing" | "gone";
let phase: Phase | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => void listeners.delete(listener);
}

function getSnapshot(): Phase {
  phase ??= document.querySelector("[data-sig-preloader][data-play]") ? "playing" : "gone";
  return phase;
}

const getServerSnapshot = (): Phase => "playing";

function dismiss() {
  if (phase === "gone") return;
  phase = "gone";
  listeners.forEach((listener) => listener());
}

const nameOf = (animation: Animation) => (animation as CSSAnimation).animationName;
const delayOf = (animation: Animation) => Number(animation.effect?.getTiming().delay ?? 0);
const elapsed = (animation: Animation) => Number(animation.currentTime ?? 0);

export function SignaturePreloader() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const rootRef = useRef<HTMLDivElement>(null);
  const maskId = `sig${useId().replace(/[^\w-]/g, "")}`;

  useEffect(() => {
    const root = rootRef.current;
    if (current !== "playing" || !root || typeof root.getAnimations !== "function") return;

    const exits = root.getAnimations({ subtree: true }).filter((a) => EXIT_ANIMATIONS.has(nameOf(a)));
    const veil = exits.find((a) => nameOf(a) === "sig-veil");

    // Hydration can land after the veil has already cleared on its own.
    if (!veil || veil.playState === "finished") {
      dismiss();
      return;
    }

    let live = true;
    veil.finished.then(
      () => live && dismiss(),
      () => {}, // cancelled: the node unmounted first
    );

    // Once the exit begins, the page underneath takes input again.
    const release = () => {
      root.dataset.leaving = "";
    };
    const exitStart = Math.min(...exits.map((a) => delayOf(a) - elapsed(a)));
    const releaseTimer = window.setTimeout(release, Math.max(0, exitStart));

    // Any input means the reader wants the page: finish the ink, leave now.
    const controller = new AbortController();
    const skip = () => {
      controller.abort();
      for (const animation of root.getAnimations({ subtree: true })) {
        if (!EXIT_ANIMATIONS.has(nameOf(animation))) animation.finish();
      }
      // Pull the exit forward to this moment, keeping the lift/veil stagger.
      const shift = Math.min(...exits.map((a) => delayOf(a) - elapsed(a)));
      if (shift > 0) {
        for (const animation of exits) animation.currentTime = elapsed(animation) + shift;
      }
      release();
    };
    const options = { passive: true, signal: controller.signal } as const;
    window.addEventListener("wheel", skip, options);
    window.addEventListener("touchstart", skip, options);
    window.addEventListener("pointerdown", skip, options);
    window.addEventListener("keydown", skip, options);

    return () => {
      live = false;
      controller.abort();
      window.clearTimeout(releaseTimer);
    };
  }, [current]);

  if (current === "gone") return null;

  const { width, height, strokes } = SIGNATURE;

  return (
    <div
      ref={rootRef}
      data-sig-preloader=""
      className="sig-preloader"
      aria-hidden="true"
      // The inline script adds data-play before hydration.
      suppressHydrationWarning
      style={
        {
          "--sig-lead": `${LEAD_MS}ms`,
          "--sig-exit-at": `${EXIT_AT}ms`,
          "--sig-lift-ms": `${LIFT_MS}ms`,
          "--sig-veil-at": `${EXIT_AT + VEIL_DELAY_MS}ms`,
          "--sig-veil-ms": `${VEIL_MS}ms`,
        } as CSSProperties
      }
    >
      <script dangerouslySetInnerHTML={{ __html: DECIDE }} />
      <svg
        className="sig-mark"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        fill="currentColor"
        focusable="false"
      >
        <defs>
          {strokes.map((stroke, i) => (
            <mask
              key={stroke.id}
              id={`${maskId}-${i}`}
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={width}
              height={height}
            >
              <path
                className="sig-pen"
                d={stroke.pen}
                pathLength={1}
                fill="none"
                stroke="#fff"
                strokeWidth={stroke.width}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={
                  {
                    "--sig-start": `${stroke.start}ms`,
                    "--sig-dur": `${stroke.duration}ms`,
                    "--sig-ease": stroke.ease,
                  } as CSSProperties
                }
              />
              {stroke.pools.map((pool, k) => (
                <circle
                  key={k}
                  className="sig-pool"
                  cx={pool.cx}
                  cy={pool.cy}
                  r={pool.r}
                  fill="#fff"
                  style={{ "--sig-start": `${pool.at}ms` } as CSSProperties}
                />
              ))}
            </mask>
          ))}
        </defs>
        {strokes.map((stroke, i) => (
          <path key={stroke.id} d={stroke.ink} mask={`url(#${maskId}-${i})`} />
        ))}
      </svg>
    </div>
  );
}
