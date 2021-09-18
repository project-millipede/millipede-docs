import { notificationStates } from '@demonstrators-social/shared';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import React, { FC } from 'react';
import { useSetRecoilState } from 'recoil';

interface HelpProps {
  message: string;
}

export const Help: FC<HelpProps> = ({ message }) => {
  const {
    notification: { snackbarState }
  } = notificationStates;

  const setSnackbar = useSetRecoilState(snackbarState);

  const handleClick = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setSnackbar(state => {
      return {
        ...state,
        isActive: true,
        message
      };
    });
  };

  return (
    <IconButton size='small' onClick={handleClick}>
      <HelpIcon />
    </IconButton>
  );
};
