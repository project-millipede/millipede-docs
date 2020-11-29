import { Chip, createStyles, makeStyles } from '@material-ui/core';
import { ClassOutlined } from '@material-ui/icons';
import React, { FC } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    chip: {
      marginTop: '16px',
      marginBottom: '16px'
    }
  })
);

interface TagProps {
  text: string;
  id: string;
}

const Tag: FC<TagProps> = ({ text, id }) => {
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

export default Tag;
