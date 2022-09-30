import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@icons": fileURLToPath(
        new URL("./src/components/icons", import.meta.url)
      ),
      "@renderer": fileURLToPath(
        new URL("./src/components/renderer", import.meta.url)
      ),
      "@ui": fileURLToPath(new URL("./src/components/ui", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __STORAGE_VERSION__: JSON.stringify("0.0.1"),
  },
});
