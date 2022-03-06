import { HiddenUnderlineLink } from '@app/components';
import { Navigation } from '@app/types';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useMemo } from 'react';

export const Footer = styled(Box)(({ theme }) => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(8, 0)
  };
});

export const TitleWithIcon = styled('div')({
  display: 'flex',
  alignItems: 'center'
});

interface AppContentFooterProps {
  navigation: Navigation;
}

export const AppContentFooter: FC<AppContentFooterProps> = ({ navigation }) => {
  const { t } = useTranslation();

  const { flattenedPages, activePage, pageType } = navigation;

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
      {prevPage ? (
        <Typography
          component={HiddenUnderlineLink}
          href={{
            pathname: `/${pageType}/[...slug]`,
            query: { slug: prevPage.pathname.split('/') }
          }}
          prefetch={false}
        >
          <TitleWithIcon>
            <ChevronLeft fontSize='small' />
            {t(
              `common:pages.${prevPage.pathname}`,
              {},
              {
                fallback: prevPage.title
              }
            )}
          </TitleWithIcon>
        </Typography>
      ) : (
        <div />
      )}

      {nextPage ? (
        <Typography
          component={HiddenUnderlineLink}
          href={{
            pathname: `/${pageType}/[...slug]`,
            query: { slug: nextPage.pathname.split('/') }
          }}
          prefetch={false}
        >
          <TitleWithIcon>
            {t(
              `common:pages.${nextPage.pathname}`,
              {},
              {
                fallback: nextPage.title
              }
            )}
            <ChevronRight fontSize='small' />
          </TitleWithIcon>
        </Typography>
      ) : (
        <div />
      )}
    </Footer>
  );
};
