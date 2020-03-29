import { Breadcrumbs as MaterialBreadcrumbs, Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { useTranslation } from '../../../../../../i18n';

interface Props {}

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

const Breadcrumbs: React.FC<Props> = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const breadcrumbs = createBreadcrumbs(router.pathname);

  return (
    <React.Fragment>
      <div>
        <>
          <MaterialBreadcrumbs
            separator={<NavigateNextIcon fontSize='small' />}
            aria-label='Breadcrumb'
          >
            {breadcrumbs.map((breadcrumb, index) => {
              const last = index === breadcrumbs.length - 1;
              const label = t(`pages.${breadcrumb.link}`);
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
        </>
      </div>
    </React.Fragment>
  );
};

export default Breadcrumbs;
