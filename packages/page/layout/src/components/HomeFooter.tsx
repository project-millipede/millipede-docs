import { Link } from '@app/components';
import { Container, Grid, GridProps, Link as MuiLink, Typography } from '@material-ui/core';
import { styled, useTheme } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& ul': {
    paddingLeft: 0,
    listStyle: 'none'
  },
  '& li': {
    padding: theme.spacing(1, 0),
    color: theme.palette.text.secondary,
    '& a': {
      textDecoration: 'none'
    }
  }
}));

export const HomeFooter = () => {
  const { t } = useTranslation();

  const theme = useTheme();

  return (
    <Container component='footer' sx={{ padding: theme.spacing(8, 0) }}>
      <Grid container>
        <StyledGrid
          item
          md={4}
          sx={{
            [theme.breakpoints.down('md')]: {
              display: 'none'
            }
          }}
        >
          <Typography
            sx={{
              fontWeight: theme.typography.fontWeightMedium
            }}
          >
            {t('common:headTitle')}
          </Typography>
        </StyledGrid>
        <StyledGrid item xs={6} md={4}>
          <Typography
            sx={{
              fontWeight: theme.typography.fontWeightMedium
            }}
            gutterBottom
          >
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
        </StyledGrid>
        <StyledGrid item xs={6} md={4}>
          <Typography
            sx={{
              fontWeight: theme.typography.fontWeightMedium
            }}
            gutterBottom
          >
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
        </StyledGrid>
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
    </Container>
  );
};
