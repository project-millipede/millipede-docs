import { Collapse, List, ListItemIcon, ListItemText } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { Theme } from '@material-ui/core/styles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { createStyles, makeStyles } from '@material-ui/styles';
import withRouter, { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link';
import React, { useState } from 'react';

// import MillipedeLink from './button/MillipedeLink';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4)
    },

    item: {
      display: 'block',
      paddingTop: 0,
      paddingBottom: 0
    },
    itemLeaf: {
      display: 'flex',
      paddingTop: 0,
      paddingBottom: 0
    },
    button: {
      letterSpacing: 0,
      justifyContent: 'flex-start',
      textTransform: 'none',
      width: '100%'
    },
    buttonLeaf: {
      letterSpacing: 0,
      justifyContent: 'flex-start',
      textTransform: 'none',
      width: '100%',
      fontWeight: theme.typography.fontWeightRegular,
      '&.depth-0': {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    active: {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium
    }
  })
);

interface AppDrawerNavItemProps extends React.Props<any> {
  title: string;
  icon?: React.ReactElement<SvgIconProps>;
  depth: number;
  href?: string;
  onClick?: (event: React.SyntheticEvent) => void;
  openImmediately?: boolean;
  topLevel?: boolean;
}

type Props = AppDrawerNavItemProps & WithRouterProps;

const AppDrawerNavItem = ({
  title,
  icon,
  depth,
  href,
  onClick,
  openImmediately = false,
  topLevel = false,
  children,
  ...other
}: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(openImmediately);

  const handleClick = () => {
    setOpen(!open);
  };

  // const style = {
  //   paddingLeft: 8 * (3 + 2 * depth)
  // };

  if (href) {
    return (
      <Link href={href}>
        <ListItem button onClick={onClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      </Link>
    );
  }

  return (
    <>
      <ListItem button onClick={event => handleClick()}>
        <ListItemIcon>{icon}</ListItemIcon>
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

  // if (href) {
  //   return (
  //     <ListItem
  //       // button
  //       // className={classes.itemLeaf}
  //       // disableGutters
  //       // {...other}
  //       onClick={onClick}
  //     >
  //       <NextLinkButton
  //         component={Link}
  //         // naked
  //         // activeClassName={`drawer-active ${classes.active}`}
  //         href={href}
  //         // className={clsx(classes.buttonLeaf, `depth-${depth}`)}
  //         // disableTouchRipple
  //         onClick={onClick}
  //         // style={style}
  //       >
  //         <ListItemIcon>{icon}</ListItemIcon>
  //         <ListItemText primary={title} />
  //       </NextLinkButton>
  //     </ListItem>
  //   );
  // }

  // return (
  //   <>
  //     <ListItem
  //       button
  //       // className={classes.item}
  //       // disableGutters
  //       // {...other}
  //       onClick={event => handleClick()}
  //     >
  //       {/* <Button
  //         // classes={
  //         //   {
  //         //     // root: classes.button,
  //         //     label: openImmediately ? "algolia-lvl0" : ""
  //         //   }
  //         // }
  //         onClick={handleClick}
  //         // style={style}
  //       >
  //         <ListItemIcon>{icon}</ListItemIcon>
  //         <ListItemText primary={title} />
  //       </Button> */}

  //       <ListItemIcon>{icon}</ListItemIcon>
  //       <ListItemText primary={title} />
  //       {open ? <ExpandLess /> : <ExpandMore />}
  //     </ListItem>
  //     <Collapse in={open} timeout="auto" unmountOnExit>
  //       <List component="div" disablePadding dense>
  //         {children}
  //       </List>
  //     </Collapse>
  //   </>
  // );
};

export default withRouter(AppDrawerNavItem);
