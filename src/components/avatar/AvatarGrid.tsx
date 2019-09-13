import { Theme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { blue, green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    greenAvatar: {
      margin: 10,
      color: '#fff',
      backgroundColor: green[500],
      width: '56px',
      height: '56px'
    },
    blueAvatar: {
      margin: 10,
      color: '#fff',
      backgroundColor: blue[500],
      width: '56px',
      height: '56px'
    }
  })
);

interface AvatarGridProps {
  letter?: Array<string>;
}

const AvatarGrid = ({ letter }: AvatarGridProps) => {
  const classes = useStyles({});

  return (
    <Grid container justify='center' alignItems='center'>
      {letter.map(l => {
        return <Avatar className={classes.greenAvatar}>{l}</Avatar>;
      })}
    </Grid>
  );
};
export default AvatarGrid;
