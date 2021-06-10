import { useHoux } from '@app/houx';
import {
  RootState,
  scrollActions,
  scrollData,
  scrollStates,
  ScrollTypes,
  selectors,
  TimelineActions,
  viewportReducers,
  viewportSelectors,
} from '@demonstrators-social/shared';
import { useMergedRef } from '@huse/merged-ref';
import { Button, ButtonGroup, Card, ListItem, makeStyles, Theme } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { formatDistance } from 'date-fns';
import { enGB } from 'date-fns/locale';
import lodashGet from 'lodash/get';
import useTranslation from 'next-translate/useTranslation';
import React, { Dispatch, FC, memo, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { selectorFamily, SerializableParam, useRecoilValue, useSetRecoilState } from 'recoil';

import { CommentEditor } from '../comment/CommentEditor';
import { Comments } from '../comment/Comments';
import { getContent, getHeader, getMedia, getObserverComp, getRef } from './Post.Render.svc';
import { handleCreateComment, handleDeletePost } from './Post.svc';

const { selectPostById, selectTimelineOwner } = selectors.timeline;

const useStyles = makeStyles((theme: Theme) => ({
  postListItem: {
    padding: theme.spacing(0, 1)
  },
  card: {
    flexGrow: 1
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // perfect 16:9 ratio
  }
}));

interface TimelinePostKeys {
  timelineId: string;
  postId: string;
  [key: string]: SerializableParam;
}

const refPostScrollSelector = selectorFamily<
  ScrollTypes.Post.RefPostScroll,
  TimelinePostKeys
>({
  key: 'ref-post-scroll-selector',
  get:
    ({ postId, timelineId }) =>
    ({ get }) => {
      const {
        post: { refPostScrollState }
      } = scrollStates;

      const posts = get(refPostScrollState(postId));

      const post = lodashGet(posts, timelineId);
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
  // Logs the component lifecycle.
  // console.log('-- rendering post');

  useEffect(() => {
    // The component is mounted only one time.
    console.log('---- mounting post');
    return () => {
      // The component is never unmounted during reparenting.
      console.log('------ unmounting post');
    };
  }, []);

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

  const refForComponent = useMemo(() => {
    if (refObservedSubSlices != null) {
      const getRefForComponent = getRef(refObservedSubSlices);
      return {
        header: getRefForComponent('header'),
        media: getRefForComponent('media'),
        content: getRefForComponent('content'),
        sentiment: getRefForComponent('sentiment'),
        comments: getRefForComponent('comments')
      };
    }
    return {
      header: null,
      media: null,
      content: null,
      sentiment: null,
      comments: null
    };
  }, [refObservedSubSlices]);

  const headerComp = getObserverComp(refForComponent.header)(
    getHeader(firstName, lastName, avatar, date)
  );

  const mediaComp = getObserverComp(refForComponent.media)(
    getMedia(imageHref, imageTitle, media)
  );

  const contentComp = getObserverComp(refForComponent.content)(
    getContent(text)
  );

  const sentimentComp = getObserverComp(refForComponent.sentiment)(
    <ButtonGroup variant='text' color='primary' size='large' fullWidth>
      <Button
        id={`timeline-${timelineId}-post-${postId}-comment-like`}
        aria-label={t('pages/pidp/use-case/recognition/index:like')}
        variant='text'
        color='primary'
        startIcon={<ThumbUpIcon />}
      />
      <Button
        id={`timeline-${timelineId}-post-${postId}-comment-create`}
        aria-label={t('pages/pidp/use-case/recognition/index:comment')}
        variant='text'
        color='primary'
        startIcon={<ChatBubbleOutlineIcon />}
        onClick={() => setDisplayEditor(true)}
      />
      <Button
        id={`timeline-${timelineId}-post-${postId}-comment-delete`}
        aria-label={t('pages/pidp/use-case/recognition/index:delete')}
        variant='text'
        color='primary'
        startIcon={<DeleteOutlineIcon />}
        onClick={() => handleDeletePost(timelineId, postId, dispatch)}
      />
    </ButtonGroup>
  );

  const commentComp = getObserverComp(refForComponent.comments)(
    <Comments comments={comments} timelineId={timelineId} postId={postId} />
  );

  const setNodesWithRelationsWithEdge = useSetRecoilState(
    nodesWithRelationsWithEdgeState
  );

  const {
    post: { addItem, removeItem }
  } = viewportReducers;

  const {
    post: { viewportItemSelector }
  } = viewportSelectors;

  const setViewportItemState = useSetRecoilState(
    viewportItemSelector(timelineId)
  );

  const [intersectionObserverRef, inView, entry] = useInView({
    threshold: [0.1, 0.3, 0.6, 0.8],
    delay: 500
  });

  useEffect(() => {
    if (entry && entry.target) {
      const target = entry.target as HTMLElement;
      const { id: inViewElementId, offsetTop } = target;
      if (inView) {
        setViewportItemState(state => {
          return {
            ...addItem(state, { id: inViewElementId, offsetTop }),
            offsetTop: offsetTop
          };
        });
      }
      if (!inView) {
        setViewportItemState(state => removeItem(state, inViewElementId));
      }
    }
  }, [inView]);

  const combinedRef = useMergedRef([refObserved, intersectionObserverRef]);

  return (
    <ListItem
      ref={combinedRef}
      className={classes.postListItem}
      id={`timeline-${timelineId}-post-${postId}`}
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
            timelineId={timelineId}
            isComment
          />
        ) : null}
        {commentComp}
      </Card>
    </ListItem>
  );
};

export default memo(Post);
