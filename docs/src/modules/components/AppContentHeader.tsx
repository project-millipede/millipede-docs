import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { isMobileOnly } from 'react-device-detect';

import Breadcrumbs from './common/breadcrumbs';
import SpeedDial from './common/speedDial';
import Editpage from './Editpage';

export const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    headerRow: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1
    },
    headerColumn: {
      display: 'flex',
      flexDirection: 'column'
    },
    headerSpace: {
      flexGrow: 1
    }
  })
);

interface MarkdownDocsProps {
  markdownLocation?: string;
}

const SOURCE_CODE_ROOT_URL = 'https://github.com/gurkerl83/millipede-docs/blob/master/docs/src';

export const AppContentHeader = ({ markdownLocation }: MarkdownDocsProps) => {
  const classes = useStyles({});

  return (
    <div className={classes.headerColumn}>
      {!isMobileOnly ? (
        <div className={classes.headerRow}>
          <Breadcrumbs />
          {markdownLocation ? (
            <Editpage
              markdownLocation={markdownLocation}
              sourceCodeRootUrl={SOURCE_CODE_ROOT_URL}
            />
          ) : null}
        </div>
      ) : null}
      <div className={classes.headerRow}>
        <div className={classes.headerSpace} />
        <SpeedDial share={'test share'} />
      </div>
    </div>
  );
};

export default AppContentHeader;
