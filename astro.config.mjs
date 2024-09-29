import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import partytown from "@astrojs/partytown";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  // output: "server",
  integrations: [react(), tailwind()
  // partytown({
  //   forward: ["dataLayer.push"],
  // }),
  , mdx()],
  image: {
    remotePatterns: [{
      protocol: "https"
    }]
  },
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "catppuccin-mocha",
      wrap: true,
      transformers: []
    }
  }
});