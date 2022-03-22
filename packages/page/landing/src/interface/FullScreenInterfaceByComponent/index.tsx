import { ContentTypes } from '@app/types';
import { FC } from 'react';

import Window from '../windowByComponent';

export interface FullScreenInterfaceProps {
  windowStackData?: Array<ContentTypes.OverviewProps>;
  index?: number;
}

export const FullScreenInterface: FC<FullScreenInterfaceProps> = ({
  windowStackData,
  index
}) => {
  return (
    <Window
      key={`window-${windowStackData ? windowStackData.length : 0}-${index}`}
      windowStackData={windowStackData}
      index={index}
    />
  );
};
