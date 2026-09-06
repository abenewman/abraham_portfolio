import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

type HNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HNode[];
};

const PUBLIC_DIR = path.join(process.cwd(), "public");

function textOf(node: HNode): string {
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(textOf).join("");
}

const isBlank = (n: HNode) => n.type === "text" && !(n.value ?? "").trim();
const isImage = (n: HNode) => n.type === "element" && n.tagName === "img";

/** Turn an <img> into a <figure>, using the markdown title as the caption. */
function toFigure(img: HNode): HNode {
  const props = img.properties ?? {};
  const caption = typeof props.title === "string" ? props.title : "";
  delete props.title;

  props.loading = "lazy";
  props.decoding = "async";

  // Stamp intrinsic dimensions so the page does not jump while images load.
  const src = typeof props.src === "string" ? props.src : "";
  if (src.startsWith("/")) {
    const file = path.join(PUBLIC_DIR, src);
    try {
      const { width, height } = imageSize(fs.readFileSync(file));
      if (width && height) {
        props.width = width;
        props.height = height;
      }
    } catch {
      // Missing or unreadable file: rendered as a broken image, which is a
      // clearer signal to the author than a build failure.
    }
  }

  return {
    type: "element",
    tagName: "figure",
    properties: {},
    children: caption
      ? [
          img,
          {
            type: "element",
            tagName: "figcaption",
            properties: {},
            children: [{ type: "text", value: caption }],
          },
        ]
      : [img],
  };
}

/**
 * Rewrites the HTML tree so authors only ever need plain markdown:
 *  - an image on its own line becomes a captioned <figure>
 *  - two or more images on the same line become a side-by-side gallery
 *  - a blockquote becomes a pull quote, with "-- Name" as the attribution
 */
function enhance() {
  return (tree: HNode) => {
    const walk = (node: HNode) => {
      if (!node.children) return;

      node.children = node.children.map((child): HNode => {
        if (child.type !== "element") return child;

        if (child.tagName === "p") {
          const meaningful = (child.children ?? []).filter((c) => !isBlank(c));
          if (meaningful.length > 0 && meaningful.every(isImage)) {
            const figures = meaningful.map(toFigure);
            if (figures.length === 1) return figures[0];
            return {
              type: "element",
              tagName: "div",
              properties: { className: ["md-gallery"] },
              children: figures,
            };
          }
        }

        if (child.tagName === "blockquote") {
          const kids = (child.children ?? []).filter((c) => !isBlank(c));
          const last = kids[kids.length - 1];
          if (last?.tagName === "p" && textOf(last).trim().startsWith("--")) {
            last.tagName = "footer";
            const attribution = textOf(last).trim().replace(/^--\s*/, "");
            last.children = [{ type: "text", value: attribution }];
          }
          child.properties = { ...(child.properties ?? {}), className: ["md-quote"] };
          child.children = kids;
        }

        walk(child);
        return child;
      });
    };

    walk(tree);
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(enhance)
  .use(rehypeStringify);

export function renderMarkdown(source: string): string {
  return String(processor.processSync(source));
}
