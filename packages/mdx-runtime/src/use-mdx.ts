import { AsyncComponentsLoadConfig, ComponentsMap, createElement, loadComponents, MDXScope } from '@istok/mdx';
import { MDXProvider } from '@mdx-js/react';
import { createElement as createElementReact, useCallback, useState } from 'react';
import { useIdleCallbackEffect } from 'react-timing-hooks';

export interface HydrationParams<S extends MDXScope> {
  scope?: S;
  components?: ComponentsMap;
  asyncComponents?: AsyncComponentsLoadConfig;
}

const isServer = () => typeof window === 'undefined';

export function useMdx<S extends MDXScope>(
  compiledSource: string,
  params: HydrationParams<S>
) {
  const { scope = {} as S } = params;

  const [result, setResult] = useState<JSX.Element>();

  // if we're server-side, we can return the raw output early
  if (isServer()) return result;

  const handle = useCallback(
    async compiledSource => {
      const components = {
        ...(params.components ?? {}),
        ...(await loadComponents(params.asyncComponents))
      };

      // wrapping the content with MDXProvider will allow us to customize the standard
      // markdown components (such as "h1" or "a") with the "components" object
      const wrappedWithMdxProvider = createElementReact(
        MDXProvider,
        {
          components
        },
        createElement(compiledSource, {
          scope,
          components,
          wrapInProvider: false
        })
      );
      setResult(wrappedWithMdxProvider);
    },
    [compiledSource]
  );

  useIdleCallbackEffect(
    onIdle => {
      if (compiledSource) {
        onIdle(async () => await handle(compiledSource));
      }
    },
    [compiledSource]
  );

  return result;
}
