import { Navigation, PageTypes } from '@app/types';
import { Snackbar } from '@page/components';
import { FC, ReactNode } from 'react';

import { AppContentFooter } from '../components/AppContentFooter';
import { AppContentHeader } from '../components/AppContentHeader';
import { BlogHeader } from './BlogHeader';
import { Article, MainContainer } from './MainContainer';

export interface MarkdownBlogProps {
  slug: Array<string>;
  navigation: Navigation;
  metaData: PageTypes.MetaData;
  withAnimation?: boolean;
}

export const MdxBlog: FC<
  MarkdownBlogProps & {
    children: ReactNode;
  }
> = ({ slug, navigation, metaData, children }) => {
  return (
    <>
      <MainContainer
        id='blog-content'
        maxWidth={false}
        sx={{
          maxWidth: '80ch'
        }}
      >
        <AppContentHeader
          slug={slug}
          navigation={navigation}
          metaData={metaData}
        />

        <BlogHeader metaData={metaData} />

        <Article>{children}</Article>

        <AppContentFooter navigation={navigation} />
      </MainContainer>
      <Snackbar />
    </>
  );
};
