import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

import AppContent from '../AppContent';
import AppFrame from '../AppFrame';
import AppTableOfContents from '../AppTableOfContents';
import Breadcrumbs from '../common/breadcrumbs';
import EditPage from '../Editpage';
import MarkdownDocsContents from '../MarkdownDocsContents';
import MdElement from './MdElement';

interface MarkdownDocsProps {
  content: string;
  markdownLocation?: string;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row'
    },
    headerSpace: {
      flexGrow: 1
    },
    headerItem: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column'
    }
  })
);

const SOURCE_CODE_ROOT_URL = 'https://github.com/gurkerl83/millipede-docs/blob/master/docs/src';

export const MdDocs = (props: MarkdownDocsProps) => {
  const classes = useStyles({});
  const { content, markdownLocation: markdownLocationProp } = props;
  return (
    <MarkdownDocsContents markdown={content} markdownLocation={markdownLocationProp}>
      {({ contents, markdownLocation }) => (
        <AppFrame>
          <AppTableOfContents content={content} />
          <AppContent>
            <div className={classes.header}>
              <Breadcrumbs />
              <div className={classes.headerSpace} />
              <EditPage
                markdownLocation={markdownLocation}
                sourceCodeRootUrl={SOURCE_CODE_ROOT_URL}
              />
            </div>
            <MdElement content={content} />
          </AppContent>
        </AppFrame>
      )}
    </MarkdownDocsContents>
  );
};

export default MdDocs;
