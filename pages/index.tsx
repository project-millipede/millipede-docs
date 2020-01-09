import { Container, Divider, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

import AppFrame from '../docs/src/modules/components/AppFrame';
import HomeFooter from '../docs/src/modules/components/HomeFooter';
import { useTranslation } from '../i18n';
import TopicsDetail from '../src/components/site/landing/TopicsDetail';
import TopicsHead from '../src/components/site/landing/TopicsHead';

// import Head from '../docs/src/modules/components/Head';
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
      flex: '1 1 100%'
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
      paddingBottom: theme.spacing(8)
      // [theme.breakpoints.up("md")]: {
      //   paddingTop: theme.spacing(20),
      //   paddingBottom: theme.spacing(20),
      //   // flexDirection: "row",
      //   alignItems: "flex-start",
      //   textAlign: "left"
      // }
    },
    title: {
      fontWeight: theme.typography.fontWeightLight,
      textAlign: 'center'
      // marginLeft: -12,
      // whiteSpace: 'nowrap',
      // letterSpacing: '.7rem',
      // textIndent: '.7rem',
      // [theme.breakpoints.only("xs")]: {
      //   fontSize: 28
      // },
    },
    subtitle: {
      fontWeight: theme.typography.fontWeightLight,
      textAlign: 'center'
      // marginLeft: -12,
      // whiteSpace: "wrap",
      // letterSpacing: '.7rem',
      // textIndent: '.7rem',
      // [theme.breakpoints.only("xs")]: {
      //   fontSize: 28
      // },
    }
  })
);

const Index = () => {
  const classes = useStyles({});
  const { t } = useTranslation();

  return (
    <AppFrame drawerStyleOverride={{ drawer: classes.drawer }}>
      <div className={classes.root}>
        {/* <Head /> */}
        <div className={classes.hero}>
          <Container maxWidth='md' className={classes.content}>
            <div
            // className={classes.header}
            >
              <Typography
                variant='h3'
                component='h1'
                color='inherit'
                gutterBottom
                className={classes.title}
              >
                {t('application-title')}
              </Typography>
              <Typography
                variant='h4'
                component='h1'
                color='inherit'
                gutterBottom
                className={classes.subtitle}
              >
                {t('application-subtitle')}
              </Typography>
            </div>
            <Divider />

            <TopicsHead />
            <TopicsDetail />

            <HomeFooter />
          </Container>
        </div>
      </div>
    </AppFrame>
  );
};

Index.getInitialProps = async () => {
  return {
    namespacesRequired: ['common']
  };
};

export default Index;
