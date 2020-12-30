import { Box, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  MutableRefObject,
  ReactNode,
  useImperativeHandle,
  useState,
} from 'react';
import { Link } from 'react-scroll';

import { SelectHandles } from './types';

export interface StyleProps {
  bgcolor: string;
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  box: {
    padding: '10px',
    border: '3px solid black',
    backgroundColor: props => props.bgcolor,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxHover: {
    cursor: 'pointer',
    backgroundColor: '#E0E0E0'
  }
}));

export interface CustomBoxProps {
  children: ReactNode;
  routeSegement?: string;
  bgcolor?: string;
  dynamicRef?: MutableRefObject<SelectHandles>;
}

const CustomBox: ForwardRefRenderFunction<HTMLDivElement, CustomBoxProps> = (
  { routeSegement, children, bgcolor, dynamicRef },
  ref
) => {
  const classes = useStyles({ bgcolor });

  const [selected, setSelected] = useState(false);

  useImperativeHandle(
    dynamicRef,
    () => ({
      select: () => {
        setSelected(true);
      },
      unSelect: () => {
        setSelected(false);
      }
    }),
    []
  );

  return (
    <Link
      to={decodeURI(routeSegement).replace('#', '')}
      spy={true}
      smooth={true}
      offset={-96}
      duration={500}
    >
      <Box
        className={clsx(classes.box, {
          [classes.boxHover]: selected
        })}
        onMouseEnter={_e => {
          setSelected(true);
        }}
        onMouseLeave={_e => {
          setSelected(false);
        }}
        // onClick={_e => {
        //   const { push, asPath, pathname, query, locale } = router;
        //   push(
        //     {
        //       pathname,
        //       query: { slug: query.slug },
        //       hash: `#${routeSegement}`
        //     },
        //     asPath,
        //     { locale }
        //   );
        // }}
        ref={ref}
      >
        {children}
      </Box>
    </Link>
  );
};

export default forwardRef(CustomBox);
