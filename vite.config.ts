import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project site: https://oddugi02.github.io/first-class/
export default defineConfig({
  base: '/first-class/',
  plugins: [react(), tailwindcss()],
})
