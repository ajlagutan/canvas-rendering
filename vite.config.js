import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
    root: resolve(__dirname, "src"),
    build: {
        outDir: "../dist"
    },
    server: {
        port: 8080
    }
})
