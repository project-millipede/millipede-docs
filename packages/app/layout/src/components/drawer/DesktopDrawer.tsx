import { Drawer } from '@mui/material';
import { CSSObject, styled, Theme } from '@mui/material/styles';
import { FC, ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

import { DrawerProps } from '.';
import { MAX_DRAWER_WIDTH, MIN_DRAWER_WIDTH } from '../../constants';
import { features } from '../../features';

const openAnimation = (theme: Theme): CSSObject => ({
  width: theme.spacing(MAX_DRAWER_WIDTH),
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  })
});

const closeAnimation = (theme: Theme): CSSObject => ({
  width: theme.spacing(MIN_DRAWER_WIDTH),
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  })
});

export const StyledDrawer = styled(Drawer)<DrawerProps>(({ theme, open }) => ({
  whiteSpace: 'nowrap',
  ...(open && {
    ...openAnimation(theme),
    '& .MuiDrawer-paper': {
      overflowX: 'hidden',
      ...openAnimation(theme)
    }
  }),
  ...(!open && {
    ...closeAnimation(theme),
    '& .MuiDrawer-paper': {
      overflowX: 'hidden',
      ...closeAnimation(theme)
    }
  })
}));

export const DesktopDrawer: FC<
  DrawerProps & {
    children: ReactNode;
  }
> = ({ sx, className, children }) => {
  const {
    layout: {
      states: { layoutState }
    }
  } = features;

  const { isDrawerExpanded } = useRecoilValue(layoutState);

  return (
    <StyledDrawer
      variant='permanent'
      open={isDrawerExpanded}
      sx={sx}
      className={className}
    >
      {children}
    </StyledDrawer>
  );
};
