import { useHoux } from '@app/houx';
import { CollectionUtil } from '@app/utils';
import {
  RootState,
  scrollStates,
  ScrollTypes,
  selectors,
  TimelineActions
} from '@demonstrators-social/shared';
import { useMergedRef } from '@huse/merged-ref';
import {
  Button,
  ButtonGroup,
  List,
  makeStyles,
  useTheme
} from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import get from 'lodash/get';
import useTranslation from 'next-translate/useTranslation';
import React, { Dispatch, FC, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CommentEditor } from '../comment/CommentEditor';
import { PostProps } from '../post/Post';
import { handleCreatePost } from './Timeline.svc';
import { TimelineHeader } from './TimelineHeader';

interface TimelineProps {
  Comp: FC<PostProps>;
  timelineId: string;
  otherTimelineId?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '30vw',
    overflowY: 'auto',
    padding: theme.spacing(1)
  }
}));

export const Timeline: FC<TimelineProps> = ({
  Comp,
  timelineId,
  otherTimelineId
}) => {
  const { t } = useTranslation();

  const classes = useStyles();
  const theme = useTheme();

  const {
    selectPostsOfFriends,
    selectPostsOfOwner,
    selectTimelineOwner
  } = selectors.timeline;

  const {
    timeline: {
      timelineViewState,
      refContainerScrollState,
      refContainerScrollFromArcherState
    },
    post: { postIdsState }
  } = scrollStates;

  const timelineView = useRecoilValue(timelineViewState);

  const { currentViews } = timelineView;
  const currentView = get(currentViews, timelineId);

  const {
    dispatch,
    state
  }: {
    dispatch: Dispatch<TimelineActions>;
    state: RootState;
  } = useHoux();

  const [displayEditor, setDisplayEditor] = useState(false);

  const setPostIds = useSetRecoilState(postIdsState(timelineId));

  const postIds =
    currentView === ScrollTypes.Timeline.VIEW.TIMELINE
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
    refContainerScrollState(timelineId)
  );

  const refContainerScrollFromArcher = useRecoilValue(
    refContainerScrollFromArcherState(timelineId)
  );

  const combinedRef = useMergedRef([
    refContainerScroll.refObserved,
    refContainerScrollFromArcher.refObserved
  ]);

  return (
    <div className={classes.root} ref={combinedRef}>
      <TimelineHeader timelineId={timelineId} />

      <div
        key={`timeline-${timelineId}`}
        style={{ overflowY: 'auto', height: '65vh', marginTop: '8px' }}
      >
        {currentView === ScrollTypes.Timeline.VIEW.POSTS && displayEditor && (
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

        {currentView === ScrollTypes.Timeline.VIEW.POSTS && !displayEditor && (
          <ButtonGroup variant='text' color='primary' style={{ width: '100%' }}>
            <Button
              id={`timeline-${timelineId}-content-create`}
              variant='text'
              color='primary'
              startIcon={<ChatBubbleOutlineIcon />}
              onClick={() => setDisplayEditor(true)}
              style={{ margin: 'auto' }}
            >
              {t('pages/pidp/use-case/recognition/index:content_create')}
            </Button>
          </ButtonGroup>
        )}
        <List
          key={`timeline-${timelineId}`}
          style={{
            paddingTop: theme.spacing(0),
            paddingLeft: theme.spacing(0),
            paddingBottom: theme.spacing(0),
            marginBottom: theme.spacing(0)
          }}
        >
          {postIds.length > 0
            ? postIds.map(postId => {
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
