import { layoutState, MAX_DRAWER_WIDTH, MIN_DRAWER_WIDTH, TOC_WIDTH } from '@app/layout/src/recoil/features/layout/reducer';
import { Container } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

interface AppContentProps {
  disableToc: boolean;
}

export interface AppContentStyleProps {
  drawerWidth: number;
  tocWidth: number;
}

export const AppContent: FC<AppContentProps> = ({ disableToc, children }) => {
  const { isDrawerExpanded } = useRecoilValue(layoutState);

  const theme = useTheme();

  return (
    <Container
      component='main'
      id='main-content'
      sx={{
        paddingTop: theme.spacing(12),

        // Hyphen
        msHyphens: 'auto',
        WebkitHyphens: 'auto',
        MozHyphens: 'auto',
        hyphens: 'auto',

        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${
            isDrawerExpanded
              ? theme.spacing(MAX_DRAWER_WIDTH)
              : theme.spacing(MIN_DRAWER_WIDTH)
          } - ${!disableToc ? theme.spacing(TOC_WIDTH) : '0px'})`
        }
      }}
    >
      {children}
    </Container>
  );
};
