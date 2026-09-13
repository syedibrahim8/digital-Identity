import { Vector3 } from "three";
import { STATIONS } from "./stations";

/**
 * The machine: one compact space-frame cell per chapter, linked by a spine.
 *
 * An earlier version ran a single continuous truss along the whole flight path.
 * It failed for a geometric reason worth recording: a long tube running beside
 * the camera always has near members crossing the entire frame, and its centre
 * line falls outside the field of view, so it reads as a web of noise rather
 * than a structure. Discrete cells compose reliably in the right third, and
 * they match the concept better — a system of modules, not a pipe.
 *
 * Every position comes from a seeded PRNG, so the machine is identical on every
 * load. A structure that reassembles differently each visit reads as noise.
 *
 * Output is flat typed arrays for GPU upload. Assembly happens entirely in the
 * vertex shader: nothing here is recomputed per frame.
 */

const CELL = 3; // nodes per axis -> CELL^3 per station
const SPACING = 1.9; // world units between nodes
const JITTER = 0.22; // a perfect lattice looks rendered, not drawn
const SCATTER_SPREAD = 7.5; // how far members drift before seating

function mulberry32(seed: number) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type MachineLayout = {
  docked: Float32Array;
  scatter: Float32Array;
  along: Float32Array;
  nodeCount: number;

  edgeDocked: Float32Array;
  edgeScatter: Float32Array;
  edgeAlong: Float32Array;
  edgeVertexCount: number;
};

export function buildMachine(): MachineLayout {
  const random = mulberry32(0x5eed1b7a);
  const lastStation = Math.max(1, STATIONS.length - 1);

  const docked: number[] = [];
  const scatter: number[] = [];
  const along: number[] = [];

  const edgeDocked: number[] = [];
  const edgeScatter: number[] = [];
  const edgeAlong: number[] = [];

  /** Per-station node grids, kept so edges can reference them by coordinate. */
  const cells: { docked: Vector3; scatter: Vector3 }[][] = [];

  STATIONS.forEach((station, s) => {
    const t = s / lastStation;
    const centre = station.subject;
    const half = ((CELL - 1) * SPACING) / 2;

    // A slow yaw per cell so consecutive modules do not read as copies.
    const yaw = (random() - 0.5) * 0.9;
    const cos = Math.cos(yaw);
    const sin = Math.sin(yaw);

    const nodes: { docked: Vector3; scatter: Vector3 }[] = [];

    for (let ix = 0; ix < CELL; ix++) {
      for (let iy = 0; iy < CELL; iy++) {
        for (let iz = 0; iz < CELL; iz++) {
          const lx = ix * SPACING - half + (random() - 0.5) * JITTER;
          const ly = iy * SPACING - half + (random() - 0.5) * JITTER;
          const lz = iz * SPACING - half + (random() - 0.5) * JITTER;

          const position = new Vector3(
            centre.x + lx * cos - lz * sin,
            centre.y + ly,
            centre.z + lx * sin + lz * cos,
          );

          // Pre-assembly: pushed outward from the cell centre, so the module
          // contracts into itself rather than flying in from nowhere.
          const outward = new Vector3(lx, ly, lz);
          if (outward.lengthSq() < 1e-6) outward.set(0, 1, 0);
          outward.normalize();

          const loose = new Vector3()
            .copy(position)
            .addScaledVector(outward, SCATTER_SPREAD * (0.55 + random() * 0.45));

          nodes.push({ docked: position, scatter: loose });

          docked.push(position.x, position.y, position.z);
          scatter.push(loose.x, loose.y, loose.z);
          along.push(t);
        }
      }
    }

    cells.push(nodes);

    // Members along each lattice axis.
    const at = (ix: number, iy: number, iz: number) =>
      nodes[ix * CELL * CELL + iy * CELL + iz];

    const pushMember = (
      a: { docked: Vector3; scatter: Vector3 },
      b: { docked: Vector3; scatter: Vector3 },
    ) => {
      for (const node of [a, b]) {
        edgeDocked.push(node.docked.x, node.docked.y, node.docked.z);
        edgeScatter.push(node.scatter.x, node.scatter.y, node.scatter.z);
        edgeAlong.push(t);
      }
    };

    for (let ix = 0; ix < CELL; ix++) {
      for (let iy = 0; iy < CELL; iy++) {
        for (let iz = 0; iz < CELL; iz++) {
          if (ix + 1 < CELL) pushMember(at(ix, iy, iz), at(ix + 1, iy, iz));
          if (iy + 1 < CELL) pushMember(at(ix, iy, iz), at(ix, iy + 1, iz));
          if (iz + 1 < CELL) pushMember(at(ix, iy, iz), at(ix, iy, iz + 1));
          // One face diagonal per cube, which is what makes it read as a truss
          // rather than a wire box.
          if (ix + 1 < CELL && iy + 1 < CELL && (ix + iy + iz) % 2 === 0) {
            pushMember(at(ix, iy, iz), at(ix + 1, iy + 1, iz));
          }
        }
      }
    }
  });

  // A single spine member linking consecutive cells: these are one system.
  for (let s = 0; s + 1 < cells.length; s++) {
    const a = cells[s][cells[s].length - 1];
    const b = cells[s + 1][0];
    const tA = s / lastStation;
    const tB = (s + 1) / lastStation;

    edgeDocked.push(a.docked.x, a.docked.y, a.docked.z);
    edgeScatter.push(a.scatter.x, a.scatter.y, a.scatter.z);
    edgeAlong.push(tA);

    edgeDocked.push(b.docked.x, b.docked.y, b.docked.z);
    edgeScatter.push(b.scatter.x, b.scatter.y, b.scatter.z);
    edgeAlong.push(tB);
  }

  return {
    docked: new Float32Array(docked),
    scatter: new Float32Array(scatter),
    along: new Float32Array(along),
    nodeCount: docked.length / 3,
    edgeDocked: new Float32Array(edgeDocked),
    edgeScatter: new Float32Array(edgeScatter),
    edgeAlong: new Float32Array(edgeAlong),
    edgeVertexCount: edgeDocked.length / 3,
  };
}

