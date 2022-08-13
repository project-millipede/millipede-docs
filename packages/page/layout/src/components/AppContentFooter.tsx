import { HiddenUnderlineLink } from '@app/components';
import { Navigation } from '@app/types';
import { I18n } from '@app/utils';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC, useMemo } from 'react';

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

export const getLink = (pathname: string, pageType: string) => {
  if (pathname.includes('/')) {
    return {
      pathname: `/${pageType}/[...slug]`,
      query: { slug: pathname.split('/') }
    };
  }
  return {
    pathname: `/${pageType}/[slug]`,
    query: { slug: pathname }
  };
};

export const AppContentFooter: FC<AppContentFooterProps> = ({ navigation }) => {
  const { t } = I18n.useTranslation();

  const { flattenedPages, activePage, pageType } = navigation;

  const [prevPage, prevPageLink, nextPage, nextPageLink] = useMemo(() => {
    const currentPageNumber = flattenedPages.findIndex(
      page => page.pathname === activePage.pathname
    );

    const prevPage = flattenedPages[currentPageNumber - 1];
    const nextPage = flattenedPages[currentPageNumber + 1];

    const prevPageLink = prevPage && getLink(prevPage.pathname, pageType);
    const nextPageLink = nextPage && getLink(nextPage.pathname, pageType);

    return [prevPage, prevPageLink, nextPage, nextPageLink];
  }, [activePage.pathname]);

  return (
    <Footer component='footer'>
      {prevPage ? (
        <Typography
          component={HiddenUnderlineLink}
          href={prevPageLink}
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
          href={nextPageLink}
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
