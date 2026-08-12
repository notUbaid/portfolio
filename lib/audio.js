"use client";

let audioCtx = null;
let masterGain = null;
let isMuted = false;
let chalkNoiseNode = null;
let chalkGainNode = null;
let purrOsc1 = null;
let purrOsc2 = null;
let purrLfo = null;
let purrGain = null;
let lastImpactTime = 0;

if (typeof window !== "undefined") {
  isMuted = localStorage.getItem("portfolio_sound_muted") === "true";
}

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = isMuted ? 0 : 0.7;
      masterGain.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// ── Chalk Scratch Sound (Filtered White Noise) ──
function initChalkNoise(ctx) {
  if (chalkNoiseNode) return;

  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  chalkNoiseNode = ctx.createBufferSource();
  chalkNoiseNode.buffer = buffer;
  chalkNoiseNode.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 2600;
  filter.Q.value = 1.8;

  chalkGainNode = ctx.createGain();
  chalkGainNode.gain.value = 0;

  chalkNoiseNode.connect(filter);
  filter.connect(chalkGainNode);
  chalkGainNode.connect(masterGain || ctx.destination);

  chalkNoiseNode.start();
}

export function playChalkScratch(speed = 0) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    initChalkNoise(ctx);
    if (!chalkGainNode) return;

    const targetGain = Math.min(0.04, Math.max(0, speed * 0.002));
    chalkGainNode.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.03);
  } catch {
    // Ignore audio errors
  }
}

export function stopChalkScratch() {
  if (!chalkGainNode || !audioCtx) return;
  try {
    chalkGainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.05);
  } catch {
    // Ignore audio errors
  }
}

// ── Cat Purring Generator (Dual Carrier + 24Hz LFO AM) ──
export function startPurrSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx || purrGain) return;

  try {
    const now = ctx.currentTime;

    purrGain = ctx.createGain();
    purrGain.gain.setValueAtTime(0.001, now);
    purrGain.gain.linearRampToValueAtTime(0.04, now + 0.15);

    // Modulator (24 Hz amplitude modulation = feline purr frequency)
    purrLfo = ctx.createOscillator();
    purrLfo.frequency.value = 24;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.02;

    purrLfo.connect(lfoGain.gain);

    // Carrier 1 (55 Hz low rumble)
    purrOsc1 = ctx.createOscillator();
    purrOsc1.type = "sine";
    purrOsc1.frequency.value = 55;

    // Carrier 2 (110 Hz soft harmonic)
    purrOsc2 = ctx.createOscillator();
    purrOsc2.type = "triangle";
    purrOsc2.frequency.value = 110;

    const subGain = ctx.createGain();
    subGain.gain.value = 0.3;

    purrOsc1.connect(lfoGain);
    purrOsc2.connect(subGain);
    subGain.connect(lfoGain);

    lfoGain.connect(purrGain);
    purrGain.connect(masterGain || ctx.destination);

    purrLfo.start(now);
    purrOsc1.start(now);
    purrOsc2.start(now);
  } catch {
    // Ignore audio errors
  }
}

export function stopPurrSound() {
  if (!purrGain || !audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    purrGain.gain.setTargetAtTime(0, now, 0.1);
    setTimeout(() => {
      try {
        if (purrOsc1) purrOsc1.stop();
        if (purrOsc2) purrOsc2.stop();
        if (purrLfo) purrLfo.stop();
        purrOsc1 = null;
        purrOsc2 = null;
        purrLfo = null;
        purrGain = null;
      } catch {
        // Ignore stop errors
      }
    }, 150);
  } catch {
    // Ignore audio errors
  }
}

// ── Cat Meow / Pick Up Sound ──
export function playCatMeow(type = "gentle") {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";

    if (type === "pickup") {
      // Soft inquisitive pick up meow: 450Hz -> 720Hz -> 520Hz
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.linearRampToValueAtTime(720, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.2);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === "chirp") {
      // Short happy chirp: 600Hz -> 850Hz
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(850, now + 0.06);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else {
      // Gentle meow: 500Hz -> 780Hz -> 580Hz
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.linearRampToValueAtTime(780, now + 0.1);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.22);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    }

    osc.connect(gain);
    gain.connect(masterGain || ctx.destination);
  } catch {
    // Ignore audio errors
  }
}

// ── Physics Block Impact Sound ──
export function playBlockImpactSound(velocity = 1.0, width = 120) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  if (now - lastImpactTime < 0.035) return; // Debounce fast impacts
  lastImpactTime = now;

  try {
    const baseFreq = Math.max(70, Math.min(220, 18000 / (width || 120)));
    const volume = Math.min(0.08, Math.max(0.01, velocity * 0.012));

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.05);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    // Micro click burst for tactile wooden contact noise
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.015, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.003));
    }
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = volume * 0.5;

    noiseSrc.connect(noiseGain);
    noiseGain.connect(masterGain || ctx.destination);
    noiseSrc.start(now);

    osc.connect(gain);
    gain.connect(masterGain || ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch {
    // Ignore audio errors
  }
}

export function playScrambleSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const freq = 1200 + Math.random() * 1400;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.015);

    osc.connect(gain);
    gain.connect(masterGain || ctx.destination);

    osc.start(now);
    osc.stop(now + 0.015);
  } catch {
    // Ignore audio errors
  }
}

export function playClickSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(masterGain || ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch {
    // Ignore audio errors
  }
}

export function playPopSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(350, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(masterGain || ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Ignore audio errors
  }
}

export function playDropSound() {
  playBlockImpactSound(2.5, 120);
}

export function playPurrSound() {
  startPurrSound();
}

export function playJumpSound() {
  playCatMeow("chirp");
}

export function playSuccessSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;

      const startTime = now + idx * 0.06;
      gain.gain.setValueAtTime(0.06, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

      osc.connect(gain);
      gain.connect(masterGain || ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.12);
    });
  } catch {
    // Ignore audio errors
  }
}

export function toggleAudioMute() {
  isMuted = !isMuted;
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_sound_muted", isMuted ? "true" : "false");
  }
  if (masterGain) {
    masterGain.gain.value = isMuted ? 0 : 0.7;
  }
  if (!isMuted) playPopSound();
  return isMuted;
}

export function getAudioMuted() {
  return isMuted;
}