/**
 * Pulses: points that travel the members, so the machine visibly carries data.
 *
 * Derived from the members already generated rather than a second structure —
 * a pulse that travelled a path the truss does not have would read as decoration
 * laid over the machine instead of current running through it.
 */
export type PulseLayout = {
  from: Float32Array;
  to: Float32Array;
  /** Phase offset so pulses do not march in lockstep. */
  phase: Float32Array;
  speed: Float32Array;
  along: Float32Array;
  count: number;
};

export function buildPulses(layout: MachineLayout, perMember = 1): PulseLayout {
  const random = mulberry32(0x9f17e5);
  const memberCount = layout.edgeVertexCount / 2;

  const from: number[] = [];
  const to: number[] = [];
  const phase: number[] = [];
  const speed: number[] = [];
  const along: number[] = [];

  for (let m = 0; m < memberCount; m++) {
    // Only a fraction of members carry current at once: a fully lit lattice
    // reads as a Christmas tree, not a system under load.
    if (random() > 0.6) continue;

    const a = m * 2;
    const b = m * 2 + 1;

    for (let p = 0; p < perMember; p++) {
      from.push(
        layout.edgeDocked[a * 3],
        layout.edgeDocked[a * 3 + 1],
        layout.edgeDocked[a * 3 + 2],
      );
      to.push(
        layout.edgeDocked[b * 3],
        layout.edgeDocked[b * 3 + 1],
        layout.edgeDocked[b * 3 + 2],
      );
      phase.push(random());
      speed.push(0.22 + random() * 0.5);
      along.push(layout.edgeAlong[a]);
    }
  }

  return {
    from: new Float32Array(from),
    to: new Float32Array(to),
    phase: new Float32Array(phase),
    speed: new Float32Array(speed),
    along: new Float32Array(along),
    count: phase.length,
  };
}
