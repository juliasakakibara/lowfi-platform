import { ASSETS } from "../config.js";
import { UI } from "../ui/theme.js";
import { addPanel, addTitle, addBodyText } from "../ui/panel.js";
import { CHAR } from "../level/tiles.js";

export function menuScene(k) {
  const cx = k.center().x;

  addPanel(k, cx - 230, 60, 460, 320);

  if (ASSETS.customMenuBanner) {
    k.add([
      k.sprite("menu-banner"),
      k.pos(cx, 80),
      k.anchor("top"),
      k.scale(0.8),
      k.fixed(),
      k.z(2),
    ]);
  }

  addTitle(k, "SUPER BRUNO BROS.", 85);
  // Largura do painel (460) menos margem — quebra em 2 linhas
  addBodyText(k, "Colete as moedas e desarme os inimigos para descobrir seu presente!", 130, {
    size: UI.subtitleSize,
    width: 400,
  });

  // Personagem centralizado abaixo do subtítulo
  k.add([
    k.sprite("characters", { frame: CHAR.player }),
    k.pos(cx, 230),
    k.anchor("center"),
    k.scale(2.2),
    k.fixed(),
    k.z(2),
  ]);

  addBodyText(k, "Pressione ESPACO para comecar", 270, {
    size: UI.subtitleSize,
    color: UI.text,
  });
  addBodyText(k, "<- -> ou A D para mover  |  ESPACO para pular", 310, {
    size: UI.smallSize,
    width: 400,
  });


  k.onKeyPress("space", () => {
    k.go("game");
  });
}
