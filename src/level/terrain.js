import { GAME } from "../config.js";

const TILE = 32;

export function spawnGroundTiles(k, segments) {
  for (const g of segments) {
    const cols = Math.ceil(g.w / TILE);
    const rows = Math.ceil(40 / TILE);

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const isGrass = row === 0;
        k.add([
          k.pos(g.x + col * TILE, g.y + row * TILE),
          k.sprite(isGrass ? "tile-grass" : "tile-ground"),
          k.anchor("top"),
          k.z(0),
        ]);
      }
    }

    k.add([
      k.pos(g.x, g.y),
      k.rect(g.w, 40),
      k.area(),
      k.body({ isStatic: true }),
      k.anchor("top"),
      k.opacity(0),
      k.z(0),
      "ground",
      "platform",
    ]);
  }
}

export function createParallax(k) {
  const layers = [];

  const sky = k.add([
    k.sprite("bg-sky"),
    k.pos(0, 0),
    k.fixed(),
    k.z(-30),
  ]);
  layers.push({ obj: sky, factor: 0 });

  const hills = k.add([
    k.sprite("bg-hills"),
    k.pos(0, GAME.height - 200),
    k.z(-25),
  ]);
  layers.push({ obj: hills, factor: 0.15, wrap: 1200 });

  const clouds = k.add([
    k.sprite("bg-clouds"),
    k.pos(0, 40),
    k.z(-20),
  ]);
  layers.push({ obj: clouds, factor: 0.3, wrap: 1000 });

  return {
    update(camX) {
      for (const layer of layers) {
        if (layer.factor === 0) continue;
        const offset = camX * layer.factor;
        layer.obj.pos.x = -(offset % layer.wrap);
      }
    },
  };
}
