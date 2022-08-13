import { SwipeableDrawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { FC, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { DrawerProps } from '.';
import { MAX_DRAWER_WIDTH } from '../../constants';
import { features } from '../../features';

export const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: theme.spacing(MAX_DRAWER_WIDTH),
    // Important:
    // Correct the layout shift among drawers, switching
    // from the mobile to the desktop variant and vice versa.
    // default - without border - add to override the default
    borderRight: `1px solid #000000`
  }
}));

export const MobileDrawer: FC<DrawerProps> = ({ sx, className, children }) => {
  const {
    layout: {
      states: { layoutState }
    }
  } = features;

  const [{ isDrawerExpanded }, setLayout] = useRecoilState(layoutState);

  const handleDrawerOpen = useCallback(() => {
    setLayout(state => {
      return {
        ...state,
        isDrawerExpanded: true
      };
    });
  }, []);

  const handleDrawerClose = useCallback(() => {
    setLayout(state => {
      return {
        ...state,
        isDrawerExpanded: false
      };
    });
  }, []);

  return (
    <StyledSwipeableDrawer
      variant='temporary'
      open={isDrawerExpanded}
      onOpen={handleDrawerOpen}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true,
        disableScrollLock: true,
        disablePortal: true
      }}
      className={className}
      sx={sx}
    >
      {children}
    </StyledSwipeableDrawer>
  );
};
