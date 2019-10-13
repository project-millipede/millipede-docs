import { Divider } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { useTranslation } from '../../../../i18n';
import Link from './common/link/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      padding: theme.spacing(3, 0),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(8, 0)
      },
      marginTop: '48px'
    },
    container: {
      marginTop: '24px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(4),
      '& img': {
        width: 28,
        height: 28,
        marginRight: theme.spacing(1.5)
      }
    },
    list: {
      marginBottom: theme.spacing(4),
      '& h3': {
        fontWeight: theme.typography.fontWeightMedium
      },
      '& ul': {
        margin: 0,
        paddingLeft: 0,
        listStyle: 'none'
      },
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

export const HomeFooter = () => {
  const classes = useStyles({});

  const { t } = useTranslation();

  return (
    <Container component='footer' className={classes.footer}>
      <Divider />
      <Grid container className={classes.container}>
        <Grid item xs={12} md={3}>
          <div className={classes.logo}>
            <Typography color='primary'>{t('headTitle')}</Typography>
          </div>
        </Grid>
        <Grid item xs={6} md={3} className={classes.list}>
          <Typography component='h3' gutterBottom>
            {t('footerCommunity')}
          </Typography>
          <ul>
            <li>
              <Link
                color='inherit'
                variant='body2'
                href='https://github.com/gurkerl83/millipede-docs'
              >
                GitHub
              </Link>
            </li>
            <li>
              <Link color='inherit' variant='body2' href='/discover-more/team'>
                {t('pages./discover-more/team')}
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={6} md={3} className={classes.list}>
          <Typography component='h3' gutterBottom>
            {t('footerResources')}
          </Typography>
          <ul>
            <li>
              <Link color='inherit' variant='body2' href='/discover-more/support'>
                {t('pages./discover-more/support')}
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={6} md={3}>
          <ul className={classes.list} />
        </Grid>
      </Grid>
      <Typography className={classes.version} color='textSecondary' variant='body2'>
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
