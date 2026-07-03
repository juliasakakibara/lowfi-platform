import { GAME } from "../config.js";
import { CHAR } from "../level/tiles.js";
import { playSound } from "../utils/audio.js";

export function createPlayer(k, x, y) {
  const player = k.add([
    k.pos(x, y),
    k.sprite("characters", { frame: CHAR.player }),
    k.area({ shape: new k.Rect(k.vec2(-6, -32), 12, 32) }),
    k.body(),
    k.anchor("bot"),
    k.scale(1.2),
    k.z(10),
    "player",
    {
      grounded: false,
      invincible: false,
      facing: 1,
    },
  ]);

  player.onUpdate(() => {
    player.grounded = player.isGrounded();

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
