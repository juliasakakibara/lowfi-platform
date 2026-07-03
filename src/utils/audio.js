let audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function beep(frequency, duration, volume = 0.2, type = "square") {
  try {
    const ctx = getCtx();
    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // fallback silencioso
  }
}

export function loadSounds() {
  // Sons gerados via Web Audio — não bloqueiam o carregamento do jogo
}

export function playSound(_k, name) {
  switch (name) {
    case "jump":
      beep(400, 0.08, 0.15);
      beep(600, 0.08, 0.12);
      break;
    case "coin":
      beep(880, 0.06, 0.18);
      beep(1100, 0.1, 0.15);
      break;
    case "hurt":
      beep(150, 0.2, 0.25, "sawtooth");
      break;
    case "win":
      beep(523, 0.12, 0.2);
      setTimeout(() => beep(659, 0.12, 0.2), 120);
      setTimeout(() => beep(784, 0.2, 0.2), 240);
      break;
  }
}
