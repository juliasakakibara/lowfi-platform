import { defineConfig } from "vite";

export default defineConfig({
  // Paths relativos — funcionam no GitHub Pages (subpasta do repo)
  base: "./",
  // Pasta docs/ é servida pelo Pages sem precisar de Actions
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
