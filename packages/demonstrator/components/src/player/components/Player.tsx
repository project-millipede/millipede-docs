import { Divider } from '@material-ui/core';
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { Step } from '../types';
import { NavigationControl } from './controls';
import { ProgressControl, TextProgressControl } from './progress';

interface PlayerProps {
  steps: Array<Step>;
  isPlayerOpen: boolean;
  expander: ReactNode;
}

const height = 48;
const borderRadius = height / 2;

export const Player: FC<PlayerProps> = ({ steps, expander, isPlayerOpen }) => {
  return (
    <ColumnProgress borderRadius={borderRadius}>
      {isPlayerOpen ? (
        <>
          <Divider variant={'middle'} />
          <RowProgressNarrow height={height}>
            <ProgressControl steps={steps} />
            <TextProgressControl steps={steps} />
          </RowProgressNarrow>
        </>
      ) : null}
      <RowProgress height={height}>
        <NavigationControl />
        {expander && expander}
      </RowProgress>
    </ColumnProgress>
  );
};

interface ColumnProgressProps {
  borderRadius: number;
}

const ColumnProgress = styled.div<ColumnProgressProps>`
  display: flex;
  flex-direction: column;
  background-color: '#f1f3f4';
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
`;

interface RowProgressProps {
  height?: number | string;
}

const RowProgressNarrow = styled.div<RowProgressProps>`
  display: flex;
  padding: 0px 24px;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => `${height}px`};
`;

const RowProgress = styled.div<RowProgressProps>`
  display: flex;
  padding: 0px 24px;
  align-items: center;
  justify-content: space-between;
  height: ${({ height }) => `${height}px`};
`;
