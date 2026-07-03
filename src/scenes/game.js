import { GAME } from "../config.js";
import { level1 } from "../level/level1.js";
import { createPlayer, setupPlayerControls, knockbackPlayer } from "../entities/player.js";
import { createEnemy } from "../entities/enemy.js";
import { createCollectible } from "../entities/collectible.js";
import { createFlag } from "../entities/flag.js";
import { spawnGround } from "../level/terrain.js";
import { playSound } from "../utils/audio.js";
import { shouldDamagePlayer, isStomping } from "../utils/collision.js";
import { spawnStompDust } from "../utils/particles.js";

function createHud(k, getCoins, getLives) {
  k.add([
    k.rect(GAME.width - 20, 44),
    k.pos(10, 8),
    k.color(255, 255, 255),
    k.opacity(0.85),
    k.outline(2, k.rgb(50, 50, 50)),
    k.fixed(),
    k.z(99),
  ]);

  const coinLabel = k.add([
    k.text("Moedas: 0", { size: 20 }),
    k.pos(24, 18),
    k.color(40, 40, 40),
    k.fixed(),
    k.z(100),
  ]);

  const livesLabel = k.add([
    k.text("", { size: 20 }),
    k.pos(GAME.width - 24, 18),
    k.anchor("topright"),
    k.color(200, 50, 50),
    k.fixed(),
    k.z(100),
  ]);

  function refresh() {
    coinLabel.text = `Moedas: ${getCoins()}`;
    livesLabel.text = "♥".repeat(getLives());
  }

  refresh();
  return { refresh };
}

export function gameScene(k) {
  k.setGravity(GAME.gravity);

  let lives = GAME.maxLives;
  let coins = 0;
  let gameEnded = false;

  spawnGround(k, level1.ground);

  const startX = 80;
  const startY = level1.ground[0].y;
  const player = createPlayer(k, startX, startY);
  setupPlayerControls(k, player);

  for (const e of level1.enemies) {
    createEnemy(k, e.x, e.y, e.patrol);
  }

  const hud = createHud(k, () => coins, () => lives);

  for (const c of level1.collectibles) {
    createCollectible(k, c.x, c.y, () => {
      coins += 1;
      hud.refresh();
    });
  }

  function endGame() {
    if (gameEnded) return;
    gameEnded = true;
  }

  function handlePlayerHit(enemy) {
    if (gameEnded || player.invincible) return;

    playSound(k, "hurt");
    lives -= 1;
    hud.refresh();
    knockbackPlayer(player, enemy.pos.x);
    player.invincible = true;

    k.wait(GAME.invincibleTime, () => {
      player.invincible = false;
    });

    if (lives <= 0) {
      endGame();
      k.wait(0.5, () => k.go("gameover"));
    }
  }

  player.onCollide("enemy", (enemy) => {
    if (gameEnded || player.invincible) return;

    if (isStomping(player, enemy)) {
      player.jump(GAME.jumpForce * 0.85);
      playSound(k, "coin");
      spawnStompDust(k, enemy.pos);
      enemy.destroy();
      return;
    }

    if (!shouldDamagePlayer(player, enemy)) return;
    handlePlayerHit(enemy);
  });

  createFlag(k, level1.flag.x, level1.flag.y, () => {
    if (gameEnded) return;
    endGame();
    k.go("win", { coins });
  });

  k.onUpdate(() => {
    if (gameEnded) return;

    const targetX = k.clamp(
      player.pos.x,
      GAME.width / 2,
      level1.width - GAME.width / 2,
    );
    k.camPos(targetX, GAME.height / 2);

    if (player.pos.y > GAME.height + 100) {
      handlePlayerHit({ pos: { x: player.pos.x } });
      player.pos = k.vec2(startX, startY);
    }
  });

  k.add([
    k.text("Chegue na bandeirinha!", { size: 16 }),
    k.pos(GAME.width / 2, GAME.height - 24),
    k.anchor("center"),
    k.color(50, 50, 50),
    k.fixed(),
    k.z(100),
  ]);
}
