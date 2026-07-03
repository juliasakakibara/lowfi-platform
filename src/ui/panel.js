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
    k.text(text, {
      size: opts.size ?? UI.bodySize,
      width: opts.width,
      align: opts.align ?? "center",
      lineSpacing: opts.lineSpacing ?? 6,
    }),
    k.pos(k.center().x, y),
    k.anchor("top"),
    k.color(...(opts.color ?? UI.textMuted)),
    k.fixed(),
    k.z(opts.z ?? 2),
  ]);
}


/**
 * Ícone (frame da sheet tiles) + texto na mesma linha, alinhados ao centro vertical.
 * Se centerX for true, o grupo fica centrado em x.
 * Retorna o label de texto (para atualizar).
 */
export function addIconLabel(k, opts) {
  const {
    frame,
    text,
    x,
    y,
    centerX = false,
    iconScale = 1.3,
    fontSize = 20,
    color = UI.text,
    z = 100,
  } = opts;

  const iconSize = 18 * iconScale;
  const gap = 8;
  // Largura aproximada do texto (fonte monoespaçada do Kaboom ~0.6 * size por char)
  const textWidth = text.length * fontSize * 0.55;
  const totalWidth = iconSize + gap + textWidth;
  const startX = centerX ? x - totalWidth / 2 : x;

  k.add([
    k.sprite("tiles", { frame }),
    k.pos(startX, y + iconSize / 2),
    k.anchor("center"),
    k.scale(iconScale),
    k.fixed(),
    k.z(z),
  ]);

  const label = k.add([
    k.text(text, { size: fontSize }),
    k.pos(startX + iconSize + gap, y + iconSize / 2),
    k.anchor("left"),
    k.color(...color),
    k.fixed(),
    k.z(z),
  ]);

  return label;
}
