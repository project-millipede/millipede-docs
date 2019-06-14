import mdastToc from 'mdast-util-toc';
import { Node, Parent } from 'unist';

const findExistingToc = (root: Parent) => {
  let addToToc = false;
  let toc = null;
  root.children.forEach(node => {
    if (node.type === "heading" && node.data.id === "table-of-contents") {
      addToToc = true;
      toc = [];
    } else if (addToToc) {
      if (node.type !== "heading") {
        toc = [...toc, node];
      } else {
        addToToc = false;
      }
    }
  });
  return toc;
};

const generateTocFromContent = (node: Node, maxDepth: number, tight: boolean) => {
  const result = mdastToc(node, {
    maxDepth: maxDepth,
    tight: tight
  });
  return result;
};

export type Options = {
  maxDepth: number;
  tight: boolean;
};

export const transform = (options: Options) => (tree: Parent): Node | Error | Promise<Node> => {
  const { maxDepth, tight } = options;
  const existingToc = findExistingToc(tree);
  if (existingToc) {
    tree.children = existingToc;
  } else {
    const result = generateTocFromContent(tree, maxDepth, tight);
    if (result.map) {
      tree.children = [result.map];
    } else {
      tree.children = [];
    }

    return tree;
  }
};
