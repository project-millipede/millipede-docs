import { createStyles, makeStyles } from '@material-ui/core';
import { Breadcrumbs } from '@page/components';
import React, { FC } from 'react';
import { isMobile } from 'react-device-detect';

import { EditPage } from './Editpage';

const useStyles = makeStyles(() =>
  createStyles({
    headerRow: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      height: '56px'
    }
  })
);

interface AppContentHeaderProps {
  markdownLocation?: string;
}

const SOURCE_CODE_ROOT_URL =
  'https://github.com/project-millipede/millipede-docs/blob/master/docs/src';

export const AppContentHeader: FC<AppContentHeaderProps> = ({
  markdownLocation
}) => {
  const classes = useStyles();

  return !isMobile ? (
    <div className={classes.headerRow}>
      <Breadcrumbs />
      {markdownLocation ? (
        <EditPage
          markdownLocation={markdownLocation}
          sourceCodeRootUrl={SOURCE_CODE_ROOT_URL}
        />
      ) : null}
    </div>
  ) : null;
};
