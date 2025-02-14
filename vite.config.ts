import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import legacy from '@vitejs/plugin-legacy'
import imagemin from 'vite-plugin-imagemin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Enable Gzip compression for text files
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Enable Brotli compression for even better compression
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // Optimize images
    imagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
        ],
      },
      webp: {
        quality: 80,
      },
    }),
    // Generate legacy bundles for older browsers
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    // Analyze bundle size (generates stats.html)
    visualizer(),
  ],
  build: {
    // Enable source maps for production
    sourcemap: true,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@chakra-ui/react'],
        },
        // Prevent cache restoration issues
        sanitizeFileName: (name) => name.replace(/[^a-z0-9.-]/gi, ''),
      },
    },
    // Reduce chunk size
    chunkSizeWarningLimit: 1000,
    // Asset optimization
    assetsInlineLimit: 4096,
  },
})