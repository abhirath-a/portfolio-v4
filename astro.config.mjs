import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), mdx(), alpinejs()],
  output: "server",
  adapter: vercel(),
});
