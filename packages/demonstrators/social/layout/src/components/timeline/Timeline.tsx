import { useHoux } from '@app/houx';
import { HooksUtils } from '@app/render-utils';
import { CollectionUtil } from '@app/utils';
import {
    RootState,
    scrollSelectors,
    scrollStates,
    ScrollTypes,
    selectors,
    TimelineActions,
    viewportSelectors,
} from '@demonstrators-social/shared';
import { useMergedRef } from '@huse/merged-ref';
import { Button, List, useTheme } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import useTranslation from 'next-translate/useTranslation';
import React, { Dispatch, FC, forwardRef, ForwardRefRenderFunction, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CommentEditor } from '../comment/CommentEditor';
import { PostProps } from '../post/Post';
import { handleCreatePost } from './Timeline.svc';
import TimelineHeader from './TimelineHeader';

interface TimelineProps {
  Comp: FC<PostProps>;
  timelineId: string;
  otherTimelineId?: string;
  // currentViewIndex?: number;
}

const Timeline: ForwardRefRenderFunction<HTMLDivElement, TimelineProps> = (
  { Comp, timelineId, otherTimelineId },
  // ref used for scroll restoration
  ref
) => {
  // Logs the component lifecycle.
  // console.log('-- rendering timeline');

  useEffect(() => {
    // The component is mounted only one time.
    console.log('---- mounting timeline');
    return () => {
      // The component is never unmounted during reparenting.
      console.log('------ unmounting timeline');
    };
  }, []);

  const { t } = useTranslation();

  const theme = useTheme();

  const { selectPostsOfFriends, selectPostsOfOwner, selectTimelineOwner } =
    selectors.timeline;

  const {
    timeline: { timelineViewState, refContainerScrollFromArcherState }
  } = scrollStates;

  const {
    post: { postIdsSelector },
    timeline: { refContainerScrollSelector }
  } = scrollSelectors;

  const {
    post: { viewportItemSelector }
  } = viewportSelectors;

  const timelineView = useRecoilValue(timelineViewState(timelineId));

  const {
    dispatch,
    state
  }: {
    dispatch: Dispatch<TimelineActions>;
    state: RootState;
  } = useHoux();

  const [displayEditor, setDisplayEditor] = useState(false);

  const setPostIds = useSetRecoilState(postIdsSelector(timelineId));

  const postIds =
    timelineView.activeTab === ScrollTypes.Timeline.View.TIMELINE
      ? selectPostsOfFriends(
          timelineId,
          CollectionUtil.Array.compareDescFn('content.createdAt')
        )(state)
      : selectPostsOfOwner(
          timelineId,
          CollectionUtil.Array.compareDescFn('content.createdAt')
        )(state);

  useEffect(() => {
    setPostIds(postIds);
  }, [postIds.length]);

  const refContainerScroll = useRecoilValue(
    refContainerScrollSelector(timelineId)
  );

  const refContainerScrollFromArcher = useRecoilValue(
    refContainerScrollFromArcherState(timelineId)
  );

  const combinedRef = useMergedRef([
    refContainerScroll,
    refContainerScrollFromArcher.refObserved
  ]);

  const setViewportItemState = useSetRecoilState(
    viewportItemSelector(timelineId)
  );

  useEffect(() => {
    setViewportItemState(_state => {
      return { viewportItem: {}, offsetTop: 0 };
    });
  }, [timelineView.activeTab]);

  // useScrollRestoration(currentViewIndex, timelineId);

  const [timelineHeaderMeasureRef, timelineHeaderSize] = HooksUtils.useResize();

  return (
    <div
      key={`timeline-${timelineId}`}
      ref={combinedRef}
      style={{
        position: 'relative',
        height: '100%',
        width: '100%'
      }}
    >
      <TimelineHeader timelineId={timelineId} ref={timelineHeaderMeasureRef} />

      <div
        key={`timeline-container-${timelineId}`}
        ref={ref}
        style={{
          position: 'absolute',
          top: `${timelineHeaderSize.height}px`,
          height: `calc(100% - ${timelineHeaderSize.height}px)`,
          bottom: '0px',
          width: '100%',
          overflowY: 'auto'
        }}
      >
        {timelineView.activeTab === ScrollTypes.Timeline.View.POSTS &&
          displayEditor && (
            <CommentEditor
              create={text => {
                const owner = selectTimelineOwner(timelineId)(state);
                handleCreatePost(owner, text, dispatch, _post => {
                  setDisplayEditor(false);
                });
              }}
              isComment={false}
              timelineId={timelineId}
            />
          )}

        {timelineView.activeTab === ScrollTypes.Timeline.View.POSTS &&
          !displayEditor && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Button
                id={`timeline-${timelineId}-content-create`}
                variant='text'
                color='primary'
                startIcon={<CreateIcon />}
                onClick={() => setDisplayEditor(true)}
                style={{
                  textTransform: 'none'
                }}
              >
                {t('pages/pidp/use-case/recognition/index:content_create')}
              </Button>
            </div>
          )}

        <List
          key={`timeline-${timelineId}-tab-${timelineView.activeTab}`}
          style={{
            paddingLeft: theme.spacing(0),
            paddingTop: theme.spacing(0),
            paddingBottom: theme.spacing(0)
          }}
        >
          {postIds.length > 0
            ? postIds.map((postId, _index) => {
                return (
                  <Comp
                    timelineId={timelineId}
                    otherTimelineId={otherTimelineId}
                    postId={postId}
                    key={`timeline-${timelineId}-post-${postId}`}
                  />
                );
              })
            : null}
        </List>
      </div>
    </div>
  );
};

export default forwardRef(Timeline);
