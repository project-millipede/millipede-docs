import { createStyles, makeStyles, Theme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import StarBorder from '@material-ui/icons/StarBorder';
import React from 'react';

export const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      padding: '2px',
      borderRadius: '100px',
      backgroundColor: '#F1F3F4'
      // marginTop: '8px',
      // marginBottom: '8px'
    },
    icon: {
      padding: '4px 8px',
      borderRadius: '100px'
    }
  })
);

const ChromeInput = () => {
  //   const styles = useChromeInputStyles();
  const styles = useStyles({});
  return (
    <InputBase
      className={styles.root}
      placeholder={'https://bookface.com'}
      startAdornment={
        <IconButton className={styles.icon}>
          <InfoOutlined />
        </IconButton>
      }
      endAdornment={
        <IconButton className={styles.icon}>
          <StarBorder />
        </IconButton>
      }
    />
  );
};

export default ChromeInput;
