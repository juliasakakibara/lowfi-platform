import { GAME } from "../config.js";
import { CHAR } from "../level/tiles.js";
import { playSound } from "../utils/audio.js";

/** Frame 24×24 — Rect (0,0,w,h) + anchor bot: Kaboom alinha a base em pos.y */
const W = 24;
const H = 24;

export function createPlayer(k, x, y) {
  const player = k.add([
    k.pos(x, y),
    k.sprite("characters", { frame: CHAR.player }),
    // Shape com origem no canto superior esquerdo; anchor "bot" coloca a base em pos.y
    k.area({ shape: new k.Rect(k.vec2(0, 0), W, H) }),
    k.body(),
    k.anchor("bot"),
    k.z(20),
    "player",
    {
      grounded: false,
      invincible: false,
      facing: 1,
    },
  ]);

  player.onUpdate(() => {
    player.grounded = player.isGrounded();

    if (player.grounded && player.vel.y >= 0) {
      player.vel.y = 0;
    }

    let moveX = 0;
    if (k.isKeyDown("left") || k.isKeyDown("a")) moveX -= 1;
    if (k.isKeyDown("right") || k.isKeyDown("d")) moveX += 1;

    if (moveX !== 0) {
      player.facing = moveX;
      player.move(moveX * GAME.playerSpeed, 0);
      player.flipX = moveX < 0;
    }

    if (player.invincible) {
      player.opacity = Math.floor(k.time() * 10) % 2 === 0 ? 0.45 : 1;
    } else {
      player.opacity = 1;
    }
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
