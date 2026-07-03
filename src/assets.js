import { ASSETS } from "./config.js";

export function loadGameAssets(k) {
  k.loadSprite("tiles", "assets/pixel-platformer/tiles.png", {
    sliceX: 20,
    sliceY: 9,
  });

  k.loadSprite("characters", "assets/pixel-platformer/characters.png", {
    sliceX: 9,
    sliceY: 3,
  });

  k.loadSprite("bg-tiles", "assets/pixel-platformer/backgrounds.png", {
    sliceX: 8,
    sliceY: 3,
  });

  if (ASSETS.useCustomFlag) {
    k.loadSprite("flag-custom", ASSETS.customFlag);
  }

  if (ASSETS.customMenuBanner) {
    k.loadSprite("menu-banner", ASSETS.customMenuBanner);
  }
}
