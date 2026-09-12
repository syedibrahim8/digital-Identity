/**
 * Where L5 is, and why it is stable.
 *
 * L4 and L5 sit at the third corner of an equilateral triangle formed with the
 * two primary bodies — so the geometry below is exact, not stylised: all three
 * sides are the same length by construction.
 */

const ORBIT = 62; // Earth–Moon separation, to scale with itself
const MOON_ANGLE = 0;
const L5_ANGLE = -60; // trailing the Moon by 60 degrees

function polar(deg: number, r: number) {
  const rad = (deg * Math.PI) / 180;
  return [r * Math.cos(rad), r * Math.sin(rad)] as const;
}

const [mx, my] = polar(MOON_ANGLE, ORBIT);
const [lx, ly] = polar(L5_ANGLE, ORBIT);

export function L5Diagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="-30 -85 130 115"
      className={className}
      role="img"
      aria-label="Diagram: Earth, the Moon, and L5 at the third corner of an equilateral triangle"
    >
      {/* Lunar orbit. */}
      <circle
        cx="0"
        cy="0"
        r={ORBIT}
        fill="none"
        stroke="var(--color-construct)"
        strokeWidth="0.6"
        strokeDasharray="4 4"
      />

      {/* The equilateral triangle — all three sides equal by construction. */}
      <polygon
        points={`0,0 ${mx},${my} ${lx},${ly}`}
        fill="none"
        stroke="var(--color-annotate)"
        strokeWidth="0.8"
      />

      {/* Earth. */}
      <circle cx="0" cy="0" r="9" fill="none" stroke="var(--color-object)" strokeWidth="1.3" />
      <text x="-2" y="20" textAnchor="middle" fill="var(--color-read-soft)" style={{ fontFamily: "var(--font-dim)", fontSize: "8px" }}>
        EARTH
      </text>

      {/* Moon. */}
      <circle cx={mx} cy={my} r="4.5" fill="none" stroke="var(--color-object)" strokeWidth="1.1" />
      <text x={mx + 2} y={my + 17} textAnchor="middle" fill="var(--color-read-soft)" style={{ fontFamily: "var(--font-dim)", fontSize: "8px" }}>
        MOON
      </text>

      {/* L5 — the settlement's station. */}
      <g>
        <path
          d={`M ${lx - 5} ${ly} L ${lx} ${ly - 5} L ${lx + 5} ${ly} L ${lx} ${ly + 5} Z`}
          fill="var(--color-annotate)"
        />
        <text x={lx} y={ly - 11} textAnchor="middle" fill="var(--color-annotate)" style={{ fontFamily: "var(--font-dim)", fontSize: "9px" }}>
          L5
        </text>
      </g>
    </svg>
  );
}
