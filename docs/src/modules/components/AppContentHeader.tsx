import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { isMobileOnly } from 'react-device-detect';

import Breadcrumbs from './common/breadcrumbs';
import SpeedDial from './common/speedDial';
import Editpage from './Editpage';

export const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row'
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
    <>
      {!isMobileOnly ? (
        <div className={classes.header}>
          <Breadcrumbs />
          <div className={classes.headerSpace} />
          {markdownLocation ? (
            <Editpage
              markdownLocation={markdownLocation}
              sourceCodeRootUrl={SOURCE_CODE_ROOT_URL}
            />
          ) : null}
          <SpeedDial share={'test share'} />
        </div>
      ) : null}
    </>
  );
};

export default AppContentHeader;
