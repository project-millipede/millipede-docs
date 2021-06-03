import { IconButton, Typography } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { CSSProperties } from '@material-ui/styles';
import React, { FC, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { useNavigation } from '../hooks/useNavigation';
import { appCompositionState } from '../recoil/features/app/reducers';
import {
  activeViewIdSelector,
  hasPreviousOrNextViewSelector,
  nextViewIdSelector,
  previousViewIdSelector,
} from '../recoil/features/view-navigation/reducers';

interface TopNavigationControlProps {
  style?: CSSProperties;
}

export const TopNavigationControl: FC<TopNavigationControlProps> = ({
  style
}) => {
  const [hasPrevious, hasNext] = useRecoilValue(hasPreviousOrNextViewSelector);

  const [{ id: activeViewElementId, label: activeViewElementLabel }, ...rest] =
    useRecoilValue(activeViewIdSelector);

  const { id: previousViewElementId } = useRecoilValue(previousViewIdSelector);

  const { id: nextViewElementId } = useRecoilValue(nextViewIdSelector);

  const navigate = useNavigation();

  const handleBackNavigation = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      navigate(activeViewElementId, previousViewElementId);
    },
    [navigate, activeViewElementId, previousViewElementId]
  );

  const handleForwardNavigation = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      navigate(activeViewElementId, nextViewElementId);
    },
    [navigate, activeViewElementId, nextViewElementId]
  );

  const { isMobile: isMobileManual } = useRecoilValue(appCompositionState);

  const viewLabels = [activeViewElementLabel, ...rest.map(r => r.label)];

  return isMobileManual ? (
    <div
      style={{
        ...style,
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {hasPrevious ? (
        <IconButton onClick={handleBackNavigation}>
          <ChevronLeft />
        </IconButton>
      ) : (
        <div />
      )}
      <Typography variant='h6'>{activeViewElementLabel}</Typography>
      {hasNext ? (
        <IconButton onClick={handleForwardNavigation}>
          <ChevronRight />
        </IconButton>
      ) : (
        <div />
      )}
    </div>
  ) : (
    <div
      style={{
        ...style,
        display: 'grid',
        gridTemplateColumns: `repeat(${viewLabels.length}, 1fr)`
      }}
    >
      {viewLabels.map(viewLabel => (
        <div
          key={viewLabel}
          style={{
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant='h6'>{viewLabel}</Typography>
        </div>
      ))}
    </div>
  );
};
