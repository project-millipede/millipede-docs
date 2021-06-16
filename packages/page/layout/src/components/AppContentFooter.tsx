import { Link } from '@app/components';
import { navigationState } from '@app/layout/src/recoil/features/pages/reducer';
import { Button, Theme } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(8)
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(4, 0)
  },
  pageLinkButton: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export const AppContentFooter: FC = () => {
  const classes = useStyles();

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
    <footer className={classes.root}>
      <div className={classes.pagination}>
        {prevPage ? (
          <Link
            href={
              {
                pathname: '/docs/[...slug]',
                query: { slug: prevPage.pathname.split('/') }
              } as any
            }
          >
            <Button
              className={classes.pageLinkButton}
              size='medium'
              startIcon={<ChevronLeft />}
            >
              {t(`common:pages.${prevPage.pathname}`)}
            </Button>
          </Link>
        ) : (
          <div />
        )}
        {nextPage ? (
          <Link
            href={
              {
                pathname: '/docs/[...slug]',
                query: { slug: nextPage.pathname.split('/') }
              } as any
            }
          >
            <Button
              className={classes.pageLinkButton}
              size='medium'
              endIcon={<ChevronRight />}
            >
              {t(`common:pages.${nextPage.pathname}`)}
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </footer>
  );
};
