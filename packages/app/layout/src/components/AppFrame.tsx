import { SwitchDrawer } from '@app/layout';
import { Components as RenderComponents } from '@app/render-utils';
import { Navigation } from '@app/types';
import { Components } from '@page/layout';
import { Toc } from '@stefanprobst/remark-extract-toc';
import React, { FC } from 'react';

import { AppFrameGrid } from './FrameGrid';
import { AppBar } from './toolbar';

const {
  Media: { MediaConsumer },
  Suspense: { SuspenseWrapper }
} = RenderComponents;

interface AppFrameProps {
  navigation?: Navigation;
  toc?: Toc;
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

/**
 * The Suspense-Wrapper of ATOC needs both subscribe to
 * - beforeHistoryChange and
 * - hashChangeStart
 * because it is in layout / no unmounting on route change
 */

export const AppFrame: FC<AppFrameProps> = ({ navigation, toc, children }) => {
  return (
    <>
      <AppBar />

      <AppFrameGrid hasToc={!!toc} hasNavigation={!!navigation}>
        {navigation && <SwitchDrawer navigation={navigation} />}

        {children}

        {!!toc && (
          <MediaConsumer>
            {({ media: { desktop } }) => {
              const { className } = desktop;
              return (
                <SuspenseWrapper media={desktop}>
                  <Components.AppTableOfContents
                    toc={toc}
                    className={className}
                  />
                </SuspenseWrapper>
              );
            }}
          </MediaConsumer>
        )}
      </AppFrameGrid>
    </>
  );
};
