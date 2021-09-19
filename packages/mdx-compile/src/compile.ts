import { transformAsync } from '@babel/core';
import presetEnv from '@babel/preset-env';
import presetReact from '@babel/preset-react';
import mdx from '@mdx-js/mdx';

import { BabelPluginMdxBrowser } from './babel-plugin-mdx-browser';

type ResourceToUrl = (source: string) => string;

export type BaseCompileOptions = {
  remarkPlugins: Array<any>;
  rehypePlugins: Array<any>;
  compilers: Array<any>;
};

export type CompileOptions = BaseCompileOptions & {
  resourceToURL: ResourceToUrl;
};

export const DEFAULT_COMPILE_OPTIONS: CompileOptions = {
  resourceToURL: x => x,
  rehypePlugins: [],
  remarkPlugins: [],
  compilers: []
};

export type CompilationResult = [string, string];

export const compile = async (
  mdxPlainSource: string,
  options?: CompileOptions
): Promise<CompilationResult> => {
  const { resourceToURL, ...restOptions } = options ?? DEFAULT_COMPILE_OPTIONS;

  const compiledES6CodeFromMdx = await mdx(mdxPlainSource, {
    ...restOptions,
    skipExport: true
  });

  const [serverCode, browserCode] = await Promise.all([
    transformAsync(compiledES6CodeFromMdx, {
      presets: [presetReact, presetEnv],
      plugins: [],
      configFile: false
    }),
    transformAsync(compiledES6CodeFromMdx, {
      presets: [presetReact, presetEnv],
      plugins: [BabelPluginMdxBrowser],
      configFile: false
    })
  ]);

  if (!serverCode || !serverCode.code || !browserCode || !browserCode.code) {
    throw new Error('No code was generated.');
  }

  return [serverCode.code, browserCode.code];
};
