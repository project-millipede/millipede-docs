import { NextLinkComposedWithRef } from '@app/components';
import { Tree } from '@app/layout';
import { NAV_ITEM_INDICATOR_WIDTH } from '@app/layout/src/recoil/features/layout/reducer';
import { NavigationState } from '@app/layout/src/recoil/features/pages/reducer';
import { Components as RenderComponents } from '@app/render-utils';
import { Close, FirstPage } from '@mui/icons-material';
import { Divider, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { FC } from 'react';

import { DesktopDrawer, MobileDrawer } from '.';

const {
  Media: { Media }
} = RenderComponents;

interface DrawerCompProps {
  isDrawerExpanded?: boolean;
  navigation: NavigationState;
  handleDrawerOpen?: () => void;
  handleDrawerClose?: () => void;
}
export const DrawerHeader = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2 + NAV_ITEM_INDICATOR_WIDTH),
    // Note:
    // The toolbar mixin is necessary for the content to be below the app bar.
    // The minHeight override gets defined in the app theme provider
    // mixins: {
    //   toolbar: {
    //     minHeight: 64;
    //   }
    // }
    ...theme.mixins.toolbar
  };
});

export const SwitchDrawer: FC<DrawerCompProps> = ({
  isDrawerExpanded,
  navigation = {
    pages: [],
    expandedPages: []
  },
  handleDrawerOpen,
  handleDrawerClose
}) => {
  const { activePage, pages, expandedPages } = navigation;

  const header = (
    <DrawerHeader>
      <IconButton
        onClick={isDrawerExpanded ? handleDrawerClose : handleDrawerOpen}
        component={NextLinkComposedWithRef}
        href={{
          pathname: '/'
        }}
        prefetch={false}
      >
        <FirstPage />
      </IconButton>
      <IconButton onClick={handleDrawerClose}>
        <Close />
      </IconButton>
    </DrawerHeader>
  );

  const tree = (
    <Tree pages={pages} expandedPages={expandedPages} activePage={activePage} />
  );

  return (
    <>
      <Media lessThan='md'>
        <MobileDrawer
          isDrawerExpanded={isDrawerExpanded}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          sx={{ gridArea: 'left' }}
        >
          {header}
          <Divider variant='middle' />
          {tree}
        </MobileDrawer>
      </Media>
      <Media greaterThanOrEqual='md'>
        <DesktopDrawer
          isDrawerExpanded={isDrawerExpanded}
          handleDrawerClose={handleDrawerClose}
          sx={{
            gridArea: 'left'
          }}
        >
          {header}
          <Divider variant='middle' />
          {tree}
        </DesktopDrawer>
      </Media>
    </>
  );
};
