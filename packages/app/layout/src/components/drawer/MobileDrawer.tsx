import { MAX_DRAWER_WIDTH } from '@app/layout/src/recoil/features/layout/reducer';
import { SwipeableDrawer } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React, { FC } from 'react';

import { DrawerProps } from '.';

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: theme.spacing(MAX_DRAWER_WIDTH),
    // Important:
    // Correct the layout shift among drawers, switching
    // from the mobile to the desktop variant and vice versa.
    // default - without border - add to override the default
    borderRight: `1px solid #000000`
  }
}));

export const MobileDrawer: FC<DrawerProps> = ({
  isDrawerExpanded,
  sx,
  handleDrawerOpen,
  handleDrawerClose,
  children
}) => {
  return (
    <StyledSwipeableDrawer
      variant='temporary'
      open={isDrawerExpanded}
      onOpen={handleDrawerOpen}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true
      }}
      sx={sx}
    >
      {children}
    </StyledSwipeableDrawer>
  );
};
