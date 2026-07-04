import { input, resetInput } from "../input.js";

/** Alinhado ao CSS da #touch-bar: max-width 900px ou hover:none + pointer:coarse */
export function isMobileUi() {
  if (typeof window === "undefined") return false;
  const narrow =
    window.innerWidth <= 900 || window.matchMedia("(max-width: 900px)").matches;
  const coarseTouch =
    window.matchMedia("(hover: none)").matches
    && window.matchMedia("(pointer: coarse)").matches;
  return narrow || coarseTouch;
}


function bindHold(button, key) {
  const set = (down) => {
    input[key] = down;
    button.classList.toggle("is-active", down);
  };

  const onDown = (event) => {
    event.preventDefault();
    button.blur();
    set(true);
  };
  const onUp = (event) => {
    event.preventDefault();
    set(false);
  };

  button.addEventListener("pointerdown", onDown);
  button.addEventListener("pointerup", onUp);
  button.addEventListener("pointerleave", onUp);
  button.addEventListener("pointercancel", onUp);
  // Evita que o botão roube foco do canvas (setas “presas” no Kaboom)
  button.setAttribute("tabindex", "-1");
}

/**
 * Liga os botões HTML. A barra em si aparece via CSS (@media).
 * Chamar antes de medir #game-root.
 */
export function setupTouchControls() {
  const bar = document.getElementById("touch-bar");
  if (!bar) return;

  const left = bar.querySelector('[data-dir="left"]');
  const right = bar.querySelector('[data-dir="right"]');
  const jump = bar.querySelector('[data-action="jump"]');

  if (left) bindHold(left, "left");
  if (right) bindHold(right, "right");

  if (jump) {
    jump.setAttribute("tabindex", "-1");
    jump.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      jump.blur();
      input.jump = true;
      jump.classList.add("is-active");
    });
    const clearJump = (event) => {
      event.preventDefault();
      jump.classList.remove("is-active");
    };
    jump.addEventListener("pointerup", clearJump);
    jump.addEventListener("pointerleave", clearJump);
    jump.addEventListener("pointercancel", clearJump);
  }

  // Soltar o dedo fora do botão ou perder foco da janela não deixa input preso
  window.addEventListener("pointerup", () => {
    input.left = false;
    input.right = false;
    left?.classList.remove("is-active");
    right?.classList.remove("is-active");
  });
  window.addEventListener("blur", resetInput);
}
