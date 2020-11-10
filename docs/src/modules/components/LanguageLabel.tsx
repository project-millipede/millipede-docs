import { useHoux } from '@houx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';

import { RootState } from '../redux/reducers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    language: {
      margin: theme.spacing(0, 1.5, 0, 1.5),
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block'
      }
    }
  })
);

const LanguageLabel: FC = () => {
  const classes = useStyles();

  const {
    state: {
      language: { userLanguage }
    }
  }: { state: RootState } = useHoux();
  return <span className={classes.language}>{userLanguage.toUpperCase()}</span>;
};

export default LanguageLabel;
