import { Link } from '@app/components';
import { createStyles, Grid, Link as MuiLink, makeStyles, Theme, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      padding: theme.spacing(4, 0)
    },
    listItem: {
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },
    list: {
      marginBottom: theme.spacing(4),
      '& ul': {
        paddingLeft: 0,
        listStyle: 'none'
      },
      '& li': {
        padding: theme.spacing(1, 0),
        color: theme.palette.text.secondary
      }
    },
    head: {
      fontWeight: theme.typography.fontWeightMedium
    }
  })
);

export const HomeFooter = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <footer className={classes.footer}>
      <Grid container>
        <Grid item md={4} className={classes.listItem}>
          <Typography className={classes.head}>
            {t('common:headTitle')}
          </Typography>
        </Grid>
        <Grid item xs={6} md={4} className={classes.list}>
          <Typography className={classes.head} gutterBottom>
            {t('common:footerCommunity')}
          </Typography>
          <ul>
            <li>
              <Typography>
                <MuiLink
                  href='https://github.com/project-millipede/millipede-docs'
                  color='inherit'
                  variant='body2'
                >
                  GitHub
                </MuiLink>
              </Typography>
            </li>
            <li>
              <Link
                href={
                  {
                    pathname: '/docs/[...slug]',
                    query: { slug: 'discover-more/team'.split('/') }
                  } as any
                }
                color='inherit'
                variant='body2'
              >
                {t('common:pages.discover-more/team')}
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={6} md={4} className={classes.list}>
          <Typography className={classes.head} gutterBottom>
            {t('common:footerResources')}
          </Typography>
          <ul>
            <li>
              <Link
                href={
                  {
                    pathname: '/docs/[...slug]',
                    query: { slug: 'discover-more/organisation'.split('/') }
                  } as any
                }
                color='inherit'
                variant='body2'
              >
                {t('common:pages.discover-more/organisation')}
              </Link>
            </li>
            <li>
              <Link
                href={
                  {
                    pathname: '/docs/[...slug]',
                    query: { slug: 'discover-more/support'.split('/') }
                  } as any
                }
                color='inherit'
                variant='body2'
              >
                {t('common:pages.discover-more/support')}
              </Link>
            </li>
          </ul>
        </Grid>
      </Grid>
      <Typography color='textSecondary' variant='body2'>
        {t('common:footerRelease', {
          versionNumber: `v${process.env.PROJECT_VERSION}`,
          license: t('common:license')
        })}
        {' Copyright © '}
        {new Date().getFullYear()}
        {' Project Millipede '}
      </Typography>
    </footer>
  );
};
