import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useCommonStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: 'center',
    fontWeight: theme.typography.fontWeightMedium,
    hyphens: 'auto',
    '-ms-hyphens': 'auto',
    '-moz-hyphens': 'auto',
    '-webkit-hyphens': 'auto'
  }
}));
