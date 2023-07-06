import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import handlebars from './vite-hbs-precompile.js'
export default defineConfig({
  publicDir: 'static',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@css': fileURLToPath(new URL('./src/scss/utils', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
    },
  },
  plugins: [handlebars()],
})
