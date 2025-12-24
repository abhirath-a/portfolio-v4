import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx(), pagefind()],
  prefetch: true,
  image: {
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "kanagawa-dragon",
      wrap: true,
      transformers: [],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
