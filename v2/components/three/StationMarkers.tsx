"use client";

import { useMemo } from "react";
import { BoxGeometry, EdgesGeometry, IcosahedronGeometry } from "three";
import { STATIONS } from "@/lib/three/stations";
import { CHAPTERS } from "@/content/chapters";

/**
 * Phase 2 placeholders: one wireframe form per station, so the flight has
 * something to fly past and the curve can be judged.
 *
 * Line art, not shaded solids — the world is a drawing set on vellum, so the 3D
 * is drafting line over paper. It also costs almost nothing to render, which is
 * what lets the phone tier run the same camera flight rather than a cut-down one.
 *
 * Phase 3 replaces these with the assembling machine.
 */
export function StationMarkers() {
  const forms = useMemo(
    () =>
      STATIONS.flatMap((station, i) => {
        const kind = CHAPTERS[i]?.kind;

        /*
         * Chapters that already carry their own drawn subject get no 3D marker:
         * the hero has the exploded assembly and the settlement sheet has the
         * habitat elevation, and a wireframe crossing either one reads as mud.
         *
         * Phase 3 inverts this — the machine becomes the hero's subject and the
         * SVG drops back to being the tier-0 fallback only.
         */
        if (kind === "cold-start" || kind === "settlement") return [];

        const base =
          kind === "project"
            ? new BoxGeometry(5.4, 3.6, 5.4)
            : new IcosahedronGeometry(3.6, 0);
        return [{ id: station.id, edges: new EdgesGeometry(base), station }];
      }),
    [],
  );

  return (
    <group>
      {forms.map(({ id, edges, station }) => (
        <lineSegments key={id} geometry={edges} position={station.subject}>
          <lineBasicMaterial color="#1c1e1b" transparent opacity={0.24} />
        </lineSegments>
      ))}
    </group>
  );
}
