import { IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { FC, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { playerLayoutState } from '../context/reducer';
import { NavigationControl } from './controls';

const height = 48;
const borderRadius = height / 2;

export const Player: FC = () => {
  const [{ isPlayerExpanded }, setPlayerLayoutState] =
    useRecoilState(playerLayoutState);

  const toggle = useCallback(
    () =>
      setPlayerLayoutState(state => {
        return {
          ...state,
          isPlayerExpanded: !state.isPlayerExpanded
        };
      }),
    [isPlayerExpanded, setPlayerLayoutState]
  );

  const handleBottomSheet = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    toggle();
  };

  const expander = (
    <IconButton size={'small'} onClick={handleBottomSheet}>
      {isPlayerExpanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
    </IconButton>
  );

  return (
    <Column style={{ borderRadius: borderRadius }}>
      <RowWide style={{ height: height }}>
        <NavigationControl />
        {expander && expander}
      </RowWide>
    </Column>
  );
};

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RowNarrow = styled.div`
  display: flex;
  padding: 0px 24px;
  align-items: center;
  justify-content: center;
`;

export const RowWide = styled.div`
  display: flex;
  padding: 0px 24px;
  align-items: center;
  justify-content: space-between;
`;
