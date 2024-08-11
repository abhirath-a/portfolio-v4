import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [
    react(),
    tailwind(),
    partytown({
      forward: ["dataLayer.push"],
    }),
    
  ],

  adapter: vercel(),
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
});
