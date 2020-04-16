import { createStyles, makeStyles, Theme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SecurityIcon from '@material-ui/icons/Security';
import React, { useState } from 'react';

export const useStyles = makeStyles(({ spacing }: Theme) => {
  const minHeight = 36;
  const borderRadius = minHeight / 2;

  const space = spacing(1); // default = 8;
  const backgroundColor = '#F1F3F4';

  const inputPadding = space / 4;
  return createStyles({
    root: {
      backgroundColor,
      borderRadius: `${borderRadius}px`,
      padding: inputPadding
    },
    icon: {
      padding: `${space / 2}px ${space}px`,
      borderRadius: `${borderRadius}px`
    },
    security: {
      padding: `${space / 2}px ${space}px`,
      borderRadius: `${borderRadius}px`,
      zIndex: 1000,
      color: '#00FF00'
    }
  });
});

const ChromeInput = () => {
  const styles = useStyles();

  const [enabled, setEnabled] = useState(false);

  return (
    <InputBase
      className={styles.root}
      placeholder={'https://bookface.com'}
      startAdornment={
        <IconButton className={styles.icon}>
          <InfoOutlinedIcon />
        </IconButton>
      }
      endAdornment={
        <IconButton
          className={enabled ? styles.security : styles.icon}
          onClick={() => {
            setEnabled(!enabled);
          }}
        >
          <SecurityIcon />
        </IconButton>
      }
    />
  );
};

export default ChromeInput;
