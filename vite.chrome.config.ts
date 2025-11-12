import { crx } from "@crxjs/vite-plugin";
import { defineConfig, mergeConfig, UserConfig } from "vite";
import manifest from "./manifest.chrome";
import baseConfig from "./vite.config";

const browser = "chrome";
const outDir = "dist";
const browserOutDir = `${outDir}/${browser}`;

export default defineConfig(() => {
  const browserConfig: UserConfig = {
    build: {
      outDir: browserOutDir,
    },
    plugins: [
      crx({
        manifest,
        browser,
        contentScripts: { injectCss: true },
      }),
    ],
  };

  return mergeConfig(baseConfig, browserConfig);
});
