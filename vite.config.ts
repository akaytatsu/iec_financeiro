import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~lib': fileURLToPath(new URL('./node_modules', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
              @import "@/assets/style/variables/_color_global.scss";
              @import "@/assets/style/variables/_color_brand.scss";
              @import "@/assets/style/variables/_placeholder.scss";
              @import "@/assets/style/variables/_size.scss";
              @import "@/assets/style/element/index.scss";
              @import "@/assets/style/main.scss";
            `
      }
    }
  }
});
