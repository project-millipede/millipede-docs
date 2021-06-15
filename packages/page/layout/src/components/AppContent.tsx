import { layoutState, MAX_DRAWER_WIDTH, MIN_DRAWER_WIDTH, TOC_WIDTH } from '@app/layout/src/recoil/features/layout/reducer';
import { Container, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

interface AppContentProps {
  disableToc: boolean;
}

interface AppContentStyleProps {
  drawerWidth: number;
  tocWidth: number;
}

const useStyles = makeStyles<Theme, AppContentStyleProps>((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(12),

    // Hyphen
    msHyphens: 'auto',
    WebkitHyphens: 'auto',
    MozHyphens: 'auto',
    hyphens: 'auto',

    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: props =>
        `calc(100% - ${props.drawerWidth}px - ${props.tocWidth}px )`
    }
  }
}));
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
