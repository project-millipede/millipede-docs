import { Tree } from '@app/layout';
import { Components as RenderComponents } from '@app/render-utils';
import { Navigation } from '@app/types';
import { Divider } from '@mui/material';
import { FC } from 'react';

import { DesktopDrawer } from './DesktopDrawer';
import { DrawerHeader } from './DrawerHeader';
import { MobileDrawer } from './MobileDrawer';

const {
  Media: { MediaConsumer },
  Suspense: { SuspenseWrapper }
} = RenderComponents;

interface SwitchDrawerProps {
  navigation: Navigation;
}

export const SwitchDrawer: FC<SwitchDrawerProps> = ({
  navigation = {
    pages: [],
    expandedPages: []
  }
}) => {
  const { activePage, pages, expandedPages } = navigation;

  const tree = (
    <Tree pages={pages} expandedPages={expandedPages} activePage={activePage} />
  );

  return (
    <>
      <MediaConsumer>
        {({ media: { mobile, desktop } }) => {
          return (
            <>
              <SuspenseWrapper media={mobile}>
                <MobileDrawer
                  sx={{
                    gridArea: 'app-left'
                  }}
                  className={mobile.className}
                >
                  <DrawerHeader />
                  <Divider variant='middle' />
                  {tree}
                </MobileDrawer>
              </SuspenseWrapper>
              <SuspenseWrapper media={desktop}>
                <DesktopDrawer
                  sx={{
                    gridArea: 'app-left'
                  }}
                  className={desktop.className}
                >
                  <DrawerHeader />
                  <Divider variant='middle' />
                  {tree}
                </DesktopDrawer>
              </SuspenseWrapper>
            </>
          );
        }}
      </MediaConsumer>
    </>
  );
};
