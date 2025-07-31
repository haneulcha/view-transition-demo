import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}) 