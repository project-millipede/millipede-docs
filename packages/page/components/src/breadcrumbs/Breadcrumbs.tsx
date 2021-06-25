import { Link } from '@app/components';
import { Breadcrumbs as MuiBreadcrumbs, Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

export interface BreadCrumb {
  link: string;
}

export const createBreadcrumbsFromSlug = (
  slug: Array<string>
): Array<BreadCrumb> =>
  slug.map((_name, index, arr) => ({
    link: `${arr.slice(0, index + 1).join('/')}`
  }));

export const Breadcrumbs: FC = () => {
  const { t } = useTranslation();

  const { query } = useRouter();

  const breadcrumbs = createBreadcrumbsFromSlug(query.slug as Array<string>);

  const headBreadcrumbs = breadcrumbs.slice(0, breadcrumbs.length - 1);
  const [tailBreadcrumb] = breadcrumbs.slice(-1);

  const theme = useTheme();

  return (
    <MuiBreadcrumbs separator={<NavigateNextIcon fontSize='small' />}>
      {headBreadcrumbs.map((breadcrumb, index) => {
        const label = t(`common:pages.${breadcrumb.link}`);
        return (
          <Button
            key={`breadcrumb-${index}`}
            size='medium'
            sx={{
              textTransform: 'none',
              fontWeight: theme.typography.fontWeightRegular,
              '& .MuiLink-root': {
                textDecoration: 'none'
              }
            }}
          >
            <Link
              href={
                {
                  pathname: '/docs/[...slug]',
                  query: { slug: breadcrumb.link.split('/') }
                } as any
              }
            >
              {label}
            </Link>
          </Button>
        );
      })}
      <Button
        key={`breadcrumb-tail`}
        disabled
        sx={{
          textTransform: 'none',
          fontWeight: theme.typography.fontWeightRegular
        }}
      >
        {t(`common:pages.${tailBreadcrumb.link}`)}
      </Button>
    </MuiBreadcrumbs>
  );
};
