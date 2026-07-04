# SUPER BRUNO BROS.

Jogo de plataforma 2D feito com [Kaboom.js](https://kaboomjs.com/) e Vite. O Bruno desvia de inimigos, coleta moedas e chega na bandeirinha para revelar a mensagem de aniversário.

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
| `bruno.png` | Personagem principal (sheet 4 frames) |
| `flag-surprise.png` | Bandeira no fim da fase |
| `menu-banner.png` | Banner no menu inicial |

Ative bandeira/banner em [`src/config.js`](src/config.js):

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

### Assets (Kenney Pixel Platformer)

O jogo usa o [Kenney Pixel Platformer](https://kenney.nl/assets/pixel-platformer) (CC0), em `public/assets/pixel-platformer/`.

Os PNGs devem estar commitados. Para atualizar a partir do pack em `~/Downloads/kenney_pixel-platformer`:

```bash
npm run copy-assets
```

## Build

```bash
npm run build
npm run preview
```

A saída vai para `docs/` (com `minify: false` — o minify do esbuild quebra o Kaboom).

## Deploy (GitHub Pages)

**Link do jogo:** https://juliasakakibara.github.io/lowfi-platform/

O site publicado fica na pasta `docs/` e na branch `gh-pages` (sem GitHub Actions — a conta está com Actions bloqueado por billing).

Em **Settings → Pages**: Source = **Deploy from a branch**, Branch = **gh-pages**, pasta = **/ (root)**.

Para republicar:

```bash
npm run build
touch docs/.nojekyll
git add docs
git commit -m "deploy: atualiza GitHub Pages"
git push origin main
git subtree split --prefix docs -b gh-pages-split
git push origin gh-pages-split:gh-pages --force
git branch -D gh-pages-split
```

## Controles

**Desktop**

- **← →** ou **A D** — mover
- **Espaço**, **↑** ou **W** — pular

**Mobile** (viewport estreita): barra com **&lt;** **&gt;** e **Pular** abaixo do canvas.

Pular em cima do inimigo elimina ele (estilo Mario).
