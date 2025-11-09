import type { ManifestV3Export } from "@crxjs/vite-plugin";
import packageJson from "./package.json";

const manifestConfig = {
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  manifest_version: 3,
  // icons: {
  //   "16": "icon16.png",
  //   "32": "icon32.png",
  //   "48": "icon48.png",
  //   "128": "icon128.png",
  // },
  permissions: ["scripting", "activeTab"],
  host_permissions: ["<all_urls>"],
  action: {
      default_popup: "src/ui/action-popup/index.html"
  },
} satisfies ManifestV3Export;

export default manifestConfig;
