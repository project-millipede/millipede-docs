import { Link as MUILink } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Link from './common/link/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      padding: theme.spacing(4, 0),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(8, 0)
      }
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(4)
    },
    title: {
      fontWeight: theme.typography.fontWeightMedium,
      textAlign: 'center'
    },
    list: {
      paddingLeft: 0,
      listStyle: 'none',
      '& li': {
        padding: '6px 0',
        color: theme.palette.text.secondary
      }
    },
    version: {
      marginTop: theme.spacing(3)
    }
  })
);

const HomeFooter = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <Container maxWidth='md'>
      <footer className={classes.footer}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <div className={classes.titleContainer}>
              <Typography className={classes.title}>
                {t('common:headTitle')}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography className={classes.title} gutterBottom>
              {t('common:footerCommunity')}
            </Typography>
            <ul className={classes.list}>
              <li>
                <Typography>
                  <MUILink
                    href='https://github.com/project-millipede/millipede-docs'
                    color='inherit'
                    variant='body2'
                  >
                    GitHub
                  </MUILink>
                </Typography>
              </li>
              <li>
                <Link
                  color='inherit'
                  variant='body2'
                  href='/discover-more/team'
                >
                  {t('common:pages./discover-more/team')}
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography className={classes.title} gutterBottom>
              {t('common:footerResources')}
            </Typography>
            <ul className={classes.list}>
              <li>
                <Link
                  color='inherit'
                  variant='body2'
                  href='/discover-more/organisation'
                >
                  {t('common:pages./discover-more/organisation')}
                </Link>
              </li>
              <li>
                <Link
                  color='inherit'
                  variant='body2'
                  href='/discover-more/support'
                >
                  {t('common:pages./discover-more/support')}
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
        <Typography
          className={classes.version}
          color='textSecondary'
          variant='body2'
        >
          {t('common:footerRelease', {
            versionNumber: `v${process.env.PROJECT_VERSION}`,
            license: t('common:license')
          })}
          {' Copyright © '}
          {new Date().getFullYear()}
          {' Project Millipede '}
        </Typography>
      </footer>
    </Container>
  );
};

export default HomeFooter;
