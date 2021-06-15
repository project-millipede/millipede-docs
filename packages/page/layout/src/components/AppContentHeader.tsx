import { APP_CONTENT_HEADER_HEIGHT } from '@app/layout/src/recoil/features/layout/reducer';
import { makeStyles } from '@material-ui/styles';
import { Breadcrumbs } from '@page/components';
import React, { FC } from 'react';

import { EditPage } from './Editpage';

const useStyles = makeStyles(() => ({
  headerRow: {
    display: 'flex',
    flexGrow: 1,
    height: APP_CONTENT_HEADER_HEIGHT
  }
}));

interface AppContentHeaderProps {
  markdownLocation?: string;
}

const SOURCE_CODE_ROOT_URL =
  'https://github.com/project-millipede/millipede-docs/blob/master/docs/src';

export const AppContentHeader: FC<AppContentHeaderProps> = ({
  markdownLocation
}) => {
  const classes = useStyles();

  return (
    <div className={classes.headerRow}>
      <Breadcrumbs />
      {markdownLocation ? (
        <EditPage
          markdownLocation={markdownLocation}
          sourceCodeRootUrl={SOURCE_CODE_ROOT_URL}
        />
      ) : null}
    </div>
  );
};
