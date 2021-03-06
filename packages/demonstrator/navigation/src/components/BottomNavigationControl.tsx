import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';
import React, { ChangeEvent, FC, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { useNavigation } from '../hooks/useNavigation';
import { activeViewIdSelector, viewNavigationState } from '../recoil/features/view-navigation/reducers';
import { TViewElement } from '../types';

export const BottomNavigationControl: FC = () => {
  const { viewElements } = useRecoilValue(viewNavigationState);

  const [{ id: activeViewElementId }] = useRecoilValue(activeViewIdSelector);

  const navigate = useNavigation();

  const handleNavigationChange = useCallback(
    (_event: ChangeEvent, newActiveViewElementId: string) => {
      navigate(activeViewElementId, newActiveViewElementId);
    },
    [navigate, activeViewElementId]
  );

  const renderView = (viewElement: TViewElement) => {
    return (
      <BottomNavigationAction
        key={`bna-${viewElement.id}`}
        label={viewElement.label}
        value={viewElement.id}
        icon={<RestoreIcon />}
      />
    );
  };

  return (
    <BottomNavigation
      value={activeViewElementId}
      onChange={handleNavigationChange}
      showLabels
    >
      {viewElements.map(renderView)}
    </BottomNavigation>
  );
};
