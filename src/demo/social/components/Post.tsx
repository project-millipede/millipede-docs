import { useHoux } from '@houx';
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  createStyles,
  ListItem,
  makeStyles
} from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { formatDistance } from 'date-fns';
import { enGB } from 'date-fns/locale';
import useTranslation from 'next-translate/useTranslation';
import React, { Dispatch, FC, useMemo, useState } from 'react';
import { SerializableParam } from 'recoil';

import { TimelineActions } from '../../../../docs/src/modules/redux/features/actionType';
import {
  selectPostById,
  selectTimelineOwner
} from '../../../../docs/src/modules/redux/features/timeline/selector';
import { RootState } from '../../../../docs/src/modules/redux/reducers';
import CommentEditor from './CommentEditor';
import Comments from './Comments';
import {
  getContent,
  getHeader,
  getMedia,
  getObserverComp
} from './Post.Render.svc';
import { handleCreateComment, handleDeletePost } from './Post.svc';

const useStyles = makeStyles(theme =>
  createStyles({
    postListItem: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0)
    },
    card: {
      flexGrow: 1
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // perfect 16:9 ratio
    }
  })
);

export interface PostProps {
  timelineId: string;
  otherTimelineId: string;
  postId: string;
}

export interface TimelinePostKeys {
  timelineId: string;
  postId: string;
  [key: string]: SerializableParam;
}

export const Post: FC<PostProps> = ({ timelineId, postId }) => {
  const classes = useStyles();

  const { t } = useTranslation();

  const [displayEditor, setDisplayEditor] = useState(false);

  const {
    dispatch,
    state
  }: {
    dispatch: Dispatch<TimelineActions>;
    state: RootState;
  } = useHoux();

  const {
    author: {
      profile: { avatar, firstName, lastName }
    },
    content: {
      createdAt,
      text,
      media: { imageTitle, imageHref }
    },
    comments
  } = selectPostById(postId)(state);

  const date = useMemo(
    () =>
      formatDistance(createdAt, new Date(), {
        locale: enGB
      }),
    [createdAt]
  );

  const { media } = classes;

  const headerComp = getObserverComp(
    false,
    null
  )(getHeader(firstName, lastName, avatar, date));

  const mediaComp = getObserverComp(
    false,
    null
  )(getMedia(imageHref, imageTitle, media));

  const contentComp = getObserverComp(false, null)(getContent(text));

  const sentimentComp = getObserverComp(
    false,
    null
  )(
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
        <Button
          variant='text'
          color='primary'
          startIcon={<ChatBubbleOutlineIcon />}
          onClick={() => setDisplayEditor(true)}
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
  );

  const commentComp = getObserverComp(
    false,
    null
  )(<Comments comments={comments} timelineId={timelineId} postId={postId} />);

  return (
    <ListItem
      id={`timeline-${timelineId}-post-${postId}`}
      className={classes.postListItem}
    >
      <Card className={classes.card}>
        {headerComp}
        {mediaComp}
        {contentComp}
        {sentimentComp}

        {displayEditor ? (
          <CommentEditor
            create={text => {
              const owner = selectTimelineOwner(timelineId)(state);
              handleCreateComment(owner, postId, text, dispatch, _comment => {
                setDisplayEditor(false);
              });
            }}
            isComment
          />
        ) : null}
        {commentComp}
      </Card>
    </ListItem>
  );
};
