#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { PNG } from "pngjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../public/assets");

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function setPixel(png, x, y, r, g, b, a = 255) {
  if (x < 0 || y < 0 || x >= png.width || y >= png.height) return;
  const i = (png.width * y + x) << 2;
  png.data[i] = r;
  png.data[i + 1] = g;
  png.data[i + 2] = b;
  png.data[i + 3] = a;
}

function fillRect(png, x, y, w, h, color) {
  for (let py = y; py < y + h; py++) {
    for (let px = x; px < x + w; px++) {
      setPixel(png, px, py, ...color);
    }
  }
}

function fillCircle(png, cx, cy, r, color) {
  for (let y = cy - r; y <= cy + r; y++) {
    for (let x = cx - r; x <= cx + r; x++) {
      if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) {
        setPixel(png, x, y, ...color);
      }
    }
  }
}

function savePNG(png, path) {
  writeFileSync(path, PNG.sync.write(png));
}

function createPNG(w, h) {
  return new PNG({ width: w, height: h });
}

// Player sprite sheet: 4 frames x 48x48
function genPlayer() {
  const png = createPNG(192, 48);
  const frames = [
    { leg: 0, arm: 0 },
    { leg: 3, arm: 4 },
    { leg: -3, arm: -4 },
    { leg: 0, arm: -6, jump: true },
  ];
  frames.forEach((f, i) => {
    const ox = i * 48;
    const body = [40, 40, 45];
    const skin = [255, 210, 170];
    fillCircle(png, ox + 24, 10, 7, skin);
    fillRect(png, ox + 21, 17, 6, 14, body);
    fillRect(png, ox + 14, 20 + f.arm, 16, 3, body);
    if (!f.jump) {
      fillRect(png, ox + 20, 31, 4, 12 + f.leg, body);
      fillRect(png, ox + 26, 31, 4, 12 - f.leg, body);
    } else {
      fillRect(png, ox + 17, 28, 4, 8, body);
      fillRect(png, ox + 29, 28, 4, 8, body);
    }
  });
  savePNG(png, join(ROOT, "sprites/player.png"));
}

function genEnemy() {
  const png = createPNG(32, 32);
  const red = [210, 55, 55];
  const dark = [150, 30, 30];
  fillRect(png, 8, 8, 16, 16, red);
  fillRect(png, 10, 4, 12, 8, red);
  fillRect(png, 8, 24, 6, 6, dark);
  fillRect(png, 18, 24, 6, 6, dark);
  setPixel(png, 12, 10, 255, 255, 255);
  setPixel(png, 20, 10, 255, 255, 255);
  setPixel(png, 12, 11, 30, 30, 30);
  setPixel(png, 20, 11, 30, 30, 30);
  savePNG(png, join(ROOT, "sprites/enemy.png"));
}

function genCoin() {
  const png = createPNG(16, 16);
  const gold = [255, 200, 50];
  const dark = [200, 140, 20];
  fillCircle(png, 8, 8, 7, gold);
  fillCircle(png, 8, 8, 5, dark);
  fillRect(png, 7, 4, 2, 8, gold);
  savePNG(png, join(ROOT, "sprites/coin.png"));
}

function genFlag() {
  const png = createPNG(48, 64);
  fillRect(png, 4, 0, 3, 64, [160, 160, 170]);
  fillRect(png, 7, 4, 36, 24, [230, 60, 80]);
  fillRect(png, 7, 4, 36, 6, [255, 100, 120]);
  fillRect(png, 7, 16, 36, 4, [255, 100, 120]);
  savePNG(png, join(ROOT, "sprites/flag.png"));
}

function genTileGrass() {
  const png = createPNG(32, 32);
  fillRect(png, 0, 0, 32, 32, [90, 160, 55]);
  fillRect(png, 0, 0, 32, 8, [110, 190, 70]);
  for (let i = 0; i < 8; i++) {
    const x = 2 + i * 4;
    setPixel(png, x, 2, 80, 140, 45);
    setPixel(png, x + 1, 1, 80, 140, 45);
  }
  fillRect(png, 0, 24, 32, 8, [120, 85, 50]);
  savePNG(png, join(ROOT, "sprites/tile-grass.png"));
}

