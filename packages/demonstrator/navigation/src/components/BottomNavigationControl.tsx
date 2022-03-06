import RestoreIcon from '@mui/icons-material/Restore';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { ChangeEvent, FC, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { features } from '../features';
import { useNavigation } from '../hooks/useNavigation';
import { TViewElement } from '../types';

export const BottomNavigationControl: FC = () => {
  const {
    view: {
      navigation: {
        selector: { activeViewIdSelector },
        states: { viewNavigationState }
      }
    }
  } = features;

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
