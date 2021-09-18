import { PageTypes } from '@app/types';
import { TocEntry } from '@stefanprobst/remark-extract-toc';
import grayMatter from 'gray-matter';
import { GetStaticPropsContext } from 'next';

import { getContent } from './getContent';

export interface GetStaticContentProps {
  mdxSource: {
    code: string;
    frontmatter: {
      [key: string]: any;
    };
    matter: grayMatter.GrayMatterFile<any>;
  };
  hydrationComponentsList: Array<string>;
  metaData: PageTypes.MetaData;
  slug: Array<string>;
  toc: Array<
    Omit<TocEntry, 'children'> & {
      isParent?: boolean;
    }
  >;
}

interface GetStaticContentPropsOptions {
  pageType: string;
  onSuccess: (content: GetStaticContentProps) => void;
}

export const getStaticContentProps =
  ({ pageType, onSuccess }: GetStaticContentPropsOptions) =>
  async (ctx: GetStaticPropsContext) => {
    const content = await getContent(ctx, pageType);

    if (content && onSuccess) {
      onSuccess(content as any);
    }
    return {
      props: {
        ...content
      }
    };
  };
