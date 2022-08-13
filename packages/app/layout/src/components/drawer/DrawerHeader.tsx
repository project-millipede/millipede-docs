import { HiddenUnderlineLink } from '@app/components';
import { Close, Home } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { FC, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { NAV_ITEM_INDICATOR_WIDTH } from '../../constants';
import { features } from '../../features';

export const StyledDrawerHeader = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2 + NAV_ITEM_INDICATOR_WIDTH),
    // Note:
    // The toolbar mixin is necessary for the content to be below the app bar.
    // The minHeight override gets defined in the app theme provider.
    // mixins: {
    //   toolbar: {
    //     minHeight: 64;
    //   }
    // }
    // Note:
    // Necessary to cast to any due to a problem in the latest typescript version.
    // It seems to work now without an explicit cast, keeping it when the problem appears again.
    // ...(theme.mixins.toolbar as any)
    ...theme.mixins.toolbar
  };
});

export const DrawerHeader: FC = () => {
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
    <StyledDrawerHeader>
      <IconButton
        component={HiddenUnderlineLink}
        onClick={isDrawerExpanded ? handleDrawerClose : handleDrawerOpen}
        href={{
          pathname: '/'
        }}
        prefetch={false}
      >
        <Home />
      </IconButton>
      <IconButton onClick={handleDrawerClose}>
        <Close />
      </IconButton>
    </StyledDrawerHeader>
  );
};
