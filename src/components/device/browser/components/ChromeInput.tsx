import { createStyles, IconButton, InputAdornment, InputBase, makeStyles, Theme } from '@material-ui/core';
import { InfoOutlined, Security } from '@material-ui/icons';
import React, { FC, useState } from 'react';

export const useStyles = makeStyles((_theme: Theme) => {
  const height = 48;
  const borderRadius = height / 2;
  return createStyles({
    input: {
      height: `${height}px`,
      backgroundColor: '#f1f3f4',
      borderRadius: `${borderRadius}px`
    },
    security: {
      color: '#4caf50' // green
    }
  });
});

export const ChromeInput: FC = () => {
  const classes = useStyles();

  const [enabled, setEnabled] = useState(false);

  return (
    <InputBase
      className={classes.input}
      startAdornment={
        <InputAdornment position='start'>
          <IconButton>
            <InfoOutlined />
          </IconButton>
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position='end'>
          <IconButton
            className={enabled && classes.security}
            onClick={() => {
              setEnabled(!enabled);
            }}
          >
            <Security />
          </IconButton>
        </InputAdornment>
      }
      placeholder={'https://bookface.com'}
    />
  );
};
