import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
    root: resolve(__dirname, "src"),
    build: {
        outDir: "../docs"
    },
    server: {
        port: 8080
    }
})
