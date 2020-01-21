import React from 'react';
import ClassOutlinedIcon from '@material-ui/icons/ClassOutlined';
import { Chip, makeStyles, Theme, createStyles } from '@material-ui/core';

export interface TagProps {
  text: string;
}

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    chip: {
      marginTop: '16px',
      marginBottom: '16px'
    }
  })
);

export const Tag = ({ text }) => {
  const classes = useStyles({});

  return (
    <Chip
      variant='outlined'
      color='primary'
      icon={<ClassOutlinedIcon />}
      label={text}
      className={classes.chip}
    />
  );
};
