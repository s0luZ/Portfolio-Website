import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// GitHub Pages project sites live at /<repo-name>/ — set BASE_PATH in CI (see deploy workflow).
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [vue()],
})


