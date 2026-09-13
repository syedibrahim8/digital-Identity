"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  MathUtils,
  NormalBlending,
  ShaderMaterial,
  Vector3,
} from "three";
import { buildMachine, buildPulses } from "@/lib/three/machineLayout";
import { flightParam } from "@/lib/three/paths";
import {
  edgeFragmentShader,
  edgeVertexShader,
  nodeFragmentShader,
  nodeVertexShader,
  pulseFragmentShader,
  pulseVertexShader,
} from "@/lib/three/shaders/machine";
import {
  pointerStrength,
  pointerWorld,
  startPointerTracking,
  updatePointerWorld,
} from "@/lib/three/pointer";
import { scrollState } from "@/lib/scroll/store";
import type { Tier } from "@/lib/quality/detectTier";

/**
 * The machine: members, joints, and the current running through them.
 *
 * Three draw calls total. Assembly, magnetism, the click wavefront and idle
 * drift all happen in vertex shaders, so per-frame JavaScript is limited to
 * writing a handful of uniforms — which is what lets a mid-range phone run the
 * same structure rather than a cut-down one.
 */

const INK = "#1c1e1b";
/** The house annotation ink. Current is annotation: it marks what is live. */
const CURRENT = "#b5342a";

/** Clicks older than this stop costing anything in the shader. */
const CLICK_LIFETIME = 3.2;

type Built = {
  nodeGeometry: BufferGeometry;
  edgeGeometry: BufferGeometry;
  pulseGeometry: BufferGeometry;
  nodeMaterial: ShaderMaterial;
  edgeMaterial: ShaderMaterial;
  pulseMaterial: ShaderMaterial;
};

