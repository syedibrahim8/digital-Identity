import { SETTLEMENT } from "@/content/settlement";

/**
 * The habitat, as a two-view engineering drawing: an end section looking down
 * the spin axis, and a side elevation showing length.
 *
 * Two views rather than one because four tubes distributed around an axis
 * collapse into an unreadable tangle in a single elevation — which is exactly
 * why real drawing sheets carry a section alongside the elevation.
 *
 * SVG, not WebGL, deliberately: this is the tier-0 rendering that
 * reduced-motion visitors, no-WebGL browsers and crawlers get permanently.
 * Phase 4 layers a real rotating hull over it; this drawing stays underneath.
 */

// End section, looking along the spin axis.
const SEC_X = -108;
const HULL_R = 38;
const TUBE_R = 14;
const TUBE_ORBIT = 66;
const BALLOON_ORBIT = 94;

// Side elevation.
const ELEV_X = 118;
const ELEV_HALF = 84;
const ELEV_RY = 30;
const ELEV_CAP_RX = 11;

function polar(deg: number, r: number) {
  const rad = (deg * Math.PI) / 180;
  return [r * Math.cos(rad), r * Math.sin(rad)] as const;
}

export function SettlementDrawing({ className = "" }: { className?: string }) {
  // Sectors at the four cardinal positions around the hull.
  const sectors = SETTLEMENT.sectors.map((sector, i) => ({
    ...sector,
    angle: i * 90 - 90,
  }));

  return (
    <svg
      viewBox="-220 -128 440 256"
      className={className}
      role="img"
      aria-label="Two-view engineering drawing of the settlement: an end section showing a central pressurised hull with four sector tubes arranged around it, and a side elevation showing the cylinder's length"
    >
      {/* ---------- END SECTION ---------- */}
      <g>
        {/* Centre lines. */}
        <line x1={SEC_X - BALLOON_ORBIT} y1="0" x2={SEC_X + BALLOON_ORBIT} y2="0" stroke="var(--color-construct)" strokeWidth="0.6" strokeDasharray="10 4 2 4" />
        <line x1={SEC_X} y1={-BALLOON_ORBIT} x2={SEC_X} y2={BALLOON_ORBIT} stroke="var(--color-construct)" strokeWidth="0.6" strokeDasharray="10 4 2 4" />

        {sectors.map((sector) => {
          const [tx, ty] = polar(sector.angle, TUBE_ORBIT);
          const [sx, sy] = polar(sector.angle, HULL_R);
          const [ex, ey] = polar(sector.angle, TUBE_ORBIT - TUBE_R);
          const [bx, by] = polar(sector.angle, BALLOON_ORBIT);
          return (
            <g key={sector.n}>
              {/* Strut from hull to sector tube. */}
              <line x1={SEC_X + sx} y1={sy} x2={SEC_X + ex} y2={ey} stroke="var(--color-object)" strokeWidth="1" />
              {/* The sector tube in section. */}
              <circle cx={SEC_X + tx} cy={ty} r={TUBE_R} fill="var(--color-vellum)" stroke="var(--color-object)" strokeWidth="1.2" />
              {/* Balloon. */}
              <circle cx={SEC_X + bx} cy={by} r="10" fill="var(--color-vellum)" stroke="var(--color-annotate)" strokeWidth="0.9" />
              <text x={SEC_X + bx} y={by + 3.5} textAnchor="middle" fill="var(--color-annotate)" style={{ fontFamily: "var(--font-dim)", fontSize: "10px" }}>
                {sector.n}
              </text>
            </g>
          );
        })}

        {/* Pressurised hull, drawn last so struts terminate under it. */}
        <circle cx={SEC_X} cy="0" r={HULL_R} fill="var(--color-vellum)" stroke="var(--color-object)" strokeWidth="1.5" />
        {/* Section hatching, the convention for cut material. */}
        <circle cx={SEC_X} cy="0" r={HULL_R * 0.62} fill="none" stroke="var(--color-object)" strokeWidth="0.7" />

        {/* Rotation, which is what produces gravity in the tubes. */}
        <g stroke="var(--color-annotate)" strokeWidth="0.9" fill="none">
          <path d={`M ${SEC_X - 14} ${-HULL_R * 0.42} A 16 16 0 0 1 ${SEC_X + 14} ${-HULL_R * 0.42}`} />
          <path d={`M ${SEC_X + 9} ${-HULL_R * 0.42 - 5} L ${SEC_X + 15} ${-HULL_R * 0.42} L ${SEC_X + 9} ${-HULL_R * 0.42 + 4}`} />
        </g>

        <text x={SEC_X} y="118" textAnchor="middle" fill="var(--color-read-soft)" style={{ fontFamily: "var(--font-dim)", fontSize: "9px" }}>
          SECTION A–A
        </text>
      </g>

      {/* ---------- SIDE ELEVATION ---------- */}
      <g>
        <line x1={ELEV_X - ELEV_HALF - 26} y1="0" x2={ELEV_X + ELEV_HALF + 26} y2="0" stroke="var(--color-construct)" strokeWidth="0.6" strokeDasharray="10 4 2 4" />

        {/* Sector tubes read as two bands above and below the hull. */}
        {[-1, 1].map((side) => (
          <g key={side}>
            <line x1={ELEV_X - ELEV_HALF + 8} y1={side * TUBE_ORBIT * 0.82} x2={ELEV_X + ELEV_HALF - 8} y2={side * TUBE_ORBIT * 0.82} stroke="var(--color-object)" strokeWidth="1.1" />
            <line x1={ELEV_X - ELEV_HALF + 8} y1={side * (TUBE_ORBIT * 0.82 - TUBE_R * 0.9)} x2={ELEV_X + ELEV_HALF - 8} y2={side * (TUBE_ORBIT * 0.82 - TUBE_R * 0.9)} stroke="var(--color-object)" strokeWidth="1.1" />
            <ellipse cx={ELEV_X + ELEV_HALF - 8} cy={side * (TUBE_ORBIT * 0.82 - TUBE_R * 0.45)} rx="5" ry={TUBE_R * 0.45} fill="var(--color-vellum)" stroke="var(--color-object)" strokeWidth="1" />
            {/* Struts. */}
            {[-0.5, 0.5].map((at) => (
              <line key={at} x1={ELEV_X + at * ELEV_HALF} y1={side * ELEV_RY} x2={ELEV_X + at * ELEV_HALF} y2={side * (TUBE_ORBIT * 0.82 - TUBE_R * 0.9)} stroke="var(--color-object)" strokeWidth="0.9" />
            ))}
          </g>
        ))}

        {/* The hull. */}
        <ellipse cx={ELEV_X - ELEV_HALF} cy="0" rx={ELEV_CAP_RX} ry={ELEV_RY} fill="none" stroke="var(--color-construct)" strokeWidth="0.7" strokeDasharray="4 3" />
        <line x1={ELEV_X - ELEV_HALF} y1={-ELEV_RY} x2={ELEV_X + ELEV_HALF} y2={-ELEV_RY} stroke="var(--color-object)" strokeWidth="1.5" />
        <line x1={ELEV_X - ELEV_HALF} y1={ELEV_RY} x2={ELEV_X + ELEV_HALF} y2={ELEV_RY} stroke="var(--color-object)" strokeWidth="1.5" />
        <ellipse cx={ELEV_X + ELEV_HALF} cy="0" rx={ELEV_CAP_RX} ry={ELEV_RY} fill="var(--color-vellum)" stroke="var(--color-object)" strokeWidth="1.5" />

        {/* Length dimension with terminators. */}
        <g stroke="var(--color-annotate)" strokeWidth="0.8">
          <line x1={ELEV_X - ELEV_HALF} y1="96" x2={ELEV_X + ELEV_HALF} y2="96" />
          <line x1={ELEV_X - ELEV_HALF} y1="90" x2={ELEV_X - ELEV_HALF} y2="102" />
          <line x1={ELEV_X + ELEV_HALF} y1="90" x2={ELEV_X + ELEV_HALF} y2="102" />
        </g>
        <text x={ELEV_X} y="118" textAnchor="middle" fill="var(--color-read-soft)" style={{ fontFamily: "var(--font-dim)", fontSize: "9px" }}>
          ELEVATION
        </text>
      </g>
    </svg>
  );
}
