import type { ManifestV3Export } from "@crxjs/vite-plugin";
import manifestConfig from "./manifest";

export default {
	...manifestConfig,
	// Firefox-specific overrides for Manifest V3

	// @ts-expect-error
	browser_specific_settings: {
		gecko: {
		  id: "mock-screens@prastavna.com",
		},
	},
} satisfies ManifestV3Export;
