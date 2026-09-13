import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useUIStore } from "@/lib/state/ui";
import { commitScroll } from "./commit";
import { lenisHandle } from "./store";

/**
 * The single frame loop.
 *
 * Lenis runs with autoRaf disabled and is ticked from here, at the lowest
 * priority inside R3F's loop — so Lenis integrates first and the camera reads
 * its output in the same frame. Two independent rAF loops would put the camera
 * one frame behind the scroll, which reads as lag on every gesture.
 *
 * Mounted once, inside <Canvas>.
 */
export function useScrollDriver() {
  const setCanvasDriving = useUIStore((s) => s.setCanvasDriving);

  useEffect(() => {
    setCanvasDriving(true);
    return () => setCanvasDriving(false);
  }, [setCanvasDriving]);

  useFrame(({ clock }) => {
    const lenis = lenisHandle.current;
    if (!lenis) return;
    lenis.raf(clock.elapsedTime * 1000);
    commitScroll(lenis);
  }, -1000);
}
