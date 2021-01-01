import { createStyles, makeStyles } from '@material-ui/core';

export const useCommonStyles = makeStyles(() =>
  createStyles({
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      hyphens: 'auto',
      '-ms-hyphens': 'auto',
      '-moz-hyphens': 'auto',
      '-webkit-hyphens': 'auto'
    }
  })
);
