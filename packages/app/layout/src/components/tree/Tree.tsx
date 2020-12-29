import { getIconByName, Link } from '@app/components';
import { PageTypes } from '@app/types';
import { CollectionUtil, RouterUtils } from '@app/utils';
import { Collapse, createStyles, ListItem, ListItemIcon, ListItemText, makeStyles, Theme } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import useTranslation from 'next-translate/useTranslation';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';

interface TreeLabelProps {
  labelText: string;
  icon: PageTypes.Icon;
  pathname?: string;
  hasChildren?: boolean;
  expandedNodeIds?: Array<string>;
}

interface TreeProps {
  pages: Array<PageTypes.Page>;
  flattenedPages: Array<PageTypes.FlattenedPage>;
  activePage?: PageTypes.Page;
  pathname: string;
}

const useStylesTreeNode = makeStyles((theme: Theme) =>
  createStyles({
    node: {
      display: 'block',
      color: theme.palette.text.secondary,
      textDecoration: 'none'
    }
  })
);

export const TransitionComponent: FC<TransitionProps> = props => {
  return <Collapse {...props} />;
};

export const useTreeItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    expanded: {
      borderRight: `2px solid ${theme.palette.primary.main}`
    },
    selected: {
      borderRight: `2px solid ${theme.palette.primary.main}`
    },
    group: {
      margin: 0
    },
    content: {
      padding: 0
    },
    iconContainer: {
      width: 0,
      marginRight: 0
    },
    label: {
      paddingLeft: 0
    }
  })
);

const StyledTreeItem: FC<TreeItemProps> = props => {
  const classes = useTreeItemStyles();
  return (
    <TreeItem
      classes={{
        root: classes.root,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        content: classes.content,
        iconContainer: classes.iconContainer,
        label: classes.label
      }}
      {...props}
      TransitionComponent={TransitionComponent}
    />
  );
};

const useStylesTreeLabel = makeStyles((theme: Theme) =>
  createStyles({
    listItemPadding: {
      [theme.breakpoints.down('xs')]: {
        paddingLeft: '16px',
        paddingRight: '16px'
      },
      [theme.breakpoints.up('sm')]: {
        paddingLeft: '24px',
        paddingRight: '24px'
      }
    }
  })
);

const TreeLabel: FC<TreeLabelProps> = ({
  labelText,
  icon,
  pathname,
  hasChildren,
  expandedNodeIds
}) => {
  const classes = useStylesTreeLabel();

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
    <ListItem button className={classes.listItemPadding}>
      <ListItemIcon>{getIconByName(icon.name)}</ListItemIcon>
      <ListItemText secondary={labelText} />
      {renderExpand}
    </ListItem>
  );
};

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
                icon={icon}
                hasChildren={nodes && nodes.length > 0}
                expandedNodeIds={expanded}
                pathname={`/docs/${pathname}`}
              />
            </Link>
          }
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