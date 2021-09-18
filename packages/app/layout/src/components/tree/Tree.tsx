import { PageTypes } from '@app/types';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import TreeView from '@mui/lab/TreeView';
import React, { FC, SyntheticEvent, useEffect, useState } from 'react';

import { TreeContent } from './TreeContent';

interface TreeProps {
  pages: Array<PageTypes.Page>;
  expandedPages: Array<string>;
  activePage: PageTypes.FlattenedPage;
}

export const Tree: FC<TreeProps> = ({ pages, expandedPages, activePage }) => {
  const [tempExpandedPages, setTempExpandedPages] = useState(expandedPages);

  useEffect(() => {
    setTempExpandedPages(expandedPages);
  }, [expandedPages]);

  const handleNodeToggle = (
    event: SyntheticEvent<Element, Event>,
    nodeIds: Array<string>
  ) => {
    setTempExpandedPages(nodeIds);
    event.preventDefault();
  };

  return (
    <TreeView
      expanded={tempExpandedPages}
      selected={activePage.pathname}
      defaultCollapseIcon={<ExpandLess />}
      defaultExpandIcon={<ExpandMore />}
      multiSelect={false}
      onNodeToggle={handleNodeToggle}
      sx={{
        overflowX: 'hidden',
        overflowY: 'auto'
      }}
    >
      <TreeContent pages={pages} activePage={activePage} />
    </TreeView>
  );
};
