// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [
      react(),
   ],
   test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './tests/setup.js'
   },
    base: '/',
  }

  if (command !== 'serve') {
    config.base = '/Seamless/'
  }

  return config
})