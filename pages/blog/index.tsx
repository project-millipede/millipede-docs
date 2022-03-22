import { HiddenUnderlineLink } from '@app/components';
import { BlogFrame, BlogThemeProvider, TOC_TOP } from '@app/layout';
import { Blurb, Post, Posts } from '@blog/components';
import { Chip, Container, Divider, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { compareDesc } from 'date-fns';
import { GetStaticProps } from 'next';
import { mergeProps } from 'next-merge-props';
import { ReactElement } from 'react';

import { GetStaticContentProps, getStaticContentPropsBlogIndex } from '../../docs/src/lib/getStaticContentProps';
import { GetStaticNavigationProps } from '../../docs/src/lib/getStaticNavigationProps';
import { GetStaticTranslationProps } from '../../docs/src/lib/getStaticTranslationProps';
import { NextPageWithLayout } from '../../docs/src/lib/types';

export const StyledAppContainer = styled(Container)(({ theme }) => ({
  gridArea: 'app-center',
  marginTop: theme.spacing(TOC_TOP),
  maxWidth: '80ch'
})) as typeof Container;

export const Header = styled('header')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  marginBottom: theme.spacing(2)
}));

export type DynamicPageBlogProps = GetStaticTranslationProps &
  GetStaticContentProps &
  GetStaticNavigationProps;

const Blog: NextPageWithLayout<DynamicPageBlogProps> = ({ content }) => {
  return (
    <StyledAppContainer id='blog-landing' component='main' maxWidth={false}>
      <Header>
        <Typography variant='h1'>Untether, for good</Typography>
        <Typography variant='h2'>
          Let's fuse pixels of arbitrary apps
        </Typography>
        <Blurb variant='h3'>
          An interactive blog probing building blocks of futuristic privacy, by
          <Typography
            variant='h3'
            sx={{
              fontFamily: "'Roboto Mono', monospace",
              fontWeight: 500,
              '&:hover': {
                color: grey[600]
              }
            }}
            component={HiddenUnderlineLink}
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
    </StyledAppContainer>
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

Blog.getLayout = (page: ReactElement) => {
  return (
    <BlogThemeProvider>
      <BlogFrame>{page}</BlogFrame>
    </BlogThemeProvider>
  );
};

export default Blog;
