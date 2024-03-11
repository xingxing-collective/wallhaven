import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Unocss from "unocss/vite"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      allow: [".."]
    }
  },
  plugins: [uni(), Unocss()],
  resolve: {
    alias: {
      "@": "./src",
      "~": "./"
    },
  }
});
