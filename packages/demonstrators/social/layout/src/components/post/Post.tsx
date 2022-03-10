import { features as appComponentFeatures } from '@app/components';
import { CollectionUtil } from '@app/utils';
import { features as navigationFeatures } from '@demonstrator/navigation';
import { features, Scroll } from '@demonstrators-social/shared';
import { useMergedRef } from '@huse/merged-ref';
import { ChatBubbleOutline, DeleteOutline, ThumbUp } from '@mui/icons-material';
import { Button, ButtonGroup, Card, ListItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { formatDistance } from 'date-fns';
import { enGB } from 'date-fns/locale';
import get from 'lodash/get';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import Comments from '../comment/Comments';
import { ContentEditor } from '../comment/ContentEditor';
import { getContent, getHeader, getMedia, getRef } from './Post.Render.svc';
import { handleCreateComment, handleDeletePost } from './Post.svc';

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
  const {
    scroll: {
      timeline: {
        states: { nodesWithRelationsWithEdgeState },
        actions: { addTopic, createNodesWithRelations },
        constants: { actionPlan }
      },
      post: {
        selector: { refPostScrollSelector }
      }
    },
    timeline: {
      states: { timelineState },
      selector: { useCaseSelector, timelineOfOwnerSelector, postByIdSelector }
    },
    viewport: {
      selector: {
        // viewportItemSelector,
        viewportNextItemSelector
      }
      // utils: { addItem, removeItem },
    }
  } = features;

  const {
    app: {
      states: { appCompositionState }
    }
  } = navigationFeatures;

  const {
    archer: {
      states: { archerTransitionComposedState }
    }
  } = appComponentFeatures;

  const { t } = useTranslation();

  const theme = useTheme();

  const [displayEditor, setDisplayEditor] = useState(false);

  const { isMobile } = useRecoilValue(appCompositionState);

  const setTimeline = useSetRecoilState(timelineState);

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
  } = useRecoilValue(postByIdSelector(postId));

  const elementRef = useRecoilValue(
    refPostScrollSelector({ timelineId, postId })
  );

  const date = useMemo(
    () =>
      formatDistance(createdAt, new Date(), {
        locale: enGB
      }),
    [createdAt]
  );

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

  const headerComp = getHeader(
    refForComponent.header,
    firstName,
    lastName,
    avatar,
    date
  );

  const mediaComp = getMedia(refForComponent.media, imageHref, imageTitle);

  const contentComp = getContent(refForComponent.content, text);

  const sentimentComp = (
    <ButtonGroup
      ref={refForComponent.sentiment}
      variant='text'
      color='primary'
      size='large'
      fullWidth
    >
      <Button
        id={`timeline-${timelineId}-post-${postId}-comment-like`}
        aria-label={t('pages/pidp/use-case/recognition/index:like')}
        variant='text'
        color='primary'
        startIcon={<ThumbUp />}
      />
      <Button
        id={`timeline-${timelineId}-post-${postId}-comment-create`}
        aria-label={t('pages/pidp/use-case/recognition/index:comment')}
        variant='text'
        color='primary'
        startIcon={<ChatBubbleOutline />}
        onClick={() => setDisplayEditor(true)}
      />
      <Button
        id={`timeline-${timelineId}-post-${postId}-comment-delete`}
        aria-label={t('pages/pidp/use-case/recognition/index:delete')}
        variant='text'
        color='primary'
        startIcon={<DeleteOutline />}
        onClick={() => handleDeletePost(timelineId, postId, setTimeline)}
      />
    </ButtonGroup>
  );

  const commentComp = (
    <Comments
      ref={refForComponent.comments}
      comments={comments}
      timelineId={timelineId}
      postId={postId}
    />
  );

  // Scroll-restoration V1
  // const setViewportItemState = useSetRecoilState(
  //   viewportItemSelector(timelineId)
  // );

  // Scroll-restoration V2 - TODO: Document necessary steps
  const setViewportItemState = useSetRecoilState(
    viewportNextItemSelector(timelineId)
  );

  const [intersectionObserverRef, inView, entry] = useInView({
    threshold: [0.1, 0.3, 0.6, 0.8],
    delay: 2000
  });

  // Scroll-restoration V1
  // useEffect(() => {
  //   if (entry && entry.target) {
  //     const target = entry.target as HTMLElement;
  //     const { id: inViewElementId, offsetTop } = target;
  //     if (inView) {
  //       setViewportItemState(state => {
  //         return {
  //           ...addItem(state, { id: inViewElementId, offsetTop }),
  //           offsetTop: offsetTop
  //         };
  //       });
  //     }
  //     if (!inView) {
  //       setViewportItemState(state => {
  //         return removeItem(state, inViewElementId);
  //       });
  //     }
  //   }
  // }, [inView, isMobile]);

  // Scroll-restoration V2
  useEffect(() => {
    if (entry && entry.target) {
      const target = entry.target as HTMLElement;
      const { id: inViewElementId, offsetTop } = target;
      if (inView) {
        setViewportItemState(state => {
          return { ...state, viewportItem: { id: inViewElementId, offsetTop } };
        });
      }
      if (!inView) {
        // do nothing - the recent viewport item gets updated at the inView condition
      }
    }
  }, [inView, isMobile]);

  const combinedRef = useMergedRef([refObserved, intersectionObserverRef]);

  const owner = useRecoilValue(timelineOfOwnerSelector(timelineId));

  const useCase = useRecoilValue(useCaseSelector);

  const { timelines } = useCase;

  const [leftTimeline] = timelines;

  const createComment = useRecoilCallback(
    ({ set, reset }) =>
      (text: string) => {
        handleCreateComment(owner, postId, text, setTimeline, _comment => {
          // const { id: activeCommentId } = comment;

          const isLtr = leftTimeline.owner.id === owner.id;

          const actions = get(actionPlan, 'publish');

          const actionsWithTopic = addTopic(
            actions,
            'publish',
            'pages/pidp/use-case/recognition/index:'
          );

          const flowActions = CollectionUtil.Array.withoutBorders<string>(
            actions,
            actions.length,
            isLtr
          );

          const resultMinusLast = flowActions.slice(0, flowActions.length - 1);

          const nodesWithRelations = createNodesWithRelations(
            actionsWithTopic,
            t,
            isLtr,
            Scroll.Timeline.LAYOUT.FULL,
            resultMinusLast
          )([timelineId, otherTimelineId], postId, 'comments');

          reset(nodesWithRelationsWithEdgeState);
          reset(archerTransitionComposedState);

          set(nodesWithRelationsWithEdgeState, state => {
            return {
              ...state,
              nodesWithRelations: {
                [postId]: [nodesWithRelations]
              },
              activeId: postId,
              finalSize: actions.length
            };
          });

          setDisplayEditor(false);
        });
      },
    [owner.id]
  );

  return (
    <ListItem
      ref={combinedRef}
      sx={{
        padding: theme.spacing(0, 1)
      }}
      id={`timeline-${timelineId}-post-${postId}`}
    >
      <Card
        sx={{
          flexGrow: 1,
          borderRadius: 0,
          boxShadow: 'none'
        }}
      >
        {headerComp}
        {mediaComp}
        {contentComp}
        {sentimentComp}

        {displayEditor ? (
          <ContentEditor
            create={createComment}
            timelineId={timelineId}
            isComment
          />
        ) : null}
        {commentComp}
      </Card>
    </ListItem>
  );
};
