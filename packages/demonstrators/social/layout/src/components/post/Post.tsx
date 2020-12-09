import { useHoux } from '@app/houx';
import {
  RootState,
  scrollActions,
  scrollData,
  scrollStates,
  ScrollTypes,
  selectors,
  TimelineActions,
} from '@demonstrators-social/shared';
import { Button, ButtonGroup, Card, CardActions, createStyles, ListItem, makeStyles } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { formatDistance } from 'date-fns';
import { enGB } from 'date-fns/locale';
import _ from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import React, { Dispatch, FC, useMemo, useState } from 'react';
import { selectorFamily, SerializableParam, useRecoilValue, useSetRecoilState } from 'recoil';

import { CommentEditor } from '../comment/CommentEditor';
import { Comments } from '../comment/Comments';
import { getContent, getHeader, getMedia, getObserverComp, getRef } from './Post.Render.svc';
import { handleCreateComment, handleDeletePost } from './Post.svc';

const { selectPostById, selectTimelineOwner } = selectors.timeline;

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

interface TimelinePostKeys {
  timelineId: string;
  postId: string;
  [key: string]: SerializableParam;
}

const refPostScrollSelector = selectorFamily<
  ScrollTypes.Post.RefPostScroll,
  TimelinePostKeys
>({
  key: 'refPostScrollSelector',
  get: ({ postId, timelineId }) => ({ get }) => {
    const {
      post: { refPostScrollState }
    } = scrollStates;

    const posts = get(refPostScrollState(postId));
    const post = _.get(posts, timelineId);
    return post;
  }
});

export interface PostProps {
  timelineId: string;
  otherTimelineId: string;
  postId: string;
}

export const Post: FC<PostProps> = ({
  timelineId,
  otherTimelineId,
  postId
}) => {
  const classes = useStyles();

  const { t } = useTranslation();

  const [displayEditor, setDisplayEditor] = useState(false);

  const {
    timeline: { createNodesWithRelations, addTopic }
  } = scrollActions;

  const {
    timeline: { nodesWithRelationsWithEdgeState }
  } = scrollStates;

  const {
    timeline: { publishActions }
  } = scrollData;

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

  const elementRef = useRecoilValue(
    refPostScrollSelector({ postId, timelineId })
  );

  const date = useMemo(
    () =>
      formatDistance(createdAt, new Date(), {
        locale: enGB
      }),
    [createdAt]
  );

  const { media } = classes;
  const { refObserved, refObservedSubSlices } = elementRef || {};

  const getRefForId = getRef(refObservedSubSlices);

  const headerComp = getObserverComp(getRefForId('header'))(
    getHeader(firstName, lastName, avatar, date)
  );

  const mediaComp = getObserverComp(getRefForId('media'))(
    getMedia(imageHref, imageTitle, media)
  );

  const contentComp = getObserverComp(getRefForId('content'))(getContent(text));

  const sentimentComp = getObserverComp(getRefForId('sentiment'))(
    <CardActions disableSpacing>
      <ButtonGroup variant='text' color='primary' style={{ margin: 'auto' }}>
        <Button variant='text' color='primary' startIcon={<ThumbUpIcon />}>
          {t('pages/pidp/use-case/recognition/index:like')}
        </Button>
        <Button
          variant='text'
          color='primary'
          startIcon={<ChatBubbleOutlineIcon />}
          onClick={() => setDisplayEditor(true)}
        >
          {t('pages/pidp/use-case/recognition/index:comment')}
        </Button>
        <Button
          variant='text'
          color='primary'
          startIcon={<DeleteOutlineIcon />}
          onClick={() => handleDeletePost(timelineId, postId, dispatch)}
        >
          {t('pages/pidp/use-case/recognition/index:delete')}
        </Button>
      </ButtonGroup>
    </CardActions>
  );

  const commentComp = getObserverComp(getRefForId('comments'))(
    <Comments comments={comments} timelineId={timelineId} postId={postId} />
  );

  const setNodesWithRelationsWithEdge = useSetRecoilState(
    nodesWithRelationsWithEdgeState
  );

  return (
    <ListItem
      id={`timeline-${timelineId}-post-${postId}`}
      ref={refObserved != null ? refObserved : null}
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
              handleCreateComment(owner, postId, text, dispatch, comment => {
                const publishActionsExtended = addTopic(
                  publishActions,
                  'publish',
                  'pages/pidp/use-case/recognition/index:'
                );

                const publishNodesWithRelations = createNodesWithRelations(
                  publishActionsExtended,
                  t,
                  false
                )([timelineId, otherTimelineId], postId, 'comments');

                setNodesWithRelationsWithEdge(state => {
                  return {
                    ...state,
                    nodesWithRelations: {
                      ...state.nodesWithRelations,
                      [comment.id]: {
                        values: [publishNodesWithRelations],
                        id: 'Comment Id',
                        description: 'Comment Description'
                      }
                    },
                    activeId: comment.id
                  };
                });

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
