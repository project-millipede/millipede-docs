import { HiddenUnderlineLink as Link } from '@app/components';
import { Container, Grid, GridProps, Link as MuiLink, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import useTranslation from 'next-translate/useTranslation';
import getConfig from 'next/config';
import React from 'react';

const { publicRuntimeConfig } = getConfig();

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
    <Container
      component='footer'
      sx={{
        padding: theme.spacing(8, 0)
      }}
    >
      <Grid container>
        <StyledGrid
          item
          md={3}
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
        <StyledGrid item xs={6} md={3}>
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
                href={{
                  pathname: '/docs/[...slug]',
                  query: { slug: 'discover-more/team'.split('/') }
                }}
                color='inherit'
                variant='body2'
              >
                {t('common:pages.discover-more/team')}
              </Link>
            </li>
          </ul>
        </StyledGrid>
        <StyledGrid item xs={6} md={3}>
          <Typography
            sx={{
              fontWeight: theme.typography.fontWeightMedium
            }}
            gutterBottom
          >
            {t('common:footerExplore')}
          </Typography>
          <ul>
            <li>
              {/* 
              Note: 
              The blog requires different fonts; they load only using the native link. 
              Use the native link instead of the nextJS link passing the property "href" as a string. 
              */}
              <Link href='/blog' color='inherit' variant='body2'>
                {t('common:blog')}
              </Link>
            </li>
          </ul>
        </StyledGrid>
        <StyledGrid item xs={6} md={3}>
          <Typography
            sx={{
              fontWeight: theme.typography.fontWeightMedium
            }}
            gutterBottom
          >
            {t('common:footerOrganisation')}
          </Typography>
          <ul>
            <li>
              <Link
                href={{
                  pathname: '/docs/[...slug]',
                  query: { slug: 'discover-more/organisation'.split('/') }
                }}
                color='inherit'
                variant='body2'
              >
                {t('common:about')}
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: '/docs/[...slug]',
                  query: { slug: 'discover-more/vision'.split('/') }
                }}
                color='inherit'
                variant='body2'
              >
                {t('common:pages.discover-more/vision')}
              </Link>
            </li>
          </ul>
        </StyledGrid>
      </Grid>
      <Typography color='textSecondary' variant='body2'>
        {t('common:footerRelease', {
          versionNumber: `v${publicRuntimeConfig.appVersion}`,
          license: t('common:license')
        })}
        {' Copyright © '}
        {new Date().getFullYear()}
        {' Project Millipede '}
      </Typography>
    </Container>
  );
};
