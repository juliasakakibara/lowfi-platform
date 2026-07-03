import { TILE_SIZE } from "./tiles.js";

// Grade 18px. gap = next.x - (x + tiles * 18) = 54 (3 tiles)
export const level1 = {
  width: 3024,
  ground: [
    // end 702
    { x: 0, y: 396, tiles: 39 },
    // end 1098, gap 54
    { x: 756, y: 396, tiles: 19 },
    // end 1368, gap 54
    { x: 1152, y: 360, tiles: 12 },
    // end 1728, gap 54
    { x: 1422, y: 396, tiles: 17 },
    // end 1962, gap 54
    { x: 1782, y: 324, tiles: 10 },
    // end 2268, gap 54
    { x: 2016, y: 396, tiles: 14 },
    // end 2520, gap 54
    { x: 2322, y: 360, tiles: 11 },
    // end 2970
    { x: 2574, y: 396, tiles: 22 },
  ],
  enemies: [
    { x: 306, patrol: [198, 486], y: 396 },
    { x: 882, patrol: [774, 1044], y: 396 },
    { x: 1206, patrol: [1152, 1332], y: 360 },
    { x: 1494, patrol: [1440, 1692], y: 396 },
    { x: 1818, patrol: [1782, 1944], y: 324 },
    { x: 2070, patrol: [2016, 2232], y: 396 },
    { x: 2358, patrol: [2322, 2484], y: 360 },
    { x: 2700, patrol: [2592, 2916], y: 396 },
  ],
  collectibles: [
    { x: 216, y: 360 },
    { x: 504, y: 360 },
    { x: 900, y: 360 },
    { x: 1224, y: 324 },
    { x: 1530, y: 360 },
    { x: 1836, y: 288 },
    { x: 2106, y: 360 },
    { x: 2376, y: 324 },
    { x: 2664, y: 360 },
    { x: 2880, y: 360 },
  ],
  flag: { x: 2916, y: 396 },
};

for (const g of level1.ground) {
  if (g.x % TILE_SIZE !== 0 || g.y % TILE_SIZE !== 0) {
    console.warn("Platform off-grid:", g);
  }
}
