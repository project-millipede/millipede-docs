import { AppFrame, AppThemeProvider } from '@app/layout';
import { Navigation, PageTypes } from '@app/types';
import { I18n } from '@app/utils';
import { Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Components as LandingComponents } from '@page/landing';
import { Components, Mdx } from '@page/layout';
import { GetStaticProps } from 'next';
import { mergeProps } from 'next-merge-props';
import { ReactElement } from 'react';

import { GetStaticNavigationProps, getStaticNavigationProps } from '../docs/src/lib/getStaticNavigationProps';
import { GetStaticTranslationProps, getStaticTranslationProps } from '../docs/src/lib/getStaticTranslationProps';
import { NextPageWithLayout } from '../docs/src/lib/types';

const { AppHead } = Components;
const { MainContainer } = Mdx;

const metaDataLanding: PageTypes.MetaData = {
  title: 'Project Millipede',
  description: 'Probing building blocks of futuristic privacy',
  keywords:
    'Privacy enhancing technology, Personal Intrusion Detection and Prevention',
  author: 'Markus Gritsch'
};

export const Header = styled('header')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  marginBottom: theme.spacing(2)
}));

export type StaticPageProps = GetStaticTranslationProps &
  GetStaticNavigationProps;

const Index: NextPageWithLayout<StaticPageProps> = () => {
  const { t } = I18n.useTranslation();

  const theme = useTheme();
  return (
    <>
      <AppHead metaData={metaDataLanding} />

      <MainContainer
        id='app-landing'
        sx={{
          paddingTop: theme.spacing(12),
          color: theme.palette.primary.main
        }}
      >
        <Header>
          <Typography
            variant='h1'
            sx={{
              fontWeight: theme.typography.fontWeightRegular
            }}
          >
            {t('common:application-title')}
          </Typography>
          <Typography
            variant='h2'
            sx={{
              fontWeight: theme.typography.fontWeightLight
            }}
          >
            {t('common:application-subtitle')}
          </Typography>
        </Header>
        <LandingComponents.TopicsHead />
        <LandingComponents.TopicsDetail />
        <Components.HomeFooter />
      </MainContainer>
    </>
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
