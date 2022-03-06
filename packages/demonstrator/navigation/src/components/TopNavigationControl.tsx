import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { CSSProperties, FC, useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { features } from '../features';
import { useNavigation } from '../hooks/useNavigation';

const NavigationBtnPlaceholder = styled('div')({
  width: '34px'
});

interface TopNavigationControlProps {
  style?: CSSProperties;
}

export const TopNavigationControl: FC<TopNavigationControlProps> = ({
  style
}) => {
  const {
    view: {
      navigation: {
        selector: {
          activeViewIdSelector,
          hasPreviousOrNextViewSelector,
          nextViewIdSelector,
          previousViewIdSelector
        }
      }
    },
    app: {
      states: { appCompositionState }
    }
  } = features;

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

  return (
    <div
      style={{
        ...style
      }}
    >
      {isMobileManual ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: '8px',
            marginRight: '8px'
          }}
        >
          {hasPrevious ? (
            <IconButton onClick={handleBackNavigation} size='small'>
              <ChevronLeft />
            </IconButton>
          ) : (
            <NavigationBtnPlaceholder />
          )}
          <Typography variant='h6'>{activeViewElementLabel}</Typography>
          {hasNext ? (
            <IconButton onClick={handleForwardNavigation} size='small'>
              <ChevronRight />
            </IconButton>
          ) : (
            <NavigationBtnPlaceholder />
          )}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
          }}
        >
          {viewLabels.map(viewLabel => (
            <Typography key={viewLabel} variant='h6'>
              {viewLabel}
            </Typography>
          ))}
        </div>
      )}
    </div>
  );
};
