import { useHoux } from 'houx';
import React, { useCallback, useEffect } from 'react';

import { ViewOptions } from '..';
import { TimelineActions } from '../../../../../docs/src/modules/redux/features/actionType';
import { normalizeData } from '../../../../../docs/src/modules/redux/features/timeline/actions';
import { RootState } from '../../../../../docs/src/modules/redux/reducers';
import Post from '../../../../demo/social/components/Post';
import Timeline from '../../../../demo/social/components/Timeline';
import { useMenuHideWindow } from '../../../hooks';

const TimelineView = () => {
  useMenuHideWindow(ViewOptions.music.id);

  const {
    state: {
      //   animation: { szenario, device, area },
      timeline: {
        entities: { usecases },
        result
      }
    },
    dispatch
  }: {
    state: RootState;
    dispatch: React.Dispatch<TimelineActions>;
  } = useHoux();

  const loadPosts = useCallback(() => {
    dispatch(normalizeData());
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      loadPosts();
    };
    loadContent();
  }, []);

  return (
    <Timeline
      timelineId={usecases && result ? usecases[result].timelines[0] : 0}
      Comp={Post}
    />
  );
};

export default TimelineView;
