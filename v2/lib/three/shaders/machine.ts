/**
 * Assembly and cursor response, both in the vertex shader.
 *
 * Keeping this on the GPU is what lets the machine have hundreds of members
 * without touching a single matrix per frame in JavaScript — which is the
 * difference between this running on a mid-range phone and not.
 *
 * GLSL lives in a tagged template literal rather than a .glsl file: no loader
 * config, identical under Turbopack and Webpack, and it survives Next upgrades.
 */

/** Shared assembly + magnetism, injected into both node and edge shaders. */
const ASSEMBLY = /* glsl */ `
  attribute vec3 aDocked;
  attribute vec3 aScatter;
  attribute float aAlong;

  uniform float uProgress;    // 0..1 flight progress
  uniform float uLead;        // how far ahead of the camera assembly starts
  uniform float uWindow;      // how long a member takes to snap into place
  uniform vec3  uCursor;      // cursor projected into world space
  uniform float uCursorRange;
  uniform float uCursorPull;
  uniform float uAheadNear;   // where the fade-out ahead begins
  uniform float uAheadFar;    // where it is fully gone
  uniform float uTime;
  uniform vec3  uClickOrigin;
  uniform float uClickAge;    // seconds since the last click; large = inactive
  uniform float uIdle;        // 0 while scrolling, rises when still

  varying float vAssembled;
  varying float vVisible;
  varying float vFlare;

  /*
   * A wavefront expanding from the last click, travelling through the structure
   * at a fixed speed. This is the click-to-pulse response: you inject something
   * and watch it run outward through the members.
   */
  float clickFlare(vec3 pos) {
    if (uClickAge > 3.0) return 0.0;
    float radius = uClickAge * 26.0;
    float d = distance(pos, uClickOrigin);
    float band = exp(-pow(d - radius, 2.0) / 26.0);
    float decay = 1.0 - smoothstep(0.0, 3.0, uClickAge);
    return band * decay;
  }

  vec3 assemble() {
    // A member docks as the flight reaches it, slightly ahead of the camera,
    // so the machine is always building just in front of the viewer.
    float k = clamp((uProgress - aAlong + uLead) / uWindow, 0.0, 1.0);
    // Smoothstep twice: the snap eases out hard, like a part seating.
    k = k * k * (3.0 - 2.0 * k);
    vAssembled = k;

    /*
     * Everything far ahead of the assembly front is hidden. Two hundred-odd
     * units of un-seated structure receding into perspective reads as a web of
     * noise across the copy; showing only the built machine and the seam where
     * it is seating reads as a machine. Behind the front stays fully drawn.
     */
    vVisible = 1.0 - smoothstep(uAheadNear, uAheadFar, aAlong - uProgress);

    vec3 pos = mix(aScatter, aDocked, k);

    // Idle life: a slow breath when the reader stops scrolling, so the machine
    // never looks frozen. Amplitude is tiny — this should be felt, not seen.
    pos.y += sin(uTime * 0.8 + aAlong * 22.0) * 0.09 * uIdle * k;
    pos.x += cos(uTime * 0.6 + aAlong * 17.0) * 0.07 * uIdle * k;

    // Magnetism: members lean toward the pointer, falling off with distance.
    // Only assembled members respond — scattered debris ignoring the cursor is
    // what makes the assembled structure feel alive by contrast.
    vec3 toCursor = uCursor - pos;
    float d = length(toCursor);
    float influence = uCursorPull * exp(-(d * d) / (2.0 * uCursorRange * uCursorRange));
    pos += normalize(toCursor + 1e-6) * influence * k;

    vFlare = clickFlare(pos);
    return pos;
  }
`;

export const nodeVertexShader = /* glsl */ `
  ${ASSEMBLY}

  uniform float uSize;
  uniform float uPixelRatio;

  void main() {
    vec3 pos = assemble();
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    // Perspective-correct point size, clamped so nothing becomes a blob up close.
    gl_PointSize = clamp(uSize * uPixelRatio * (14.0 / -mvPosition.z), 1.0, 9.0) * (1.0 + vFlare * 1.6);
  }
`;

export const nodeFragmentShader = /* glsl */ `
  precision mediump float;

  uniform vec3 uColor;
  uniform vec3 uFlareColor;
  uniform float uOpacity;

  varying float vAssembled;
  varying float vVisible;
  varying float vFlare;

  void main() {
    // Square dots: this is a drawing, and drafting joints are square.
    vec2 d = abs(gl_PointCoord - 0.5);
    if (max(d.x, d.y) > 0.5) discard;
    float a = uOpacity * (0.2 + 0.8 * vAssembled) * vVisible;
    a += vFlare * 0.9 * vVisible;
    if (a < 0.01) discard;
    gl_FragColor = vec4(mix(uColor, uFlareColor, clamp(vFlare, 0.0, 1.0)), a);
  }
`;

export const edgeVertexShader = /* glsl */ `
  ${ASSEMBLY}

  void main() {
    vec3 pos = assemble();
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const edgeFragmentShader = /* glsl */ `
  precision mediump float;

  uniform vec3 uColor;
  uniform vec3 uFlareColor;
  uniform float uOpacity;

  varying float vAssembled;
  varying float vVisible;
  varying float vFlare;

  void main() {
    // Members fade in as they seat, so the structure draws itself.
    float a = uOpacity * vAssembled * vAssembled * vVisible + vFlare * 0.7 * vVisible;
    gl_FragColor = vec4(mix(uColor, uFlareColor, clamp(vFlare, 0.0, 1.0)), a);
  }
`;

/**
 * Pulses travelling the members.
 *
 * Position is computed from the member's two endpoints and a looping phase, so
 * a pulse only ever runs along structure that actually exists. Same assembly
 * and visibility gating as everything else: current cannot flow through a
 * member that has not seated yet.
 */
export const pulseVertexShader = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute float aPhase;
  attribute float aSpeed;
  attribute float aAlong;

  uniform float uTime;
  uniform float uProgress;
  uniform float uLead;
  uniform float uWindow;
  uniform float uAheadNear;
  uniform float uAheadFar;
  uniform float uSize;
  uniform float uPixelRatio;

  varying float vHead;
  varying float vGate;

  void main() {
    float seated = clamp((uProgress - aAlong + uLead) / uWindow, 0.0, 1.0);
    seated = seated * seated * (3.0 - 2.0 * seated);
    float visible = 1.0 - smoothstep(uAheadNear, uAheadFar, aAlong - uProgress);
    vGate = seated * visible;

    float t = fract(uTime * aSpeed + aPhase);
    // Brightest at the leading edge of its run, fading as it arrives.
    vHead = smoothstep(0.0, 0.18, t) * (1.0 - smoothstep(0.72, 1.0, t));

    vec3 pos = mix(aFrom, aTo, t);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = clamp(uSize * uPixelRatio * (14.0 / -mvPosition.z), 1.0, 7.0);
  }
`;

export const pulseFragmentShader = /* glsl */ `
  precision mediump float;

  uniform vec3 uColor;
  uniform float uOpacity;

  varying float vHead;
  varying float vGate;

  void main() {
    // Round, unlike the square structural joints: current is not a fastener.
    vec2 d = gl_PointCoord - 0.5;
    if (dot(d, d) > 0.25) discard;
    float a = uOpacity * vHead * vGate;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
  }
`;
