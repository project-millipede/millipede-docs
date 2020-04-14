import { Link as MUILink } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { useTranslation } from '../../../../i18n';
import Link from './common/link/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(4)
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
    <Container component='footer'>
      <Grid container className={classes.container}>
        <Grid item xs={12} md={4}>
          <div className={classes.titleContainer}>
            <Typography className={classes.title}>{t('headTitle')}</Typography>
          </div>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography className={classes.title} gutterBottom>
            {t('footerCommunity')}
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
              <Link color='inherit' variant='body2' href='/discover-more/team'>
                {t('pages./discover-more/team')}
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography className={classes.title} gutterBottom>
            {t('footerResources')}
          </Typography>
          <ul className={classes.list}>
            <li>
              <Link
                color='inherit'
                variant='body2'
                href='/discover-more/organisation'
              >
                {t('pages./discover-more/organisation')}
              </Link>
            </li>
            <li>
              <Link
                color='inherit'
                variant='body2'
                href='/discover-more/support'
              >
                {t('pages./discover-more/support')}
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
        {t('footerRelease', {
          versionNumber: `v${process.env.PROJECT_VERSION}`,
          license: t('license')
        })}
        {' Copyright © '}
        {new Date().getFullYear()}
        {' Project Millipede '}
      </Typography>
    </Container>
  );
};

export default HomeFooter;
