import { Breadcrumbs as MaterialBreadcrumbs, Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

export interface BreadCrumb {
  link: string;
}

export const createBreadcrumbs = (pathname: string): Array<BreadCrumb> =>
  (pathname || '')
    .split('/')
    .filter(s => !!s)
    .map((_name, index, arr) => ({
      link: `/${arr.slice(0, index + 1).join('/')}`
    }));

const Breadcrumbs: FC = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const breadcrumbs = createBreadcrumbs(router.pathname);

  return (
    <MaterialBreadcrumbs
      separator={<NavigateNextIcon fontSize='small' />}
      aria-label='Breadcrumb'
    >
      {breadcrumbs.map((breadcrumb, index) => {
        const last = index === breadcrumbs.length - 1;
        const label = t(`common:pages.${breadcrumb.link}`);
        return last ? (
          <Button key={`breadcrumb-${index}`} disabled>
            {label}
          </Button>
        ) : (
          <Link key={`breadcrumb-${index}`} href={breadcrumb.link}>
            <Button>{label}</Button>
          </Link>
        );
      })}
    </MaterialBreadcrumbs>
  );
};

export default Breadcrumbs;
