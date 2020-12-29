import React, { FC } from 'react';
import { isMobile } from 'react-device-detect';

import { DesktopDrawer, MobileDrawer } from './drawer';

interface AppDrawerProps {
  isDrawerExpanded: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}

export const AppDrawerProxy: FC<AppDrawerProps> = ({
  isDrawerExpanded,
  handleDrawerOpen,
  handleDrawerClose
}) => {
  return isMobile ? (
    <MobileDrawer
      handleDrawerOpen={handleDrawerOpen}
      handleDrawerClose={handleDrawerClose}
      isDrawerExpanded={isDrawerExpanded}
    />
  ) : (
    <DesktopDrawer
      handleDrawerClose={handleDrawerClose}
      isDrawerExpanded={isDrawerExpanded}
    />
  );
};
