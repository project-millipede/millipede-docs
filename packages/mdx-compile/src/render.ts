import { AsyncComponentsLoadConfig, ComponentsMap, createElement, loadComponents, MDXScope } from '@istok/mdx';
import { ReactElement } from 'react';
import { renderToString as reactRenderToString } from 'react-dom/server';

import { compile, CompileOptions, DEFAULT_COMPILE_OPTIONS } from './compile';

export interface RenderOptions<S extends MDXScope> {
  components?: ComponentsMap;
  asyncComponents?: AsyncComponentsLoadConfig;
  scope?: S;
  compileOptions?: CompileOptions;
  enhanceRoot?(root: ReactElement): ReactElement;
  renderer?<T = string>(root: ReactElement): T;
  postRender?(): void;
}

export const render = async <S extends MDXScope>(
  mdxPlainSource: string,
  options: RenderOptions<S> = {
    compileOptions: DEFAULT_COMPILE_OPTIONS
  }
) => {
  const {
    asyncComponents,
    compileOptions = DEFAULT_COMPILE_OPTIONS,
    scope = {} as S
  } = options;
  const {
    enhanceRoot = root => root,
    renderer = reactRenderToString
  } = options;
  const { postRender = () => void 0 } = options;

  const [serverCode, browserCode] = await compile(
    mdxPlainSource,
    compileOptions
  );

  const loadedAsyncComponents = await loadComponents(asyncComponents);
  const components = {
    ...(options.components ?? {}),
    ...loadedAsyncComponents
  };

  const element = createElement(serverCode, {
    scope,
    components,
    wrapInProvider: true
  });

  const contentHtml = renderer(enhanceRoot(element));

  postRender();

  return {
    compiledSource: browserCode,
    contentHtml,
    scope
  };
};
