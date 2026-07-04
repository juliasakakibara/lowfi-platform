import { TILE_SIZE, groundY, enemyFloatY } from "./tiles.js";

// Chão só para o personagem (groundY). Inimigos flutuam em enemyFloatY.
// Gaps de 54px (3 tiles) entre segmentos do chão.
// Montado em runtime para acompanhar GAME.height dinâmico.
export function getLevel1() {
  const gy = groundY();
  const ey = enemyFloatY();

  const level = {
    width: 3024,
    ground: [
      { x: 0, y: gy, tiles: 40 },
      { x: 774, y: gy, tiles: 20 },
      { x: 1188, y: gy, tiles: 20 },
      { x: 1602, y: gy, tiles: 20 },
      { x: 2016, y: gy, tiles: 20 },
      { x: 2430, y: gy, tiles: 30 },
    ],
    enemies: [
      { x: 306, patrol: [180, 540], y: ey },
      { x: 900, patrol: [792, 1080], y: ey },
      { x: 1300, patrol: [1206, 1512], y: ey },
      { x: 1720, patrol: [1620, 1926], y: ey },
      { x: 2140, patrol: [2034, 2340], y: ey },
      { x: 2600, patrol: [2466, 2880], y: ey },
    ],
    collectibles: [
      { x: 216, y: gy - 54 },
      { x: 504, y: gy - 54 },
      { x: 900, y: gy - 90 },
      { x: 1300, y: gy - 54 },
      { x: 1720, y: gy - 90 },
      { x: 1900, y: gy - 54 },
      { x: 2140, y: gy - 54 },
      { x: 2300, y: gy - 90 },
      { x: 2600, y: gy - 54 },
      { x: 2800, y: gy - 54 },
    ],
    flag: { x: 2916, y: gy },
  };

  for (const g of level.ground) {
    if (g.x % TILE_SIZE !== 0 || g.y % TILE_SIZE !== 0) {
      console.warn("Platform off-grid:", g);
    }
  }

  return level;
}
