import { GAME, getBirthdayMessage } from "../config.js";
import { playSound } from "../utils/audio.js";
import { spawnConfetti } from "../utils/particles.js";
import { UI } from "../ui/theme.js";
import { addPanel, addTitle, addBodyText, addIconLabel, addActionHint } from "../ui/panel.js";
import { TILE } from "../level/tiles.js";

export function winScene(k, data = {}) {
  const coins = data.coins ?? 0;
  const message = getBirthdayMessage();

  playSound(k, "win");
  spawnConfetti(k, GAME.width, GAME.height, 4);

  const panelH = 160 + message.lines.length * 32;
  const panelY = (GAME.height - panelH) / 2 - 20;
  const cx = k.center().x;

  addPanel(k, cx - 260, panelY, 520, panelH);

  addTitle(k, "Parabéns!", panelY + 15);
  addBodyText(k, message.title, panelY + 65, {
    size: 26,
    color: UI.accent,
  });

  message.lines.forEach((line, i) => {
    addBodyText(k, line, panelY + 110 + i * 32, { color: UI.text });
  });

  const coinY = panelY + 110 + message.lines.length * 32 + 16;
  addIconLabel(k, {
    frame: TILE.coin,
    text: `Moedas coletadas: ${coins}`,
    x: cx,
    y: coinY,
    centerX: true,
    iconScale: 1.4,
    fontSize: UI.bodySize,
    color: UI.coin,
    z: 2,
  });

  const back = () => k.go("menu");
  addActionHint(k, "ESPAÇO ou toque aqui para jogar de novo", GAME.height - 50, back, {
    size: UI.smallSize,
    width: 500,
  });
}
