import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton } from '@mui/material';
import React, { FC, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { playerLayoutState } from '../features/layout/states';

export const Toggle: FC = () => {
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
    <IconButton size='small' onClick={handleBottomSheet}>
      {isPlayerExpanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
    </IconButton>
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: '8px 16px'
      }}
    >
      {expander}
    </div>
  );
};
