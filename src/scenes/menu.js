import { ASSETS } from "../config.js";
import { UI } from "../ui/theme.js";
import { addPanel, addTitle, addBodyText } from "../ui/panel.js";
import { CHAR } from "../level/tiles.js";

export function menuScene(k) {
  addPanel(k, k.center().x - 230, 70, 460, 300);

  if (ASSETS.customMenuBanner) {
    k.add([
      k.sprite("menu-banner"),
      k.pos(k.center().x, 90),
      k.anchor("top"),
      k.scale(0.8),
      k.fixed(),
      k.z(2),
    ]);
  }

  k.add([
    k.sprite("characters", { frame: CHAR.player }),
    k.pos(k.center().x - 170, 300),
    k.anchor("bot"),
    k.scale(2),
    k.fixed(),
    k.z(2),
  ]);

  addTitle(k, "Stick Man Run", 95);
  addBodyText(k, "Um presente especial para voce", 150, {
    size: UI.subtitleSize,
  });
  addBodyText(k, "Pressione ESPACO para comecar", 220, {
    size: UI.subtitleSize,
    color: UI.text,
  });
  addBodyText(k, "<- -> ou A D para mover  |  ESPACO para pular", 280, {
    size: UI.smallSize,
  });

  k.onKeyPress("space", () => {
    k.go("game");
  });
}
