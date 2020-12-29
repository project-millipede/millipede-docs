import { Chip, createStyles, makeStyles, Theme } from '@material-ui/core';
import { ClassOutlined } from '@material-ui/icons';
import React, { FC } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      margin: theme.spacing(2, 0)
    }
  })
);

interface TagProps {
  text: string;
  id: string;
}

export const Tag: FC<TagProps> = ({ text, id }) => {
  const classes = useStyles();

  return (
    <Chip
      id={id}
      variant='outlined'
      color='primary'
      icon={<ClassOutlined />}
      label={text}
      className={classes.chip}
    />
  );
};
