/* eslint-disable import/named */
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import useTranslation from 'next-translate/useTranslation';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { Icon, Page } from '../../../../../src/typings/data/import';
import { contains } from '../../utils/collection/array';
import Link from '../common/link/Link';
import CustomIcon from '../icon/CustomIcon';

interface TreeLabelProps {
  labelText: string;
  icon: Icon;
  pathname?: string;
  hasChildren?: boolean;
  expandedNodeIds?: Array<string>;
}

interface TreeProps {
  data: Array<Page>;
  activePage: Page;
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

  const handleExpansion = contains([...expandedNodeIds]);

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
      <ListItemIcon>
        <CustomIcon icon={icon} />
      </ListItemIcon>
      <ListItemText secondary={labelText} />
      {renderExpand}
    </ListItem>
  );
};

export const generatePartialPathnames = (
  pathname: string,
  exact: boolean
): Array<string> =>
  (pathname || '')
    .split('/')
    .filter(s => !!s)
    .map(
      (_name, index, arr) =>
        `/${arr.slice(0, exact ? index + 1 : index).join('/')}`
    );

export const Tree: FC<TreeProps> = ({ data, activePage = {} }) => {
  const { t } = useTranslation();

  const classes = useStylesTreeNode();

  const [expanded, setExpanded] = useState<Array<string>>(
    generatePartialPathnames(activePage.pathname, false)
  );
  const [selected, setSelected] = useState<Array<string>>(
    generatePartialPathnames(activePage.pathname, true)
  );

  useEffect(() => {
    setExpanded(generatePartialPathnames(activePage.pathname, false));
    setSelected(generatePartialPathnames(activePage.pathname, true));
  }, [activePage.pathname]);

  const createItem = ({ children, ...rest }: Page) => {
    const title = t(`common:pages.${rest.pathname}`);
    return (
      <StyledTreeItem
        key={rest.pathname}
        nodeId={rest.pathname}
        label={<TreeLabel labelText={title} icon={rest.icon} />}
      >
        {children && children.length > 0 ? children.map(createItem) : null}
      </StyledTreeItem>
    );
  };

  const buildTreeItems = (nodes: Array<Page>) => {
    if (!nodes) {
      return null;
    }
    return nodes.map(node => {
      const title = t(`common:pages.${node.pathname}`);
      const item = (
        <StyledTreeItem
          key={node.pathname}
          nodeId={node.pathname}
          label={
            <TreeLabel
              labelText={title}
              icon={node.icon}
              hasChildren={node.children && node.children.length > 0}
              expandedNodeIds={expanded}
              pathname={node.pathname}
            />
          }
        >
          {node.children && node.children.length > 0
            ? buildTreeItems(node.children)
            : null}
        </StyledTreeItem>
      );

      return node.children && node.children.length > 0 ? (
        item
      ) : (
        <Link
          key={`link-${node.pathname}`}
          href={node.pathname}
          className={classes.node}
          naked
        >
          {item}
        </Link>
      );
    });
  };

  const handleNodeToggle = (
    _event: ChangeEvent<{}>,
    nodeIds: Array<string>
  ) => {
    setExpanded(nodeIds);
  };

  return (
    <TreeView
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleNodeToggle}
      multiSelect={true}
    >
      {buildTreeItems(data)}
    </TreeView>
  );
};
