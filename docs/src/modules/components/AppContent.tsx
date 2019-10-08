import Container from '@material-ui/core/Container';
import { createStyles, Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface Props extends React.Props<any> {}

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 80 + 16,
      flex: '1 1 100%',
      position: 'relative',
      maxWidth: '100%',
      margin: '0 auto'
    }
  })
);

const AppContent = ({ children }: Props) => {
  const classes = useStyles({});

  return (
    <Container component='main' id='main-content' tabIndex={-1} className={classes.root}>
      {children}
    </Container>
  );
};

export default AppContent;
