import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@babel/plugin-syntax-decimal']
      }
    })
  ],
  base: '/algebra-lineal-simulator/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          math: ['mathjs', 'katex', 'react-katex'],
          three: ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    }
  },
  server: {
    historyApiFallback: true
  }
})