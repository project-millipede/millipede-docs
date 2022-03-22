import { SwipeableDrawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC } from 'react';

import { DrawerProps } from '.';
import { MAX_DRAWER_WIDTH } from '../../constants';

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
  handleDrawerOpen,
  handleDrawerClose,
  sx,
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
