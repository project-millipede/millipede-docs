import { HooksUtils } from '@app/render-utils';
import { features, Scroll } from '@demonstrators-social/shared';
import CreateIcon from '@mui/icons-material/Create';
import { Button, List } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, forwardRef, ForwardRefRenderFunction, useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ContentEditor } from '../comment/ContentEditor';
import { PostProps } from '../post/Post';
import { handleCreatePost } from './Timeline.svc';
import { TimelineHeader } from './TimelineHeader';

interface TimelineProps {
  Comp: FC<PostProps>;
  timelineId: string;
  otherTimelineId?: string;
  // currentViewIndex?: number;
}

const Timeline: ForwardRefRenderFunction<HTMLDivElement, TimelineProps> = (
  { Comp, timelineId, otherTimelineId },
  ref // used for scroll restoration
) => {
  const {
    scroll: {
      timeline: {
        selector: { refContainerScrollSelector },
        states: { timelineViewState }
      }
    },
    timeline: {
      states: { timelineState },
      selector: { timelineOfOwnerSelector, postIdsSelector }
    },
    viewport: {
      selector: {
        // viewportItemSelector,
        viewportNextItemSelector
      }
    }
  } = features;

  // Logs the component lifecycle.
  // console.log('-- rendering timeline', timelineId);

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

  const timelineView = useRecoilValue(timelineViewState(timelineId));

  const setTimeline = useSetRecoilState(timelineState);

  const [displayEditor, setDisplayEditor] = useState(false);

  const postIds = useRecoilValue(postIdsSelector(timelineId));

  const refContainerScroll = useRecoilValue(
    refContainerScrollSelector(timelineId)
  );

  // Scroll-restoration V1
  // const setViewportItemState = useSetRecoilState(
  //   viewportItemSelector(timelineId)
  // );
  // useEffect(() => {
  //   setViewportItemState(_state => {
  //     return { viewportItem: {}, offsetTop: 0 };
  //   });
  // }, [timelineView.activeTab]);

  // Scroll-restoration V2 - TODO: Document necessary steps
  const setViewportItemState = useSetRecoilState(
    viewportNextItemSelector(timelineId)
  );

  useEffect(() => {
    setViewportItemState(_state => {
      return { viewportItem: null };
    });
  }, [timelineView.activeTab]);

  // useScrollRestoration(currentViewIndex, timelineId);

  const [timelineHeaderMeasureRef, timelineHeaderSize] = HooksUtils.useResize();

  const owner = useRecoilValue(timelineOfOwnerSelector(timelineId));

  const createPost = useCallback(
    (text: string) => {
      handleCreatePost(owner, text, setTimeline, () => {
        setDisplayEditor(false);
      });
    },
    [owner.id]
  );

  return (
    <div
      key={`timeline-${timelineId}`}
      ref={refContainerScroll}
      style={{
        position: 'relative',
        height: '100%',
        width: '100%'
      }}
    >
      <div ref={timelineHeaderMeasureRef}>
        <TimelineHeader timelineId={timelineId} />

        {timelineView.activeTab === Scroll.Timeline.View.POSTS &&
          displayEditor && (
            <ContentEditor
              create={createPost}
              isComment={false}
              timelineId={timelineId}
            />
          )}

        {timelineView.activeTab === Scroll.Timeline.View.POSTS &&
          !displayEditor && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '8px'
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
      </div>

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
        <List
          key={`timeline-${timelineId}-tab-${timelineView.activeTab}`}
          style={{
            paddingLeft: theme.spacing(0),
            paddingTop: theme.spacing(0),
            paddingBottom: theme.spacing(0)
          }}
        >
          {postIds.map(postId => {
            return (
              <Comp
                key={`timeline-${timelineId}-post-${postId}`}
                timelineId={timelineId}
                otherTimelineId={otherTimelineId}
                postId={postId}
              />
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default forwardRef(Timeline);
