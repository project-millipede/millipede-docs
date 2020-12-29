import { RenderUtils } from '@app/render-utils';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';
import { QueryParamProvider as DefaultQueryParamProvider } from 'use-query-params';

export const QueryParamProvider: FC = ({ children, ...rest }) => {
  const router = useRouter();
  const match = router.asPath.match(/[^?]+/);
  const pathname = match ? match[0] : router.asPath;

  const location = useMemo(
    () =>
      RenderUtils.isBrowser()
        ? window.location
        : ({
            search: router.asPath.replace(/[^?]+/u, '')
          } as Location),
    [router.asPath]
  );

  const history = useMemo(
    () => ({
      push: ({ search }: Location) =>
        router.push(
          { pathname: router.pathname, query: router.query },
          { search, pathname },
          { shallow: true }
        ),
      replace: ({ search }: Location) =>
        router.replace(
          { pathname: router.pathname, query: router.query },
          { search, pathname },
          { shallow: true }
        )
    }),
    [pathname, router]
  );

  return (
    <DefaultQueryParamProvider {...rest} location={location} history={history}>
      {children}
    </DefaultQueryParamProvider>
  );
};
