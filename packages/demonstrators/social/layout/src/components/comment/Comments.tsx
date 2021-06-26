import { CollectionUtil } from '@app/utils';
import { Types } from '@demonstrators-social/data';
import { Avatar, CardActions, CardContent, CardHeader, IconButton, IconButtonProps, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { formatDistance } from 'date-fns';
import { enGB } from 'date-fns/locale';
import React, { FC, Fragment, useMemo, useState } from 'react';

type StyledIconButtonProps = IconButtonProps & {
  open: boolean;
};

const StyledIconButton = styled(IconButton)<StyledIconButtonProps>(
  ({ theme, open }) => ({
    marginLeft: 'auto',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    ...(open && {
      transform: 'rotate(180deg)'
    })
  })
);

interface CommentsProps {
  timelineId: string;
  postId: string;
  comments?: Array<Types.Comment>;
}

export const Comments: FC<CommentsProps> = ({
  timelineId,
  postId,
  comments = []
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const processedComments = useMemo(
    () =>
      comments
        .sort(CollectionUtil.Array.compareDescFn('content.createdAt'))
        .map(comment => {
          const {
            content: { createdAt }
          } = comment;

          return {
            ...comment,
            content: {
              ...comment.content,
              createdAt: formatDistance(createdAt, new Date(), {
                locale: enGB
              })
            }
          };
        }),
    [comments.length]
  );

  const commentComps = processedComments.map(comment => {
    const {
      commenter: {
        profile: { firstName, lastName, avatar }
      },
      id: commentId,
      content: { text, createdAt }
    } = comment;

    return (
      <Fragment
        key={`timeline-${timelineId}-post-${postId}-comment-${commentId}`}
      >
        <CardHeader
          avatar={<Avatar alt={`${firstName} ${lastName}`} src={avatar} />}
          title={`${firstName} ${lastName}`}
          subheader={createdAt}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {text}
          </Typography>
        </CardContent>
      </Fragment>
    );
  });

  const defaultCommentComps = commentComps.slice(0, 3);
  const restCommentComps = commentComps.slice(3, commentComps.length);

  const expandButton =
    restCommentComps.length > 0 ? (
      <CardActions
        disableSpacing
        key={`timeline-${timelineId}-post-${postId}-comment-actions`}
      >
        <StyledIconButton open={expanded} onClick={handleExpandClick}>
          <ExpandMoreIcon />
        </StyledIconButton>
      </CardActions>
    ) : null;

  return (
    <>
      {[
        ...defaultCommentComps,
        expandButton,
        expanded ? restCommentComps : null
      ]}
    </>
  );
};
