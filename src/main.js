import kaboom from "kaboom";
import { GAME, COLORS } from "./config.js";
import { loadGameAssets } from "./assets.js";
import { menuScene } from "./scenes/menu.js";
import { gameScene } from "./scenes/game.js";
import { winScene } from "./scenes/win.js";
import { gameoverScene } from "./scenes/gameover.js";
import { setupTouchControls } from "./ui/touchControls.js";

const root = document.querySelector("#game-root");

// Barra de toque primeiro — #game-root já fica com a altura correta
setupTouchControls();
void root?.offsetHeight;

const rw = Math.max(root?.clientWidth || window.innerWidth, 1);
const rh = Math.max(root?.clientHeight || window.innerHeight, 1);
// Mesma proporção do host → letterbox preenche sem barras nem distorção
GAME.height = Math.max(450, Math.round((GAME.width * rh) / rw));

const k = kaboom({
  width: GAME.width,
  height: GAME.height,
  root,
  stretch: true,
  // letterbox preserva pixels; altura dinâmica evita faixa minúscula
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
  document.getElementById("boot-msg")?.remove();
  k.go("menu");
}

k.onLoad(startGame);

// Fallback: se onLoad não disparar (rede/asset), entra no menu mesmo assim
k.wait(3, startGame);

if (k.canvas) {
  k.canvas.focus();
  k.canvas.addEventListener("click", () => k.canvas.focus());
}
