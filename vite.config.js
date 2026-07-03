import { defineConfig } from "vite";

export default defineConfig({
  // Paths relativos — funcionam no GitHub Pages (subpasta do repo)
  base: "./",
  build: {
    // Pasta docs/ é servida pelo Pages sem precisar de Actions
    outDir: "docs",
    emptyOutDir: true,
    // Kaboom quebra com o minify do esbuild (ReferenceError: Sa is not defined)
    minify: false,
  },
});
