import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useState
} from 'react';

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
> = ({ children, id, bgcolor }, ref) => {
  const classes = useStyles();

  const { pathname, push } = useRouter();
  const [selected, setSelected] = useState(false);

  return (
    <Box
      bgcolor={bgcolor}
      className={selected ? classes.boxHover : classes.box}
      onClick={_e => {
        push(`${pathname}#${id}`);
      }}
      onMouseEnter={_e => {
        setSelected(true);
      }}
      onMouseLeave={_e => {
        setSelected(false);
      }}
      // Workaround - Box props do not accept a reference prop
      {...{ ref }}
    >
      {children}
    </Box>
  );
};

export default forwardRef(CustomBox);
