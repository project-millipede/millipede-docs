import { Container, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';

import AppFrame from '../docs/src/modules/components/AppFrame';
import Head from '../docs/src/modules/components/Head';

// // --- Post bootstrap -----
// const useStyles = makeStyles(_theme => ({
//   root: {
//     textAlign: "center"
//     // paddingTop: theme.spacing(2)
//     // paddingTop: theme.spacing.unit * 20
//   }
// }));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: '1 0 100%'
    },
    drawer: {
      width: 0
    },
    hero: {
      paddingTop: 64,
      color: theme.palette.primary.main
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(8),
      [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(20),
        paddingBottom: theme.spacing(20),
        flexDirection: 'row',
        alignItems: 'flex-start',
        textAlign: 'left'
      }
    },
    title: {
      marginLeft: -12,
      whiteSpace: 'nowrap',
      letterSpacing: '.7rem',
      textIndent: '.7rem',
      fontWeight: theme.typography.fontWeightLight,
      [theme.breakpoints.only('xs')]: {
        fontSize: 28
      }
    }
  })
);

const Index = () => {
  const classes = useStyles({});
  return (
    <AppFrame drawerStyleOverride={{ drawer: classes.drawer }}>
      <div className={classes.root}>
        <Head />
        <Container
          component='main'
          // id='main-content'
          tabIndex={-1}
        >
          <div className={classes.hero}>{/* <HomeSteps /> */}</div>
        </Container>
      </div>
    </AppFrame>
  );
};

export default Index;
