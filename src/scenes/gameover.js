export function gameoverScene(k) {
  k.add([
    k.text("Quase la!", { size: 36 }),
    k.pos(k.center().x, 150),
    k.anchor("top"),
    k.color(30, 30, 30),
    k.fixed(),
  ]);

  k.add([
    k.text("Nao desista — tente de novo!", { size: 20 }),
    k.pos(k.center().x, 210),
    k.anchor("top"),
    k.color(80, 80, 80),
    k.fixed(),
  ]);

  k.add([
    k.text("Pressione ESPACO para voltar ao menu", { size: 18 }),
    k.pos(k.center().x, 270),
    k.anchor("top"),
    k.color(100, 100, 100),
    k.fixed(),
  ]);

  k.onKeyPress("space", () => {
    k.go("menu");
  });
}
