import type { ManifestV3Export } from "@crxjs/vite-plugin";
import packageJson from "./package.json";

const manifestConfig = {
  name: "Mock Screens",
  version: packageJson.version,
  description: packageJson.description,
  manifest_version: 3,
  icons: {
    "16": "icon16.png",
    "32": "icon32.png",
    "36": "icon36.png",
    "48": "icon48.png",
    "57": "icon57.png",
    "60": "icon60.png",
    "70": "icon70.png",
    "72": "icon72.png",
    "76": "icon76.png",
    "96": "icon96.png",
    "114": "icon114.png",
    "120": "icon120.png",
    "128": "icon128.png",
    "144": "icon144.png",
    "150": "icon150.png",
    "152": "icon152.png",
    "180": "icon180.png",
    "192": "icon192.png",
    "310": "icon310.png"
  },
  permissions: ["scripting", "activeTab", "tabs"],
  host_permissions: ["<all_urls>"],
  action: {
    default_popup: "src/ui/action-popup/index.html",
  },
  content_security_policy: {
    extension_pages: "script-src 'self' http://localhost:5173;",
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content-script/injector.ts"],
      run_at: "document_idle",
      all_frames: true,
    },
  ],
  web_accessible_resources: [
    {
      resources: ["src/content-script/override.js"],
      matches: ["<all_urls>"],
    },
  ],
} satisfies ManifestV3Export;

export default manifestConfig;
