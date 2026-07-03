const PLAYER = { halfW: 6, height: 32 };
const ENEMY = { halfW: 10, height: 24 };

export function shouldDamagePlayer(player, enemy) {
  const pLeft = player.pos.x - PLAYER.halfW;
  const pRight = player.pos.x + PLAYER.halfW;
  const pTop = player.pos.y - PLAYER.height;
  const pBottom = player.pos.y;

  const eLeft = enemy.pos.x - ENEMY.halfW;
  const eRight = enemy.pos.x + ENEMY.halfW;
  const eTop = enemy.pos.y - ENEMY.height;
  const eBottom = enemy.pos.y;

  if (pRight <= eLeft || pLeft >= eRight) return false;

  // Inimigo passou por cima sem encostar de verdade
  if (eBottom <= pTop + 10) return false;

  const overlap = Math.min(pBottom, eBottom) - Math.max(pTop, eTop);
  return overlap >= 8;
}

export function isStomping(player, enemy) {
  const eTop = enemy.pos.y - ENEMY.height;
  return (
    player.isFalling()
    && player.vel.y > 0
    && player.pos.y <= eTop + 14
  );
}
