import { Chip, createStyles, makeStyles, Theme } from '@material-ui/core';
import ClassOutlinedIcon from '@material-ui/icons/ClassOutlined';
import React from 'react';

export interface TagProps {
  text: string;
  id: string;
}

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    chip: {
      marginTop: '16px',
      marginBottom: '16px'
    }
  })
);

export const Tag = ({ text, id }) => {
  const classes = useStyles({});

  return (
    <Chip
      id={id}
      variant='outlined'
      color='primary'
      icon={<ClassOutlinedIcon />}
      label={text}
      className={classes.chip}
    />
  );
};
