// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: "./src/components/VueCarousel.vue", // Path to your component
      name: "VueCarousel", // The name of your library
      fileName: (format) => `vue-carousel.${format}.js`, // File name pattern
    },
    rollupOptions: {
      // Make sure to externalize dependencies that shouldn't be bundled
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
