import { HiddenUnderlineLink } from '@app/components';
import { PageTypes } from '@app/types';
import { ArrowForward } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';
import { format } from 'date-fns';
import isArray from 'lodash/isArray';
import { FC, useMemo } from 'react';

export const PostWrapper = styled('li')(({ theme }) => ({
  borderRadius: theme.spacing(1),
  borderStyle: 'solid',
  borderWidth: 'thin',
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.standard
  }),
  '&:hover': {
    backgroundColor: alpha(
      theme.palette.action.active,
      theme.palette.action.hoverOpacity
    ),
    // Use the hover media feature.
    // Reset on touch devices, which can not conveniently hover.
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}));

export const Posts = styled('ul')(({ theme }) => ({
  padding: 0,
  listStyle: 'none',
  margin: 'auto',
  maxWidth: '80ch',
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
  '> :not(:last-child)': {
    marginBottom: theme.spacing(2)
  }
}));

export const PostTitle = styled(Typography)({
  fontFamily: "'Bellota', cursive",
  fontWeight: 700
});

export const PostDescription = styled('p')({ color: grey[600] });

export const PostDate = styled('p')({
  color: grey[600],
  fontSize: '0.875rem'
});

export const PostContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: theme.spacing(2, 4)
}));

export const PostContent = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});

interface PostProps {
  post: {
    metaData: PageTypes.MetaData;
    slug: string | Array<string>;
  };
}

export const Post: FC<PostProps> = ({ post }) => {
  const {
    metaData: { title, description, editedAt },
    slug
  } = post;

  const editDate = useMemo(() => {
    return format(new Date(editedAt), 'MMMM do, yyyy');
  }, [editedAt]);

  return (
    <PostWrapper>
      <HiddenUnderlineLink
        href={{
          pathname: '/blog/[slug]',
          query: { slug: !isArray(slug) ? slug.split('/') : slug }
        }}
        prefetch={false}
      >
        <PostContainer>
          <PostContent>
            <PostTitle variant='h3'>{title}</PostTitle>
            <PostDescription>{description}</PostDescription>
            <PostDate>Last updated {editDate}</PostDate>
          </PostContent>
          <ArrowForward />
        </PostContainer>
      </HiddenUnderlineLink>
    </PostWrapper>
  );
};
