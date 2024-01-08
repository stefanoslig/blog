import { remark } from "remark";
import html from "remark-html";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(require('remark-prism'), { plugins: ["line-numbers"] })
    .process(markdown);

  return result.toString();
}
