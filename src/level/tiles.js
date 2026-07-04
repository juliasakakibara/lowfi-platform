import { GAME } from "../config.js";

/** Kenney Pixel Platformer — tiles 18×18, sheet 20×9 */
export const TILE_SIZE = 18;

export const PLATFORM_ROWS = 1;
export const PLATFORM_HEIGHT = PLATFORM_ROWS * TILE_SIZE;

/**
 * Chão do personagem (base da tela).
 * tiles encostam no fundo; personagem anda em cima (z alto).
 */
export const GROUND_Y = GAME.height - TILE_SIZE;

/**
 * Altura em que os inimigos flutuam (acima do chão do player).
 * 72px = 4 tiles acima da superfície.
 */
export const ENEMY_FLOAT_Y = GROUND_Y - 72;


/** Frames na sheet de tiles */
export const TILE = {
  grassLeft: 0,
  grassMid: 1,
  grassRight: 2,
  flag: 111,
  coin: 152,
  heart: 44,
};

/** Frames na sheet de characters */
export const CHAR = {
  player: 0,
  enemy: 9,
};

export function pickPlatformTile(col, cols) {
  if (cols === 1) return TILE.grassMid;
  if (col === 0) return TILE.grassLeft;
  if (col === cols - 1) return TILE.grassRight;
  return TILE.grassMid;
}
