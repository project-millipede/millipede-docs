import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

import NextComposed from '../../../modules/components/common/button/NextComposed';
import NextLinkMuiLink from '../../../modules/components/common/button/NextLinkMuiLink';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      top: 70,
      // Fix IE 11 position sticky issue.
      marginTop: 70,
      width: 175,
      flexShrink: 0,
      order: 2,
      position: 'sticky',
      height: 'calc(100vh - 70px)',
      overflowY: 'auto',
      padding: theme.spacing(2, 2, 2, 0),
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    },
    contents: {
      marginTop: theme.spacing(2),
      paddingLeft: theme.spacing(1.5)
    },

    item: {
      fontSize: 13,
      padding: theme.spacing(0.5, 0, 0.5, 1),
      borderLeft: '4px solid transparent',
      boxSizing: 'content-box',
      '&:hover': {
        borderLeft: `4px solid ${
          theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
        }`
      },
      '&$active,&:active': {
        borderLeft: `4px solid ${
          theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[800]
        }`
      }
    },
    secondaryItem: {
      paddingLeft: theme.spacing(2.5)
    },
    active: {}
  })
);

interface Props extends React.Props<any> {
  initialvalue: number;
  activeState: Set<string>;
  href: string;
  secondary: boolean;
  scrollToLink?: (href: string) => void;
}

const TocLink = (props: Props) => {
  const classes = useStyles();

  const handleClick = () => {
    const { href, scrollToLink } = props;
    scrollToLink(href);
  };

  const isActive =
    Array.from(props.activeState).filter(activeState => activeState === props.href.replace('#', ''))
      .length > 0;

  return (
    <>
      <NextLinkMuiLink
        href={props.href}
        component={NextComposed}
        onClick={handleClick}
        display='block'
        underline='none'
        color={isActive ? 'textPrimary' : 'textSecondary'}
        className={clsx(
          classes.item,
          { [classes.secondaryItem]: props.secondary },
          isActive ? classes.active : undefined
        )}
      >
        {props.children}
      </NextLinkMuiLink>
    </>
  );
};

export default TocLink;
