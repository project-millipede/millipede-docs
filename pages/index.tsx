import { AppFrame, AppThemeProvider, features, MAX_DRAWER_WIDTH, MIN_DRAWER_WIDTH } from '@app/layout';
import { Navigation } from '@app/types';
import { Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Components as LandingComponents } from '@page/landing';
import { Components } from '@page/layout';
import { GetStaticProps } from 'next';
import { mergeProps } from 'next-merge-props';
import useTranslation from 'next-translate/useTranslation';
import { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';

import { GetStaticNavigationProps, getStaticNavigationProps } from '../docs/src/lib/getStaticNavigationProps';
import { GetStaticTranslationProps, getStaticTranslationProps } from '../docs/src/lib/getStaticTranslationProps';
import { NextPageWithLayout } from '../docs/src/lib/types';

export type StaticPageProps = GetStaticTranslationProps &
  GetStaticNavigationProps;

const Index: NextPageWithLayout<StaticPageProps> = () => {
  const {
    layout: {
      states: { layoutState }
    }
  } = features;

  const { isDrawerExpanded } = useRecoilValue(layoutState);

  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Container
      id='app-landing'
      component='main'
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
      <LandingComponents.TopicsHead />
      <LandingComponents.TopicsDetail />
      <Components.HomeFooter />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = mergeProps(
  [getStaticTranslationProps(), getStaticNavigationProps({ pageType: 'docs' })],
  {
    resolutionType: 'sequential'
  }
);

Index.getLayout = (page: ReactElement, navigation: Navigation) => {
  return (
    <AppThemeProvider>
      <AppFrame navigation={navigation}>{page}</AppFrame>
    </AppThemeProvider>
  );
};

export default Index;
