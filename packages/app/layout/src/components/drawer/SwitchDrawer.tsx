import { Components } from '@app/render-utils';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { DesktopDrawer, DrawerProps, MobileDrawer } from '.';
import { navigationState } from '../../recoil/features/pages/reducer';
import { Tree } from '../tree';

const {
  Responsive: { Mobile, Desktop }
} = Components;

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

  return (
    <>
      <Mobile>
        <MobileDrawer
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          isDrawerExpanded={isDrawerExpanded}
        >
          {treeComp}
        </MobileDrawer>
      </Mobile>
      <Desktop>
        <DesktopDrawer
          handleDrawerClose={handleDrawerClose}
          isDrawerExpanded={isDrawerExpanded}
        >
          {treeComp}
        </DesktopDrawer>
      </Desktop>
    </>
  );
};
