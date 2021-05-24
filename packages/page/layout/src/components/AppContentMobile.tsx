import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { FC } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(12),
      outline: 'none',

      // hyphen
      msHyphens: 'auto',
      MozHyphens: 'auto',
      WebkitHyphens: 'auto',
      hyphens: 'auto'
    }
  })
);

export const AppContentMobile: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Container
      component='main'
      id='main-mobile-content'
      className={classes.root}
    >
      {children}
    </Container>
  );
};
