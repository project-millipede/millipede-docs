import { Components } from '@app/render-utils';
import { scrollStates, ScrollTypes } from '@demonstrators-social/shared';
import { createStyles, makeStyles, Tab, Tabs, Theme } from '@material-ui/core';
import { DynamicFeed, GroupWork } from '@material-ui/icons';
import React, { ChangeEvent, forwardRef, ForwardRefRenderFunction, useMemo } from 'react';
import { useRecoilState } from 'recoil';

import { SimpleSearch } from '../search';

const {
  Responsive: { isMobile }
} = Components;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      '& .MuiTabs-flexContainer': {
        flexWrap: 'wrap'
      },
      '& .MuiTab-root': {
        '&.MuiTab-labelIcon': {
          minHeight: theme.spacing(6),
          '& .MuiTab-wrapper > *:first-child': {
            marginBottom: 0
          }
        },
        '& .MuiTab-wrapper': {
          flexDirection: 'row',
          '& > *:first-child': {
            marginRight: theme.spacing(1)
          }
        }
      }
    }
  })
);

interface TimelineHeaderProps {
  timelineId?: string;
}

const TimelineHeader: ForwardRefRenderFunction<
  HTMLDivElement,
  TimelineHeaderProps
> = ({ timelineId }, ref) => {
  const classes = useStyles();

  const {
    timeline: { timelineViewState }
  } = scrollStates;

  const [timelineView, setTimelineView] = useRecoilState(
    timelineViewState(timelineId)
  );

  const handleTabChange = (_event: ChangeEvent, newValue: number) => {
    let value: ScrollTypes.Timeline.TView = ScrollTypes.Timeline.View.TIMELINE;

    if (newValue === 0) value = ScrollTypes.Timeline.View.TIMELINE;
    if (newValue === 1) value = ScrollTypes.Timeline.View.POSTS;

    setTimelineView(state => {
      return {
        ...state,
        activeTab: value
      };
    });
  };

  const currentValue = useMemo(() => {
    if (timelineView.activeTab === ScrollTypes.Timeline.View.TIMELINE) return 0;
    if (timelineView.activeTab === ScrollTypes.Timeline.View.POSTS) return 1;
  }, [timelineView]);

  // TODO: Convert to Stack

  return (
    <div
      key={`header-${timelineId}`}
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Tabs
        value={currentValue}
        onChange={handleTabChange}
        variant='fullWidth'
        indicatorColor='primary'
        textColor='primary'
        style={{
          margin: '8px'
        }}
        className={classes.tabs}
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
      </Tabs>

      {!isMobile() ? (
        <SimpleSearch
          style={{ margin: '8px' }}
          placeholder={
            timelineView.activeTab === ScrollTypes.Timeline.View.TIMELINE
              ? 'Search Timeline'
              : 'Search Post'
          }
        />
      ) : null}
    </div>
  );
};

export default forwardRef(TimelineHeader);
