export const GAME = {
  width: 800,
  // Ajustado em main.js para a proporção do #game-root (céu responsivo)
  height: 600,
  gravity: 1400,
  playerSpeed: 300,
  jumpForce: 620,
  maxLives: 5,
  invincibleTime: 1.5,
};

export const COLORS = {
  sky: [135, 206, 235],
};

// Payload ofuscado (base64) — não impede alguém determinado, mas evita spoiler casual no Sources
const BIRTHDAY_PAYLOAD =
  "eyJ0aXRsZSI6IkZlbGl6IGFuaXZlcnPDoXJpbywgeHV4dSEhIiwibGluZXMiOlsiQSBzdXJwcmVzYSB0ZSBlc3BlcmEgbm8gc8OhYmFkbyDDoHMgMTloISIsIlRlIGFtbyDimaUiXX0=";

export function getBirthdayMessage() {
  try {
    const json = new TextDecoder().decode(
      Uint8Array.from(atob(BIRTHDAY_PAYLOAD), (c) => c.charCodeAt(0)),
    );
    return JSON.parse(json);
  } catch {
    return { title: "Parabéns!", lines: [] };
  }
}

export const ASSETS = {
  useCustomFlag: false,
  customFlag: "assets/custom/flag-surprise.png",
  customMenuBanner: null,
};
