import { Container, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { Head } from '../docs/src/modules/components/Head';
import { HomeFooter } from '../docs/src/modules/components/HomeFooter';
import { TopicsDetail } from '../src/components/site/landing/TopicsDetail';
import { TopicsHead } from '../src/components/site/landing/TopicsHead';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: '1 1 100%'
    },
    hero: {
      paddingTop: theme.spacing(8),
      color: theme.palette.primary.main
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    },
    title: {
      fontWeight: theme.typography.fontWeightMedium,
      textAlign: 'center'
    },
    subtitle: {
      fontWeight: theme.typography.fontWeightRegular,
      textAlign: 'center'
    }
  })
);

const Index = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <Head />
      <div className={classes.hero}>
        <Container maxWidth='md' className={classes.content}>
          <Typography variant='h2' gutterBottom className={classes.title}>
            {t('common:application-title')}
          </Typography>
          <Typography variant='h4' gutterBottom className={classes.subtitle}>
            {t('common:application-subtitle')}
          </Typography>

          <TopicsHead />
          <TopicsDetail />

          <HomeFooter />
        </Container>
      </div>
    </div>
  );
};

export default Index;
