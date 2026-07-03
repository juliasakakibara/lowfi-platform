/** Kenney Pixel Platformer — tiles 18×18, sheet 20×9 */
export const TILE_SIZE = 18;

/** Uma fileira: cada tile já tem grama em cima e terra embaixo */
export const PLATFORM_ROWS = 1;

export const PLATFORM_HEIGHT = PLATFORM_ROWS * TILE_SIZE;

/** Chão principal encosta na base da tela (450 - 18) */
export const GROUND_Y = 432;

/** Frames na sheet de tiles (índice = row * 20 + col) */
export const TILE = {
  grassLeft: 0,
  grassMid: 1,
  grassRight: 2,
  flag: 111,
  coin: 152,
  heart: 44,
};

/** Frames na sheet de characters (índice = row * 9 + col) */
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
