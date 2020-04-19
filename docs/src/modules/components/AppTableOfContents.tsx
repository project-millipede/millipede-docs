import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';

import { useTranslation } from '../../../../i18n';
import TOCComponent from '../../markdown/components/toc/TocComponent';

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
      overflowY: 'auto',
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      },
      '& ul': {
        paddingLeft: 0,
        listStyle: 'none',
        '& li': {
          // paddingLeft: theme.spacing(2),
          color: theme.palette.text.primary
        }
      },
      margin: theme.spacing(3)
    },
    tocHeader: {
      height: 56,
      padding: theme.spacing(1)
    }
  })
);

interface AppTableOfContentsProps {
  content: string;
}

const AppTableOfContents = ({ content }: AppTableOfContentsProps) => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <nav className={classes.root}>
      <Typography className={classes.tocHeader}>{t('toc')}</Typography>
      <TOCComponent content={content} />
    </nav>
  );
};

export default AppTableOfContents;
