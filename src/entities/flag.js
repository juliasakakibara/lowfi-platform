import { ASSETS } from "../config.js";
import { TILE } from "../level/tiles.js";

export function createFlag(k, x, y, onReach) {
  const useCustom = ASSETS.useCustomFlag;

  k.add([
    k.pos(x, y),
    useCustom
      ? k.sprite("flag-custom")
      : k.sprite("tiles", { frame: TILE.flag }),
    k.anchor("bot"),
    k.scale(useCustom ? 1.2 : 1.4),
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
