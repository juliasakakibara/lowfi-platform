// Sem sprites — o jogo usa formas básicas (rect/circle).
// Mantido para personalização futura (bandeira/banner custom).
import { ASSETS } from "./config.js";

export function loadGameAssets(k) {
  if (ASSETS.useCustomFlag) {
    k.loadSprite("flag-custom", ASSETS.customFlag);
  }

  if (ASSETS.customMenuBanner) {
    k.loadSprite("menu-banner", ASSETS.customMenuBanner);
  }
}
