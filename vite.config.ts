import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'

import vueDevTools from 'vite-plugin-vue-devtools'

const API_PATH_REGEX = /^\/api/

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  // eslint-disable-next-line node/prefer-global/process -- process is available in Node.js environment
  const env = loadEnv(mode, process.cwd(), '')

  const { VITE_PROXY_TARGET } = env

  const proxyTarget = VITE_PROXY_TARGET ?? ''

  return {
    plugins: [
      vue(),
      vueDevTools(),
      tailwindcss(),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      host: '0.0.0.0',
      open: true,
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          // secure: true, // 如果目标服务器使用 HTTPS，设置为 true
          rewrite: (path) => path.replace(API_PATH_REGEX, ''),
          configure: (proxy, options) => {
            // 打印请求信息
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              if (options.target && req.url) {
                // eslint-disable-next-line no-console -- console is used for debugging
                console.info('Proxying request to:', options.target + req.url)
              }
            })
          },
        },
      },
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
  }
})
