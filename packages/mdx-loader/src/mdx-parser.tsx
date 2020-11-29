import mdx from '@mdx-js/mdx';
import matter from 'gray-matter';
import remarkSlug from 'remark-slug';

export interface ParserOptions {
  filePath?: string;
  remarkPlugins?: Array<() => (tree: any) => any>;
  rehypePlugins?: Array<(options: any) => (tree: any) => void>;
}

export const compile = async (
  src: string,
  options: ParserOptions,
  injectRemarkPlugins: Array<() => (tree: any) => any> = [],
  injectRehypePlugins: Array<(options: any) => (tree: any) => void> = []
) => {
  const { remarkPlugins, rehypePlugins } = options;

  const jsx = await mdx(src, {
    remarkPlugins: injectRemarkPlugins.concat(remarkPlugins),
    rehypePlugins: injectRehypePlugins.concat(rehypePlugins)
  });
  return jsx;
};

export async function parser(raw: string, options: ParserOptions) {
  const { content, data: meta } = matter(raw);

  const injectRemarkPlugins = [remarkSlug];
  const injectRehypePlugins = [];

  const result = await compile(
    content,
    options,
    injectRemarkPlugins,
    injectRehypePlugins
  );

  const code = [
    `import React from 'react'`,
    `import { mdx } from '@mdx-js/react'`,
    `export const meta = ${JSON.stringify(meta)}`,
    `export const raw = ${JSON.stringify(content)}`,
    result
  ].join('\n');

  return { code };
}

export default parser;
