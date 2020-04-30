import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React, { forwardRef, ForwardRefRenderFunction, ReactNode, useEffect, useState } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    box: {
      padding: '10px',
      border: '3px solid black',
      maxWidth: '100px'
    },
    boxHover: {
      cursor: 'pointer',
      padding: '10px',
      border: '3px solid black',
      maxWidth: '100px',
      backgroundColor: '#888888'
    }
  })
);

interface CustomBoxProps {
  id?: string;
  bgcolor?: string;
  children: ReactNode;
}

export const CustomBox: ForwardRefRenderFunction<
  HTMLDivElement,
  CustomBoxProps
> = (
  {
    children,
    id,
    // bgcolor
    ...rest
  },
  ref
) => {
  const classes = useStyles();

  const router = useRouter();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    console.log('rest: ', rest);
    console.log((ref as React.MutableRefObject<HTMLDivElement>).current);
  }, [ref]);

  // return (
  //   <Box
  //     bgcolor={bgcolor}
  //     className={selected ? classes.boxHover : classes.box}
  //     onClick={_e => {
  //       router.push(`${router.pathname}#${id}`);
  //     }}
  //     onMouseEnter={_e => {
  //       setSelected(true);
  //     }}
  //     onMouseLeave={_e => {
  //       setSelected(false);
  //     }}
  //     // Workaround - Missing ref prop from mui-typescript
  //     {...{ ref }}
  //   >
  //     {children}
  //   </Box>
  // );
  return (
    <div
      // bgcolor={bgcolor}
      className={selected ? classes.boxHover : classes.box}
      onClick={_e => {
        router.push(`${router.pathname}#${id}`);
      }}
      onMouseEnter={_e => {
        setSelected(true);
      }}
      onMouseLeave={_e => {
        setSelected(false);
      }}
      // Workaround - Missing ref prop from mui-typescript
      ref={ref}
    >
      {children}
    </div>
  );
};

export default forwardRef(CustomBox);
