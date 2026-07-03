export function menuScene(k) {
  k.add([
    k.text("Stick Man Run", { size: 42 }),
    k.pos(k.center().x, 110),
    k.anchor("top"),
    k.color(30, 30, 30),
    k.fixed(),
  ]);

  k.add([
    k.text("Um presente especial para voce", { size: 18 }),
    k.pos(k.center().x, 170),
    k.anchor("top"),
    k.color(80, 80, 80),
    k.fixed(),
  ]);

  k.add([
    k.text("Pressione ESPACO para comecar", { size: 22 }),
    k.pos(k.center().x, 260),
    k.anchor("top"),
    k.color(40, 40, 40),
    k.fixed(),
  ]);

  k.add([
    k.text("<- -> ou A D para mover  |  ESPACO para pular", { size: 14 }),
    k.pos(k.center().x, 320),
    k.anchor("top"),
    k.color(100, 100, 100),
    k.fixed(),
  ]);

  k.onKeyPress("space", () => {
    k.go("game");
  });
}
