import { HiddenUnderlineLink } from '@app/components';
import { NavigationState } from '@app/layout/src/recoil/features/pages/reducer';
import { Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useMemo } from 'react';

export const Footer = styled(Box)(({ theme }) => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(8, 0)
  };
});

export const TitleWithIcon = styled('div')(() => {
  return {
    display: 'flex',
    alignItems: 'center'
  };
});

interface AppContentFooterProps {
  navigation: NavigationState;
}

export const AppContentFooter: FC<AppContentFooterProps> = ({ navigation }) => {
  const { t } = useTranslation();

  const { flattenedPages, activePage = { pathname: '' } } = navigation;

  const [prevPage, nextPage] = useMemo(() => {
    const currentPageNumber = flattenedPages.findIndex(
      page => page.pathname === activePage.pathname
    );
    return [
      flattenedPages[currentPageNumber - 1],
      flattenedPages[currentPageNumber + 1]
    ];
  }, [activePage.pathname]);

  return (
    <Footer component='footer'>
      {prevPage && (
        <Typography
          component={HiddenUnderlineLink}
          href={{
            pathname: '/docs/[...slug]',
            query: { slug: prevPage.pathname.split('/') }
          }}
          prefetch={false}
        >
          <TitleWithIcon>
            <ChevronLeft fontSize='small' />
            {t(`common:pages.${prevPage.pathname}`)}
          </TitleWithIcon>
        </Typography>
      )}

      {nextPage && (
        <Typography
          component={HiddenUnderlineLink}
          href={{
            pathname: '/docs/[...slug]',
            query: { slug: nextPage.pathname.split('/') }
          }}
          prefetch={false}
        >
          <TitleWithIcon>
            {t(`common:pages.${nextPage.pathname}`)}
            <ChevronRight fontSize='small' />
          </TitleWithIcon>
        </Typography>
      )}
    </Footer>
  );
};
