import { useHoux } from '@houx';
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
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import React, { Dispatch, FC, useState } from 'react';

import { TimelineActions } from '../../../../docs/src/modules/redux/features/actionType';
import { RootState } from '../../../../docs/src/modules/redux/reducers';
import CommentEditor from './CommentEditor';
import Comments from './Comments';
import { handleCreateComment, handleDeletePost, selectPost } from './Post.svc';

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

const Post: FC<PostProps> = ({ timelineId, postId }) => {
  const classes = useStyles();

  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(false);

  const [displayEditor, setDisplayEditor] = useState(false);

  const {
    dispatch,
    state: {
      timeline: { entities }
    }
  }: {
    dispatch: Dispatch<TimelineActions>;
    state: RootState;
  } = useHoux();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
  } = selectPost(postId, entities);

  const initialComments = comments.slice(0, 3);
  const restComments = comments.slice(3, comments.length);

  return (
    <Card
      className={classes.card}
      key={`timeline-${timelineId}-post-${postId}`}
    >
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
            {t('pages/pidp/use-case/recognition/index:like')}
          </Button>
          {/* <Button
              variant='text'
              color='primary'
              startIcon={<ShareIcon />}
              aria-label='share'
            >
              {t('pages/pidp/use-case/recognition/index:share')}
            </Button> */}
          <Button
            variant='text'
            color='primary'
            startIcon={<ChatBubbleOutlineIcon />}
            onClick={() => setDisplayEditor(!displayEditor)}
            aria-label='comment'
          >
            {t('pages/pidp/use-case/recognition/index:comment')}
          </Button>
          <Button
            variant='text'
            color='primary'
            startIcon={<DeleteOutlineIcon />}
            onClick={() => handleDeletePost(timelineId, postId, dispatch)}
            aria-label='delete'
          >
            {t('pages/pidp/use-case/recognition/index:delete')}
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
      <Comments
        comments={initialComments}
        timelineId={timelineId}
        postId={postId}
      />
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
            <Comments
              comments={restComments}
              timelineId={timelineId}
              postId={postId}
            />
          </Collapse>
        </>
      ) : null}
    </Card>
  );
};

export default Post;
