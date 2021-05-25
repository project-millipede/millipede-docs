import { createStyles, IconButton, InputAdornment, InputBase, makeStyles, Theme } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { CSSProperties } from '@material-ui/styles';
import React, { FC } from 'react';

export const useStyles = makeStyles((_theme: Theme) => {
  const height = 48;
  const borderRadius = height / 2;
  return createStyles({
    input: {
      // width: '100%',
      height: `${height}px`,
      backgroundColor: '#f1f3f4',
      borderRadius: `${borderRadius}px`
    }
  });
});

interface SimpleSearchProps {
  placeholder?: string;
  style?: CSSProperties;
}

export const SimpleSearch: FC<SimpleSearchProps> = ({
  placeholder = '',
  style
}) => {
  const classes = useStyles();
  return (
    <InputBase
      className={classes.input}
      style={{ ...style }}
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
