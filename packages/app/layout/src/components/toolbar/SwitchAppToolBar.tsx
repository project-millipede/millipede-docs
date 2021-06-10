import { Components } from '@app/render-utils';
import React, { FC } from 'react';

import { AppToolBarProps } from '.';
import { AppToolBar } from './AppToolBar';
import { AppToolBarMobile } from './AppToolBarMobile';

const {
  Responsive: { Mobile, Desktop }
} = Components;

export const SwitchAppToolBar: FC<AppToolBarProps> = ({
  isDrawerExpanded,
  handleDrawerOpen
}) => {
  return (
    <>
      <Mobile>
        <AppToolBarMobile
          isDrawerExpanded={isDrawerExpanded}
          handleDrawerOpen={handleDrawerOpen}
        />
      </Mobile>
      <Desktop>
        <AppToolBar
          isDrawerExpanded={isDrawerExpanded}
          handleDrawerOpen={handleDrawerOpen}
        />
      </Desktop>
    </>
  );
};
