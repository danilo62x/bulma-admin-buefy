import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Bulma Admin Template',
        short_name: 'Admin',
        description: 'Vue 3 + Buefy + Bulma admin & landing template',
        theme_color: '#485fc7',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: { globPatterns: ['**/*.{js,css,html,svg,png,woff,woff2,ttf,eot}'] },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Bulma 1.x ainda usa sintaxe legacy de Sass (if-function, color.adjust,
        // mixed-decls etc.) — silencia warnings de dependências sem esconder
        // os do nosso próprio código.
        quietDeps: true,
        silenceDeprecations: ['if-function', 'mixed-decls', 'color-functions', 'global-builtin', 'import', 'legacy-js-api'],
      },
    },
  },
  build: {
    // Source-code protection for the public preview:
    // - no sourcemaps (would expose the original .vue + .ts files)
    // - terser minification with mangled identifiers
    // - no comments in the output
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        // Hashed file names — harder to map back to source modules
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash][extname]',
      },
    },
  },
  esbuild: {
    legalComments: 'none',
    drop: ['console', 'debugger'],
  },
})
