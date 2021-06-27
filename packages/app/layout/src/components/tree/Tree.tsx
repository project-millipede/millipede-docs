import { getIconByName, Link } from '@app/components';
import { ACTIVE_INDICATOR_WIDTH } from '@app/layout/src/recoil/features/layout/reducer';
import { NavigationState, navigationState } from '@app/layout/src/recoil/features/pages/reducer';
import { PageTypes } from '@app/types';
import { CollectionUtil } from '@app/utils';
import { Collapse, ListItem, ListItemText } from '@material-ui/core';
import { styled, useTheme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import useTranslation from 'next-translate/useTranslation';
import React, { ChangeEvent, FC } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';

interface TreeLabelProps {
  labelText: string;
  pathname: string;
  hasChildren: boolean;
  expandedNodeIds: Array<string>;
}

interface TreeProps {
  pages: Array<PageTypes.Page>;
  selectedPage: Array<string>;
  expandedPages: Array<string>;
  setNavigation?: SetterOrUpdater<NavigationState>;
}

export const TransitionComponent: FC<TransitionProps> = props => {
  return <Collapse {...props} />;
};

const StyledTreeItem = styled(TreeItem)<TreeItemProps>(({ theme }) => ({
  '& .MuiTreeItem-group': {
    margin: 0
  },
  '& .MuiTreeItem-content': {
    padding: 0,
    // borderRight: `2px solid transparent`,
    '&.Mui-selected': {
      borderRight: `${theme.spacing(0.25)} solid ${
        theme.palette.secondary.main
      }`
    },
    '&.Mui-expanded': {
      borderRight: `${theme.spacing(0.25)}  solid ${
        theme.palette.secondary.main
      }`
    },
    '& .MuiTreeItem-iconContainer': {
      width: '24px',
      marginLeft: '24px',
      marginRight: '24px',
      '& svg': {
        fontSize: '24px'
      }
    },
    '& .MuiTreeItem-label': {
      padding: 0,
      '& a': {
        textDecoration: 'none',
        color: theme.palette.text.secondary
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

  const theme = useTheme();

  if (hasChildren) {
    if (handleExpansion(pathname)) {
      renderExpand = (
        <ExpandLess
          sx={{
            margin: theme.spacing(0, 1)
          }}
        />
      );
    } else {
      renderExpand = (
        <ExpandMore
          sx={{
            // Important:
            // Correct layout shift caused by the border-right style applied to navigation
            // indicator located in the tree component
            marginLeft: theme.spacing(1),
            marginRight: `calc(${theme.spacing(
              1
            )} + ${ACTIVE_INDICATOR_WIDTH}px)`
          }}
        />
      );
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
export const Tree: FC<TreeProps> = (
  {
    // pages,
    // selectedPage,
    // expandedPages
  }
) => {
  const { t } = useTranslation();

  const [{ pages, selectedPage, expandedPages }, setNavigation] =
    useRecoilState(navigationState);

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
              naked
              prefetch={false}
            >
              <TreeLabel
                labelText={title}
                hasChildren={nodes && nodes.length > 0}
                expandedNodeIds={expandedPages}
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
    setNavigation(state => {
      return {
        ...state,
        selectedPage: nodeIds
      };
    });
  };

  const handleNodeToggle = (_event: ChangeEvent, nodeIds: Array<string>) => {
    setNavigation(state => {
      return {
        ...state,
        expandedPages: nodeIds
      };
    });
  };

  return (
    <TreeView
      expanded={expandedPages}
      selected={selectedPage}
      onNodeToggle={handleNodeToggle}
      onNodeSelect={handleNodeSelect}
      multiSelect={true}
      sx={{ overflowX: 'hidden', overflowY: 'auto' }}
    >
      {buildTreeItems(pages)}
    </TreeView>
  );
};

export default Tree;
