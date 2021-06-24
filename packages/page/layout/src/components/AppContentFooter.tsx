import { Link } from '@app/components';
import { navigationState } from '@app/layout/src/recoil/features/pages/reducer';
import { Button, Container } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

export const AppContentFooter: FC = () => {
  const theme = useTheme();

  const { t } = useTranslation();

  const navigation = useRecoilValue(navigationState);

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
    <Container
      component='footer'
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(8, 0)
      }}
    >
      {prevPage ? (
        <Button
          LinkComponent={Link}
          size='medium'
          startIcon={<ChevronLeft />}
          sx={{
            textTransform: 'none',
            textDecoration: 'none',
            fontWeight: theme.typography.fontWeightRegular
          }}
          href={
            {
              pathname: '/docs/[...slug]',
              query: { slug: prevPage.pathname.split('/') }
            } as any
          }
        >
          {t(`common:pages.${prevPage.pathname}`)}
        </Button>
      ) : (
        <div />
      )}
      {nextPage ? (
        <Button
          LinkComponent={Link}
          size='medium'
          endIcon={<ChevronRight />}
          sx={{
            textTransform: 'none',
            textDecoration: 'none',
            fontWeight: theme.typography.fontWeightRegular
          }}
          href={
            {
              pathname: '/docs/[...slug]',
              query: { slug: nextPage.pathname.split('/') }
            } as any
          }
        >
          {t(`common:pages.${nextPage.pathname}`)}
        </Button>
      ) : (
        <div />
      )}
    </Container>
  );
};
