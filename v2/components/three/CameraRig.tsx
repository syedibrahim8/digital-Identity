"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { sampleFlight } from "@/lib/three/paths";
import { scrollState } from "@/lib/scroll/store";

/**
 * Scroll drives the camera along the flight curves.
 *
 * Runs after the scroll driver (which sits at priority -1000), so it reads
 * state committed in this same frame rather than the previous one.
 *
 * Damping is frame-rate independent — MathUtils.damp, not a fixed lerp factor —
 * otherwise the camera's weight would change with refresh rate, feeling
 * different on a 120Hz phone than on a 60Hz laptop.
 */

const POSITION_DAMP = 3.2;
const TARGET_DAMP = 4.0;

export function CameraRig() {
  const desiredPosition = useRef(new Vector3());
  const desiredTarget = useRef(new Vector3());
  const smoothedTarget = useRef(new Vector3());
  const initialised = useRef(false);

  useFrame(({ camera }, delta) => {
    sampleFlight(
      scrollState.chapterIndex,
      scrollState.chapterT,
      desiredPosition.current,
      desiredTarget.current,
    );

    // Snap on the first frame; easing in from the origin would read as a lurch.
    if (!initialised.current) {
      initialised.current = true;
      camera.position.copy(desiredPosition.current);
      smoothedTarget.current.copy(desiredTarget.current);
      camera.lookAt(smoothedTarget.current);
      return;
    }

    // Clamp delta so a backgrounded tab does not teleport the camera on return.
    const dt = Math.min(delta, 0.1);

    camera.position.x = MathUtils.damp(camera.position.x, desiredPosition.current.x, POSITION_DAMP, dt);
    camera.position.y = MathUtils.damp(camera.position.y, desiredPosition.current.y, POSITION_DAMP, dt);
    camera.position.z = MathUtils.damp(camera.position.z, desiredPosition.current.z, POSITION_DAMP, dt);

    smoothedTarget.current.x = MathUtils.damp(smoothedTarget.current.x, desiredTarget.current.x, TARGET_DAMP, dt);
    smoothedTarget.current.y = MathUtils.damp(smoothedTarget.current.y, desiredTarget.current.y, TARGET_DAMP, dt);
    smoothedTarget.current.z = MathUtils.damp(smoothedTarget.current.z, desiredTarget.current.z, TARGET_DAMP, dt);

    camera.lookAt(smoothedTarget.current);
  });

  return null;
}
