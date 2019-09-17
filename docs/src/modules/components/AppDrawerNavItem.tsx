import { Collapse, Icon, List, ListItemIcon, ListItemText, Theme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import ListItem from '@material-ui/core/ListItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { createStyles, makeStyles } from '@material-ui/styles';
import withRouter, { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link';
import React, { useState } from 'react';

interface AppDrawerNavItemProps extends React.Props<any> {
  title: string;
  icon?: string;
  href?: string;
  onClick?: (event: React.SyntheticEvent) => void;
  openImmediately?: boolean;
  depth: number;
  highlight: boolean;
}

type Props = AppDrawerNavItemProps & WithRouterProps;

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    listItem: {
      backgroundColor: blue[700]
    },
    root: { paddingLeft: '8px' }
  })
);

// TODO: Identify a clean concept to highlight special drawer items
// e.g. topics PET and PID/P have in common.

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
          <ListItemIcon className={classes.root}>
            <Icon>{icon}</Icon>
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      </Link>
    );
  }

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon className={classes.root}>
          <Icon>{icon}</Icon>
        </ListItemIcon>
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
