import { UI } from "../ui/theme.js";
import { addPanel, addTitle, addBodyText } from "../ui/panel.js";

export function gameoverScene(k) {
  addPanel(k, k.center().x - 210, 110, 420, 210);

  addTitle(k, "Quase la!", 135);
  addBodyText(k, "Nao desista — tente de novo!", 200, {
    size: UI.subtitleSize,
    color: UI.text,
  });
  addBodyText(k, "ESPACO ou toque na tela para voltar ao menu", 260, {
    size: UI.bodySize,
    width: 380,
  });

  const back = () => k.go("menu");
  k.onKeyPress("space", back);
  k.onClick(back);
}
