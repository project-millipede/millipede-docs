import { ContentTypes } from '@app/types';
import React, { FC, useState } from 'react';

import { useTimeout } from '../../hooks';
import FullScreenInterface from '../../interface/FullScreenInterfaceByComponent';

interface TopicsViewMobileProps {
  topics: Array<ContentTypes.OverviewProps>;
}

export const TopicsViewMobile: FC<TopicsViewMobileProps> = ({
  topics
}: {
  topics: Array<ContentTypes.OverviewProps>;
}) => {
  const [outerIndex, setOuterIndex] = useState(0);

  useTimeout(() => {
    if (topics.length - 1 > outerIndex) {
      setOuterIndex(outerIndex + 1);
      return;
    }
    setOuterIndex(0);
  }, 5000);

  return (
    <FullScreenInterface windowStackData={topics || []} index={outerIndex} />
  );
};
