import { Button, ButtonGroup } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { useHoux } from 'houx';
import React, { Dispatch, FC, useRef, useState } from 'react';

import { TimelineActions } from '../../../../docs/src/modules/redux/features/actionType';
import { RootState } from '../../../../docs/src/modules/redux/reducers';
import { useTranslation } from '../../../../i18n';
import { HeaderView } from '../../../components/device/browser/views';
import CommentEditor from './CommentEditor';
import { PostProps } from './Post';
import SimpleSearch from './SimpleSearch';
import { handleCreatePost } from './Timeline.svc';

// import Search from './Search';
interface TimelineProps {
  Comp: FC<PostProps>;
  timelineId?: number;
}

const ns = 'pages/pidp/use-case/recognition/index';

const Timeline: FC<TimelineProps> = ({ Comp, timelineId }) => {
  const [displayEditor, setDisplayEditor] = useState(false);

  const { t } = useTranslation(ns);

  const {
    dispatch,
    state: {
      timeline: {
        entities,
        entities: { timelines }
      }
    }
  }: {
    dispatch: Dispatch<TimelineActions>;
    state: RootState;
  } = useHoux();

  const containerRef = useRef<HTMLDivElement>(null);

  let postIds: Array<number> = [];

  if (timelines[timelineId]) {
    postIds = timelines[timelineId].posts;
  }

  return (
    <div
      key={`timeline-${timelineId}`}
      ref={containerRef}
      style={{
        width: '100%',
        maxHeight: '800px',
        overflowY: 'auto'
      }}
    >
      <HeaderView />
      {/* <Search /> */}
      <SimpleSearch />
      {displayEditor ? (
        <CommentEditor
          create={text => {
            Object.keys(timelines)
              .filter(
                currentTimelineId =>
                  ((currentTimelineId as unknown) as number) !== timelineId
              )
              .forEach(timelineIdTarget => {
                handleCreatePost(
                  timelineId,
                  (timelineIdTarget as unknown) as number,
                  text,
                  entities,
                  dispatch,
                  () => {
                    setDisplayEditor(false);
                  }
                );
              });
          }}
          isComment={false}
        />
      ) : (
        <ButtonGroup
          variant='text'
          color='primary'
          aria-label='outlined primary button group'
          style={{ width: '100%' }}
        >
          <Button
            variant='text'
            color='primary'
            startIcon={<ChatBubbleOutlineIcon />}
            onClick={() => setDisplayEditor(!displayEditor)}
            aria-label={t('content_create')}
            style={{ margin: 'auto' }}
          >
            {t('content_create')}
          </Button>
        </ButtonGroup>
      )}
      {postIds.length > 0
        ? postIds.map(postId => {
            return (
              <Comp
                timelineId={timelineId}
                postId={postId}
                key={`timeline-${timelineId}-post-${postId}`}
              />
            );
          })
        : null}
    </div>
  );
};

export default Timeline;
