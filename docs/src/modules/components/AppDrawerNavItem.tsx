import { Collapse, List, ListItemIcon, ListItemText, Theme } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { createStyles, makeStyles } from '@material-ui/styles';
import withRouter, { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link';
import React, { useState } from 'react';

// import MillipedeLink from './button/MillipedeLink';

interface AppDrawerNavItemProps extends React.Props<any> {
  title: string;
  icon?: React.ReactElement<SvgIconProps>;
  href?: string;
  onClick?: (event: React.SyntheticEvent) => void;
  openImmediately?: boolean;
  depth: number;
}

type Props = AppDrawerNavItemProps & WithRouterProps;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { paddingLeft: '8px' }
  })
);

const AppDrawerNavItem = ({
  title,
  icon,
  href,
  onClick,
  openImmediately = false,
  children
}: Props) => {
  const [open, setOpen] = useState(openImmediately);

  const classes = useStyles({});

  const handleClick = () => {
    setOpen(!open);
  };

  if (href) {
    return (
      <Link href={href}>
        <ListItem button onClick={onClick}>
          <ListItemIcon className={classes.root}>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      </Link>
    );
  }

  return (
    <>
      <ListItem button onClick={event => handleClick()}>
        <ListItemIcon className={classes.root}>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding dense>
          {children}
        </List>
      </Collapse>
    </>
  );
};

export default withRouter(AppDrawerNavItem);
