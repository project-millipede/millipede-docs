import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';

const useStyles = makeStyles((_theme: Theme) =>
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
  children: React.ReactNode;
  id?: string;
  bgcolor?: string;
}

export const CustomBox: FC<CustomBoxProps> = ({ children, id, bgcolor }) => {
  const classes = useStyles({});

  const router = useRouter();
  const [selected, setSelected] = useState(false);

  return (
    <Box
      bgcolor={bgcolor}
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
    >
      {children}
    </Box>
  );
};
