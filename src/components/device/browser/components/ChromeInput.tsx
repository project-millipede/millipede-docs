import { createStyles, IconButton, InputBase, makeStyles, Theme } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SecurityIcon from '@material-ui/icons/Security';
import React, { useState } from 'react';

export const useStyles = makeStyles((theme: Theme) => {
  const height = 36;
  const borderRadius = height / 2;
  return createStyles({
    root: {
      backgroundColor: '#f1f3f4',
      borderRadius: `${borderRadius}px`
    },
    icon: {
      padding: theme.spacing(1)
    },
    security: {
      padding: theme.spacing(1),
      color: '#4caf50' // green
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
        <IconButton size='small' className={styles.icon}>
          <InfoOutlinedIcon />
        </IconButton>
      }
      endAdornment={
        <IconButton
          size='small'
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
