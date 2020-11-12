import {
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { formatDistance } from 'date-fns';
import { enGB } from 'date-fns/locale';
import React, { FC, Fragment, useMemo, useState } from 'react';

import { compareDescFn } from '../../../../docs/src/modules/utils/collection/array';
import { Comment } from '../../../typings/social';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    }
  })
);

interface CommentsProps {
  timelineId: string;
  postId: string;
  comments?: Array<Comment>;
}

const Comments: FC<CommentsProps> = ({ timelineId, postId, comments = [] }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const processedComments = useMemo(
    () =>
      comments.sort(compareDescFn('content.createdAt')).map(comment => {
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
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
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

export default Comments;
