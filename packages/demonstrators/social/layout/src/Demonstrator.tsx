import { Portal } from '@app/components';
import { animateCenterToLeftOrRight, animateFromLeftToCenter, animateFromRightToCenter } from '@demonstrator/navigation';
import React, { FC } from 'react';
import { configure } from 'react-reparenting';

import { App } from './App';

configure({
  removeChildFromContainer(container: HTMLElement, child: HTMLElement) {
    const { dataset } = child;

    const { position, previousPosition } = dataset;

    /**
     * left -> center (animated)
     */

    if (container.style.gridArea.includes('left')) {
      if (position === 'middle' && previousPosition === 'left') {
        animateFromLeftToCenter({ id: child.id });
      }
    }

    /**
     *
     * left <- [ center (not animated)] -> right
     *
     */

    if (container.style.gridArea.includes('middle')) {
      if (position === 'right' && previousPosition === 'middle') {
        animateCenterToLeftOrRight({ id: child.id }, true);
      } else if (position === 'left' && previousPosition === 'middle') {
        animateCenterToLeftOrRight({ id: child.id }, false);
      }
    }

    /**
     * center <- right (animated)
     */

    if (container.style.gridArea.includes('right')) {
      if (position === 'middle' && previousPosition === 'right') {
        animateFromRightToCenter({ id: child.id });
      }
    }

    container.removeChild(child);
  }
});

export const Demonstrator: FC = () => {
  return (
    <Portal.PortalProvider>
      <App />
      <Portal.PortalOut portalType={Portal.PortalType.Cursor} />
    </Portal.PortalProvider>
  );
};
