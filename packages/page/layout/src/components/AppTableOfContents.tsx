import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { TocComponent } from './toc';

export const WIDTH_TOC = 225;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: WIDTH_TOC,
      top: 96,
      order: 2,
      flexShrink: 0,
      position: 'sticky',
      height: 'calc(100% - 96px)',
      margin: theme.spacing(1),
      overflowY: 'auto',
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      },
      '& ul': {
        paddingLeft: 0,
        listStyle: 'none'
      }
    },
    tocHeader: {
      height: 56,
      padding: theme.spacing(1),
      fontSize: 16,
      fontWeight: 'bold'
    }
  })
);

export interface AppTableOfContentsProps {
  content: string;
}

export const AppTableOfContents: FC<AppTableOfContentsProps> = ({
  content
}) => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <nav className={classes.root}>
      <Typography className={classes.tocHeader}>{t('common:toc')}</Typography>
      <TocComponent content={content} />
    </nav>
  );
};
