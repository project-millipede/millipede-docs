import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton } from '@mui/material';
import React, { FC, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { playerLayoutState } from '../context/reducer';

// import { NavigationControl } from './controls';

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
    <IconButton size='small' onClick={handleBottomSheet}>
      {isPlayerExpanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
    </IconButton>
  );

  // return (
  //   <div
  //     style={{
  //       display: 'flex',
  //       flexDirection: 'column'
  //     }}
  //   >
  //     <div
  //       style={{
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'space-between',
  //         padding: '0 8px'
  //       }}
  //     >
  //       <NavigationControl />
  //       {expander && expander}
  //     </div>
  //   </div>
  // );
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '8px 8px'
      }}
    >
      {expander && expander}
    </div>
  );
};
