import {
  TILE_SIZE,
  PLATFORM_ROWS,
  PLATFORM_HEIGHT,
  pickPlatformTile,
} from "./tiles.js";

/**
 * Só o chão do personagem: tiles de grama com colisão.
 * Sem preenchimento marrom — céu azul nos buracos e abaixo das plataformas elevadas.
 */
export function spawnGround(k, segments) {
  for (const g of segments) {
    const cols = g.tiles;
    if (cols <= 0) continue;

    for (let row = 0; row < PLATFORM_ROWS; row++) {
      for (let col = 0; col < cols; col++) {
        const frame = pickPlatformTile(col, cols);
        const tx = g.x + col * TILE_SIZE;
        const ty = g.y + row * TILE_SIZE;

        k.add([
          k.pos(tx, ty),
          k.sprite("tiles", { frame }),
          k.area({
            shape: new k.Rect(k.vec2(0, 0), TILE_SIZE, TILE_SIZE),
          }),
          k.body({ isStatic: true }),
          k.anchor("topleft"),
          k.z(0),
          "ground",
          "platform",
        ]);
      }
    }
  }
}

export { PLATFORM_HEIGHT, TILE_SIZE };
