import { GAME, BIRTHDAY_MESSAGE } from "../config.js";
import { playSound } from "../utils/audio.js";
import { spawnConfetti } from "../utils/particles.js";
import { UI } from "../ui/theme.js";
import { addPanel, addTitle, addBodyText } from "../ui/panel.js";
import { TILE } from "../level/tiles.js";

export function winScene(k, data = {}) {
  const coins = data.coins ?? 0;

  playSound(k, "win");
  spawnConfetti(k, GAME.width, GAME.height, 4);

  const panelH = 140 + BIRTHDAY_MESSAGE.lines.length * 32;
  addPanel(k, k.center().x - 260, 40, 520, panelH);

  addTitle(k, "Parabens!", 55);
  addBodyText(k, BIRTHDAY_MESSAGE.title, 105, {
    size: 26,
    color: UI.accent,
  });

  BIRTHDAY_MESSAGE.lines.forEach((line, i) => {
    addBodyText(k, line, 150 + i * 32, { color: UI.text });
  });

  const coinY = 150 + BIRTHDAY_MESSAGE.lines.length * 32 + 12;
  k.add([
    k.sprite("tiles", { frame: TILE.coin }),
    k.pos(k.center().x - 90, coinY + 4),
    k.scale(1.4),
    k.fixed(),
    k.z(2),
  ]);
  k.add([
    k.text(`Moedas coletadas: ${coins}`, { size: UI.bodySize }),
    k.pos(k.center().x - 60, coinY),
    k.anchor("left"),
    k.color(...UI.coin),
    k.fixed(),
    k.z(2),
  ]);

  addBodyText(k, "Pressione ESPACO para jogar de novo", GAME.height - 50, {
    size: UI.smallSize,
  });

  k.onKeyPress("space", () => {
    k.go("menu");
  });
}
