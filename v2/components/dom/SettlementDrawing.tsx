import { SETTLEMENT } from "@/content/settlement";

/**
 * The habitat: a central shaft with four tori threaded along it, each spinning
 * about the shaft axis to produce gravity in its own sector.
 *
 * Drawn as a single elevation because the arrangement is unambiguous from the
 * side — four stacked rings on a vertical spindle read instantly, where four
 * tubes distributed around an axis would not.
 *
 * Each torus is an annulus path with fill-rule evenodd, so the ring occludes
 * the shaft behind it while the shaft stays visible through the hole. That one
 * detail is what stops it reading as four flat washers.
 *
 * SVG, not WebGL, deliberately: this is the tier-0 rendering that
 * reduced-motion visitors, no-WebGL browsers and crawlers get permanently.
 * Phase 4 layers real rotating geometry over it; this drawing stays underneath.
 */

const SHAFT_RX = 14;
const SHAFT_CAP_RY = 5.5;
const SHAFT_TOP = -238;
const SHAFT_BOTTOM = 238;

const RING_R = 76; // torus major radius
const TUBE_R = 21; // torus minor radius
const TILT = 0.33; // viewing tilt: how open the rings read

const OUTER_RX = RING_R + TUBE_R;
const OUTER_RY = OUTER_RX * TILT;
const INNER_RX = RING_R - TUBE_R;
const INNER_RY = INNER_RX * TILT;

const BALLOON_X = 150;
const LEVELS = [-132, -44, 44, 132];

/** An ellipse as a path, so two can share one evenodd fill. */
function ellipsePath(rx: number, ry: number) {
  return `M ${-rx},0 a ${rx},${ry} 0 1,0 ${rx * 2},0 a ${rx},${ry} 0 1,0 ${-rx * 2},0 Z`;
}

const ANNULUS = `${ellipsePath(OUTER_RX, OUTER_RY)} ${ellipsePath(INNER_RX, INNER_RY)}`;

export function SettlementDrawing({ className = "" }: { className?: string }) {
  const rings = SETTLEMENT.sectors.map((sector, i) => ({ ...sector, y: LEVELS[i] }));

  return (
    <svg
      viewBox="-125 -258 300 516"
      className={className}
      role="img"
      aria-label="Engineering elevation of the settlement: a central cylindrical shaft with four tori threaded along it, each spinning about the shaft axis, numbered for their four sectors"
    >
      {/* Spin axis. */}
      <line
        x1="0"
        y1={SHAFT_TOP - 14}
        x2="0"
        y2={SHAFT_BOTTOM + 14}
        stroke="var(--color-construct)"
        strokeWidth="0.7"
        strokeDasharray="12 4 2 4"
      />

      {/* The shaft, drawn first so each ring occludes it. */}
      <g stroke="var(--color-object)" strokeWidth="1.4" fill="none">
        <line x1={-SHAFT_RX} y1={SHAFT_TOP} x2={-SHAFT_RX} y2={SHAFT_BOTTOM} />
        <line x1={SHAFT_RX} y1={SHAFT_TOP} x2={SHAFT_RX} y2={SHAFT_BOTTOM} />
        <ellipse cx="0" cy={SHAFT_TOP} rx={SHAFT_RX} ry={SHAFT_CAP_RY} fill="var(--color-vellum)" />
        <ellipse cx="0" cy={SHAFT_BOTTOM} rx={SHAFT_RX} ry={SHAFT_CAP_RY} fill="var(--color-vellum)" />
      </g>

      {rings.map((ring) => (
        <g key={ring.n} transform={`translate(0 ${ring.y})`}>
          {/* Ring body: occludes the shaft behind it, leaves the hole open. */}
          <path d={ANNULUS} fillRule="evenodd" fill="var(--color-vellum)" />

          {/* Silhouette and hole. */}
          <ellipse cx="0" cy="0" rx={OUTER_RX} ry={OUTER_RY} fill="none" stroke="var(--color-object)" strokeWidth="1.4" />
          <ellipse cx="0" cy="0" rx={INNER_RX} ry={INNER_RY} fill="none" stroke="var(--color-object)" strokeWidth="1.1" />

          {/* Tube cross-sections at the extremes — what makes it a torus, not a washer. */}
          <circle cx={-RING_R} cy="0" r={TUBE_R} fill="none" stroke="var(--color-object)" strokeWidth="0.8" opacity="0.5" />
          <circle cx={RING_R} cy="0" r={TUBE_R} fill="none" stroke="var(--color-object)" strokeWidth="0.8" opacity="0.5" />

          {/* Rotation about the shaft axis — this is what makes the gravity. */}
          <g stroke="var(--color-annotate)" strokeWidth="0.9" fill="none">
            <path d={`M ${-OUTER_RX - 8} -6 A 14 14 0 0 1 ${-OUTER_RX - 8} 12`} />
            <path d={`M ${-OUTER_RX - 12} 8 L ${-OUTER_RX - 8} 13 L ${-OUTER_RX - 3} 9`} />
          </g>

          {/* Balloon callout. */}
          <line x1={OUTER_RX - 2} y1="-4" x2={BALLOON_X - 11} y2="-10" stroke="var(--color-annotate)" strokeWidth="0.8" />
          <circle cx={BALLOON_X} cy="-10" r="11" fill="var(--color-vellum)" stroke="var(--color-annotate)" strokeWidth="0.9" />
          <text
            x={BALLOON_X}
            y="-6"
            textAnchor="middle"
            fill="var(--color-annotate)"
            style={{ fontFamily: "var(--font-dim)", fontSize: "10px" }}
          >
            {ring.n}
          </text>
        </g>
      ))}

      {/* Shaft label, as a drawing carries it. */}
      <line x1={SHAFT_RX} y1={SHAFT_TOP + 26} x2={BALLOON_X - 34} y2={SHAFT_TOP + 12} stroke="var(--color-annotate)" strokeWidth="0.8" />
      <text
        x={BALLOON_X - 30}
        y={SHAFT_TOP + 15}
        fill="var(--color-annotate)"
        style={{ fontFamily: "var(--font-dim)", fontSize: "9px" }}
      >
        SHAFT
      </text>
    </svg>
  );
}
