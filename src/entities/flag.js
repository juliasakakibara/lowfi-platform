import { COLORS } from "../config.js";

export function createFlag(k, x, y, onReach) {
  k.add([
    k.pos(x, y),
    k.rect(4, 80),
    k.color(...COLORS.flagPole),
    k.anchor("bot"),
    k.z(2),
  ]);

  k.add([
    k.pos(x + 4, y - 70),
    k.rect(40, 28),
    k.color(255, 50, 50),
    k.anchor("left"),
    k.z(2),
  ]);

  const trigger = k.add([
    k.pos(x, y),
    k.area({ shape: new k.Rect(k.vec2(-10, -80), 60, 80) }),
    k.anchor("bot"),
    k.z(1),
    "flag",
  ]);

  trigger.onCollide("player", () => {
    onReach();
  });

  return trigger;
}
