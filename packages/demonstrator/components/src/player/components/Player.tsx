import { INPUT_BORDER_RADIUS, INPUT_HEIGHT } from '@app/layout/src/recoil/features/layout/reducer';
import { IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { FC, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { playerLayoutState } from '../context/reducer';
import { NavigationControl } from './controls';

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
    <Column style={{ borderRadius: INPUT_BORDER_RADIUS }}>
      <Row style={{ height: INPUT_HEIGHT }}>
        <NavigationControl />
        {expander && expander}
      </Row>
    </Column>
  );
};

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  padding: 0px 8px;
  align-items: center;
  justify-content: space-between;
`;
