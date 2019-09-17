import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHoux } from 'houx';
import React from 'react';

import { RootState } from '../redux/reducers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    language: {
      margin: theme.spacing(0, 1.5, 0, 1.5)
    }
  })
);

const Language = () => {
  const classes = useStyles({});

  const {
    state: {
      language: { userLanguage }
    }
  }: { state: RootState } = useHoux();

  return <span className={classes.language}>{userLanguage.toUpperCase()}</span>;
};

export default Language;
