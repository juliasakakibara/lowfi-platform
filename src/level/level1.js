import { TILE_SIZE, GROUND_Y, ENEMY_FLOAT_Y } from "./tiles.js";

// Chão só para o personagem (GROUND_Y). Inimigos flutuam em ENEMY_FLOAT_Y.
// Gaps de 54px (3 tiles) entre segmentos do chão.
export const level1 = {
  width: 3024,
  ground: [
    // end 720
    { x: 0, y: GROUND_Y, tiles: 40 },
    // end 1134, gap 54
    { x: 774, y: GROUND_Y, tiles: 20 },
    // end 1548, gap 54
    { x: 1188, y: GROUND_Y, tiles: 20 },
    // end 1962, gap 54
    { x: 1602, y: GROUND_Y, tiles: 20 },
    // end 2376, gap 54
    { x: 2016, y: GROUND_Y, tiles: 20 },
    // end 2970
    { x: 2430, y: GROUND_Y, tiles: 30 },
  ],
  // Inimigos flutuam acima do chão (não andam nas plataformas)
  enemies: [
    { x: 306, patrol: [180, 540], y: ENEMY_FLOAT_Y },
    { x: 900, patrol: [792, 1080], y: ENEMY_FLOAT_Y },
    { x: 1300, patrol: [1206, 1512], y: ENEMY_FLOAT_Y },
    { x: 1720, patrol: [1620, 1926], y: ENEMY_FLOAT_Y },
    { x: 2140, patrol: [2034, 2340], y: ENEMY_FLOAT_Y },
    { x: 2600, patrol: [2466, 2880], y: ENEMY_FLOAT_Y },
  ],
  collectibles: [
    { x: 216, y: GROUND_Y - 54 },
    { x: 504, y: GROUND_Y - 54 },
    { x: 900, y: GROUND_Y - 90 },
    { x: 1300, y: GROUND_Y - 54 },
    { x: 1720, y: GROUND_Y - 90 },
    { x: 1900, y: GROUND_Y - 54 },
    { x: 2140, y: GROUND_Y - 54 },
    { x: 2300, y: GROUND_Y - 90 },
    { x: 2600, y: GROUND_Y - 54 },
    { x: 2800, y: GROUND_Y - 54 },
  ],
  flag: { x: 2916, y: GROUND_Y },
};

for (const g of level1.ground) {
  if (g.x % TILE_SIZE !== 0 || g.y % TILE_SIZE !== 0) {
    console.warn("Platform off-grid:", g);
  }
}
