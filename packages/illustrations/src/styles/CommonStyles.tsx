import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useCommonStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textAlign: 'center',
      fontWeight: theme.typography.fontWeightMedium,
      hyphens: 'auto',
      '-ms-hyphens': 'auto',
      '-moz-hyphens': 'auto',
      '-webkit-hyphens': 'auto'
    }
  })
);
