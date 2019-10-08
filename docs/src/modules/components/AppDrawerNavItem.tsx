import { Collapse, Icon, List, ListItemIcon, ListItemText, Theme } from '@material-ui/core';
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemPadding: {
      [theme.breakpoints.down('xs')]: {
        paddingLeft: '16px',
        paddingRight: '16px'
      },
      [theme.breakpoints.up('sm')]: {
        paddingLeft: '24px',
        paddingRight: '24px'
      }
    }
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
        <ListItem button onClick={onClick} className={classes.listItemPadding}>
          <ListItemIcon>
            <Icon>{icon}</Icon>
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      </Link>
    );
  }

  return (
    <>
      <ListItem button onClick={handleClick} className={classes.listItemPadding}>
        <ListItemIcon>
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
