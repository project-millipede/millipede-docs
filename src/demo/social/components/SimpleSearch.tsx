import { createStyles, IconButton, InputAdornment, InputBase, makeStyles, Theme } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import React, { FC } from 'react';

export const useStyles = makeStyles((_theme: Theme) => {
  const height = 48;
  const borderRadius = height / 2;
  return createStyles({
    input: {
      width: '100%',
      height: `${height}px`,
      backgroundColor: '#f1f3f4',
      borderRadius: `${borderRadius}px`
    }
  });
});

interface SimpleSearchProps {
  placeholder?: string;
}

const SimpleSearch: FC<SimpleSearchProps> = ({ placeholder = '' }) => {
  const classes = useStyles();
  return (
    <InputBase
      className={classes.input}
      startAdornment={
        <InputAdornment position={'start'}>
          <IconButton>
            <Search />
          </IconButton>
        </InputAdornment>
      }
      placeholder={placeholder}
    />
  );
};

export default SimpleSearch;
