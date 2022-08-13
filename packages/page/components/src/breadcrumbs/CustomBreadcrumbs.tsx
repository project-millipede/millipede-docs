import { CustomIcon, HiddenUnderlineLink } from '@app/components';
import { Navigation } from '@app/types';
import { I18n } from '@app/utils';
import { Breadcrumbs as MuiBreadcrumbs, Chip, ChipProps } from '@mui/material';
import { emphasize, styled } from '@mui/material/styles';
import { FC, useMemo } from 'react';

export interface BreadCrumb {
  link: string;
}

export const createBreadcrumbsFromSlug = (
  slug: Array<string>
): Array<BreadCrumb> =>
  slug.map((_name, index, arr) => ({
    link: `${arr.slice(0, index + 1).join('/')}`
  }));

interface BreadcrumbsProps {
  slug: Array<string>;
  navigation: Navigation;
}

export const StyledMuiBreadcrumbs = styled(MuiBreadcrumbs)(({ theme }) => {
  return {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  };
});

const StyledBreadcrumb = styled(Chip)<ChipProps>(({ theme }) => {
  const backgroundColor = theme.palette.grey[100];

  return {
    backgroundColor,
    height: theme.spacing(4),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06)
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12)
    },
    '& svg': {
      marginLeft: theme.spacing(1),
      fontSize: '20px'
    }
  };
}) as typeof Chip;

export const CustomBreadcrumbs: FC<BreadcrumbsProps> = ({
  slug,
  navigation
}) => {
  const { flattenedPages } = navigation;

  const { t } = I18n.useTranslation();

  const [headBreadcrumbs, [tailBreadcrumb]] = useMemo(() => {
    const breadcrumbs = createBreadcrumbsFromSlug(slug);

    const allBreadcrumbLinks = breadcrumbs.map(breadcrumb => breadcrumb.link);
    const filteredPages = flattenedPages.filter(flattenedPage => {
      return allBreadcrumbLinks.includes(flattenedPage.pathname);
    });

    return [
      filteredPages.slice(0, filteredPages.length - 1),
      filteredPages.slice(-1)
    ];
  }, [slug]);

  return (
    <StyledMuiBreadcrumbs maxItems={2}>
      {headBreadcrumbs &&
        headBreadcrumbs.length > 0 &&
        headBreadcrumbs.map((breadcrumb, index) => {
          const label = t(`common:pages.${breadcrumb.pathname}`);
          return (
            <StyledBreadcrumb
              component={HiddenUnderlineLink}
              key={`breadcrumb-${index}`}
              label={label}
              icon={<CustomIcon icon={breadcrumb.icon} />}
              href={{
                pathname: '/docs/[...slug]',
                query: { slug: breadcrumb.pathname.split('/') }
              }}
              prefetch={false}
            />
          );
        })}
      {tailBreadcrumb && tailBreadcrumb.pathname && (
        <StyledBreadcrumb
          key='breadcrumb-tail'
          label={t(`common:pages.${tailBreadcrumb.pathname}`)}
          icon={<CustomIcon icon={tailBreadcrumb.icon} />}
        />
      )}
    </StyledMuiBreadcrumbs>
  );
};
