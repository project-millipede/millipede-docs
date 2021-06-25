import { notificationStates } from '@demonstrators-social/shared';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
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
