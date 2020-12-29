// import { Link } from '@app/components';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC } from 'react';
import { Link } from 'react-scroll';
import { useRecoilValue } from 'recoil';

import { scrollItemsState } from '../../recoil/features/scroll/page/reducer';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      display: 'block',
      padding: theme.spacing(1),
      color: theme.palette.text.secondary,
      textDecoration: 'none'
    },
    active: {
      borderLeft: `2px solid ${theme.palette.primary.main}`,
      color: theme.palette.text.primary
    }
  })
);

interface TocLinkProps {
  href: string;
}

export const processLink = (
  activeState: { [key: string]: string },
  href: string
) => {
  return (
    Object.keys(activeState).filter(
      activeState => activeState === decodeURI(href).replace('#', '')
    ).length > 0
  );
};

export const TocLink: FC<TocLinkProps> = ({ href, children }) => {
  const classes = useStyles();

  const { scrollItems } = useRecoilValue(scrollItemsState);
  const isActive = processLink(scrollItems, href);

  // Use - when NextJs resolves a bug with dynamic pages and hash
  // return (
  //   <Link
  //     href={
  //       {
  //         pathname: '/docs/[...slug]',
  //         query: { slug: [...query.slug] },
  //         hash: href
  //       } as any
  //     }
  //     className={clsx(classes.item, isActive ? classes.active : undefined)}
  //     naked
  //   >
  //     {children}
  //   </Link>
  // );

  return (
    <Link
      className={clsx(classes.item, isActive ? classes.active : undefined)}
      to={decodeURI(href).replace('#', '')}
      spy={true}
      smooth={true}
      offset={-96}
      duration={500}
    >
      {children}
    </Link>
  );
};
