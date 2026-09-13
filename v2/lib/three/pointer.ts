import { Plane, Raycaster, Vector2, Vector3 } from "three";
import type { Camera } from "three";

/**
 * Where the pointer is, in world space.
 *
 * Projected onto a plane that faces the camera at the machine's depth, rather
 * than raycast against the geometry: magnetism needs a position every frame,
 * and a scene raycast per frame for a decorative effect is not a trade worth
 * making. This is a handful of arithmetic ops.
 *
 * The listener is pointermove, not scroll or wheel — the single-scroll-authority
 * rule is untouched.
 */

export const pointerNDC = new Vector2(0, 0);
export const pointerWorld = new Vector3(0, 0, 0);
/** 0 while the pointer is absent (touch, or cursor off-window). */
export const pointerStrength = { current: 0 };

let listening = false;

export function startPointerTracking() {
  if (listening || typeof window === "undefined") return () => {};
  listening = true;

  const onMove = (event: PointerEvent) => {
    pointerNDC.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointerNDC.y = -(event.clientY / window.innerHeight) * 2 + 1;
    pointerStrength.current = 1;
  };
  const onLeave = () => {
    pointerStrength.current = 0;
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerleave", onLeave);
  // Touch has no hover, so magnetism simply never engages there.
  window.addEventListener("pointercancel", onLeave);

  return () => {
    listening = false;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerleave", onLeave);
    window.removeEventListener("pointercancel", onLeave);
  };
}

const raycaster = new Raycaster();
const plane = new Plane();
const forward = new Vector3();

/** Update pointerWorld for this frame. Call once, from the machine. */
export function updatePointerWorld(camera: Camera, focus: Vector3) {
  camera.getWorldDirection(forward);
  // A plane through the machine's current depth, facing the camera.
  plane.setFromNormalAndCoplanarPoint(forward, focus);
  raycaster.setFromCamera(pointerNDC, camera);
  if (!raycaster.ray.intersectPlane(plane, pointerWorld)) {
    pointerWorld.copy(focus);
  }
}
