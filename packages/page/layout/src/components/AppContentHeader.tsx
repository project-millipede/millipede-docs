import { APP_CONTENT_HEADER_HEIGHT } from '@app/layout/src/recoil/features/layout/reducer';
import { Container } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Breadcrumbs } from '@page/components';
import React, { FC } from 'react';

import { EditPage } from './Editpage';

interface AppContentHeaderProps {
  markdownLocation?: string;
}

const SOURCE_CODE_ROOT_URL =
  'https://github.com/project-millipede/millipede-docs/blob/master/docs/src';

export const AppContentHeader: FC<AppContentHeaderProps> = ({
  markdownLocation
}) => {
  const theme = useTheme();

  return (
    <Container
      component='header'
      sx={{
        display: 'flex',
        flexGrow: 1,
        height: theme.spacing(APP_CONTENT_HEADER_HEIGHT)
      }}
    >
      <Breadcrumbs />
      {markdownLocation ? (
        <EditPage
          markdownLocation={markdownLocation}
          sourceCodeRootUrl={SOURCE_CODE_ROOT_URL}
        />
      ) : null}
    </Container>
  );
};