function genTileGround() {
  const png = createPNG(32, 32);
  fillRect(png, 0, 0, 32, 32, [120, 85, 50]);
  for (let i = 0; i < 12; i++) {
    setPixel(png, (i * 7) % 32, (i * 5) % 32, [100, 70, 40]);
    setPixel(png, (i * 11) % 32, (i * 3) % 32, [140, 100, 60]);
  }
  savePNG(png, join(ROOT, "sprites/tile-ground.png"));
}

function genBgSky(w, h, path) {
  const png = createPNG(w, h);
  for (let y = 0; y < h; y++) {
    const t = y / h;
    const r = 135 + t * 30;
    const g = 200 + t * 20;
    const b = 235 - t * 20;
    for (let x = 0; x < w; x++) {
      setPixel(png, x, y, r, g, b);
    }
  }
  savePNG(png, path);
}

function genBgHills(w, h, path) {
  const png = createPNG(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      setPixel(png, x, y, 0, 0, 0, 0);
    }
  }
  const hills = [
    { cx: 200, r: 180, color: [100, 180, 100, 180] },
    { cx: 600, r: 220, color: [90, 165, 95, 180] },
    { cx: 1000, r: 200, color: [95, 175, 98, 180] },
  ];
  for (const hill of hills) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const dx = x - hill.cx;
        const dy = y - h + 20;
        if (dx * dx + dy * dy < hill.r * hill.r) {
          setPixel(png, x, y, ...hill.color);
        }
      }
    }
  }
  savePNG(png, path);
}

function genBgClouds(w, h, path) {
  const png = createPNG(w, h);
  const clouds = [
    { x: 100, y: 60 },
    { x: 350, y: 40 },
    { x: 600, y: 70 },
    { x: 850, y: 50 },
  ];
  for (const c of clouds) {
    fillCircle(png, c.x, c.y, 22, [255, 255, 255, 200]);
    fillCircle(png, c.x + 20, c.y + 4, 18, [255, 255, 255, 200]);
    fillCircle(png, c.x - 18, c.y + 6, 16, [255, 255, 255, 200]);
  }
  savePNG(png, path);
}

function genHeart() {
  const png = createPNG(16, 16);
  const red = [230, 60, 80];
  fillCircle(png, 5, 6, 4, red);
  fillCircle(png, 11, 6, 4, red);
  fillRect(png, 3, 8, 10, 6, red);
  fillRect(png, 5, 12, 6, 3, red);
  savePNG(png, join(ROOT, "ui/heart.png"));
}

function genCoinIcon() {
  const png = createPNG(16, 16);
  fillCircle(png, 8, 8, 7, [255, 200, 50]);
  fillRect(png, 7, 4, 2, 8, [255, 230, 120]);
  savePNG(png, join(ROOT, "ui/coin-icon.png"));
}

function genPanel() {
  const png = createPNG(64, 64);
  fillRect(png, 0, 0, 64, 64, [255, 255, 255, 230]);
  fillRect(png, 0, 0, 64, 4, [255, 200, 100]);
  fillRect(png, 0, 60, 64, 4, [255, 200, 100]);
  fillRect(png, 0, 0, 4, 64, [255, 200, 100]);
  fillRect(png, 60, 0, 4, 64, [255, 200, 100]);
  savePNG(png, join(ROOT, "ui/panel.png"));
}

function genParticle() {
  const png = createPNG(8, 8);
  fillCircle(png, 4, 4, 3, [255, 255, 255, 255]);
  savePNG(png, join(ROOT, "sprites/particle.png"));
}

function genPlaceholderCustom(name, label) {
  const png = createPNG(128, 64);
  fillRect(png, 0, 0, 128, 64, [255, 240, 220]);
  fillRect(png, 2, 2, 124, 60, [255, 220, 200]);
  savePNG(png, join(ROOT, "custom", name));
}

ensureDir(join(ROOT, "sprites"));
ensureDir(join(ROOT, "background"));
ensureDir(join(ROOT, "ui"));
ensureDir(join(ROOT, "custom"));

genPlayer();
genEnemy();
genCoin();
genFlag();
genTileGrass();
genTileGround();
genBgSky(800, 450, join(ROOT, "background/sky.png"));
genBgHills(1200, 200, join(ROOT, "background/hills.png"));
genBgClouds(1000, 120, join(ROOT, "background/clouds.png"));
genHeart();
genCoinIcon();
genPanel();
genParticle();
genPlaceholderCustom("flag-surprise.png", "surpresa");
genPlaceholderCustom("menu-banner.png", "banner");

console.log("Assets generated in public/assets/");
