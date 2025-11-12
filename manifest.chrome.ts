import type { ManifestV3Export } from "@crxjs/vite-plugin";
import manifestConfig from "./manifest";

export default {
  ...manifestConfig,
  // Optionally add Chrome-specific config here
} satisfies ManifestV3Export;
