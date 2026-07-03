import { COLORS } from "../config.js";

const ENEMY_SPEED = 80;

export function createEnemy(k, x, y, patrol) {
  const [minX, maxX] = patrol;

  const enemy = k.add([
    k.pos(x, y),
    k.rect(20, 24),
    k.area({ shape: new k.Rect(k.vec2(-10, -24), 20, 24) }),
    k.anchor("bot"),
    k.color(...COLORS.enemy),
    k.z(5),
    "enemy",
    {
      dir: 1,
      minX,
      maxX,
    },
  ]);

  enemy.onUpdate(() => {
    enemy.move(enemy.dir * ENEMY_SPEED, 0);

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
