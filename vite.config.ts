import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    root: resolve(__dirname, 'src'),
    publicDir: resolve(__dirname, 'public'),
    build: {
        outDir: resolve(__dirname, 'dist'),
    },
    preview: {
        port: 3000,
    },
})