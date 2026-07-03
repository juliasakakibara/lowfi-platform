import { GAME } from "../config.js";
import { level1 } from "../level/level1.js";
import { createPlayer, setupPlayerControls, knockbackPlayer } from "../entities/player.js";
import { createEnemy } from "../entities/enemy.js";
import { createCollectible } from "../entities/collectible.js";
import { createFlag } from "../entities/flag.js";
import { spawnGroundTiles, createParallax } from "../level/terrain.js";
import { playSound } from "../utils/audio.js";
import { shouldDamagePlayer, isStomping } from "../utils/collision.js";
import { spawnStompDust } from "../utils/particles.js";

function createHud(k, getCoins, getLives) {
  k.add([
    k.rect(GAME.width - 20, 44),
    k.pos(10, 8),
    k.color(255, 255, 255),
    k.opacity(0.75),
    k.outline(2, 255, 200, 100),
    k.fixed(),
    k.z(99),
  ]);

  k.add([
    k.sprite("coin-icon"),
    k.pos(24, 20),
    k.scale(1.2),
    k.fixed(),
    k.z(100),
  ]);

  const coinLabel = k.add([
    k.text("0", { size: 22 }),
    k.pos(46, 14),
    k.color(40, 40, 40),
    k.fixed(),
    k.z(100),
  ]);

  const hearts = [];
  for (let i = 0; i < GAME.maxLives; i++) {
    const heart = k.add([
      k.sprite("heart"),
      k.pos(GAME.width - 24 - i * 22, 16),
      k.scale(1.1),
      k.anchor("topright"),
      k.fixed(),
      k.z(100),
    ]);
    hearts.push(heart);
  }

  function refresh() {
    coinLabel.text = `${getCoins()}`;
    const lives = getLives();
    hearts.forEach((h, i) => {
      h.opacity = i < lives ? 1 : 0.2;
    });
  }

  refresh();
  return { refresh, coinLabel };
}

export function gameScene(k) {
  k.setGravity(GAME.gravity);

  const parallax = createParallax(k);

  let lives = GAME.maxLives;
  let coins = 0;
  let gameEnded = false;

  spawnGroundTiles(k, level1.ground);

  const startX = 80;
  const startY = level1.ground[0].y;
  const player = createPlayer(k, startX, startY);
  setupPlayerControls(k, player);

  for (const e of level1.enemies) {
    createEnemy(k, e.x, e.y ?? level1.ground[0].y, e.patrol);
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
    parallax.update(targetX);

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
