import mdastToc, { TOCOptions } from 'mdast-util-toc';
import { Node, Parent } from 'unist';

const findExistingToc = (root: Parent) => {
  let addToToc = false;
  let toc = null;
  root.children.forEach(node => {
    if (node.type === 'heading' && node.data.id === 'table-of-contents') {
      addToToc = true;
      toc = [];
    } else if (addToToc) {
      if (node.type !== 'heading') {
        toc = [...toc, node];
      } else {
        addToToc = false;
      }
    }
  });
  return toc;
};

const generateTocFromContent = (node: Node, options: TOCOptions) => {
  const result = mdastToc(node, options);
  return result;
};

export const transform = (options: TOCOptions) => (tree: Parent): Node | Error | Promise<Node> => {
  const existingToc = findExistingToc(tree);

  const treeModified: Parent = {
    ...tree
  };

  if (existingToc) {
    treeModified.children = existingToc;
  } else {
    const result = generateTocFromContent(tree, options);
    if (result.map) {
      treeModified.children = [result.map];
    } else {
      treeModified.children = [];
    }
  }
  return treeModified;
};
