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

  addTitle(k, "Stick Man Run", 85);
  addBodyText(k, "Um presente especial para voce", 140, {
    size: UI.subtitleSize,
  });

  // Personagem centralizado abaixo do subtítulo
  k.add([
    k.sprite("characters", { frame: CHAR.player }),
    k.pos(cx, 210),
    k.anchor("center"),
    k.scale(2.2),
    k.fixed(),
    k.z(2),
  ]);

  addBodyText(k, "Pressione ESPACO para comecar", 260, {
    size: UI.subtitleSize,
    color: UI.text,
  });
  addBodyText(k, "<- -> ou A D para mover  |  ESPACO para pular", 300, {
    size: UI.smallSize,
  });

  k.onKeyPress("space", () => {
    k.go("game");
  });
}
