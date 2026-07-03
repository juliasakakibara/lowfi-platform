import { GAME, BIRTHDAY_MESSAGE } from "../config.js";
import { playSound } from "../utils/audio.js";
import { spawnConfetti } from "../utils/particles.js";

export function winScene(k, data = {}) {
  const coins = data.coins ?? 0;

  playSound(k, "win");
  spawnConfetti(k, GAME.width, GAME.height, 4);

  k.add([
    k.text("Parabens!", { size: 38 }),
    k.pos(k.center().x, 70),
    k.anchor("top"),
    k.color(30, 30, 30),
    k.fixed(),
  ]);

  k.add([
    k.text(BIRTHDAY_MESSAGE.title, { size: 26 }),
    k.pos(k.center().x, 120),
    k.anchor("top"),
    k.color(200, 50, 100),
    k.fixed(),
  ]);

  BIRTHDAY_MESSAGE.lines.forEach((line, i) => {
    k.add([
      k.text(line, { size: 18 }),
      k.pos(k.center().x, 165 + i * 32),
      k.anchor("top"),
      k.color(50, 50, 50),
      k.fixed(),
    ]);
  });

  const coinY = 165 + BIRTHDAY_MESSAGE.lines.length * 32 + 16;
  k.add([
    k.text(`Moedas coletadas: ${coins}`, { size: 18 }),
    k.pos(k.center().x, coinY),
    k.anchor("top"),
    k.color(160, 120, 0),
    k.fixed(),
  ]);

  k.add([
    k.text("Pressione ESPACO para jogar de novo", { size: 16 }),
    k.pos(k.center().x, GAME.height - 50),
    k.anchor("center"),
    k.color(100, 100, 100),
    k.fixed(),
  ]);

  k.onKeyPress("space", () => {
    k.go("menu");
  });
}
