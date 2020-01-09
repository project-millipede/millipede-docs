import { Link } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

// import NextComposed from '../../../modules/components/common/button/NextComposed';
// import NextLinkMuiLink from '../../../modules/components/common/button/NextLinkMuiLink';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      fontSize: 13,
      padding: theme.spacing(0.5, 0, 0.5, 1),
      borderLeft: '4px solid transparent',
      boxSizing: 'content-box',

      // padding: "inherit",

      '&:hover': {
        borderLeft: `4px solid ${
          theme.palette.type === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[900]
        }`
      },
      '&$active,&:active': {
        borderLeft: `4px solid ${
          theme.palette.type === 'light'
            ? theme.palette.grey[300]
            : theme.palette.grey[800]
        }`
      }
    },
    secondaryItem: {
      // padding: "inherit",

      paddingLeft: theme.spacing(2.5)
    },
    active: {},
    list: {
      margin: 'inherit'
    }
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
  const classes = useStyles({});

  const handleClick = () => {
    const { href, scrollToLink } = props;
    scrollToLink(href);
  };

  const isActive =
    Array.from(props.activeState).filter(
      activeState => activeState === decodeURI(props.href).replace('#', '')
    ).length > 0;

  return (
    // <>
    //   <NextLinkMuiLink
    //     href={props.href}
    //     component={NextComposed}
    //     onClick={handleClick}
    //     display="block"
    //     underline="none"
    //     color={isActive ? "textPrimary" : "textSecondary"}
    //     className={clsx(
    //       classes.item,
    //       { [classes.secondaryItem]: props.secondary },
    //       isActive ? classes.active : undefined
    //     )}
    //   >
    //     {props.children}
    //   </NextLinkMuiLink>
    //   </>

    <div className={classes.list}>
      <Link
        key={props.href}
        href={props.href}
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
      </Link>
    </div>
  );
};

export default TocLink;
