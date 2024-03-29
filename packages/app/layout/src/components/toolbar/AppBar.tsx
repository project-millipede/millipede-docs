import { HiddenUnderlineLink } from '@app/components';
import { GitHub, Menu } from '@mui/icons-material';
import { AppBar as MuiAppBar, IconButton, Toolbar as MuiToolbar } from '@mui/material';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { CSSObject, styled, Theme } from '@mui/material/styles';
import React, { FC, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { MAX_DRAWER_WIDTH, TOOLBAR_HEIGHT } from '../../constants';
import { features } from '../../features';
import { HideOnScroll } from './HideOnScroll';
import { LanguageMenu } from './LanguageMenu';

export const GrowingDiv = styled('div')({
  flex: '1 1 auto'
});

export const openAnimation = (theme: Theme): CSSObject => ({
  width: `calc(100% - ${theme.spacing(MAX_DRAWER_WIDTH)})`,
  transition: theme.transitions.create(['width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  })
});

export const closeAnimation = (theme: Theme): CSSObject => ({
  width: '100%',
  transition: theme.transitions.create(['width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  })
});

interface StyledAppBarProps extends MuiAppBarProps {
  isDrawerExpanded?: boolean;
}

export const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'isDrawerExpanded'
})<StyledAppBarProps>(({ theme, isDrawerExpanded }) => {
  return {
    position: 'fixed',
    height: theme.spacing(TOOLBAR_HEIGHT),
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('md')]: {
      zIndex: theme.zIndex.drawer + 1,
      ...(isDrawerExpanded && openAnimation(theme)),
      ...(!isDrawerExpanded && closeAnimation(theme))
    }
  };
});

export const AppBar: FC = () => {
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

  const toolBar = (
    <MuiToolbar disableGutters sx={{ minHeight: 64 }}>
      <IconButton
        color='inherit'
        onClick={isDrawerExpanded ? handleDrawerClose : handleDrawerOpen}
        sx={{
          display: isDrawerExpanded && 'none'
        }}
      >
        <Menu />
      </IconButton>
      <GrowingDiv />
      <LanguageMenu />
      <IconButton
        component={HiddenUnderlineLink}
        color='inherit'
        href='https://github.com/project-millipede/millipede-docs'
      >
        <GitHub />
      </IconButton>
    </MuiToolbar>
  );

  return (
    <HideOnScroll>
      <StyledAppBar isDrawerExpanded={isDrawerExpanded}>{toolBar}</StyledAppBar>
    </HideOnScroll>
  );
};
