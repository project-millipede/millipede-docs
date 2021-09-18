import { AppFrame } from '@app/layout';
import {
  layoutState,
  MAX_DRAWER_WIDTH,
  MIN_DRAWER_WIDTH
} from '@app/layout/src/recoil/features/layout/reducer';
import { NavigationState } from '@app/layout/src/recoil/features/pages/reducer';
import { Container, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Components as ComponentsLanding } from '@page/landing';
import { Components } from '@page/layout';
import { GetStaticProps } from 'next';
import { mergeProps } from 'next-merge-props';
import useTranslation from 'next-translate/useTranslation';
import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';

import {
  GetStaticNavigationProps,
  getStaticNavigationProps
} from '../docs/src/lib/getStaticNavigationProps';
import {
  GetStaticTranslationProps,
  getStaticTranslationProps
} from '../docs/src/lib/getStaticTranslationProps';
import { NextPageWithLayout } from '../docs/src/lib/types';

export type StaticPageProps = GetStaticTranslationProps &
  GetStaticNavigationProps;

const Index: NextPageWithLayout<StaticPageProps> = () => {
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
            isDrawerExpanded
              ? theme.spacing(MAX_DRAWER_WIDTH)
              : theme.spacing(MIN_DRAWER_WIDTH)
          })`
        }
      }}
    >
      <Typography
        variant='h1'
        gutterBottom
        sx={{
          fontWeight: theme.typography.fontWeightRegular,
          textAlign: 'center'
        }}
      >
        {t('common:application-title')}
      </Typography>
      <Typography
        variant='h2'
        gutterBottom
        sx={{
          fontWeight: theme.typography.fontWeightLight,
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

export const getStaticProps: GetStaticProps = mergeProps(
  [
    getStaticTranslationProps({
      onSuccess: _props => {
        // console.log('static translation props', props);
      }
    }),
    getStaticNavigationProps({
      onSuccess: _props => {
        // console.log('static navigation props', props);
      }
    })
  ],
  {
    resolutionType: 'sequential',
    debug: true
  }
);

Index.getLayout = (page: ReactElement, navigation: NavigationState) => {
  return <AppFrame navigation={navigation}>{page}</AppFrame>;
};

export default Index;
