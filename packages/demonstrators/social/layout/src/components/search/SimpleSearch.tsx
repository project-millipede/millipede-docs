import { INPUT_BORDER_RADIUS, INPUT_HEIGHT } from '@app/layout/src/recoil/features/layout/reducer';
import { IconButton, InputAdornment, InputBase, Theme } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { CSSProperties, makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';

export const useStyles = makeStyles((_theme: Theme) => {
  return {
    input: {
      height: INPUT_HEIGHT,
      borderRadius: INPUT_BORDER_RADIUS,
      backgroundColor: '#F1F1F1'
    }
  };
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
