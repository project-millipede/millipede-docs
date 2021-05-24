import { Portal } from '@app/components';
import { layoutState } from '@app/layout/src/recoil/features/layout/reducer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import dynamic from 'next/dynamic';
import React, { FC, useCallback } from 'react';
import { isMobile } from 'react-device-detect';
import { useRecoilState } from 'recoil';

const SwitchDrawer = dynamic(
  () => import('./drawer').then(module => module.SwitchDrawer),
  { ssr: false }
);

const AppToolBar = dynamic(
  () => import('./AppToolBar').then(module => module.AppToolBar),
  { ssr: false }
);

const AppToolBarMobile = dynamic(
  () => import('./AppToolBarMobile').then(module => module.AppToolBarMobile),
  { ssr: false }
);

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex'
    }
  })
);

export const AppFrame: FC = ({ children }) => {
  const classes = useStyles();

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
    <div className={classes.root}>
      <CssBaseline />

      {isMobile ? (
        <AppToolBarMobile
          isDrawerExpanded={isDrawerExpanded}
          handleDrawerOpen={handleDrawerOpen}
        />
      ) : (
        <AppToolBar
          isDrawerExpanded={isDrawerExpanded}
          handleDrawerOpen={handleDrawerOpen}
        />
      )}

      <SwitchDrawer
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        isDrawerExpanded={isDrawerExpanded}
      />

      <Portal.PortalOut portalType={Portal.PortalType.Cursor} />

      {children}
    </div>
  );
};
