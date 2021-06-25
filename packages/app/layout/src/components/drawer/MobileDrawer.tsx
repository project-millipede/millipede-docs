import { MAX_DRAWER_WIDTH } from '@app/layout/src/recoil/features/layout/reducer';
import { SwipeableDrawer as MuiSwipeableDrawer } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React, { FC } from 'react';

import { DrawerProps } from '.';

const SwipeableDrawer = styled(MuiSwipeableDrawer)(({ theme, open }) => ({
  ...(open && {
    '& .MuiDrawer-paper': {
      width: theme.spacing(MAX_DRAWER_WIDTH),
      // Important:
      // Correct the layout shift among supported drawers switching
      // from the mobile to the desktop variant and vice versa.
      borderRight: `1px solid #000000`
      // The palette divider theme corresponds to the border-right
      // style applied in the desktop drawer variant
      // borderRight: `1px solid ${theme.palette.divider}`,
    }
  })
}));

export const MobileDrawer: FC<DrawerProps> = ({
  isDrawerExpanded,
  handleDrawerClose,
  children
}) => {
  return (
    <SwipeableDrawer
      variant='temporary'
      open={isDrawerExpanded}
      onOpen={() => {}}
      onClose={() => {}}
      onBackdropClick={handleDrawerClose}
      ModalProps={{
        keepMounted: true
      }}
    >
      {children}
    </SwipeableDrawer>
  );
};
