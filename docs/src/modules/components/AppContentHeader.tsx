import { useHoux } from '@houx';
import { createStyles, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';

import { RootState } from '../redux/reducers';
import Breadcrumbs from './common/breadcrumbs';
import { createBreadcrumbs } from './common/breadcrumbs/Breadcrumbs';
import Editpage from './Editpage';

export const useStyles = makeStyles(() =>
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

const SOURCE_CODE_ROOT_URL =
  'https://github.com/project-millipede/millipede-docs/blob/master/docs/src';

const AppContentHeader = ({ markdownLocation }: MarkdownDocsProps) => {
  const classes = useStyles();

  const { pathname } = useRouter();

  const {
    state: {
      view: { isMobile }
    }
  }: { state: RootState } = useHoux();

  const breadcrumbs = createBreadcrumbs(pathname);

  return !isMobile && breadcrumbs.length >= 2 ? (
    <div className={classes.headerRow}>
      <Breadcrumbs />
      {markdownLocation ? (
        <Editpage
          markdownLocation={markdownLocation}
          sourceCodeRootUrl={SOURCE_CODE_ROOT_URL}
        />
      ) : null}
    </div>
  ) : null;
};

export default AppContentHeader;
