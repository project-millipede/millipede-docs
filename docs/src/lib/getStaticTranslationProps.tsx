import isArray from 'lodash/isArray';
import { GetStaticPropsContext } from 'next';
import { I18nDictionary } from 'next-translate';
import loadNamespaces from 'next-translate/loadNamespaces';
import path from 'path';

import i18nConfig from '../../../i18n';

export interface GetStaticTranslationProps {
  __lang: string;
  __namespaces?: Record<string, I18nDictionary>;
}

interface GetStaticTranslationPropsOptions {
  onSuccess?: (translation: GetStaticTranslationProps) => void;
}

export const getStaticTranslationProps =
  ({ onSuccess }: GetStaticTranslationPropsOptions = {}) =>
  async (ctx: GetStaticPropsContext) => {
    const { params: { slug } = { slug: [] }, locale } = ctx;

    const pathname = path.sep.concat(
      isArray(slug) ? slug.join(path.sep) : slug
    );

    const translation = await loadNamespaces({
      ...i18nConfig,
      pathname,
      locale
    });

    if (translation && onSuccess) {
      onSuccess(translation as any);
    }

    return {
      props: {
        ...translation
      }
    };
  };
