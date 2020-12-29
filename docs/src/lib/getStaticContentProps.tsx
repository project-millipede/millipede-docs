import { PageTypes } from '@app/types';
import { GetStaticPropsContext } from 'next';

import { getContent } from './getContent';

export interface GetStaticContentProps {
  mdxSource: {
    compiledSource: string;
    contentHtml: string;
    scope: any;
  };
  hydrationComponentsList: Array<string>;
  rawContent: string;
  metaData: PageTypes.MetaData;
}

interface GetStaticContentPropsOptions {
  pageType: string;
  onSuccess: (content: GetStaticContentProps) => void;
}

export const getStaticContentProps = ({
  pageType,
  onSuccess
}: GetStaticContentPropsOptions) => async (ctx: GetStaticPropsContext) => {
  const content = await getContent(ctx, pageType);

  if (content && onSuccess) {
    onSuccess(content);
  }
  return {
    props: {
      ...content
    }
  };
};
