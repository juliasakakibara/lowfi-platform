import { GAME } from "../config.js";
import { UI } from "../ui/theme.js";
import { addPanel, addTitle, addBodyText } from "../ui/panel.js";

export function gameoverScene(k) {
  const panelH = 210;
  const panelY = (GAME.height - panelH) / 2;
  const cx = k.center().x;

  addPanel(k, cx - 210, panelY, 420, panelH);

  addTitle(k, "Quase la!", panelY + 25);
  addBodyText(k, "Nao desista — tente de novo!", panelY + 90, {
    size: UI.subtitleSize,
    color: UI.text,
  });
  addBodyText(k, "ESPACO ou toque na tela para voltar ao menu", panelY + 150, {
    size: UI.bodySize,
    width: 380,
  });

  const back = () => k.go("menu");
  k.onKeyPress("space", back);
  k.onClick(back);
}
