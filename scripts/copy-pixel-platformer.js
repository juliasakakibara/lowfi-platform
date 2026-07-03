#!/usr/bin/env node
import { copyFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { homedir } from "os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const destDir = join(__dirname, "../public/assets/pixel-platformer");

const candidates = [
  join(homedir(), "Downloads/kenney_pixel-platformer"),
  join(__dirname, "../../kenney_pixel-platformer"),
];

const packRoot = candidates.find((p) => existsSync(p));

mkdirSync(destDir, { recursive: true });

const files = [
  ["Tilemap/tilemap_packed.png", "tiles.png"],
  ["Tilemap/tilemap-characters_packed.png", "characters.png"],
  ["Tilemap/tilemap-backgrounds_packed.png", "backgrounds.png"],
];

if (!packRoot) {
  if (existsSync(join(destDir, "tiles.png"))) {
    console.log("Pixel Platformer pack not found — using committed assets");
    process.exit(0);
  }
  console.warn("Pixel Platformer pack not found and no fallback assets");
  process.exit(0);
}

for (const [rel, name] of files) {
  const src = join(packRoot, rel);
  if (!existsSync(src)) {
    console.warn("Missing:", src);
    continue;
  }
  copyFileSync(src, join(destDir, name));
  console.log("Copied", name);
}

console.log("Pixel Platformer assets ready in public/assets/pixel-platformer/");
