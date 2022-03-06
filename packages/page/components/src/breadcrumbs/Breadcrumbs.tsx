import { HiddenUnderlineLink } from '@app/components';
import { Navigation } from '@app/types';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
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
  navigation?: Navigation;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ slug, navigation }) => {
  const {
    activePage: { title },
    pageType
  } = navigation;

  const { t } = useTranslation();

  const [headBreadcrumbs, [tailBreadcrumb]] = useMemo(() => {
    const breadcrumbs = createBreadcrumbsFromSlug(slug);
    return [
      breadcrumbs.slice(0, breadcrumbs.length - 1),
      breadcrumbs.slice(-1)
    ];
  }, [slug]);

  const tailBreadcrumbLabel =
    pageType !== 'blog' ? t(`common:pages.${tailBreadcrumb.link}`) : title;

  return (
    <StyledMuiBreadcrumbs separator={<NavigateNextIcon fontSize='small' />}>
      {headBreadcrumbs &&
        headBreadcrumbs.length > 0 &&
        headBreadcrumbs.map((breadcrumb, index) => {
          const link =
            pageType !== 'blog'
              ? {
                  pathname: `/${pageType}/[...slug]`,
                  query: { slug: breadcrumb.link.split('/') }
                }
              : { pathname: `/blog` };

          const label =
            pageType !== 'blog' ? t(`common:pages.${breadcrumb.link}`) : 'Blog';

          return (
            <Typography
              key={`breadcrumb-${index}`}
              component={HiddenUnderlineLink}
              href={link}
              prefetch={false}
            >
              {label}
            </Typography>
          );
        })}
      {tailBreadcrumb && tailBreadcrumb.link && (
        <Typography key='breadcrumb-tail'>{tailBreadcrumbLabel}</Typography>
      )}
    </StyledMuiBreadcrumbs>
  );
};
