import { viewportSelectors } from '@demonstrators-social/shared';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const useScrollRestoration = (
  currentViewIndex: number,
  timelineId: string
) => {
  const {
    post: { viewportItemSelector }
  } = viewportSelectors;

  const { viewportItem } = useRecoilValue(viewportItemSelector(timelineId));

  const setViewportItemState = useSetRecoilState(
    viewportItemSelector(timelineId)
  );

  useEffect(() => {
    if (!viewportItem) return;

    const viewportIntersectingList = Object.values(viewportItem);

    if (currentViewIndex === 2 && viewportIntersectingList.length > 0) {
      const [observedTopItem] = viewportIntersectingList;
      setViewportItemState(state => {
        return {
          ...state,
          offsetTop: observedTopItem.offsetTop
        };
      });
    }
  }, [viewportItem]);

  return null;
};
