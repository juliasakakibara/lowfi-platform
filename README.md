# Stick Man Run — Jogo de Aniversário

Jogo de plataforma 2D feito com [Kaboom.js](https://kaboomjs.com/) e Vite. O stick man desvia de inimigos, coleta moedas e chega na bandeirinha para revelar a mensagem de aniversário.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra http://localhost:5173 no navegador.

## Personalizar

### Mensagem de aniversário

Edite [`src/config.js`](src/config.js) — `BIRTHDAY_MESSAGE` (título, linhas de texto).

### Imagens personalizadas

Coloque suas imagens em `public/assets/custom/`:

| Arquivo | Uso |
|---------|-----|
| `flag-surprise.png` | Bandeira no fim da fase |
| `menu-banner.png` | Banner no menu inicial |

Ative em [`src/config.js`](src/config.js):

```js
export const ASSETS = {
  useCustomFlag: true,
  customFlag: "assets/custom/flag-surprise.png",
  customMenuBanner: "assets/custom/menu-banner.png",
};
```

### Nível e dificuldade

- [`src/level/level1.js`](src/level/level1.js) — plataformas, inimigos, moedas, bandeira
- [`src/config.js`](src/config.js) — velocidade, pulo, vidas

### Regenerar sprites padrão

Os sprites pixel art são gerados automaticamente no build. Para regerar manualmente:

```bash
node scripts/generate-assets.js
```

Substituir arquivos em `public/assets/sprites/` também funciona — mantenha os mesmos nomes usados em [`src/assets.js`](src/assets.js).

## Build

```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)

1. Crie um repositório no GitHub e envie este código para a branch `main`.
2. Em **Settings → Pages**, defina **Source** como **GitHub Actions**.
3. O workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) publica automaticamente a cada push em `main`.

## Deploy (Vercel)

Importe o repositório em [vercel.com](https://vercel.com) — Framework: Vite, Output: `dist`.

## Controles

- **← →** ou **A D** — mover
- **Espaço**, **↑** ou **W** — pular
- Pular em cima do inimigo elimina ele (estilo Mario)
