import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

import NextComposed from '../../modules/components/common/button/NextComposed';
import NextLinkMuiLink from '../../modules/components/common/button/NextLinkMuiLink';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      top: 70,
      // Fix IE 11 position sticky issue.
      marginTop: 70,
      width: 175,
      flexShrink: 0,
      order: 2,
      position: "sticky",
      height: "calc(100vh - 70px)",
      overflowY: "auto",
      padding: theme.spacing(2, 2, 2, 0),
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    contents: {
      marginTop: theme.spacing(2),
      paddingLeft: theme.spacing(1.5)
    }
    // ul: {
    //   padding: 0,
    //   margin: 0,
    //   listStyleType: "none"
    // },

    // item: {
    //   fontSize: 13,
    //   padding: theme.spacing(0.5, 0, 0.5, 1),
    //   borderLeft: "4px solid transparent",
    //   boxSizing: "content-box",
    //   "&:hover": {
    //     borderLeft: `4px solid ${
    //       theme.palette.type === "light" ? theme.palette.grey[200] : theme.palette.grey[900]
    //     }`
    //   },
    //   "&$active,&:active": {
    //     borderLeft: `4px solid ${
    //       theme.palette.type === "light" ? theme.palette.grey[300] : theme.palette.grey[800]
    //     }`
    //   }
    // },

    // item: {
    //   display: block,

    //   ul: {
    //     li: {
    //      ul: {
    //       overflow: hidden,
    //       // line-height: 0,
    //       opacity: 0,
    //       // transition: line-height 0.2s ease-in-out, opacity 0.4s ease-in-out;
    //      }
    //     }
    //   },

    //   ul: {
    //     li: {
    //     "&:active": {
    //      ul: {
    //       opacity: 1,
    //       // line-height: 2,
    //      }
    //     }
    //   }
    // },

    // secondaryItem: {
    //   paddingLeft: theme.spacing(2.5)
    // },
    // active: {}
  })
);

const counterStyle = {
  /* styles skipped for brevity */
};

// interface Props extends React.Props<any> {
//   initialvalue: number;
//   renderFunction?: Function;
//   callback?: (string) => void;
// }

// const Counter = ({ initialvalue = 0, renderFunction, callback, children }: Props) => {
//   const [value, setValue] = React.useState(initialvalue);

//   const handleIncrement = () => {
//     setValue(value + 1);
//     callback("Increment");
//   };

//   const handleDecrement = () => {
//     setValue(value - 1);
//     callback("Decrement");
//   };

//   if (_.isFunction(renderFunction)) {
//     return renderFunction(value);
//   } else
//     return (
//       <>
//         <span style={counterStyle}>
//           <strong style={{ flex: `1 1` }}>{value}</strong>
//           <button onClick={handleDecrement}>-1</button>
//           <button onClick={handleIncrement}>+1</button>
//         </span>
//         {children}
//       </>
//     );
// };

// export default Counter;

interface Props {}

const EmptyCounter = (props: any) => {
  const classes = useStyles();

  const handleClick = () => {
    const { href, callback } = props;
    callback(href);
  };

  // return (
  //   <NextLinkMuiLink
  //     display="block"
  //     // color={activeState === item.hash ? "textPrimary" : "textSecondary"}
  //     href={`/${props.href}`}
  //     underline="none"
  //     onClick={handleClick}
  //     // className={clsx(
  //     //   classes.item,
  //     //   { [classes.secondaryItem]: secondary },
  //     //   activeState === item.hash ? classes.active : undefined
  //     // )}
  //   >
  //     {/* <span dangerouslySetInnerHTML={{ __html: item.text }} /> */}
  //     {props.children}
  //   </NextLinkMuiLink>
  // );

  return (
    <NextLinkMuiLink
      href={props.href}
      onClick={handleClick}
      component={NextComposed}
      // target={target}
      // className={className}
      // rel={rel}

      display="block"
      underline="none"
      color={props.activeState === props.href ? "textPrimary" : "textSecondary"}
      // className={clsx(
      //   classes.item,
      //   { [classes.secondaryItem]: props.secondary },
      //   props.activeState === props.href ? classes.active : undefined
      // )}
      // className={clsx(classes.item)}
    >
      {props.children}
    </NextLinkMuiLink>
  );

  // const itemLink = (item, secondary) => (
  //   <Link
  //     display="block"
  //     color={activeState === item.hash ? 'textPrimary' : 'textSecondary'}
  //     href={`#${item.hash}`}
  //     underline="none"
  //     onClick={handleClick(item.hash)}
  //     className={clsx(
  //       classes.item,
  //       { [classes.secondaryItem]: secondary },
  //       activeState === item.hash ? classes.active : undefined,
  //     )}
  //   >
  //     <span dangerouslySetInnerHTML={{ __html: item.text }} />
  //   </Link>
  // );
};

export default EmptyCounter;
