import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { FC } from 'react';

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

interface LanguageLabelProps {
  label: string;
}

export const LanguageLabel: FC<LanguageLabelProps> = ({ label }) => {
  const classes = useStyles();
  return <span className={classes.language}>{label?.toUpperCase()}</span>;
};
