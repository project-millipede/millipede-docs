import { CardHeader, Divider, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC, Fragment } from 'react';

import { Comment } from '../../../typings/social';

// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
export const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    // root: {
    //   // width: '100%',
    //   // maxWidth: 360,
    //   backgroundColor: theme.palette.background.paper
    // },
    root: {
      paddingLeft: 'unset'
    },
    inline: {
      display: 'inline'
    }
  })
);

interface AlignItemsListProps {
  timelineId: number;
  postId: number;
  comments?: Array<Comment>;
}

const Comments: FC<AlignItemsListProps> = ({
  timelineId,
  postId,
  comments = []
}) => {
  const classes = useStyles({});

  const items = comments.map((comment, index, orgComments) => {
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
        <ListItem alignItems='flex-start'>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader
              avatar={<Avatar alt={`${firstName} ${lastName}`} src={avatar} />}
              title={`${firstName} ${lastName}`}
              subheader={createdAt}
            />

            {/* <ListItemAvatar>
            <Avatar alt={`${firstName} ${lastName}`} src={avatar} />
          </ListItemAvatar> */}
            {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ListItemText
              primary={`${firstName} ${lastName}`}
              secondary={
                <Typography
                  component='span'
                  variant='body2'
                  className={classes.inline}
                  color='textPrimary'
                >
                  {createdAt.toString()}
                </Typography>
              }
            />
            <ListItemText
              secondary={
                <Typography
                  component='p'
                  variant='body2'
                  className={classes.inline}
                  color='textSecondary'
                >
                  {text}
                </Typography>
              }
            />
          </div> */}
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
        {index < orgComments.length - 1 ? (
          <Divider variant='inset' component='li' />
        ) : null}
      </Fragment>
    );
  });

  return <List style={{ paddingLeft: 'unset' }}>{items}</List>;
};

export default Comments;
