import { Box, createStyles, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { FC, ReactNode, useState } from 'react';

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
      backgroundColor: '#E0E0E0'
    }
  })
);

interface CustomBoxProps {
  id?: string;
  bgcolor?: string;
  children: ReactNode;
}

export const CustomBox: FC<CustomBoxProps> = ({ children, id, bgcolor }) => {
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
    >
      {children}
    </Box>
  );
};
