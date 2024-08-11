import rss, { type RSSFeedItem } from "@astrojs/rss";
import { contentfulClient, type BlogPost } from "@/lib/contentful";
import {
  type Document,
  type Block,
  type Inline,
  type Text,
  type Mark,
  BLOCKS,
  MARKS,
} from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

function richTextToMD(doc: Document) {
  //   return documentToHtmlString(doc, {
  //     renderMark: {
  //       [MARKS.BOLD]: (text) => `*${text}*`,
  //       [MARKS.ITALIC]: (text) => `_${text}_`,
  //     },
  //     renderNode: {
  //       [BLOCKS.HEADING_1]: (node, next) => `# ${next(node.content)}`,
  //       [BLOCKS.HEADING_2]: (node, next) => `## ${next(node.content)}`,
  //       [BLOCKS.HEADING_3]: (node, next) => `### ${next(node.content)}`,
  //       [BLOCKS.HEADING_4]: (node, next) => `#### ${next(node.content)}`,
  //       [BLOCKS.HEADING_5]: (node, next) => `##### ${next(node.content)}`,
  //       [BLOCKS.HEADING_6]: (node, next) => `###### ${next(node.content)}`,
  //       [BLOCKS.PARAGRAPH]: (node, next) => `${next(node.content)}`,
  //     },
  //   });
  return documentToHtmlString(doc, {
    renderMark: {
      [MARKS.BOLD]: (text) => `**${text}**`,
      [MARKS.ITALIC]: (text) => `_${text}_`,
      [MARKS.UNDERLINE]: (text) => `__${text}__`,
      [MARKS.CODE]: (text) => `\`${text}\``,
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, next) => `# ${next(node.content)}`,
      [BLOCKS.HEADING_2]: (node, next) => `## ${next(node.content)}`,
      [BLOCKS.HEADING_3]: (node, next) => `### ${next(node.content)}`,
      [BLOCKS.HEADING_4]: (node, next) => `#### ${next(node.content)}`,
      [BLOCKS.HEADING_5]: (node, next) => `##### ${next(node.content)}`,
      [BLOCKS.HEADING_6]: (node, next) => `###### ${next(node.content)}`,
      [BLOCKS.PARAGRAPH]: (node, next) => `${next(node.content)}`,
      [BLOCKS.UL_LIST]: (node, next) =>
        `${next(node.content)
          .split("\n")
          .map((item) => `- ${item}`)
          .join("\n")}\n`,
      [BLOCKS.OL_LIST]: (node, next) =>
        `${next(node.content)
          .split("\n")
          .map((item, index) => `${index + 1}. ${item}`)
          .join("\n")}\n`,
      [BLOCKS.LIST_ITEM]: (node, next) => `- ${next(node.content)}`,
      [BLOCKS.QUOTE]: (node, next) => `> ${next(node.content)}\n\n`,
      [BLOCKS.TABLE]: (node, next) => `${next(node.content)}\n`,
      [BLOCKS.TABLE_ROW]: (node, next) => `| ${next(node.content)} |\n`,
      [BLOCKS.TABLE_CELL]: (node, next) => `${next(node.content)} `,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { file } = node.data.target.fields;
        return `![${file.fileName}](${file.url})`;
      },
    },
  });
}

export async function GET(context: any) {
  const { items: posts } = await contentfulClient.getEntries<BlogPost>({
    content_type: "blogPost",
  });
  return rss({
    title: "Abhi's blog",
    description: "A blog about programming in general",
    site: "https://abhirath.net",
    items: posts.map((post) => {
      return {
        title: post.fields.title,
        pubDate: new Date(post.fields.date),
        link: `/blog/${post.fields.slug}/`,
        content: richTextToMD(post.fields.content),
      };
    }) as RSSFeedItem[],
    customData: `<language>en-us</language>`,
  });
}
