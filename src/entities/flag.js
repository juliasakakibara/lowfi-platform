import { ASSETS } from "../config.js";

export function createFlag(k, x, y, onReach) {
  const flagSprite = ASSETS.useCustomFlag ? "flag-custom" : "flag";

  k.add([
    k.pos(x, y),
    k.sprite(flagSprite),
    k.anchor("bot"),
    k.scale(1.2),
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
