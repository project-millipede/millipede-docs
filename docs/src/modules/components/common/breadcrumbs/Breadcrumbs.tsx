import { Breadcrumbs as MaterialBreadcrumbs, Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import withRouter, { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link';
import React from 'react';

interface Props extends WithRouterProps {}

interface BreadCrumb {
  name: string;
  link: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  })
);

export const createBreadcrumbs = (str: string): Array<BreadCrumb> =>
  (str || '')
    .split('/')
    .filter(s => !!s)
    .map((name, index, arr) => ({
      name,
      link: `/${arr.slice(0, index + 1).join('/')}`
    }));

const Breadcrumbs: React.FC<Props> = props => {
  const breadcrumbs = createBreadcrumbs(props.router.pathname);

  const classes = useStyles({});

  if (breadcrumbs.length < 2) {
    return null;
  }

  // className={classes.root}

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
              const to = `/${breadcrumbs.slice(0, index + 1).join('/')}`;
              return last ? (
                <Button key={`breadcrumb-${index}`} disabled>
                  {breadcrumb.name}
                </Button>
              ) : (
                <Link key={`breadcrumb-${index}`} href={breadcrumb.link}>
                  <Button>{breadcrumb.name}</Button>
                </Link>
              );
            })}
          </MaterialBreadcrumbs>
        </>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Breadcrumbs);
