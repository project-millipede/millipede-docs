import { HiddenUnderlineLink } from '@app/components';
import { BlogFrame, BlogThemeProvider } from '@app/layout';
import { Navigation, PageTypes } from '@app/types';
import { Blurb, Post, Posts } from '@blog/components';
import { Chip, Divider, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Components, Mdx } from '@page/layout';
import { compareDesc } from 'date-fns';
import { GetStaticProps } from 'next';
import { mergeProps } from 'next-merge-props';
import { FC, ReactElement } from 'react';

import { GetStaticContentProps, getStaticContentPropsBlogIndex } from '../../docs/src/lib/getStaticContentProps';
import { GetStaticNavigationProps } from '../../docs/src/lib/getStaticNavigationProps';
import { GetStaticTranslationProps } from '../../docs/src/lib/getStaticTranslationProps';
import { NextPageWithLayout } from '../../docs/src/lib/types';

const { AppHead } = Components;
const { MainContainer } = Mdx;

const metaDataBlogLanding: PageTypes.MetaData = {
  title: "Untether, for good - Let's fuse pixels of arbitrary apps",
  description:
    'An interactive blog probing building blocks of futuristic privacy',
  keywords: 'Blog, Privacy enhancing technology',
  author: 'Markus Gritsch'
};

export const Header = styled('header')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  marginBottom: theme.spacing(2)
}));

const BlogHeader: FC = () => {
  return (
    <Header>
      <Typography variant='h1'>Untether, for good</Typography>
      <Typography variant='h2'>Let's fuse pixels of arbitrary apps</Typography>
      <Blurb variant='h3'>
        An interactive blog probing building blocks of futuristic privacy, by
        <Typography
          component={HiddenUnderlineLink}
          variant='h3'
          sx={{
            fontFamily: "'Roboto Mono', monospace",
            fontWeight: 500,
            '&:hover': {
              color: grey[600]
            }
          }}
          href={{
            pathname: '/docs/[...slug]',
            query: { slug: 'discover-more/team'.split('/') }
          }}
          prefetch={false}
        >
          {` Markus Gritsch`}
        </Typography>
      </Blurb>
    </Header>
  );
};

export type DynamicPageBlogProps = GetStaticTranslationProps &
  GetStaticContentProps &
  GetStaticNavigationProps;

const Blog: NextPageWithLayout<DynamicPageBlogProps> = ({ content }) => {
  return (
    <>
      <AppHead metaData={metaDataBlogLanding} />
      <MainContainer
        id='blog-landing'
        maxWidth={false}
        sx={{
          maxWidth: '80ch'
        }}
      >
        <BlogHeader />
        <Divider>
          <Chip label='Posts' />
        </Divider>
        <Posts>
          {Array.isArray(content) &&
            content
              .sort((a, b) =>
                compareDesc(
                  new Date(a.metaData.editedAt),
                  new Date(b.metaData.editedAt)
                )
              )
              .map((post, index) => {
                return <Post key={`post-${index}`} post={post as any} />;
              })}
        </Posts>
      </MainContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps = mergeProps(
  [
    getStaticContentPropsBlogIndex({
      pageType: 'blog'
    })
  ],
  {
    resolutionType: 'sequential'
  }
);

Blog.getLayout = (page: ReactElement, _navigation: Navigation) => {
  return (
    <BlogThemeProvider>
      <BlogFrame>{page}</BlogFrame>
    </BlogThemeProvider>
  );
};

export default Blog;
