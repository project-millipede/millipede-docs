import { loadFAIcons } from '@app/components/src';
import { Container, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Components as ComponentsLanding } from '@page/landing';
import { Components } from '@page/layout';
import { GetStaticPropsContext } from 'next';
import loadNamespaces from 'next-translate/loadNamespaces';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';

const TopicsHead = dynamic(() =>
  import('@page/landing').then(module => module.Components.TopicsHead)
);

loadFAIcons();

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

const Index: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <div className={classes.hero}>
        <Container maxWidth='md' className={classes.content}>
          <Typography variant='h2' gutterBottom className={classes.title}>
            {t('common:application-title')}
          </Typography>
          <Typography variant='h4' gutterBottom className={classes.subtitle}>
            {t('common:application-subtitle')}
          </Typography>

          <TopicsHead />
          <ComponentsLanding.TopicsDetail />

          <Components.HomeFooter />
        </Container>
      </div>
    </div>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: await loadNamespaces({
      ...context,
      pathname: '/'
    })
  };
};

export default Index;
