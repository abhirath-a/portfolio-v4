import type { EntryFieldTypes } from "contentful";
import contentful from "contentful";
export interface BlogPost {
  contentTypeId: "blogPost";
  fields: {
    title: EntryFieldTypes.Text;
    content: EntryFieldTypes.RichText;
    date: EntryFieldTypes.Date;
    slug: EntryFieldTypes.Text;
  };
}
export const contentfulClient = contentful.createClient({
  space:
    import.meta.env.CONTENTFUL_SPACE_ID ||
    import.meta.env.PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? // prettier-ignore
      import.meta.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || import.meta.env.PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : // prettier-ignore
      import.meta.env.CONTENTFUL_DELIVERY_TOKEN || import.meta.env.PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});
