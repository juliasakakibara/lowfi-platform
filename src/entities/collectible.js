import { COLORS } from "../config.js";
import { playSound } from "../utils/audio.js";
import { spawnCoinBurst } from "../utils/particles.js";

export function createCollectible(k, x, y, onCollect) {
  const coin = k.add([
    k.pos(x, y),
    k.circle(10),
    k.area({ shape: new k.Rect(k.vec2(-8, -8), 16, 16) }),
    k.anchor("center"),
    k.color(...COLORS.coin),
    k.z(3),
    "collectible",
  ]);

  const baseY = y;

  coin.onUpdate(() => {
    coin.pos.y = baseY + Math.sin(k.time() * 4) * 4;
  });

  coin.onCollide("player", () => {
    playSound(k, "coin");
    spawnCoinBurst(k, coin.pos);
    onCollect();
    coin.destroy();
  });

  return coin;
}
