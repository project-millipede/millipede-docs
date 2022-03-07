import { Tabs } from '@app/components';
import { Components as RenderComponents } from '@app/render-utils';
import { features, Scroll } from '@demonstrators-social/shared';
import { DynamicFeed, GroupWork } from '@mui/icons-material';
import { Tab } from '@mui/material';
import React, { FC, SyntheticEvent, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { SimpleSearch } from '../search';

const {
  Responsive: { isMobile }
} = RenderComponents;

interface TimelineHeaderProps {
  timelineId: string;
}

export const TimelineHeader: FC<TimelineHeaderProps> = ({ timelineId }) => {
  const {
    scroll: {
      timeline: {
        states: { timelineViewState }
      }
    }
  } = features;

  const [{ activeTab }, setTimelineView] = useRecoilState(
    timelineViewState(timelineId)
  );

  const handleTabChange = useCallback(
    (_event: SyntheticEvent, newValue: Scroll.Timeline.TView) => {
      setTimelineView(state => {
        return {
          ...state,
          activeTab: newValue
        };
      });
    },
    []
  );

  return (
    <div
      key={`header-${timelineId}`}
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Tabs.StyledTabs
        value={activeTab}
        onChange={handleTabChange}
        variant='fullWidth'
        indicatorColor='primary'
        textColor='primary'
        sx={{
          margin: '8px'
        }}
      >
        <Tab
          value='Timeline'
          label='Timeline'
          icon={<DynamicFeed />}
          key={`timeline-${timelineId}-tab-timeline`}
          id={`timeline-${timelineId}-tab-timeline`}
        />
        <Tab
          value='Posts'
          label='Posts'
          icon={<GroupWork />}
          key={`timeline-${timelineId}-tab-posts`}
          id={`timeline-${timelineId}-tab-posts`}
        />
      </Tabs.StyledTabs>
      {!isMobile() ? (
        <SimpleSearch
          style={{ margin: '8px' }}
          placeholder={
            activeTab === Scroll.Timeline.View.Timeline
              ? 'Search Timeline'
              : 'Search Post'
          }
        />
      ) : null}
    </div>
  );
};
