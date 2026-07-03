import { GAME, ASSETS } from "../config.js";

function addPanel(k, x, y, w, h) {
  const cols = Math.ceil(w / 64);
  const rows = Math.ceil(h / 64);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      k.add([
        k.sprite("panel"),
        k.pos(x + col * 64, y + row * 64),
        k.scale(Math.min(1, (w - col * 64) / 64), Math.min(1, (h - row * 64) / 64)),
        k.fixed(),
        k.z(0),
      ]);
    }
  }
}

export function menuScene(k) {
  k.add([
    k.sprite("bg-sky"),
    k.pos(0, 0),
    k.fixed(),
    k.z(-2),
  ]);

  k.add([
    k.sprite("bg-clouds"),
    k.pos(80, 50),
    k.fixed(),
    k.z(-1),
    k.opacity(0.7),
  ]);

  addPanel(k, k.center().x - 220, 80, 440, 280);

  if (ASSETS.customMenuBanner) {
    k.add([
      k.sprite("menu-banner"),
      k.pos(k.center().x, 100),
      k.anchor("top"),
      k.scale(0.8),
      k.fixed(),
      k.z(2),
    ]);
  }

  k.add([
    k.sprite("player", { anim: "run" }),
    k.pos(k.center().x - 160, 280),
    k.anchor("bot"),
    k.scale(1.2),
    k.fixed(),
    k.z(2),
  ]);

  k.add([
    k.text("Stick Man Run", { size: 42 }),
    k.pos(k.center().x, 110),
    k.anchor("top"),
    k.color(40, 40, 50),
    k.fixed(),
    k.z(2),
  ]);

  k.add([
    k.text("Um presente especial para voce", { size: 18 }),
    k.pos(k.center().x, 165),
    k.anchor("top"),
    k.color(100, 80, 90),
    k.fixed(),
    k.z(2),
  ]);

  k.add([
    k.text("Pressione ESPACO para comecar", { size: 22 }),
    k.pos(k.center().x, 240),
    k.anchor("top"),
    k.color(50, 50, 60),
    k.fixed(),
    k.z(2),
  ]);

  k.add([
    k.text("<- -> ou A D para mover  |  ESPACO para pular", { size: 14 }),
    k.pos(k.center().x, 320),
    k.anchor("top"),
    k.color(90, 90, 100),
    k.fixed(),
    k.z(2),
  ]);

  k.onKeyPress("space", () => {
    k.go("game");
  });
}