export function Machine({ tier }: { tier: Tier }) {
  const layout = useMemo(() => buildMachine(), []);
  const pulses = useMemo(() => buildPulses(layout), [layout]);

  const pixelRatio = Math.min(
    typeof window === "undefined" ? 1 : window.devicePixelRatio,
    tier >= 2 ? 1.5 : 1,
  );

  const focus = useRef(new Vector3());
  const smoothedPull = useRef(0);
  const idle = useRef(0);
  const clickAt = useRef(-999);
  const clickOrigin = useRef(new Vector3());
  const elapsed = useRef(0);

  useEffect(() => startPointerTracking(), []);

  /*
   * Click anywhere to send a wavefront through the machine.
   *
   * Passive observation of clicks, never preventDefault: the canvas is
   * pointer-events:none, so links, buttons and text selection in the DOM above
   * behave exactly as they would without any of this.
   */
  useEffect(() => {
    const onClick = () => {
      clickOrigin.current.copy(pointerWorld);
      clickAt.current = elapsed.current;
    };
    window.addEventListener("click", onClick, { passive: true });
    return () => window.removeEventListener("click", onClick);
  }, []);

  /*
   * Built once, lazily, and held in state.
   *
   * These are long-lived GPU resources whose uniforms are written every frame.
   * React's compiler rules model pure state and so forbid mutating a memoised
   * value after render — but mutating three.js objects per frame is exactly how
   * react-three-fiber works. A lazy state initialiser gives a stable value that
   * is legal to read during render and legal to mutate from the frame loop.
   */
  const [built] = useState<Built>(() => {
    const nodeGeometry = new BufferGeometry();
    nodeGeometry.setAttribute("position", new BufferAttribute(layout.docked, 3));
    nodeGeometry.setAttribute("aDocked", new BufferAttribute(layout.docked, 3));
    nodeGeometry.setAttribute("aScatter", new BufferAttribute(layout.scatter, 3));
    nodeGeometry.setAttribute("aAlong", new BufferAttribute(layout.along, 1));

    const edgeGeometry = new BufferGeometry();
    edgeGeometry.setAttribute("position", new BufferAttribute(layout.edgeDocked, 3));
    edgeGeometry.setAttribute("aDocked", new BufferAttribute(layout.edgeDocked, 3));
    edgeGeometry.setAttribute("aScatter", new BufferAttribute(layout.edgeScatter, 3));
    edgeGeometry.setAttribute("aAlong", new BufferAttribute(layout.edgeAlong, 1));

    const pulseGeometry = new BufferGeometry();
    // `position` is required by three; the shader computes the real one.
    pulseGeometry.setAttribute("position", new BufferAttribute(pulses.from, 3));
    pulseGeometry.setAttribute("aFrom", new BufferAttribute(pulses.from, 3));
    pulseGeometry.setAttribute("aTo", new BufferAttribute(pulses.to, 3));
    pulseGeometry.setAttribute("aPhase", new BufferAttribute(pulses.phase, 1));
    pulseGeometry.setAttribute("aSpeed", new BufferAttribute(pulses.speed, 1));
    pulseGeometry.setAttribute("aAlong", new BufferAttribute(pulses.along, 1));

    const gating = () => ({
      uProgress: { value: 0 },
      uLead: { value: 0.05 },
      uWindow: { value: 0.13 },
      uAheadNear: { value: 0.03 },
      uAheadFar: { value: 0.16 },
    });

    const structural = (opacity: number) => ({
      ...gating(),
      uCursor: { value: new Vector3() },
      uCursorRange: { value: 7.5 },
      uCursorPull: { value: 0 },
      uTime: { value: 0 },
      uClickOrigin: { value: new Vector3() },
      uClickAge: { value: 999 },
      uIdle: { value: 0 },
      uColor: { value: new Color(INK) },
      uFlareColor: { value: new Color(CURRENT) },
      uOpacity: { value: opacity },
    });

    const nodeMaterial = new ShaderMaterial({
      vertexShader: nodeVertexShader,
      fragmentShader: nodeFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: NormalBlending,
      uniforms: {
        ...structural(0.8),
        uSize: { value: 2.4 },
        uPixelRatio: { value: pixelRatio },
      },
    });

    const edgeMaterial = new ShaderMaterial({
      vertexShader: edgeVertexShader,
      fragmentShader: edgeFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: NormalBlending,
      uniforms: structural(0.5),
    });

    const pulseMaterial = new ShaderMaterial({
      vertexShader: pulseVertexShader,
      fragmentShader: pulseFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: NormalBlending,
      uniforms: {
        ...gating(),
        uTime: { value: 0 },
        uSize: { value: 4.6 },
        uPixelRatio: { value: pixelRatio },
        uColor: { value: new Color(CURRENT) },
        uOpacity: { value: 1 },
      },
    });

    return {
      nodeGeometry,
      edgeGeometry,
      pulseGeometry,
      nodeMaterial,
      edgeMaterial,
      pulseMaterial,
    };
  });

  useEffect(() => {
    return () => {
      built.nodeGeometry.dispose();
      built.edgeGeometry.dispose();
      built.pulseGeometry.dispose();
      built.nodeMaterial.dispose();
      built.edgeMaterial.dispose();
      built.pulseMaterial.dispose();
    };
  }, [built]);

  /*
   * React's compiler rules model pure state and therefore forbid mutating
   * values after render. Writing uniforms on long-lived GPU objects every frame
   * is not a React state update — it is how react-three-fiber works, and the
   * alternative (recreating materials per frame, or routing 60Hz values through
   * setState) would be materially worse. Scoped to this loop only; everything
   * else in the file obeys the rule.
   */
  /* eslint-disable react-hooks/immutability */
  useFrame(({ camera }, delta) => {
    const dt = Math.min(delta, 0.1);
    elapsed.current += dt;

    // Flight position, not document progress — see flightParam.
    const progress = flightParam(scrollState.chapterIndex, scrollState.chapterT);

    // Magnetism focuses on the machine depth in front of the camera.
    camera.getWorldDirection(focus.current);
    focus.current.multiplyScalar(40).add(camera.position);
    updatePointerWorld(camera, focus.current);

    smoothedPull.current = MathUtils.damp(
      smoothedPull.current,
      pointerStrength.current * (tier >= 2 ? 1.15 : 0.6),
      5,
      dt,
    );

    // Idle rises when the reader stops moving, so the machine keeps breathing.
    const moving = Math.abs(scrollState.velocity) > 0.05;
    idle.current = MathUtils.damp(idle.current, moving ? 0 : 1, 1.6, dt);

    const age = elapsed.current - clickAt.current;
    const clickAge = age > CLICK_LIFETIME ? 999 : age;

    const { nodeMaterial, edgeMaterial, pulseMaterial } = built;

    for (const material of [nodeMaterial, edgeMaterial]) {
      const u = material.uniforms;
      u.uProgress.value = progress;
      u.uCursor.value.copy(pointerWorld);
      u.uCursorPull.value = smoothedPull.current;
      u.uTime.value = elapsed.current;
      u.uIdle.value = idle.current;
      u.uClickOrigin.value.copy(clickOrigin.current);
      u.uClickAge.value = clickAge;
    }

    pulseMaterial.uniforms.uProgress.value = progress;
    pulseMaterial.uniforms.uTime.value = elapsed.current;
  });
  /* eslint-enable react-hooks/immutability */

  return (
    <group>
      <lineSegments
        geometry={built.edgeGeometry}
        material={built.edgeMaterial}
        frustumCulled={false}
      />
      <points
        geometry={built.nodeGeometry}
        material={built.nodeMaterial}
        frustumCulled={false}
      />
      <points
        geometry={built.pulseGeometry}
        material={built.pulseMaterial}
        frustumCulled={false}
      />
    </group>
  );
}
