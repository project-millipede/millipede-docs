import React, { FC } from 'react';
import styled from 'styled-components';

import { OverviewProps } from '../../../typings/data/import';
import Window from '../windowByComponent';

const Container = styled('div')`
  height: 100%;
  width: 100%;
`;

export interface FullScreenInterfaceProps {
  windowStackData?: Array<OverviewProps>;
  index?: number;
}

const FullScreenInterface: FC<FullScreenInterfaceProps> = ({
  windowStackData,
  index
}) => {
  return (
    <Container>
      <Window
        key={`window-${windowStackData ? windowStackData.length : 0}-${index}`}
        windowStackData={windowStackData}
        index={index}
      />
    </Container>
  );
};

export default FullScreenInterface;
