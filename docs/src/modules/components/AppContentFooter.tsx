import { Button, Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useHoux } from 'houx';
import React from 'react';

import { useTranslation } from '../../../../i18n';
import { RootState } from '../redux/reducers';
import Link from './common/link/Link';

export const useStyles = makeStyles((theme: Theme) =>
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

const AppContentFooter = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  const {
    state: {
      navigation: { flattenedPages, activePage }
    }
  }: { state: RootState } = useHoux();

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
              <ChevronLeftIcon className={classes.chevronLeftIcon} />
              {t(`pages.${prevPage.pathname}`)}
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
              {t(`pages.${nextPage.pathname}`)}
              <ChevronRightIcon className={classes.chevronRightIcon} />
            </Button>
          ) : (
            <div />
          )}
        </div>
      </footer>
    </Container>
  );
};

export default AppContentFooter;
