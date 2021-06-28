import { UrlUtil } from '@app/utils';
import isArray from 'lodash/isArray';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { sep } from 'path';

import { getPath } from '../../docs/src/lib/getPath';

import type { GetServerSideProps, GetServerSidePropsContext } from 'next';

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { defaultLocale, req } = ctx;

  const { origin } = UrlUtil.getAbsoluteUrl(req, '', { https: true });

  const docsPaths = await getPath('docs');

  const pages = docsPaths.map(path => {
    const {
      locale,
      params: { slug }
    } = path;

    const stringifiedSlug = `${isArray(slug) ? slug.join(sep) || '.' : slug}`;

    if (locale !== defaultLocale) {
      return `${locale}/docs/${stringifiedSlug}`;
    }
    return `docs/${stringifiedSlug}`;
  });

  const sitemapFields: Array<ISitemapField> = pages.map(page => {
    return {
      loc: `${origin}/${page}`,
      changefreq: 'daily',
      priority: '0.7',
      lastmod: new Date().toISOString()
    };
  });

  return getServerSideSitemap(ctx, sitemapFields);
};

export default getServerSideProps;
