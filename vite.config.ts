import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import { viteVConsole } from 'vite-plugin-vconsole'
// import bundleAnalyzer from 'rollup-plugin-bundle-analyzer'
import { qrcode } from 'vite-plugin-qrcode'
import { compression as gzipCompression } from 'vite-plugin-compression2'
import * as path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  console.log(command, mode, isSsrBuild, isPreview)
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: './',
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/app-dev/api': {
          target: 'http://127.0.0.1:3000',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/app-dev\/api/, ''),
          configure: (proxy, options) => {
            // proxy 是 'http-proxy' 的实例
          },
        },
        '/gateway': {
          target: 'http://127.0.0.1:3000',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/gateway/, ''),
          configure: (proxy, options) => {
            // proxy 是 'http-proxy' 的实例
          },
        },
        '/socket.io': {
          target: 'ws://localhost:5174',
          ws: true,
        },
      },
    },
    plugins: [
      vue(),
      Components({
        resolvers: [PrimeVueResolver()],
      }),
      vueJsx(),
      vueDevTools(),
      // bundleAnalyzer({
      //   openBrowser: true,
      //   analyzerMode: 'static',
      //   // host: '127.0.0.1',
      //   // port: 8899,
      // }),
      viteVConsole({
        entry: [path.resolve('src/main.ts')], // or you can use entry: [path.resolve('src/main.ts')]
        localEnabled: true,
        enabled: mode !== 'production',
        config: {
          maxLogNumber: 1000,
          theme: 'dark',
        },
      }),
      qrcode(),
      gzipCompression({
        exclude: [/\.(DS_Store)$/],
        deleteOriginalAssets: false,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      minify: 'terser',
      rollupOptions: {
        external: [
          // 'vue',
          // 'vue-router',
          // 'pinia',
          'axios',
        ],
        output: {
          globals: {
            // vue: 'vue',
            // 'vue-router': 'vue-router',
            // pinia: 'pinia',
            axios: 'axios',
          },
          paths: {
            // 'vue': 'https://cdn.jsdelivr.net/npm/vue@3.3.4/+esm',
            // vue: 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.3.4/vue.esm-browser.prod.min.js',
            // 'vue-router': 'https://cdn.jsdelivr.net/npm/vue-router@4.2.2/+esm',
            // pinia: 'https://cdnjs.cloudflare.com/ajax/libs/pinia/2.1.3/pinia.esm-browser.min.js',
            axios:
              'https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/esm/axios.min.js',
          },
        },
      },
      terserOptions: {
        //打包后移除console和注释
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  }
})
