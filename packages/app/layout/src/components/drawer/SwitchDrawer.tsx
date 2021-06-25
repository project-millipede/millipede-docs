import { Link } from '@app/components';
import { ACTIVE_INDICATOR_WIDTH, TOOLBAR_HEIGHT } from '@app/layout/src/recoil/features/layout/reducer';
import { Components } from '@app/render-utils';
import { Divider, IconButton } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { ChevronLeft, FirstPage } from '@material-ui/icons';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { DesktopDrawer, DrawerProps, MobileDrawer } from '.';
import { navigationState } from '../../recoil/features/pages/reducer';
import { Tree } from '../tree';

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: theme.spacing(TOOLBAR_HEIGHT),
  // TODO:
  // Investigate why a direct height specification causes the component to itch
  // when tree elements are opened or closed.
  // height: TOOLBAR_HEIGHT,
  // Important:
  // Correct layout shift caused by the border-right style applied to navigation
  // indicator located in the tree component
  marginLeft: theme.spacing(2),
  marginRight: `calc(${theme.spacing(2)} + ${ACTIVE_INDICATOR_WIDTH}px)`
}));

const {
  Media: { Media }
} = Components;

export const SwitchDrawer: FC<DrawerProps> = ({
  isDrawerExpanded,
  handleDrawerOpen,
  handleDrawerClose
}) => {
  const navigation = useRecoilValue(navigationState);

  const { pages, selectedPage, expandedPages } = navigation;

  const treeComp = (
    <Tree
      pages={pages}
      selectedPage={selectedPage}
      expandedPages={expandedPages}
    />
  );

  const headerComp = (
    <DrawerHeader>
      <Link
        href={
          {
            pathname: '/'
          } as any
        }
      >
        <IconButton onClick={handleDrawerClose}>
          <FirstPage />
        </IconButton>
      </Link>

      {isDrawerExpanded && (
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      )}
    </DrawerHeader>
  );

  return (
    <>
      <Media lessThan='md'>
        <MobileDrawer
          isDrawerExpanded={isDrawerExpanded}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        >
          {headerComp}
          <Divider variant='middle' flexItem />
          {treeComp}
        </MobileDrawer>
      </Media>

      <Media greaterThanOrEqual='md'>
        <DesktopDrawer
          isDrawerExpanded={isDrawerExpanded}
          handleDrawerClose={handleDrawerClose}
        >
          {headerComp}
          <Divider variant='middle' flexItem />
          {treeComp}
        </DesktopDrawer>
      </Media>
    </>
  );
};
