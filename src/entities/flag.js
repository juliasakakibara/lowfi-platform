import { ASSETS, GAME } from "../config.js";
import { TILE } from "../level/tiles.js";

/** Largura da zona de chegada (px) */
const FINISH_WIDTH = 48;

/**
 * Sprite da bandeira no chão + trigger em toda a altura do canvas,
 * para o player vencer ao cruzar a linha em qualquer altura (pulo/queda).
 */
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

  // Zona full-height: topleft em (x - halfW, 0), altura = canvas
  const trigger = k.add([
    k.pos(x - FINISH_WIDTH / 2, 0),
    k.area({
      shape: new k.Rect(k.vec2(0, 0), FINISH_WIDTH, GAME.height),
    }),
    k.anchor("topleft"),
    k.z(1),
    "flag",
  ]);

  let reached = false;
  trigger.onCollide("player", () => {
    if (reached) return;
    reached = true;
    onReach();
  });

  return trigger;
}
