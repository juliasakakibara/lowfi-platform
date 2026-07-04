import { GAME } from "../config.js";

/** Kenney Pixel Platformer — tiles 18×18, sheet 20×9 */
export const TILE_SIZE = 18;

export const PLATFORM_ROWS = 1;


/** Chão na base do canvas (altura lógica pode mudar por dispositivo). */
export function groundY() {
  return GAME.height - TILE_SIZE;
}

/** Inimigos flutuam acima do chão (72px = 4 tiles). */
export function enemyFloatY() {
  return groundY() - 72;
}

/** Frames na sheet de tiles */
export const TILE = {
  grassLeft: 0,
  grassMid: 1,
  grassRight: 2,
  flag: 111,
  coin: 152,
  heart: 44,
};

/** Frames na sheet de characters (inimigos; player usa sprite "bruno") */
export const CHAR = {
  enemy: 9,
};


export function pickPlatformTile(col, cols) {
  if (cols === 1) return TILE.grassMid;
  if (col === 0) return TILE.grassLeft;
  if (col === cols - 1) return TILE.grassRight;
  return TILE.grassMid;
}
