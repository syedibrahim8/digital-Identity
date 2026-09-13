"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, DoubleSide, Mesh, PlaneGeometry, ShaderMaterial } from "three";

/**
 * The sheet grid, in perspective.
 *
 * The direction contract calls for vellum under a faint grid. A flat CSS tile
 * was the wrong way to deliver it — the detector correctly flags decorative
 * grid backgrounds, and a tiled gradient has no relationship to the space the
 * machine occupies. Drawn in 3D it is a real ground reference: it recedes,
 * it parallaxes, and it gives the flight somewhere to happen.
 *
 * An "infinite" grid: one large plane kept under the camera, with the pattern
 * computed from world coordinates in the fragment shader, so it never visibly
 * ends or repeats at a seam.
 */

const vertexShader = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;

  uniform vec3 uColor;
  uniform vec3 uCamera;
  uniform float uSpacing;
  uniform float uFade;
  uniform float uOpacity;

  varying vec3 vWorld;

  /* Screen-space derivative line width: constant thickness at any distance. */
  float gridLine(vec2 coord, float spacing) {
    vec2 g = abs(fract(coord / spacing - 0.5) - 0.5) / fwidth(coord / spacing);
    return 1.0 - min(min(g.x, g.y), 1.0);
  }

  void main() {
    float fine = gridLine(vWorld.xz, uSpacing);
    float coarse = gridLine(vWorld.xz, uSpacing * 5.0);

    float ink = max(fine * 0.35, coarse * 0.8);
    if (ink < 0.01) discard;

    // Fade with distance so the plane has no visible edge.
    float d = distance(vWorld.xz, uCamera.xz);
    float falloff = 1.0 - smoothstep(uFade * 0.25, uFade, d);

    float a = ink * falloff * uOpacity;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
  }
`;

export function SheetGrid({ opacity = 0.5 }: { opacity?: number }) {
  const mesh = useRef<Mesh>(null);

  const [built] = useState(() => ({
    geometry: new PlaneGeometry(900, 900),
    material: new ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
      uniforms: {
        uColor: { value: new Color("#1c1e1b") },
        uCamera: { value: [0, 0, 0] as unknown as { x: number } },
        uSpacing: { value: 4 },
        uFade: { value: 150 },
        uOpacity: { value: opacity },
      },
    }),
  }));

  useEffect(() => {
    return () => {
      built.geometry.dispose();
      built.material.dispose();
    };
  }, [built]);

  /* eslint-disable react-hooks/immutability */
  useFrame(({ camera }) => {
    if (!mesh.current) return;
    // Keep the plane under the camera; the pattern is world-space, so nothing
    // slides with it.
    mesh.current.position.set(camera.position.x, camera.position.y - 14, camera.position.z);
    built.material.uniforms.uCamera.value = camera.position;
  });
  /* eslint-enable react-hooks/immutability */

  return (
    <mesh
      ref={mesh}
      geometry={built.geometry}
      material={built.material}
      rotation={[-Math.PI / 2, 0, 0]}
      frustumCulled={false}
    />
  );
}
