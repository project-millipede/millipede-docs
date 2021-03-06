import isArray from 'lodash/isArray';
import { GetStaticPropsContext } from 'next';
import loadNamespaces from 'next-translate/loadNamespaces';
import path from 'path';

import i18nConfig from '../../../i18n';

export interface GetStaticTranslationProps {
  __lang?: string;
  __namespaces?: { [key: string]: object };
}

interface GetStaticTranslationPropsOptions {
  onSuccess: (namespaces: GetStaticTranslationProps) => void;
}

export const getStaticTranslationProps = ({
  onSuccess
}: GetStaticTranslationPropsOptions) => async (ctx: GetStaticPropsContext) => {
  const {
    params: { slug },
    locale
  } = ctx;

  if (!slug || !locale) {
    throw new Error(`"slug" and "locale" are required for page props`);
  }

  const pathNoExt = isArray(slug) ? slug.join(path.sep) || '.' : slug;

  const namespaces = await loadNamespaces({
    ...i18nConfig,
    pathname: `/${pathNoExt}`,
    locale: locale
  });
  if (namespaces && onSuccess) {
    onSuccess(namespaces);
  }

  return {
    props: {
      ...namespaces
    }
  };
};
