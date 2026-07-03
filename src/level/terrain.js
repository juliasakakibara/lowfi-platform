import { COLORS } from "../config.js";

export const PLATFORM_HEIGHT = 40;

/**
 * Uma plataforma = um retângulo visível + sólido (mesmo objeto).
 * Buraco real = buraco visível.
 */
export function spawnGround(k, segments) {
  for (const g of segments) {
    k.add([
      k.pos(g.x, g.y),
      k.rect(g.w, PLATFORM_HEIGHT),
      k.area({ shape: new k.Rect(k.vec2(0, 0), g.w, PLATFORM_HEIGHT) }),
      k.body({ isStatic: true }),
      k.anchor("topleft"),
      k.color(...COLORS.ground),
      k.outline(2, k.rgb(56, 128, 0)),
      k.z(0),
      "ground",
      "platform",
    ]);
  }
}
