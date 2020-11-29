import { Link } from '@app/components';
import { useHoux } from '@app/houx';
import { RootState as LayoutState } from '@app/layout';
import {
  Button,
  Container,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      padding: theme.spacing(4, 0),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(8, 0)
      }
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

  const {
    state: {
      navigation: { flattenedPages, activePage }
    }
  }: { state: LayoutState } = useHoux();

  const currentPageNumber = flattenedPages.findIndex(
    page => page.pathname === activePage.pathname
  );

  const prevPage = flattenedPages[currentPageNumber - 1];
  const nextPage = flattenedPages[currentPageNumber + 1];

  return (
    <Container maxWidth='md'>
      <footer className={classes.footer}>
        <div className={classes.pagination}>
          {prevPage ? (
            <Button
              component={Link}
              naked
              href={prevPage.pathname}
              className={classes.pageLinkButton}
            >
              <ChevronLeft className={classes.chevronLeftIcon} />
              {t(`common:pages.${prevPage.pathname}`)}
            </Button>
          ) : (
            <div />
          )}
          {nextPage ? (
            <Button
              component={Link}
              naked
              href={nextPage.pathname}
              className={classes.pageLinkButton}
            >
              {t(`common:pages.${nextPage.pathname}`)}
              <ChevronRight className={classes.chevronRightIcon} />
            </Button>
          ) : (
            <div />
          )}
        </div>
      </footer>
    </Container>
  );
};
