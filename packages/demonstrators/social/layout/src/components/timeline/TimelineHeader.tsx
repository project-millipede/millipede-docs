import { HeaderView } from '@demonstrators-social/components';
import { scrollStates, ScrollTypes } from '@demonstrators-social/shared';
import { Tab, Tabs } from '@material-ui/core';
import _ from 'lodash';
import React, { ChangeEvent, FC, useEffect } from 'react';
import { isBrowser } from 'react-device-detect';
import { useRecoilState } from 'recoil';

import { SimpleSearch } from '../search/SimpleSearch';

interface TimelineHeaderProps {
  timelineId: string;
}

export const TimelineHeader: FC<TimelineHeaderProps> = ({ timelineId }) => {
  const {
    timeline: { timelineViewState }
  } = scrollStates;

  const [timelineView, setTimelineView] = useRecoilState(timelineViewState);

  const handleChange = (
    _event: ChangeEvent,
    newValue: ScrollTypes.Timeline.VIEW
  ) => {
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

  useEffect(() => {
    setTimelineView(state => {
      return {
        ...state,
        currentViews: {
          ...state.currentViews,
          [timelineId]: ScrollTypes.Timeline.VIEW.TIMELINE
        }
      };
    });
  }, []);

  const { currentViews } = timelineView;
  const currentView = _.get(currentViews, timelineId);

  return (
    <>
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
        value={currentView || ScrollTypes.Timeline.VIEW.TIMELINE}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        variant='fullWidth'
        style={{
          marginTop: '8px'
        }}
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
            currentView === ScrollTypes.Timeline.VIEW.TIMELINE
              ? 'Search Timeline'
              : 'Search Post'
          }
        />
      </div>
    </>
  );
};
