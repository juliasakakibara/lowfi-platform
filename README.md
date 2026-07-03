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
node scripts/copy-kenney.js
```

### Assets (Kenney Pixel Platformer)

O jogo usa o [Kenney Pixel Platformer](https://kenney.nl/assets/pixel-platformer) (CC0), em `public/assets/pixel-platformer/`.

- **Grade:** 18×18 px por tile
- **Plataformas:** cada tile é sprite + colisão no mesmo objeto (`anchor: topleft`)
- **Nível:** `x` e `y` em múltiplos de 18 em [`src/level/level1.js`](src/level/level1.js)

Para atualizar os PNGs a partir do pack em `~/Downloads/kenney_pixel-platformer`:

```bash
node scripts/copy-pixel-platformer.js
```

Os PNGs em `public/assets/pixel-platformer/` devem estar commitados (CI não tem a pasta Downloads).

**Checkpoint estável (formas básicas):** branch `fix/deploy-workflow-actions`, commit `checkpoint: jogo estável com formas básicas`.

## Build

```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)

O site publicado fica na pasta `docs/` (sem GitHub Actions — a conta está com Actions bloqueado por billing).

**Link do jogo:** https://juliasakakibara.github.io/lowfi-platform/

Em **Settings → Pages**: Source = **Deploy from a branch**, Branch = **main**, pasta = **/docs**.

Para republicar depois de mudar o código:

```bash
npm run build
git add docs
git commit -m "deploy: atualiza GitHub Pages"
git push
```

## Controles

- **← →** ou **A D** — mover
- **Espaço**, **↑** ou **W** — pular
- Pular em cima do inimigo elimina ele (estilo Mario)
