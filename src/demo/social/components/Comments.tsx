import {
  Avatar,
  CardActions,
  CardHeader,
  createStyles,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { formatDistance } from 'date-fns';
import { enGB } from 'date-fns/locale';
import React, { FC, useMemo, useState } from 'react';

import { compareDescFn } from '../../../../docs/src/modules/utils/collection/array';
import { Comment } from '../../../typings/social';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inline: {
      display: 'inline'
    },
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
      <ListItem
        alignItems='flex-start'
        key={`timeline-${timelineId}-post-${postId}-comment-${commentId}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <CardHeader
            avatar={<Avatar alt={`${firstName} ${lastName}`} src={avatar} />}
            title={`${firstName} ${lastName}`}
            subheader={createdAt}
          />
          <Typography
            component='p'
            variant='body2'
            className={classes.inline}
            color='textSecondary'
          >
            {text}
          </Typography>
        </div>
      </ListItem>
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
    <List style={{ paddingLeft: 'unset' }}>
      {[
        ...defaultCommentComps,
        expandButton,
        expanded ? restCommentComps : null
      ]}
    </List>
  );
};

export default Comments;
