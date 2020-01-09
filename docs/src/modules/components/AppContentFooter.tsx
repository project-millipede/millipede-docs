import { Button, Container, createStyles, Divider, makeStyles, Theme } from '@material-ui/core';
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
      marginTop: theme.spacing(12)
    },
    pagination: {
      margin: theme.spacing(3, 0, 4),
      display: 'flex',
      justifyContent: 'space-between'
    },
    pageLinkButton: {
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular
    },
    chevronLeftIcon: {
      marginRight: theme.spacing(1)
    },
    chevronRightIcon: {
      marginLeft: theme.spacing(1)
    }
  })
);

const AppContentFooter = () => {
  const classes = useStyles({});

  const { t } = useTranslation();

  const {
    state: {
      navigation: { flattenedPages, activePage }
    }
  }: { state: RootState } = useHoux();

  const currentPageNum = flattenedPages.findIndex(
    page => page.pathname === activePage.pathname
  );
  const prevPage = flattenedPages[currentPageNum - 1];
  const nextPage = flattenedPages[currentPageNum + 1];

  return (
    <Container component='footer' className={classes.footer}>
      <React.Fragment>
        <Divider />
        <div className={classes.pagination}>
          {prevPage ? (
            <Button
              component={Link}
              naked
              href={prevPage.pathname}
              size='large'
              className={classes.pageLinkButton}
            >
              <ChevronLeftIcon
                fontSize='small'
                className={classes.chevronLeftIcon}
              />
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
              size='large'
              className={classes.pageLinkButton}
            >
              {t(`pages.${nextPage.pathname}`)}
              <ChevronRightIcon
                fontSize='small'
                className={classes.chevronRightIcon}
              />
            </Button>
          ) : null}
        </div>
      </React.Fragment>
    </Container>
  );
};

export default AppContentFooter;
