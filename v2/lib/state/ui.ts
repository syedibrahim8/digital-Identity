import { create } from "zustand";

/**
 * Cold state — discrete things that change a handful of times per session and
 * genuinely need a React render. Anything that changes per frame belongs in the
 * mutable scroll store instead.
 *
 * zustand is already a transitive dependency of @react-three/fiber, so this
 * costs nothing in bundle size.
 */
type UIState = {
  /**
   * True once the R3F canvas is mounted and driving the frame loop.
   * Lenis hands over its rAF when this flips, so the app never runs two loops.
   */
  canvasDriving: boolean;
  setCanvasDriving: (value: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  canvasDriving: false,
  setCanvasDriving: (canvasDriving) => set({ canvasDriving }),
}));
