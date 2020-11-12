import { Box, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  MutableRefObject,
  ReactNode,
  useImperativeHandle,
  useState,
} from 'react';

export interface StyleProps {
  bgcolor: string;
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  box: {
    padding: '10px',
    border: '3px solid black',
    maxWidth: '100px',
    backgroundColor: props => props.bgcolor
  },
  boxHover: {
    cursor: 'pointer',
    padding: '10px',
    border: '3px solid black',
    maxWidth: '100px',
    backgroundColor: '#E0E0E0'
  }
}));

export interface SelectHandles {
  select: () => void;
  unSelect: () => void;
}

interface CustomBoxProps {
  children: ReactNode;
  routeSegement?: string;
  bgcolor?: string;
  dynamicRef?: MutableRefObject<SelectHandles>;
}

export const CustomBox: ForwardRefRenderFunction<
  HTMLDivElement,
  CustomBoxProps
> = ({ routeSegement, children, bgcolor, dynamicRef }, ref) => {
  const classes = useStyles({ bgcolor });

  const { pathname, push } = useRouter();
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
    <Box
      className={clsx({
        [classes.boxHover]: selected,
        [classes.box]: !selected
      })}
      onClick={_e => {
        if (routeSegement) {
          push(`${pathname}#${routeSegement}`);
        }
      }}
      // onMouseEnter={_e => {
      //   setSelected(true);
      // }}
      // onMouseLeave={_e => {
      //   setSelected(false);
      // }}
      ref={ref}
    >
      {children}
    </Box>
  );
};

export default forwardRef(CustomBox);
