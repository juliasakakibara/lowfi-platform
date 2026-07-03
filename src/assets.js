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

  // Player custom: 4 frames × 24×24 (sheet 96×24)
  k.loadSprite("bruno", "assets/custom/bruno.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      idle: 0,
      walk: { from: 0, to: 3, speed: 10, loop: true },
    },
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
