import MuiDrawer from '@material-ui/core/Drawer';
import { CSSObject, styled, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';

import { DrawerProps } from '.';
import { MAX_DRAWER_WIDTH, MIN_DRAWER_WIDTH } from '../../recoil/features/layout/reducer';

const openAnimation = (theme: Theme): CSSObject => ({
  width: MAX_DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  })
});

const closeAnimation = (theme: Theme): CSSObject => ({
  width: MIN_DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  })
});

const StyledDrawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: MAX_DRAWER_WIDTH,
  overflowY: 'hidden',
  whiteSpace: 'nowrap',
  ...(open && {
    ...openAnimation(theme),
    '& .MuiDrawer-paper': openAnimation(theme)
  }),
  ...(!open && {
    ...closeAnimation(theme),
    '& .MuiDrawer-paper': closeAnimation(theme)
  })
}));

export const DesktopDrawer: FC<DrawerProps> = ({
  isDrawerExpanded,
  children
}) => {
  return (
    <StyledDrawer variant='permanent' open={isDrawerExpanded}>
      {children}
    </StyledDrawer>
  );
};
