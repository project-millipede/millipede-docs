import { getIconByName, Link } from '@app/components';
import { PageTypes } from '@app/types';
import { CollectionUtil, RouterUtils } from '@app/utils';
import { Collapse, ListItem, ListItemText } from '@material-ui/core';
import { experimentalStyled as styled, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import { makeStyles } from '@material-ui/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { ChangeEvent, FC, memo, useEffect, useState } from 'react';

interface TreeLabelProps {
  labelText: string;
  pathname: string;
  hasChildren: boolean;
  expandedNodeIds: Array<string>;
}

interface TreeProps {
  pages: Array<PageTypes.Page>;
  flattenedPages: Array<PageTypes.FlattenedPage>;
  activePage: PageTypes.Page;
}

const useStylesTreeNode = makeStyles((theme: Theme) => ({
  node: {
    display: 'block',
    color: theme.palette.text.secondary,
    textDecoration: 'none'
  }
}));

export const TransitionComponent: FC<TransitionProps> = props => {
  return <Collapse {...props} />;
};

const StyledTreeItem = styled(TreeItem)<TreeItemProps>(({ theme }) => ({
  '& .MuiTreeItem-group': {
    margin: 0
  },
  '& .MuiTreeItem-content': {
    padding: 0,
    '&.Mui-selected': {
      borderRight: `2px solid ${theme.palette.primary.main}`
    },
    '&.Mui-expanded': {
      borderRight: `2px solid ${theme.palette.primary.main}`
    },
    '& .MuiTreeItem-iconContainer': {
      width: '24px',
      marginLeft: '24px',
      marginRight: '24px',
      '& svg': {
        fontSize: '24px'
      }
    }
  }

  // flat
  // '& .MuiTreeItem-content': {
  //   padding: 0
  // },
  // most important - without separator -content(.)Mui-
  // '& .MuiTreeItem-content.Mui-selected': {
  //   borderRight: `2px solid ${theme.palette.primary.main}`
  // },
  // '& .MuiTreeItem-content.Mui-expanded': {
  //   borderRight: `2px solid ${theme.palette.primary.main}`
  // },
  // most important - with separator -content( .)Mui-
  // '& .MuiTreeItem-content .MuiTreeItem-iconContainer': {
  //   width: '24px',
  //   marginLeft: '24px',
  //   marginRight: '24px'
  // },
  // '& .MuiTreeItem-content .MuiTreeItem-iconContainer svg': {
  //   fontSize: '24px'
  // }
}));

const TreeLabel: FC<TreeLabelProps> = ({
  labelText,
  pathname,
  hasChildren,
  expandedNodeIds
}) => {
  const handleExpansion = CollectionUtil.Array.contains([...expandedNodeIds]);

  let renderExpand = null;

  if (hasChildren) {
    if (handleExpansion(pathname)) {
      renderExpand = <ExpandLess />;
    } else {
      renderExpand = <ExpandMore />;
    }
  }

  return (
    <ListItem button>
      <ListItemText secondary={labelText} />
      {renderExpand}
    </ListItem>
  );
};

/*
Export tree with memoizing, default export currently used in the drawer;
Reason: Chrome on iOS does not animate the drawer open/close transitions correctly.
Investigation: Differentiate individual sections of the tree that need 
memoizing from those need changing.
*/
export const Tree: FC<TreeProps> = ({
  pages,
  flattenedPages,
  activePage = { pathname: '' }
}) => {
  const { t } = useTranslation();

  const classes = useStylesTreeNode();

  const [selected, setSelected] = useState<Array<string>>([]);

  const [expanded, setExpanded] = useState<Array<string>>([]);

  useEffect(() => {
    setSelected(
      RouterUtils.findSelectedPage(
        flattenedPages,
        `/docs/${activePage.pathname}`
      )
    );
    setExpanded(
      RouterUtils.findExpandedPages(
        flattenedPages,
        `/docs/${activePage.pathname}`
      )
    );
  }, [activePage.pathname]);

  const buildTreeItems = (nodes: Array<PageTypes.Page>) => {
    return nodes.map(node => {
      const { pathname, icon, children: nodes } = node;

      const title = t(`common:pages.${pathname}`);
      const item = (
        <StyledTreeItem
          key={`/docs/${pathname}`}
          nodeId={`/docs/${pathname}`}
          icon={getIconByName(icon.name)}
          label={
            <Link
              key={`/docs/${pathname}`}
              href={
                {
                  pathname: '/docs/[...slug]',
                  query: { slug: pathname.split('/') }
                } as any
              }
              className={classes.node}
              naked
              prefetch={false}
            >
              <TreeLabel
                labelText={title}
                hasChildren={nodes && nodes.length > 0}
                expandedNodeIds={expanded}
                pathname={`/docs/${pathname}`}
              />
            </Link>
          }
          TransitionComponent={TransitionComponent}
        >
          {nodes && nodes.length > 0 ? buildTreeItems(nodes) : null}
        </StyledTreeItem>
      );
      return item;
    });
  };

  const handleNodeSelect = (_event: ChangeEvent, nodeIds: Array<string>) => {
    setSelected(nodeIds);
  };

  const handleNodeToggle = (_event: ChangeEvent, nodeIds: Array<string>) => {
    setExpanded(nodeIds);
  };

  return (
    <TreeView
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleNodeToggle}
      onNodeSelect={handleNodeSelect}
      multiSelect={true}
    >
      {buildTreeItems(pages)}
    </TreeView>
  );
};

export default memo(Tree);
