import { TOC_TOP } from '@app/layout';
import { Components as RenderComponents } from '@app/render-utils';
import { Navigation, PageTypes } from '@app/types';
import { Blurb } from '@blog/components';
import { Avatar, Box, Container, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Snackbar } from '@page/components';
import { Toc } from '@stefanprobst/remark-extract-toc';
import { format } from 'date-fns';
import React, { FC, useMemo } from 'react';

import { AppTableOfContents } from '../components';
import { AppContentFooter } from '../components/AppContentFooter';
import { AppContentHeader } from '../components/AppContentHeader';

const {
  Media: { Media }
} = RenderComponents;

export interface MarkdownBlogProps {
  slug: Array<string>;
  toc: Toc;
  navigation: Navigation;
  metaData: PageTypes.MetaData;
}

export const StyledAppContainer = styled(Container)(({ theme }) => {
  return {
    gridArea: 'app-center',
    maxWidth: '80ch',
    marginTop: theme.spacing(TOC_TOP)
  };
}) as typeof Container;

const github = 'gurkerl83';

export const MdxBlog: FC<MarkdownBlogProps> = ({
  slug,
  toc,
  navigation,
  metaData,
  children
}) => {
  const { editedAt, author, title, blurb } = metaData;

  const editDate = useMemo(() => {
    return format(new Date(editedAt), 'MMMM do, yyyy');
  }, [editedAt]);

  const theme = useTheme();

  return (
    <>
      <StyledAppContainer id='blog-posts' component='main' maxWidth={false}>
        <AppContentHeader
          slug={slug}
          navigation={navigation}
          metaData={metaData}
        />
        <Typography variant='h1'>{title}</Typography>
        <Blurb variant='h3'>{blurb}</Blurb>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: theme.spacing(5, 0)
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{ marginRight: theme.spacing(2) }}
              src={`https://github.com/${github}.png`}
            />
            <Typography variant='body2' gutterBottom={false}>
              {author}
            </Typography>
          </Box>
          <Typography
            variant='body2'
            gutterBottom={false}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            Last updated {editDate}
          </Typography>
        </Box>
        {children}
        <AppContentFooter navigation={navigation} />
      </StyledAppContainer>

      {toc && toc.length > 0 && (
        <Media greaterThanOrEqual='md'>
          {(className, renderChildren) => {
            return (
              <AppTableOfContents
                toc={toc}
                sx={{ gridArea: 'app-right' }}
                className={className}
                renderChildren={renderChildren}
              />
            );
          }}
        </Media>
      )}
      <Snackbar />
    </>
  );
};
