import { useHoux } from '@app/houx';
import { RootState as LayoutState } from '@app/layout';
import { createStyles, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import Breadcrumbs from './common/breadcrumbs';
import { createBreadcrumbs } from './common/breadcrumbs/Breadcrumbs';
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

interface MarkdownDocsProps {
  markdownLocation?: string;
}

const SOURCE_CODE_ROOT_URL =
  'https://github.com/project-millipede/millipede-docs/blob/master/docs/src';

export const AppContentHeader: FC<MarkdownDocsProps> = ({
  markdownLocation
}) => {
  const classes = useStyles();

  const { pathname } = useRouter();

  const {
    state: { view: { isMobile } } = {
      view: {
        isMobile: false
      }
    } as any
  }: { state: LayoutState } = useHoux();

  const breadcrumbs = createBreadcrumbs(pathname);

  return !isMobile && breadcrumbs.length >= 2 ? (
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
