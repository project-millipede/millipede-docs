import { Tabs } from '@app/components';
import { Components as RenderComponents } from '@app/render-utils';
import { features, Scroll } from '@demonstrators-social/shared';
import { DynamicFeed, GroupWork } from '@mui/icons-material';
import { Tab } from '@mui/material';
import React, { ChangeEvent, FC, useMemo } from 'react';
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

  const [timelineView, setTimelineView] = useRecoilState(
    timelineViewState(timelineId)
  );

  const handleTabChange = (_event: ChangeEvent, newValue: number) => {
    let value: Scroll.Timeline.TView = Scroll.Timeline.View.TIMELINE;

    if (newValue === 0) value = Scroll.Timeline.View.TIMELINE;
    if (newValue === 1) value = Scroll.Timeline.View.POSTS;

    setTimelineView(state => {
      return {
        ...state,
        activeTab: value
      };
    });
  };

  const currentValue = useMemo(() => {
    if (timelineView.activeTab === Scroll.Timeline.View.TIMELINE) return 0;
    if (timelineView.activeTab === Scroll.Timeline.View.POSTS) return 1;
  }, [timelineView]);

  return (
    <div
      key={`header-${timelineId}`}
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Tabs.StyledTabs
        value={currentValue}
        onChange={handleTabChange}
        variant='fullWidth'
        indicatorColor='primary'
        textColor='primary'
        sx={{
          margin: '8px'
        }}
      >
        <Tab
          label='Timeline'
          icon={<DynamicFeed />}
          key={`timeline-${timelineId}-tab-timeline`}
          id={`timeline-${timelineId}-tab-timeline`}
        />
        <Tab
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
            timelineView.activeTab === Scroll.Timeline.View.TIMELINE
              ? 'Search Timeline'
              : 'Search Post'
          }
        />
      ) : null}
    </div>
  );
};
