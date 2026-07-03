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

// Mesmo base do Vite (./ no GitHub Pages)
k.loadRoot(import.meta.env.BASE_URL);


k.scene("menu", () => menuScene(k));
k.scene("game", () => gameScene(k));
k.scene("win", (data) => winScene(k, data));
k.scene("gameover", () => gameoverScene(k));

loadGameAssets(k);

let started = false;
function startGame() {
  if (started) return;
  started = true;
  k.go("menu");
}

k.onLoad(startGame);

// Fallback: se onLoad não disparar (rede/asset), entra no menu mesmo assim
k.wait(3, startGame);

if (k.canvas) {
  k.canvas.focus();
  k.canvas.addEventListener("click", () => k.canvas.focus());
}
