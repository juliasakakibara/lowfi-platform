import { UI } from "./theme.js";

export function addPanel(k, x, y, w, h, z = 0) {
  return k.add([
    k.rect(w, h),
    k.pos(x, y),
    k.color(...UI.panelBg),
    k.opacity(UI.panelOpacity),
    k.outline(3, k.rgb(...UI.panelBorder)),
    k.fixed(),
    k.z(z),
  ]);
}

export function addTitle(k, text, y, opts = {}) {
  return k.add([
    k.text(text, { size: opts.size ?? UI.titleSize }),
    k.pos(k.center().x, y),
    k.anchor("top"),
    k.color(...(opts.color ?? UI.text)),
    k.fixed(),
    k.z(opts.z ?? 2),
  ]);
}

export function addBodyText(k, text, y, opts = {}) {
  return k.add([
    k.text(text, { size: opts.size ?? UI.bodySize }),
    k.pos(k.center().x, y),
    k.anchor("top"),
    k.color(...(opts.color ?? UI.textMuted)),
    k.fixed(),
    k.z(opts.z ?? 2),
  ]);
}
