import { Link } from '@app/components';
import { navigationState } from '@app/layout/src/recoil/features/pages/reducer';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      padding: theme.spacing(4, 0)
    },
    pagination: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    pageLinkButton: {
      size: 'large',
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular
    },
    chevronLeftIcon: {
      marginRight: theme.spacing(1),
      fontSize: 'large'
    },
    chevronRightIcon: {
      marginLeft: theme.spacing(1),
      fontSize: 'large'
    }
  })
);

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
    <footer className={classes.footer}>
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
            <Button className={classes.pageLinkButton}>
              <ChevronLeft className={classes.chevronLeftIcon} />
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
            <Button className={classes.pageLinkButton}>
              {t(`common:pages.${nextPage.pathname}`)}
              <ChevronRight className={classes.chevronRightIcon} />
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </footer>
  );
};
