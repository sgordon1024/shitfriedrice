/**
 * Sound Effects — Cartoon boing sounds
 *
 * Synthesized with Web Audio API — no audio files needed.
 * The classic boing is a sine wave that drops in pitch
 * rapidly with some wobble, like a cartoon spring.
 *
 * Multiple variations so it doesn't get monotonous.
 * Respects user preferences — won't play if the user
 * hasn't interacted with the page yet (browser policy).
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

/**
 * Classic cartoon boing — descending pitch with wobble
 * pitch: starting frequency (higher = more "sproingy")
 * duration: how long it lasts
 * volume: 0 to 1
 */
export function playBoing(
  pitch: number = 600,
  duration: number = 0.3,
  volume: number = 0.12,
) {
  try {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;

    // Main oscillator — sine wave that drops in pitch
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.15, now + duration);

    // Wobble — slight frequency modulation for that springy feel
    const wobble = ctx.createOscillator();
    wobble.type = "sine";
    wobble.frequency.setValueAtTime(25, now);
    wobble.frequency.linearRampToValueAtTime(8, now + duration);

    const wobbleGain = ctx.createGain();
    wobbleGain.gain.setValueAtTime(pitch * 0.08, now);
    wobbleGain.gain.linearRampToValueAtTime(0, now + duration);

    wobble.connect(wobbleGain);
    wobbleGain.connect(osc.frequency);

    // Volume envelope — quick attack, smooth decay
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    wobble.start(now);
    osc.stop(now + duration + 0.05);
    wobble.stop(now + duration + 0.05);
  } catch {
    // Audio not available — fail silently
  }
}

/** Higher-pitched quick boing — for small interactions like hover */
export function playBoingSmall() {
  playBoing(800, 0.18, 0.08);
}

/** Medium boing — for product card interactions */
export function playBoingMedium() {
  playBoing(550, 0.28, 0.1);
}

/** Big satisfying boing — for add-to-cart, logo click */
export function playBoingBig() {
  playBoing(400, 0.4, 0.15);
}

/** Extra sproingy — double boing with slight delay */
export function playDoubleBoing() {
  playBoing(700, 0.2, 0.1);
  setTimeout(() => playBoing(500, 0.25, 0.08), 120);
}

/** Descending comedy boing — like something falling */
export function playBoingDown() {
  playBoing(900, 0.5, 0.12);
}

/** Ascending boing — like something popping up */
export function playBoingUp() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;
    const duration = 0.25;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    // Goes UP in pitch instead of down
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + duration * 0.6);
    osc.frequency.exponentialRampToValueAtTime(600, now + duration);

    const wobble = ctx.createOscillator();
    wobble.type = "sine";
    wobble.frequency.setValueAtTime(30, now);
    const wobbleGain = ctx.createGain();
    wobbleGain.gain.setValueAtTime(40, now);
    wobbleGain.gain.linearRampToValueAtTime(0, now + duration);
    wobble.connect(wobbleGain);
    wobbleGain.connect(osc.frequency);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    wobble.start(now);
    osc.stop(now + duration + 0.05);
    wobble.stop(now + duration + 0.05);
  } catch {
    // Audio not available
  }
}
