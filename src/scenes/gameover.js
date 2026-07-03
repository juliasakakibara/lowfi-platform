import { GAME } from "../config.js";

function addPanel(k, x, y, w, h) {
  const cols = Math.ceil(w / 64);
  const rows = Math.ceil(h / 64);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      k.add([
        k.sprite("panel"),
        k.pos(x + col * 64, y + row * 64),
        k.fixed(),
        k.z(1),
      ]);
    }
  }
}

export function gameoverScene(k) {
  k.add([
    k.sprite("bg-sky"),
    k.pos(0, 0),
    k.fixed(),
    k.z(-2),
    k.opacity(0.6),
  ]);

  addPanel(k, k.center().x - 200, 120, 400, 200);

  k.add([
    k.text("Quase la!", { size: 36 }),
    k.pos(k.center().x, 150),
    k.anchor("top"),
    k.color(80, 60, 70),
    k.fixed(),
    k.z(2),
  ]);

  k.add([
    k.text("Nao desista — tente de novo!", { size: 20 }),
    k.pos(k.center().x, 210),
    k.anchor("top"),
    k.color(100, 80, 90),
    k.fixed(),
    k.z(2),
  ]);

  k.add([
    k.text("Pressione ESPACO para voltar ao menu", { size: 18 }),
    k.pos(k.center().x, 270),
    k.anchor("top"),
    k.color(120, 100, 110),
    k.fixed(),
    k.z(2),
  ]);

  k.onKeyPress("space", () => {
    k.go("menu");
  });
}
