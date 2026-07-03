import { playSound } from "../utils/audio.js";
import { spawnCoinBurst } from "../utils/particles.js";

export function createCollectible(k, x, y, onCollect) {
  const coin = k.add([
    k.pos(x, y),
    k.sprite("coin"),
    k.area({ shape: new k.Circle(k.vec2(0, 0), 8) }),
    k.anchor("center"),
    k.scale(1.2),
    k.z(3),
    "collectible",
  ]);

  coin.onUpdate(() => {
    coin.pos.y += Math.sin(k.time() * 4) * 0.5;
    coin.angle = Math.sin(k.time() * 3) * 8;
  });

  coin.onCollide("player", () => {
    playSound(k, "coin");
    spawnCoinBurst(k, coin.pos);
    onCollect();
    coin.destroy();
  });

  return coin;
}
