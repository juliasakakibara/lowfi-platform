import { GAME } from "../config.js";
import { input } from "../input.js";
import { UI } from "./theme.js";

const BTN = 64;
const MARGIN = 16;
const GAP = 12;

function isTouchDevice() {
  return typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;
}

function addHoldButton(k, { x, y, label, onHold }) {
  const btn = k.add([
    k.rect(BTN, BTN),

    k.pos(x, y),
    k.anchor("botleft"),
    k.color(...UI.panelBg),
    k.opacity(0.45),
    k.outline(2, k.rgb(...UI.panelBorder)),
    k.area(),
    k.fixed(),
    k.z(200),
  ]);

  k.add([
    k.text(label, { size: 28 }),
    k.pos(x + BTN / 2, y - BTN / 2),
    k.anchor("center"),
    k.color(...UI.text),
    k.fixed(),
    k.z(201),
  ]);

  btn.onUpdate(() => {
    const held = btn.isHovering() && k.isMouseDown();
    onHold(held);
    btn.opacity = held ? 0.7 : 0.45;
  });

  return btn;
}

function addJumpButton(k, { x, y }) {
  const btn = k.add([
    k.rect(BTN + 16, BTN),

    k.pos(x, y),
    k.anchor("botright"),
    k.color(...UI.panelBg),
    k.opacity(0.45),
    k.outline(2, k.rgb(...UI.panelBorder)),
    k.area(),
    k.fixed(),
    k.z(200),
  ]);

  k.add([
    k.text("Pular", { size: 18 }),
    k.pos(x - (BTN + 16) / 2, y - BTN / 2),
    k.anchor("center"),
    k.color(...UI.text),
    k.fixed(),
    k.z(201),
  ]);

  let wasDown = false;
  btn.onUpdate(() => {
    const down = btn.isHovering() && k.isMouseDown();
    if (down && !wasDown) {
      input.jump = true;
    }
    wasDown = down;
    btn.opacity = down ? 0.7 : 0.45;
  });

  return btn;
}


/**
 * Botões on-screen (só em dispositivos com touch).
 * Kaboom mapeia toque para mouse (isMouseDown / isHovering / onClick).
 */
export function addTouchControls(k) {
  if (!isTouchDevice()) return;

  const bottom = GAME.height - MARGIN;

  addHoldButton(k, {
    x: MARGIN,
    y: bottom,
    label: "<",
    onHold: (held) => {
      input.left = held;
    },
  });

  addHoldButton(k, {
    x: MARGIN + BTN + GAP,
    y: bottom,
    label: ">",
    onHold: (held) => {
      input.right = held;
    },
  });

  addJumpButton(k, {
    x: GAME.width - MARGIN,
    y: bottom,
  });
}
