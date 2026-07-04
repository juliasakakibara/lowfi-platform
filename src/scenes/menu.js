import { ASSETS, GAME } from "../config.js";
import { UI } from "../ui/theme.js";
import { addPanel, addTitle, addBodyText } from "../ui/panel.js";

export function menuScene(k) {
  const cx = k.center().x;
  const panelH = 320;
  const panelY = (GAME.height - panelH) / 2;

  addPanel(k, cx - 230, panelY, 460, panelH);

  if (ASSETS.customMenuBanner) {
    k.add([
      k.sprite("menu-banner"),
      k.pos(cx, panelY + 20),
      k.anchor("top"),
      k.scale(0.8),
      k.fixed(),
      k.z(2),
    ]);
  }

  addTitle(k, "SUPER BRUNO BROS.", panelY + 25);
  addBodyText(k, "Colete as moedas e desarme os inimigos para descobrir seu presente!", panelY + 70, {
    size: UI.subtitleSize,
    width: 400,
  });

  k.add([
    k.sprite("bruno", { anim: "walk" }),
    k.pos(cx, panelY + 170),
    k.anchor("center"),
    k.scale(2.2),
    k.fixed(),
    k.z(2),
  ]);

  addBodyText(k, "ESPACO ou toque na tela para comecar", panelY + 210, {
    size: UI.subtitleSize,
    color: UI.text,
    width: 400,
  });
  addBodyText(k, "<- -> ou A D para mover  |  ESPACO para pular", panelY + 250, {
    size: UI.smallSize,
    width: 400,
  });

  const start = () => k.go("game");
  k.onKeyPress("space", start);
  k.onClick(start);
}
