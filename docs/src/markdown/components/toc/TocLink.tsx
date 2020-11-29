import { Link } from '@app/components';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

import { scrollItemsState } from '../../../modules/recoil/features/scroll/page/reducer';

const useStyles = makeStyles((theme: Theme) =>
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
  children: ReactNode;
}

const processLink = (activeState: { [key: string]: string }, href: string) => {
  return (
    Object.keys(activeState).filter(
      activeState => activeState === decodeURI(href).replace('#', '')
    ).length > 0
  );
};

const TocLink: FC<TocLinkProps> = ({ href, children }) => {
  const classes = useStyles();

  const { scrollItems } = useRecoilValue(scrollItemsState);
  const isActive = processLink(scrollItems, href);

  return (
    <Link
      href={href}
      className={clsx(classes.item, isActive ? classes.active : undefined)}
      naked
    >
      {children}
    </Link>
  );
};

export default TocLink;
