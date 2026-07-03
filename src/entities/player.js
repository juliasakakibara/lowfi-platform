import { GAME, COLORS } from "../config.js";
import { playSound } from "../utils/audio.js";

export function createPlayer(k, x, y) {
  const player = k.add([
    k.pos(x, y),
    k.area({ shape: new k.Rect(k.vec2(-6, -32), 12, 32) }),
    k.body(),
    k.anchor("bot"),
    k.z(10),
    "player",
    {
      grounded: false,
      invincible: false,
      facing: 1,
    },
  ]);

  const head = player.add([
    k.circle(8),
    k.pos(0, -40),
    k.color(...COLORS.player),
    k.anchor("center"),
  ]);

  const body = player.add([
    k.rect(4, 20),
    k.pos(0, -28),
    k.color(...COLORS.player),
    k.anchor("bot"),
  ]);

  player.add([
    k.rect(20, 3),
    k.pos(0, -24),
    k.color(...COLORS.player),
    k.anchor("center"),
  ]);

  player.add([
    k.rect(3, 14),
    k.pos(-6, -14),
    k.color(...COLORS.player),
    k.anchor("bot"),
  ]);

  player.add([
    k.rect(3, 14),
    k.pos(6, -14),
    k.color(...COLORS.player),
    k.anchor("bot"),
  ]);

  player.onUpdate(() => {
    player.grounded = player.isGrounded();

    let moveX = 0;
    if (k.isKeyDown("left") || k.isKeyDown("a")) moveX -= 1;
    if (k.isKeyDown("right") || k.isKeyDown("d")) moveX += 1;

    if (moveX !== 0) {
      player.facing = moveX;
      player.move(moveX * GAME.playerSpeed, 0);
    }

    const flash =
      player.invincible && Math.floor(k.time() * 10) % 2 === 0
        ? k.rgb(255, 100, 100)
        : k.rgb(...COLORS.player);
    head.color = flash;
    body.color = flash;
  });

  return player;
}

export function setupPlayerControls(k, player) {
  const tryJump = () => {
    if (player.grounded) {
      player.jump(GAME.jumpForce);
      playSound(k, "jump");
    }
  };

  k.onKeyPress("space", tryJump);
  k.onKeyPress("up", tryJump);
  k.onKeyPress("w", tryJump);
}

export function knockbackPlayer(player, fromX) {
  const dir = player.pos.x < fromX ? -1 : 1;
  player.move(dir * 120, -200);
}
