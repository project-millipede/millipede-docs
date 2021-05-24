import React, { FC } from 'react';
import { isMobile } from 'react-device-detect';
import { useRecoilValue } from 'recoil';

import { DesktopDrawer, DrawerProps, MobileDrawer } from '.';
import { navigationState } from '../../recoil/features/pages/reducer';
import { Tree } from '../tree';

export const SwitchDrawer: FC<DrawerProps> = ({
  isDrawerExpanded,
  handleDrawerOpen,
  handleDrawerClose
}) => {
  const navigation = useRecoilValue(navigationState);

  const { pages, flattenedPages, activePage } = navigation;

  const treeComp = (
    <Tree
      pages={pages}
      flattenedPages={flattenedPages}
      activePage={activePage}
    />
  );

  return isMobile ? (
    <MobileDrawer
      handleDrawerOpen={handleDrawerOpen}
      handleDrawerClose={handleDrawerClose}
      isDrawerExpanded={isDrawerExpanded}
    >
      {treeComp}
    </MobileDrawer>
  ) : (
    <DesktopDrawer
      handleDrawerClose={handleDrawerClose}
      isDrawerExpanded={isDrawerExpanded}
    >
      {treeComp}
    </DesktopDrawer>
  );
};
