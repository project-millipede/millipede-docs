import { viewportSelectors } from '@demonstrators-social/shared';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const useScrollRestoration = (
  currentViewIndex: number,
  timelineId: string,
  _heights: number
): [MutableRefObject<HTMLDivElement>, number] => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    post: { viewportItemSelector }
  } = viewportSelectors;

  const { viewportItem } = useRecoilValue(viewportItemSelector(timelineId));

  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    if (!viewportItem) return;

    const viewportIntersectingList = Object.values(viewportItem);

    if (currentViewIndex === 2 && viewportIntersectingList.length > 0) {
      const [observedTopItem] = viewportIntersectingList;
      setOffsetTop(_state => observedTopItem.offsetTop);
    }
  }, [viewportItem]);

  // do scroll restoration in layout effect, when no annimation is involved
  // useLayoutEffect(() => {
  //   if (!containerRef) return;

  //   const scrollArea = containerRef.current;

  //   scrollArea.scroll(0, offsetTop + heights - 8 - scrollArea.offsetTop);
  //   // scrollArea.scrollTop = offsetTop + heights - scrollArea.offsetTop;
  // }, [currentViewIndex]);

  return [containerRef, offsetTop];
};
