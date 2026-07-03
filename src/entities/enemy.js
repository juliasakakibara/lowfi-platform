import { CHAR } from "../level/tiles.js";

const ENEMY_SPEED = 80;
const W = 24;
const H = 24;

/**
 * Inimigo flutua (sem gravidade) e patrulha na horizontal.
 */
export function createEnemy(k, x, y, patrol) {
  const [minX, maxX] = patrol;

  const enemy = k.add([
    k.pos(x, y),
    k.sprite("characters", { frame: CHAR.enemy }),
    k.area({ shape: new k.Rect(k.vec2(0, 0), W, H) }),
    k.anchor("bot"),
    k.z(15),
    "enemy",
    {
      dir: 1,
      minX,
      maxX,
      baseY: y,
    },
  ]);

  enemy.onUpdate(() => {
    enemy.move(enemy.dir * ENEMY_SPEED, 0);
    enemy.pos.y = enemy.baseY + Math.sin(k.time() * 3 + x * 0.01) * 4;
    enemy.flipX = enemy.dir < 0;

    if (enemy.pos.x <= enemy.minX) {
      enemy.pos.x = enemy.minX;
      enemy.dir = 1;
    }
    if (enemy.pos.x >= enemy.maxX) {
      enemy.pos.x = enemy.maxX;
      enemy.dir = -1;
    }
  });

  return enemy;
}
