import mdx from '@mdx-js/mdx';
import matter from 'gray-matter';
import remarkSlug from 'remark-slug';

// import { readingTime } from 'reading-time-estimator';
export interface ParserOptions {
  filePath?: string; // the path to the file
  babel?: boolean; // whether to transpile otherwise es6 / jsx output returned from mdx
  remarkPlugins?: Array<() => (tree: any) => any>;
  rehypePlugins?: Array<(options: any) => (tree: any) => void>;
  injectCode?: Array<string>;
}

interface ParserProps {
  source: string; // raw mdx content
  options: ParserOptions;
}

export const compile = async (
  src: string,
  options: ParserOptions,
  injectRemarkPlugins: Array<() => (tree: any) => any>,
  injectRehypePlugins: Array<(options: any) => (tree: any) => void>
) => {
  const { remarkPlugins, rehypePlugins } = options;

  const jsx = await mdx(src, {
    remarkPlugins: [].concat(injectRemarkPlugins).concat(remarkPlugins || []),
    rehypePlugins: [].concat(injectRehypePlugins).concat(rehypePlugins || [])
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
    injectRemarkPlugins
  );

  // const timeToRead = readingTime(raw);

  const code = [
    `import React from 'react'`,
    `import { mdx } from '@mdx-js/react'`,
    `export const meta = ${JSON.stringify(meta)}`,
    `export const raw = ${JSON.stringify(content)}`,
    // `export const timeToRead = ${JSON.stringify(timeToRead)}`,
    `export const timeToRead = ''`,
    result
  ].join('\n');

  return { code };
}

export default parser;
