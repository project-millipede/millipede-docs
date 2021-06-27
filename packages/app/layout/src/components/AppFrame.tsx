import { Portal } from '@app/components';
import { layoutState } from '@app/layout/src/recoil/features/layout/reducer';
import { Container } from '@material-ui/core';
import React, { FC, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { SwitchDrawer } from './drawer';
import { SwitchAppToolBar } from './toolbar';

export const AppFrame: FC = ({ children }) => {
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
    <Container sx={{ display: 'flex' }}>
      <SwitchAppToolBar
        isDrawerExpanded={isDrawerExpanded}
        handleDrawerOpen={handleDrawerOpen}
      />

      <SwitchDrawer
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        isDrawerExpanded={isDrawerExpanded}
      />

      <Portal.PortalOut portalType={Portal.PortalType.Cursor} />

      {children}
    </Container>
  );
};
