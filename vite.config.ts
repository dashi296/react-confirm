import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), dts()],
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
      }
    }
  },
})
