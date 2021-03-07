import { layoutState, MAX_DRAWER_WIDTH, MIN_DRAWER_WIDTH, TOC_WIDTH } from '@app/layout/src/recoil/features/layout/reducer';
import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

interface AppContentProps {
  disableToc: boolean;
}

interface StyleProps {
  drawerWidth: number;
  tocWidth: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(12),

      // hyphen
      msHyphens: 'auto',
      WebkitHyphens: 'auto',
      MozHyphens: 'auto',
      hyphens: 'auto',

      [theme.breakpoints.down('md')]: {
        width: props => `calc(100% - ${props.drawerWidth}px`
      },
      [theme.breakpoints.up('lg')]: {
        width: props =>
          `calc(100% - ${props.drawerWidth}px - ${props.tocWidth}px )`
      }
    }
  })
);
export const AppContent: FC<AppContentProps> = ({ disableToc, children }) => {
  const { isDrawerExpanded } = useRecoilValue(layoutState);

  const classes = useStyles({
    drawerWidth: isDrawerExpanded ? MAX_DRAWER_WIDTH : MIN_DRAWER_WIDTH,
    tocWidth: !disableToc ? TOC_WIDTH : 0
  });

  return (
    <Container component='main' id='main-content' className={classes.root}>
      {children}
    </Container>
  );
};
