import React, { FC, useState } from 'react';

import { OverviewProps } from '../../../typings/data/import';
import { useTimeout } from '../../hooks';
import FullScreenInterface from '../../interface/FullScreenInterfaceByComponent';

interface TopicsViewMobileProps {
  topics: Array<OverviewProps>;
}

export const TopicsViewMobile: FC<TopicsViewMobileProps> = ({
  topics
}: {
  topics: Array<OverviewProps>;
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
