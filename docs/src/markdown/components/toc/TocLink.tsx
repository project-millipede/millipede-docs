import { Link } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { FC } from 'react';

// import NextComposed from '../../../modules/components/common/button/NextComposed';
// import NextLinkMuiLink from '../../../modules/components/common/button/NextLinkMuiLink';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      fontSize: 13,
      padding: theme.spacing(0.5, 0, 0.5, 1),
      borderLeft: '4px solid transparent',
      boxSizing: 'content-box',
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
      paddingLeft: theme.spacing(2.5)
    },
    active: {},
    list: {
      margin: 'inherit'
    }
  })
);

interface TocLinkProps extends React.Props<any> {
  activeState: Set<string>;
  href: string;
  secondary: boolean;
}

const TocLink: FC<TocLinkProps> = ({
  activeState,
  href,
  secondary,
  children
}) => {
  const classes = useStyles({});

  const isActive =
    Array.from(activeState).filter(
      activeState => activeState === decodeURI(href).replace('#', '')
    ).length > 0;

  return (
    // <>
    //   <NextLinkMuiLink
    //     href={href}
    //     component={NextComposed}
    //     onClick={handleClick}
    //     display="block"
    //     underline="none"
    //     color={isActive ? "textPrimary" : "textSecondary"}
    //     className={clsx(
    //       classes.item,
    //       { [classes.secondaryItem]: secondary },
    //       isActive ? classes.active : undefined
    //     )}
    //   >
    //     {children}
    //   </NextLinkMuiLink>
    //   </>

    <div className={classes.list}>
      <Link
        key={href}
        href={href}
        display='block'
        underline='none'
        color={isActive ? 'textPrimary' : 'textSecondary'}
        className={clsx(
          classes.item,
          { [classes.secondaryItem]: secondary },
          isActive ? classes.active : undefined
        )}
      >
        {children}
      </Link>
    </div>
  );
};

export default TocLink;
