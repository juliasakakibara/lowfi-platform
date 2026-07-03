import { input } from "../input.js";

/** Celular real ou DevTools device mode — não desktop com trackpad. */
export function isMobileUi() {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false;
  }
  const touch = navigator.maxTouchPoints > 0;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 900px)").matches;
  return touch && (coarse || narrow);
}

function bindHold(button, key) {
  const set = (down) => {
    input[key] = down;
    button.classList.toggle("is-active", down);
  };

  const onDown = (event) => {
    event.preventDefault();
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
}

/**
 * Barra HTML abaixo do canvas (só mobile). Não desenha no mundo Kaboom.
 */
export function setupTouchControls() {
  const app = document.getElementById("app");
  const bar = document.getElementById("touch-bar");
  if (!app || !bar || !isMobileUi()) return;

  app.classList.add("is-mobile");
  bar.hidden = false;

  const left = bar.querySelector('[data-dir="left"]');
  const right = bar.querySelector('[data-dir="right"]');
  const jump = bar.querySelector('[data-action="jump"]');

  if (left) bindHold(left, "left");
  if (right) bindHold(right, "right");

  if (jump) {
    jump.addEventListener("pointerdown", (event) => {
      event.preventDefault();
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
}
