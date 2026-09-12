import { PROJECTS } from "@/content/projects";

/**
 * The exploded axonometric, drawn as static SVG.
 *
 * This is not a placeholder for the 3D scene — it is the tier-0 rendering.
 * Reduced-motion visitors, no-WebGL browsers, and crawlers all get this, so it
 * has to stand on its own as a drawing. The canvas layers over it later.
 *
 * True isometric projection: 30 degrees off horizontal on both axes.
 */

const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);

function iso(x: number, y: number, z: number): [number, number] {
  return [(x - y) * COS30, (x + y) * SIN30 - z];
}

/** One plate of the assembly, as an isometric parallelogram. */
function plate(w: number, d: number, z: number) {
  const corners: [number, number][] = [
    iso(0, 0, z),
    iso(w, 0, z),
    iso(w, d, z),
    iso(0, d, z),
  ];
  return corners.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

const W = 150;
const D = 110;
const GAP = 84; // explode distance; must exceed plate depth or parts read as a pile

export function AssemblyPlate({ className = "" }: { className?: string }) {
  // Base plate plus one plate per project, stacked upward and exploded apart.
  const layers = [
    { id: "base", label: "Chassis", ink: "var(--color-object)", sheet: "00" },
    ...PROJECTS.map((p) => ({
      id: p.id,
      label: p.title,
      ink: `var(--color-${p.ink})`,
      sheet: p.sheet,
    })),
  ];

  /*
   * viewBox is derived, never hand-tuned: balloons sit well outside the plate
   * bounds, and a literal box silently clips them when GAP or the project count
   * changes. Adding a project must not require editing this file.
   */
  const topZ = (layers.length - 1) * GAP;
  const minX = iso(0, D, 0)[0] - 12;
  const maxX = iso(W, 0, 0)[0] + 58 + 11 + 12;
  const minY = iso(0, 0, topZ)[1] - 34;
  const maxY = iso(W, D, 0)[1] + 12;

  return (
    <svg
      viewBox={`${minX.toFixed(0)} ${minY.toFixed(0)} ${(maxX - minX).toFixed(0)} ${(maxY - minY).toFixed(0)}`}
      className={className}
      role="img"
      aria-label={`Exploded assembly drawing: ${layers.length} plates, one per project`}
    >
      {/* Centre axis — the line the parts explode along. */}
      <line
        x1="0"
        y1="60"
        x2="0"
        y2={-(layers.length - 1) * GAP - 70}
        stroke="var(--color-construct)"
        strokeWidth="0.6"
        strokeDasharray="8 4 2 4"
      />

      {layers.map((layer, i) => {
        const z = i * GAP;
        const [cx, cy] = iso(W / 2, D / 2, z);
        const [lx, ly] = iso(W, 0, z);
        return (
          <g key={layer.id}>
            {/* Leader line from the plate corner out to its balloon. */}
            <line
              x1={lx}
              y1={ly}
              x2={lx + 46}
              y2={ly - 18}
              stroke="var(--color-annotate)"
              strokeWidth="0.8"
            />
            <circle
              cx={lx + 58}
              cy={ly - 22}
              r="11"
              fill="var(--color-vellum)"
              stroke="var(--color-annotate)"
              strokeWidth="0.9"
            />
            <text
              x={lx + 58}
              y={ly - 18}
              textAnchor="middle"
              fill="var(--color-annotate)"
              style={{ fontFamily: "var(--font-dim)", fontSize: "10px" }}
            >
              {layer.sheet}
            </text>

            {/* The plate itself. */}
            <polygon
              points={plate(W, D, z)}
              fill={layer.ink}
              fillOpacity="0.13"
              stroke={layer.ink}
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            {/* An inner cut, so the plate reads as a machined part not a card. */}
            <polygon
              points={plate(W * 0.44, D * 0.44, z)}
              fill="none"
              stroke={layer.ink}
              strokeWidth="0.7"
              strokeLinejoin="round"
              transform={`translate(${(cx - iso((W * 0.44) / 2, (D * 0.44) / 2, z)[0]).toFixed(1)} ${(cy - iso((W * 0.44) / 2, (D * 0.44) / 2, z)[1]).toFixed(1)})`}
            />
          </g>
        );
      })}
    </svg>
  );
}
