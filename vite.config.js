import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
  root: resolve(__dirname, "src"),
  build: {
    outDir: "../docs",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "assets/[name].js"
      }
    }
  },
  server: {
    port: 8080
  }
})
