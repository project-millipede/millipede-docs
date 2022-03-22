import { HiddenUnderlineLink } from '@app/components';
import { Container, Grid, GridProps, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled, useTheme } from '@mui/material/styles';
import useTranslation from 'next-translate/useTranslation';
import getConfig from 'next/config';
import { FC } from 'react';

export const Link = styled(HiddenUnderlineLink)({
  fontSize: '0.875rem',
  color: 'inherit',
  '&:hover': {
    color: grey[500]
  }
});

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

export const HomeFooter: FC = () => {
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
              <Link href='https://github.com/project-millipede/millipede-docs'>
                Github
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: '/docs/[...slug]',
                  query: { slug: 'discover-more/team'.split('/') }
                }}
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
              <Link href='/blog'>{t('common:blog')}</Link>
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
