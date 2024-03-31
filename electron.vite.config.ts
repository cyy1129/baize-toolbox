import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
import reactCssModule from "vite-plugin-react-css-modules";
import genericNames from "generic-names";
import autoprefixer from "autoprefixer";

const generateScopedName = genericNames("[name]__[local]__[hash:base64:4]");

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
      },
    },
    plugins: [
      reactCssModule({
        generateScopedName,
        filetypes: {
          ".less": {
            syntax: "postcss-less",
          },
        },
      }),
      react(),
    ],
    css: {
      modules: {
        generateScopedName: generateScopedName,
      },
      postcss: {
        plugins: [autoprefixer],
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    build: {
      minify: "terser",
      cssMinify: "esbuild",
    },
  },
});
