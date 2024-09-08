import rss, { type RSSFeedItem } from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: any) {
  const blog = await getCollection("blog", ({ data }) => {
    return data.draft !== true;
  });

  return rss({
    title: "Abhi's blog",
    description: "A blog about programming in general",
    site: "https://abhirath.net",
    items: blog.map((post) => {
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        // Compute RSS link from post `slug`
        // This example assumes all posts are rendered as `/blog/[slug]` routes
        link: `/blog/${post.slug}/`,
        content: post.body,
      };
    }) as RSSFeedItem[],
    customData: `<language>en-us</language>`,
  });
}
