import { GAME } from "../config.js";
import { resetInput } from "../input.js";
import { level1 } from "../level/level1.js";
import { createPlayer, setupPlayerControls, knockbackPlayer } from "../entities/player.js";
import { createEnemy } from "../entities/enemy.js";
import { createCollectible } from "../entities/collectible.js";
import { createFlag } from "../entities/flag.js";
import { spawnGround } from "../level/terrain.js";
import { playSound } from "../utils/audio.js";
import { shouldDamagePlayer, isStomping } from "../utils/collision.js";
import { spawnStompDust } from "../utils/particles.js";
import { UI } from "../ui/theme.js";
import { addIconLabel } from "../ui/panel.js";
import { addTouchControls } from "../ui/touchControls.js";
import { TILE } from "../level/tiles.js";


function createHud(k, getCoins, getLives) {
  const panelY = 8;
  const panelH = 44;
  const rowY = panelY + (panelH - 18 * 1.3) / 2;

  k.add([
    k.rect(GAME.width - 20, panelH),
    k.pos(10, panelY),
    k.color(...UI.panelBg),
    k.opacity(UI.panelOpacity),
    k.outline(2, k.rgb(...UI.panelBorder)),
    k.fixed(),
    k.z(99),
  ]);

  const coinLabel = addIconLabel(k, {
    frame: TILE.coin,
    text: "0",
    x: 24,
    y: rowY,
    iconScale: 1.3,
    fontSize: 20,
    color: UI.text,
    z: 100,
  });

  const hearts = [];
  const heartScale = 1.2;
  const heartSize = 18 * heartScale;
  for (let i = 0; i < GAME.maxLives; i++) {
    hearts.push(
      k.add([
        k.sprite("tiles", { frame: TILE.heart }),
        k.pos(GAME.width - 28 - i * (heartSize + 4), rowY + heartSize / 2),
        k.anchor("center"),
        k.scale(heartScale),
        k.fixed(),
        k.z(100),
      ]),
    );
  }

  function refresh() {
    coinLabel.text = `${getCoins()}`;
    const lives = getLives();
    hearts.forEach((h, i) => {
      h.opacity = i < lives ? 1 : 0.25;
    });
  }

  refresh();
  return { refresh };
}

export function gameScene(k) {
  resetInput();
  k.setGravity(GAME.gravity);


  for (let i = 0; i < 4; i++) {
    k.add([
      k.sprite("bg-tiles", { frame: i % 4 }),
      k.pos(200 + i * 280, 80 + (i % 2) * 30),
      k.opacity(0.25),
      k.scale(2),
      k.z(-5),
    ]);
  }

  let lives = GAME.maxLives;
  let coins = 0;
  let gameEnded = false;

  spawnGround(k, level1.ground);

  const startX = 72;
  const startY = level1.ground[0].y;
  const player = createPlayer(k, startX, startY);
  setupPlayerControls(k, player);
  addTouchControls(k);

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
}
