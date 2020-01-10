import { Button, ButtonGroup } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { useHoux } from 'houx';
import React, { FC, useRef } from 'react';

import { RootState } from '../../../../docs/src/modules/redux/reducers';
import { useTranslation } from '../../../../i18n';
import CommentEditor from './CommentEditor';
import { PostProps } from './Post';
import Search from './Search';
import { handleCreatePost } from './Timeline.svc';

import { TimelineActions } from '../../../../docs/src/modules/redux/features/actionType';

interface TimelineProps {
  Comp: React.FC<PostProps>;
  timelineId?: number;
}

const ns = 'pages/pidp/use-case/recognition/index';

const Timeline: FC<TimelineProps> = ({ Comp, timelineId }) => {
  const [displayEditor, setDisplayEditor] = React.useState(false);

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
    dispatch: React.Dispatch<TimelineActions>;
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
      <Search />
      {displayEditor ? (
        <CommentEditor
          create={text =>
            handleCreatePost(timelineId, text, entities, dispatch, () => {
              setDisplayEditor(false);
            })
          }
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
            return <Comp timelineId={timelineId} postId={postId} />;
          })
        : null}
    </div>
  );
};

export default Timeline;
