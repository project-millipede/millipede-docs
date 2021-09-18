import { HiddenUnderlineLink } from '@app/components';
import { NavigationState } from '@app/layout/src/recoil/features/pages/reducer';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useMemo } from 'react';

export interface BreadCrumb {
  link: string;
}

export const StyledMuiBreadcrumbs = styled(MuiBreadcrumbs)(({ theme }) => {
  return {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  };
});

export const createBreadcrumbsFromSlug = (
  slug: Array<string>
): Array<BreadCrumb> =>
  slug.map((_name, index, arr) => ({
    link: `${arr.slice(0, index + 1).join('/')}`
  }));

interface BreadcrumbsProps {
  slug: Array<string>;
  navigation?: NavigationState;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ slug }) => {
  const { t } = useTranslation();

  const [headBreadcrumbs, [tailBreadcrumb]] = useMemo(() => {
    const breadcrumbs = createBreadcrumbsFromSlug(slug);
    return [
      breadcrumbs.slice(0, breadcrumbs.length - 1),
      breadcrumbs.slice(-1)
    ];
  }, [slug]);

  return (
    <StyledMuiBreadcrumbs separator={<NavigateNextIcon fontSize='small' />}>
      {headBreadcrumbs &&
        headBreadcrumbs.length > 0 &&
        headBreadcrumbs.map((breadcrumb, index) => {
          const label = t(`common:pages.${breadcrumb.link}`);
          return (
            <Typography
              key={`breadcrumb-${index}`}
              component={HiddenUnderlineLink}
              href={{
                pathname: '/docs/[...slug]',
                query: { slug: breadcrumb.link.split('/') }
              }}
              prefetch={false}
            >
              {label}
            </Typography>
          );
        })}
      {tailBreadcrumb && tailBreadcrumb.link && (
        <Typography key='breadcrumb-tail'>
          {t(`common:pages.${tailBreadcrumb.link}`)}
        </Typography>
      )}
    </StyledMuiBreadcrumbs>
  );
};
