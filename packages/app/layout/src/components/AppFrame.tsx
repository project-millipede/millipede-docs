import { Navigation } from '@app/types';
import { FC, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { features } from '../features';
import { SwitchDrawer } from './drawer';
import { AppFrameGrid } from './FrameGrid';
import { AppBar } from './toolbar';

interface AppFrameProps {
  hasToc?: boolean;
  navigation?: Navigation;
}

// Note:
// The application's navigation is interactive; the user selects another page (route);
// this is signaled by an expansion and collapse of the respective navigation group.

// The structure of the pages included in the application is hierarchical; corresponding hierarchy
// components (tree) are used to enable collapsing and expanding navigation groups.

// The page type used for documentation purposes is dynamic.

// Dynamic page of a reasonable hierarchical level: [...slug].
// Components for each page: _app with corresponding subcomponents, e.g., app-frame.

// Navigation: Hierarchy components (tree) and corresponding subcomponents
// Drawer: Integration of navigation

// Remark:
// In Next, there is no delayed rendering between _app and any page,
// the components specified in _app are part of any page.
// Animating navigation groups' collapse and expand behavior requires that components that perform
// route change animation are always included in _app and appropriate subcomponents, e.g., app-frame;
// [...slug] must not contain any of these components.

// drawer <= tree
// + app-frame
// - [...slug]

export const AppFrame: FC<AppFrameProps> = ({
  hasToc = false,
  navigation,
  children
}) => {
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

  return (
    <>
      <AppBar
        isDrawerExpanded={isDrawerExpanded}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />

      <AppFrameGrid hasToc={hasToc} hasNavigation={!!navigation}>
        {navigation && (
          <SwitchDrawer
            isDrawerExpanded={isDrawerExpanded}
            navigation={navigation}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
          />
        )}
        {children}
      </AppFrameGrid>
    </>
  );
};
