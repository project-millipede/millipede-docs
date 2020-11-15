import { useHoux } from '@houx';
import { useMergedRef } from '@huse/merged-ref';
import { Button, ButtonGroup, List, makeStyles, Tab, Tabs, useTheme } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import _ from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import React, { ChangeEvent, Dispatch, FC, useEffect, useState } from 'react';
import { isBrowser } from 'react-device-detect';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { postIdsState } from '../../../../docs/src/modules/recoil/features/scroll/post/reducer';
import {
  addTopic,
  createNodesWithRelations,
  nodesWithRelationsWithEdgeState,
  publishActions,
  publishActions2,
  refContainerScrollFromArcherState,
  refContainerScrollState,
  timelineViewState,
  VIEW,
} from '../../../../docs/src/modules/recoil/features/scroll/timeline/reducer';
import { TimelineActions } from '../../../../docs/src/modules/redux/features/actionType';
import {
  selectPostsOfFriends,
  selectPostsOfOwner,
  selectTimelineOwner,
} from '../../../../docs/src/modules/redux/features/timeline/selector';
import { RootState } from '../../../../docs/src/modules/redux/reducers';
import { compareDescFn } from '../../../../docs/src/modules/utils/collection/array';
import HeaderView from '../../../components/device/browser/views/HeaderView';
import { CommentEditor } from './CommentEditor';
import { PostProps } from './Post';
import SimpleSearch from './SimpleSearch';
import { handleCreatePost } from './Timeline.svc';

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

  const [timelineView, setTimelineView] = useRecoilState(timelineViewState);

  const handleChange = (_event: ChangeEvent, newValue: VIEW) => {
    setTimelineView(state => {
      return {
        ...state,
        currentViews: {
          ...state.currentViews,
          [timelineId]: newValue
        }
      };
    });
  };

  const { currentViews } = timelineView;
  const currentView = _.get(currentViews, timelineId);

  const {
    dispatch,
    state
  }: {
    dispatch: Dispatch<TimelineActions>;
    state: RootState;
  } = useHoux();

  const [displayEditor, setDisplayEditor] = useState(false);

  const setPostIds = useSetRecoilState(postIdsState(timelineId));

  // Working include again
  const otherPostIds = useRecoilValue(postIdsState(otherTimelineId));

  const postIds =
    currentView === VIEW.TIMELINE
      ? selectPostsOfFriends(
          timelineId,
          compareDescFn('content.createdAt')
        )(state)
      : selectPostsOfOwner(
          timelineId,
          compareDescFn('content.createdAt')
        )(state);

  useEffect(() => {
    setPostIds(postIds);
  }, [postIds.length]);

  useEffect(() => {
    setTimelineView(state => {
      return {
        ...state,
        currentViews: {
          ...state.currentViews,
          [timelineId]: VIEW.TIMELINE
        }
      };
    });
  }, []);

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

  // Working include again
  const setNodesWithRelationsWithEdge = useSetRecoilState(
    nodesWithRelationsWithEdgeState
  );

  return (
    <div className={classes.root} ref={combinedRef}>
      {isBrowser ? (
        <div
          style={{
            marginTop: '8px'
          }}
        >
          <HeaderView />
        </div>
      ) : null}
      <Tabs
        value={currentView || VIEW.TIMELINE}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        variant='fullWidth'
      >
        <Tab label='Timeline' id={`timeline-${timelineId}-tab-timeline`} />
        <Tab label='Posts' id={`timeline-${timelineId}-tab-posts`} />
      </Tabs>
      <div
        style={{
          marginTop: '8px'
        }}
      >
        <SimpleSearch
          placeholder={
            currentView === VIEW.TIMELINE ? 'Search Timeline' : 'Search Post'
          }
        />
      </div>

      <div
        key={`timeline-${timelineId}`}
        style={{ overflowY: 'auto', height: '65vh', marginTop: '8px' }}
      >
        {currentView === VIEW.POSTS && displayEditor && (
          <CommentEditor
            create={text => {
              const owner = selectTimelineOwner(timelineId)(state);
              handleCreatePost(owner, text, dispatch, post => {
                // Working include again - start
                const publishActionsExtended = addTopic(
                  publishActions,
                  'publish',
                  'pages/pidp/use-case/recognition/index:'
                );

                const publishNodesWithRelations = createNodesWithRelations(
                  publishActionsExtended,
                  t
                )([timelineId, otherTimelineId], post.id, ['content', 'media']);

                const publishActionsExtended2 = addTopic(
                  publishActions2,
                  'publish',
                  'pages/pidp/use-case/recognition/index:'
                );

                const publishNodesWithRelationsMore = createNodesWithRelations(
                  publishActionsExtended2,
                  t,
                  false
                )(
                  [otherTimelineId, timelineId],

                  // post.id,
                  [otherPostIds[1], post.id],

                  ['content', 'comments']
                );
                // Working include again - end

                // Multiple nodesWithRelations elements
                setNodesWithRelationsWithEdge(state => {
                  return {
                    ...state,
                    nodesWithRelations: {
                      ...state.nodesWithRelations,
                      [post.id]: {
                        values: [
                          publishNodesWithRelations,
                          publishNodesWithRelationsMore
                        ],
                        id: 'Post Id',
                        description: 'Post Description'
                      }
                    },
                    activeId: post.id
                  };
                });
                setDisplayEditor(false);
              });
            }}
            isComment={false}
            timelineId={timelineId}
          />
        )}

        {currentView === VIEW.POSTS && !displayEditor && (
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
