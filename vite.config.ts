import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import dts from "vite-plugin-dts";
import { resolve } from "path";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [react(), dts(), cssInjectedByJsPlugin()],
  css: {
    modules: {
      localsConvention: "camelCase"
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './lib/index.ts'),
      name: '@dashi296/react-confirm',
      fileName: 'index',
      formats: ["es", "umd"]
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      },
    }
  },
})
