import { GAME } from "../config.js";
import { UI } from "../ui/theme.js";
import { addPanel, addTitle, addBodyText, addActionHint } from "../ui/panel.js";

export function gameoverScene(k) {
  const panelH = 210;
  const panelY = (GAME.height - panelH) / 2;
  const cx = k.center().x;

  addPanel(k, cx - 210, panelY, 420, panelH);

  addTitle(k, "Quase lá!", panelY + 25);
  addBodyText(k, "Não desista — tente de novo!", panelY + 90, {
    size: UI.subtitleSize,
    color: UI.text,
  });

  const back = () => k.go("menu");
  addActionHint(k, "ESPAÇO ou toque aqui para voltar ao menu", panelY + 150, back, {
    size: UI.bodySize,
    width: 380,
  });
}
