import kaboom from "kaboom";
import { GAME, COLORS } from "./config.js";
import { loadGameAssets } from "./assets.js";
import { menuScene } from "./scenes/menu.js";
import { gameScene } from "./scenes/game.js";
import { winScene } from "./scenes/win.js";
import { gameoverScene } from "./scenes/gameover.js";

const k = kaboom({
  width: GAME.width,
  height: GAME.height,
  stretch: true,
  letterbox: true,
  background: COLORS.sky,
  global: false,
  loadingScreen: true,
  crisp: true,
});

k.loadRoot("./");

k.scene("menu", () => menuScene(k));
k.scene("game", () => gameScene(k));
k.scene("win", (data) => winScene(k, data));
k.scene("gameover", () => gameoverScene(k));

loadGameAssets(k);

k.onLoad(() => {
  k.go("menu");
});

k.canvas.focus();
k.canvas.addEventListener("click", () => k.canvas.focus());
