import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useHoux } from 'houx';
import React, { FC, ReactNode, useMemo } from 'react';

import Link from '../../../modules/components/common/link/Link';
import { RootState } from '../../../modules/redux/reducers';

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

const processLink = (activeState: Set<string>, href: string) => {
  return (
    Array.from(activeState).filter(
      activeState => activeState === decodeURI(href).replace('#', '')
    ).length > 0
  );
};

const TocLink: FC<TocLinkProps> = ({ href, children }) => {
  const classes = useStyles();

  const {
    state: {
      scroll: { position: activeState }
    }
  }: { state: RootState } = useHoux();

  const isActive = useMemo(() => processLink(activeState, href), [
    href,
    activeState.size
  ]);

  return (
    <Link
      key={href}
      href={href}
      className={clsx(classes.item, isActive ? classes.active : undefined)}
      naked
    >
      {children}
    </Link>
  );
};

export default TocLink;
