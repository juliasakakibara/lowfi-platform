import { GAME } from "../config.js";
import { input } from "../input.js";
import { playSound } from "../utils/audio.js";

/** Frame 24×24 — Rect (0,0,w,h) + anchor bot: Kaboom alinha a base em pos.y */
const W = 24;
const H = 24;

function tryJump(k, player) {
  if (player.grounded) {
    player.jump(GAME.jumpForce);
    playSound(k, "jump");
  }
}

export function createPlayer(k, x, y) {
  const player = k.add([
    k.pos(x, y),
    k.sprite("bruno", { anim: "idle" }),
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
    if (k.isKeyDown("left") || k.isKeyDown("a") || input.left) moveX -= 1;
    if (k.isKeyDown("right") || k.isKeyDown("d") || input.right) moveX += 1;

    if (moveX !== 0) {
      player.facing = moveX;
      player.move(moveX * GAME.playerSpeed, 0);
      player.flipX = moveX < 0;
      if (player.curAnim() !== "walk") {
        player.play("walk");
      }
    } else {
      // move() só aplica vel enquanto há input — sem isso o personagem desliza sem parar
      player.vel.x = 0;
      if (player.curAnim() !== "idle") {
        player.play("idle");
      }
    }


    if (input.jump) {
      input.jump = false;
      tryJump(k, player);
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
  const onJumpKey = () => {
    input.jump = true;
  };

  k.onKeyPress("space", onJumpKey);
  k.onKeyPress("up", onJumpKey);
  k.onKeyPress("w", onJumpKey);
}

export function knockbackPlayer(player, fromX) {
  const dir = player.pos.x < fromX ? -1 : 1;
  player.move(dir * 120, -200);
}
