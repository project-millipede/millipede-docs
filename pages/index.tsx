import { loadFAIcons } from '@app/components';
import { layoutState, MAX_DRAWER_WIDTH, MIN_DRAWER_WIDTH } from '@app/layout/src/recoil/features/layout/reducer';
import { Container, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Components as ComponentsLanding } from '@page/landing';
import { Components } from '@page/layout';
import { GetStaticPropsContext } from 'next';
import loadNamespaces from 'next-translate/loadNamespaces';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import i18nConfig from '../i18n';

const TopicsHead = dynamic(
  () => import('@page/landing').then(module => module.Components.TopicsHead),
  { ssr: false }
);

loadFAIcons();

interface IndexStyleProps {
  drawerWidth: number;
}

const useStyles = makeStyles<Theme, IndexStyleProps>((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(12),
    textAlign: 'center',
    color: theme.palette.primary.main,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: props => `calc(100% - ${props.drawerWidth}px)`
    }
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
    textAlign: 'center'
  },
  subtitle: {
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'center'
  }
}));

const Index: FC = () => {
  const { isDrawerExpanded } = useRecoilValue(layoutState);

  const classes = useStyles({
    drawerWidth: isDrawerExpanded ? MAX_DRAWER_WIDTH : MIN_DRAWER_WIDTH
  });

  const { t } = useTranslation();

  return (
    <Container
      component='main'
      id='main-content-landing'
      className={classes.root}
    >
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
  );
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { locale } = ctx;

  return {
    props: await loadNamespaces({
      ...i18nConfig,
      pathname: '/',
      locale: locale
    })
  };
};

export default Index;
