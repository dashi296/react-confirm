import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, './lib/main.ts'),
      name: 'Confirm',
      fileName: 'index',
      formats: ["es", "umd"]
    }
  }
})
