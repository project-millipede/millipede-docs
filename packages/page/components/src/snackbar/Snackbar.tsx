import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import React, { FC, SyntheticEvent, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { features } from '../features';

export const Snackbar: FC = () => {
  const {
    notification: {
      states: { notificationState }
    }
  } = features;

  const [{ message, isActive }, setNotification] =
    useRecoilState(notificationState);

  const handleClose = useCallback(
    (_event: SyntheticEvent) =>
      setNotification(state => {
        return {
          ...state,
          isActive: false,
          message: null
        };
      }),
    [setNotification]
  );

  return (
    <MuiSnackbar open={isActive} onClose={handleClose} autoHideDuration={3000}>
      <Alert onClose={handleClose} severity='info'>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};
