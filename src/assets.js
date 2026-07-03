import { ASSETS } from "./config.js";

export function loadGameAssets(k) {
  k.loadSprite("player", "assets/sprites/player.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      idle: 0,
      run: { from: 1, to: 2, speed: 8, loop: true },
      jump: 3,
    },
  });

  k.loadSprite("enemy", "assets/sprites/enemy.png");
  k.loadSprite("coin", "assets/sprites/coin.png");
  k.loadSprite("flag", "assets/sprites/flag.png");
  k.loadSprite("tile-grass", "assets/sprites/tile-grass.png");
  k.loadSprite("tile-ground", "assets/sprites/tile-ground.png");
  k.loadSprite("particle", "assets/sprites/particle.png");

  k.loadSprite("bg-sky", "assets/background/sky.png");
  k.loadSprite("bg-hills", "assets/background/hills.png");
  k.loadSprite("bg-clouds", "assets/background/clouds.png");

  k.loadSprite("heart", "assets/ui/heart.png");
  k.loadSprite("coin-icon", "assets/ui/coin-icon.png");
  k.loadSprite("panel", "assets/ui/panel.png", {
    sliceX: 1,
    sliceY: 1,
  });

  if (ASSETS.useCustomFlag) {
    k.loadSprite("flag-custom", ASSETS.customFlag);
  }

  if (ASSETS.customMenuBanner) {
    k.loadSprite("menu-banner", ASSETS.customMenuBanner);
  }
}
