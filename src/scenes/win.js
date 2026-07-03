import { GAME, BIRTHDAY_MESSAGE } from "../config.js";
import { playSound } from "../utils/audio.js";
import { spawnConfetti } from "../utils/particles.js";

function addPanel(k, x, y, w, h) {
  const cols = Math.ceil(w / 64);
  const rows = Math.ceil(h / 64);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      k.add([
        k.sprite("panel"),
        k.pos(x + col * 64, y + row * 64),
        k.fixed(),
        k.z(1),
      ]);
    }
  }
}

export function winScene(k, data = {}) {
  const coins = data.coins ?? 0;

  playSound(k, "win");

  k.add([
    k.sprite("bg-sky"),
    k.pos(0, 0),
    k.fixed(),
    k.z(-2),
  ]);

  spawnConfetti(k, GAME.width, GAME.height, 4);

  const panelH = 120 + BIRTHDAY_MESSAGE.lines.length * 32;
  addPanel(k, k.center().x - 260, 50, 520, panelH);

  k.add([
    k.text("Parabens!", { size: 38 }),
    k.pos(k.center().x, 70),
    k.anchor("top"),
    k.color(40, 40, 50),
    k.fixed(),
    k.z(2),
  ]);

  k.add([
    k.text(BIRTHDAY_MESSAGE.title, { size: 26 }),
    k.pos(k.center().x, 120),
    k.anchor("top"),
    k.color(200, 50, 100),
    k.fixed(),
    k.z(2),
  ]);

  BIRTHDAY_MESSAGE.lines.forEach((line, i) => {
    k.add([
      k.text(line, { size: 18 }),
      k.pos(k.center().x, 165 + i * 32),
      k.anchor("top"),
      k.color(60, 60, 70),
      k.fixed(),
      k.z(2),
    ]);
  });

  const coinY = 165 + BIRTHDAY_MESSAGE.lines.length * 32 + 16;
  k.add([
    k.sprite("coin-icon"),
    k.pos(k.center().x - 80, coinY),
    k.scale(1.3),
    k.fixed(),
    k.z(2),
  ]);

  k.add([
    k.text(`Moedas coletadas: ${coins}`, { size: 18 }),
    k.pos(k.center().x - 55, coinY - 2),
    k.anchor("left"),
    k.color(160, 120, 0),
    k.fixed(),
    k.z(2),
  ]);

  k.add([
    k.text("Pressione ESPACO para jogar de novo", { size: 16 }),
    k.pos(k.center().x, GAME.height - 50),
    k.anchor("center"),
    k.color(100, 100, 110),
    k.fixed(),
    k.z(2),
  ]);

  k.onKeyPress("space", () => {
    k.go("menu");
  });
}
