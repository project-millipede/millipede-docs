import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { isMobileOnly } from 'react-device-detect';

import Breadcrumbs from './common/breadcrumbs';
import Editpage from './Editpage';

export const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    headerRow: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      height: '56px'
    }
  })
);

interface MarkdownDocsProps {
  markdownLocation?: string;
}

const SOURCE_CODE_ROOT_URL = 'https://github.com/gurkerl83/millipede-docs/blob/master/docs/src';

export const AppContentHeader = ({ markdownLocation }: MarkdownDocsProps) => {
  const classes = useStyles({});

  return !isMobileOnly ? (
    <div className={classes.headerRow}>
      <Breadcrumbs />
      {markdownLocation ? (
        <Editpage markdownLocation={markdownLocation} sourceCodeRootUrl={SOURCE_CODE_ROOT_URL} />
      ) : null}
    </div>
  ) : null;
};

export default AppContentHeader;
