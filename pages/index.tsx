import { loadFAIcons } from '@app/components';
import { layoutState, MAX_DRAWER_WIDTH, MIN_DRAWER_WIDTH } from '@app/layout/src/recoil/features/layout/reducer';
import { Container, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Components as ComponentsLanding } from '@page/landing';
import { Components } from '@page/layout';
import { GetStaticPropsContext } from 'next';
import loadNamespaces from 'next-translate/loadNamespaces';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import i18nConfig from '../i18n';

loadFAIcons();

const Index: FC = () => {
  const { isDrawerExpanded } = useRecoilValue(layoutState);

  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Container
      component='main'
      id='main-content-landing'
      sx={{
        paddingTop: theme.spacing(12),
        textAlign: 'center',
        color: theme.palette.primary.main,
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${
            isDrawerExpanded ? MAX_DRAWER_WIDTH : MIN_DRAWER_WIDTH
          }px)`
        }
      }}
    >
      <Typography
        variant='h2'
        gutterBottom
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
          textAlign: 'center'
        }}
      >
        {t('common:application-title')}
      </Typography>
      <Typography
        variant='h4'
        gutterBottom
        sx={{
          fontWeight: theme.typography.fontWeightRegular,
          textAlign: 'center'
        }}
      >
        {t('common:application-subtitle')}
      </Typography>
      <ComponentsLanding.TopicsHead />
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
