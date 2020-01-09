import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useHoux } from 'houx';
import React, { FC } from 'react';
import uuid from 'uuid';

import { TimelineActions } from '../../../../docs/src/modules/redux/features/actionType';
import { RootState } from '../../../../docs/src/modules/redux/reducers';
import { useTranslation } from '../../../../i18n';
import { Post as ModelPost } from '../../../typings/social';
import CommentEditor from './CommentEditor';
import Comments from './Comments';
import { handleCreateComment } from './Post.svc';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      // maxWidth: 345,
      margin: 'auto'
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
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
    },
    avatar: {
      backgroundColor: red[500]
    }
  })
);

export interface PostProps {
  timelineId: number;
  postId: number;
}

const ns = 'pages/pidp/use-case/recognition/index';

const Post: FC<PostProps> = ({ timelineId, postId }) => {
  const classes = useStyles({});

  const { t } = useTranslation(ns);

  const [expanded, setExpanded] = React.useState(false);

  const [displayEditor, setDisplayEditor] = React.useState(false);

  const {
    dispatch,
    state: {
      timeline: { entities }
    }
  }: {
    dispatch: React.Dispatch<TimelineActions>;
    state: RootState;
  } = useHoux();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let post: ModelPost = {
    id: 0,
    author: { id: 0, profile: { firstName: '', lastName: '' } },
    content: {
      id: 0,
      createdAt: '',
      updatedAt: '',
      text: '',
      title: '',
      media: { id: uuid(), imageTitle: '', imageHref: '' }
    },
    comments: [],
    votes: []
  };

  if (entities && postId) {
    const { posts, users, comments } = entities;

    const userId = (posts[postId].author as unknown) as number;
    const commentIds = posts[postId].comments;

    const commentsLoaded = commentIds.map((commentId: number) => {
      const commenterId = (comments[commentId].commenter as unknown) as number;
      const commenter = users[commenterId] || {
        id: 0,
        profile: { firstName: '', lastName: '' }
      };

      return {
        ...comments[commentId],
        commenter
      };
    });

    post = {
      ...posts[postId],
      // author: users[post.author[0]]
      author: users[userId] || {
        id: 0,
        profile: { firstName: '', lastName: '' }
      },
      comments: commentsLoaded,
      votes: []
    };
  }

  const {
    author: {
      profile: { avatar, firstName, lastName }
    },
    content: {
      createdAt,
      // title,
      text,
      media: { imageTitle, imageHref }
    },
    comments
  } = post;

  const initialComments = comments.slice(0, 3);
  const restComments = comments.slice(3, comments.length);

  return (
    <motion.div>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar alt={`${firstName} ${lastName}`} src={avatar} />}
          title={`${firstName} ${lastName}`}
          subheader={createdAt}
        />
        <CardMedia
          className={classes.media}
          image={imageHref}
          title={imageTitle}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ButtonGroup
            variant='text'
            color='primary'
            aria-label='outlined primary button group'
            style={{ margin: 'auto' }}
          >
            <Button
              variant='text'
              color='primary'
              startIcon={<ThumbUpIcon />}
              aria-label='like'
            >
              {t('like')}
            </Button>
            {/* <Button
              variant='text'
              color='primary'
              startIcon={<ShareIcon />}
              aria-label='share'
            >
              {t('share')}
            </Button> */}
            <Button
              variant='text'
              color='primary'
              startIcon={<ChatBubbleOutlineIcon />}
              onClick={() => setDisplayEditor(!displayEditor)}
              aria-label='comment'
            >
              {t('comment')}
            </Button>
          </ButtonGroup>
        </CardActions>
        {displayEditor ? (
          <CommentEditor
            create={text =>
              handleCreateComment(
                timelineId,
                postId,
                text,
                entities,
                dispatch,
                () => {
                  setDisplayEditor(false);
                }
              )
            }
            isComment
          />
        ) : null}
        <Comments comments={initialComments} />
        {restComments.length > 0 ? (
          <>
            <CardActions disableSpacing>
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
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <Comments comments={restComments} />
            </Collapse>
          </>
        ) : null}
      </Card>
    </motion.div>
  );
};

export default Post;
