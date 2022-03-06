import { PageTypes } from '@app/types';
import { TocEntry } from '@stefanprobst/remark-extract-toc';
import { Message } from 'esbuild';
import grayMatter from 'gray-matter';
import { GetStaticPropsContext } from 'next';

import { getBlogContent, getContent, getContentBlogIndex } from './getContent';

export interface GetStaticContentProps {
  content: {
    mdxSource: {
      code: string;
      frontmatter: {
        [key: string]: any;
      };
      errors: Array<Message>;
      matter: Omit<grayMatter.GrayMatterFile<string>, 'data'> & {
        data: {
          [key: string]: any;
        };
      };
    };
    hydratedComponents: Array<string>;
    metaData: PageTypes.MetaData;
    slug: string | Array<string>;
    toc: Array<
      Omit<TocEntry, 'children'> & {
        isParent?: boolean;
      }
    >;
  };
}

export interface GetStaticContentPropsSimple {
  slug: string;
  metaData: PageTypes.MetaData;
}

interface GetStaticContentPropsOptions {
  pageType: string;
  onSuccess?: (
    content: GetStaticContentProps | Array<GetStaticContentPropsSimple>
  ) => void;
}

export const getStaticContentProps =
  ({ pageType, onSuccess }: GetStaticContentPropsOptions) =>
  async (ctx: GetStaticPropsContext) => {
    let content;
    if (pageType === 'docs') {
      content = await getContent(ctx, pageType);
    } else if (pageType === 'blog') {
      content = await getBlogContent(ctx, pageType);
    }
    if (content && onSuccess) {
      onSuccess(content);
    }
    return {
      props: {
        content
      }
    };
  };

export const getStaticContentPropsBlogIndex =
  ({ pageType, onSuccess }: GetStaticContentPropsOptions) =>
  async () => {
    const content = await getContentBlogIndex(pageType);
    const pages = content.map(c => {
      return {
        pathname: c.slug,
        children: [],
        icon: null
      };
    });
    if (content && onSuccess) {
      onSuccess(content);
    }
    return {
      props: {
        content,
        navigation: {
          pages
        }
      }
    };
  };
