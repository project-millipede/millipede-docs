import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton } from '@mui/material';
import React, { FC, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { playerLayoutState } from '../features/layout/states';

export const Toggle: FC = () => {
  const [{ isPlayerExpanded }, setPlayerLayoutState] =
    useRecoilState(playerLayoutState);

  const toggleBottomSheet = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setPlayerLayoutState(state => {
        return {
          ...state,
          isPlayerExpanded: !state.isPlayerExpanded
        };
      });
    },
    []
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
      <IconButton size='small' onClick={toggleBottomSheet}>
        {isPlayerExpanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </IconButton>
    </div>
  );
};
