import { TILE_SIZE, GROUND_Y } from "./tiles.js";

// Grade 18px. gap = next.x - (x + tiles * 18) = 54 (3 tiles)
// GROUND_Y = 432 (encosta no fundo da tela)
export const level1 = {
  width: 3024,
  ground: [
    // end 702
    { x: 0, y: GROUND_Y, tiles: 39 },
    // end 1098, gap 54
    { x: 756, y: GROUND_Y, tiles: 19 },
    // end 1368, gap 54
    { x: 1152, y: GROUND_Y - 36, tiles: 12 },
    // end 1728, gap 54
    { x: 1422, y: GROUND_Y, tiles: 17 },
    // end 1962, gap 54
    { x: 1782, y: GROUND_Y - 72, tiles: 10 },
    // end 2268, gap 54
    { x: 2016, y: GROUND_Y, tiles: 14 },
    // end 2520, gap 54
    { x: 2322, y: GROUND_Y - 36, tiles: 11 },
    // end 2970
    { x: 2574, y: GROUND_Y, tiles: 22 },
  ],
  enemies: [
    { x: 306, patrol: [198, 486], y: GROUND_Y },
    { x: 882, patrol: [774, 1044], y: GROUND_Y },
    { x: 1206, patrol: [1152, 1332], y: GROUND_Y - 36 },
    { x: 1494, patrol: [1440, 1692], y: GROUND_Y },
    { x: 1818, patrol: [1782, 1944], y: GROUND_Y - 72 },
    { x: 2070, patrol: [2016, 2232], y: GROUND_Y },
    { x: 2358, patrol: [2322, 2484], y: GROUND_Y - 36 },
    { x: 2700, patrol: [2592, 2916], y: GROUND_Y },
  ],
  collectibles: [
    { x: 216, y: GROUND_Y - 36 },
    { x: 504, y: GROUND_Y - 36 },
    { x: 900, y: GROUND_Y - 36 },
    { x: 1224, y: GROUND_Y - 72 },
    { x: 1530, y: GROUND_Y - 36 },
    { x: 1836, y: GROUND_Y - 108 },
    { x: 2106, y: GROUND_Y - 36 },
    { x: 2376, y: GROUND_Y - 72 },
    { x: 2664, y: GROUND_Y - 36 },
    { x: 2880, y: GROUND_Y - 36 },
  ],
  flag: { x: 2916, y: GROUND_Y },
};

for (const g of level1.ground) {
  if (g.x % TILE_SIZE !== 0 || g.y % TILE_SIZE !== 0) {
    console.warn("Platform off-grid:", g);
  }
}
