import { Node } from 'unist';
import visit from 'unist-util-visit';
import vfile, { VFile } from 'vfile';

export interface Options {
  minDepth: number;
}

export const transform = (options: Options) => (
  tree: Node,
  file: VFile
): Node | Error | Promise<Node> => {
  const { minDepth } = options;
  // file.data = file.data || {};
  return visit(tree, 'heading', (node: Node, index: number, parent: any) => {
    if (node.depth < minDepth) {
      parent.children.splice(index, 1);
    }
    return true;
  }) as any;
};
