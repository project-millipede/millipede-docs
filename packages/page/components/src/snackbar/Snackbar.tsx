import { notificationStates } from '@demonstrators-social/shared';
import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import React, { FC, SyntheticEvent, useCallback } from 'react';
import { useRecoilState } from 'recoil';

export const Snackbar: FC = () => {
  const {
    notification: { snackbarState }
  } = notificationStates;

  const [{ message, isActive }, setSnackbar] = useRecoilState(snackbarState);

  const handleClose = useCallback(
    (_event: SyntheticEvent) =>
      setSnackbar(state => {
        return {
          ...state,
          isActive: false,
          message: null
        };
      }),
    [setSnackbar]
  );

  return (
    <MuiSnackbar open={isActive} onClose={handleClose} autoHideDuration={3000}>
      <Alert onClose={handleClose} severity={'info'}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};
