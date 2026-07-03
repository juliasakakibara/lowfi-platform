#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/sounds");
mkdirSync(outDir, { recursive: true });

function makeWav(frequency, durationSec, volume = 0.3) {
  const sampleRate = 22050;
  const numSamples = Math.floor(sampleRate * durationSec);
  const buffer = Buffer.alloc(44 + numSamples * 2);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const envelope = Math.min(1, (numSamples - i) / (sampleRate * 0.05));
    const sample = Math.sin(2 * Math.PI * frequency * t) * volume * envelope;
    buffer.writeInt16LE(Math.floor(sample * 32767), 44 + i * 2);
  }

  return buffer;
}

function makeChirp(freqStart, freqEnd, durationSec, volume = 0.25) {
  const sampleRate = 22050;
  const numSamples = Math.floor(sampleRate * durationSec);
  const buffer = Buffer.alloc(44 + numSamples * 2);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const progress = i / numSamples;
    const freq = freqStart + (freqEnd - freqStart) * progress;
    const envelope = Math.min(1, (numSamples - i) / (sampleRate * 0.08));
    const sample = Math.sin(2 * Math.PI * freq * t) * volume * envelope;
    buffer.writeInt16LE(Math.floor(sample * 32767), 44 + i * 2);
  }

  return buffer;
}

const sounds = {
  jump: makeChirp(300, 600, 0.12),
  coin: makeChirp(800, 1200, 0.1),
  hurt: makeWav(150, 0.2, 0.4),
  win: makeChirp(400, 900, 0.4, 0.3),
};

for (const [name, data] of Object.entries(sounds)) {
  writeFileSync(join(outDir, `${name}.wav`), data);
  console.log(`Created ${name}.wav`);
}
