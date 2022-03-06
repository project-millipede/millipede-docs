import { HiddenUnderlineLink } from '@app/components';
import TreeItem, { TreeItemContentProps, TreeItemProps, useTreeItem } from '@mui/lab/TreeItem';
import { Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import clsx from 'clsx';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';

import { NAV_ITEM_INDICATOR_WIDTH } from '../../constants';

const StyledTreeItem = styled(TreeItem)<TreeItemProps>(({ theme }) => ({
  '& .MuiTreeItem-group': {
    marginLeft: 0, // default set to 17px
    backgroundColor: theme.palette.grey[200]
  },
  '& .MuiTreeItem-content': {
    padding: theme.spacing(1, 0), // default set to theme.spacing(0, 1)
    borderRight: `${theme.spacing(NAV_ITEM_INDICATOR_WIDTH)} solid transparent`,
    '&.Mui-selected': {
      borderRight: `${theme.spacing(NAV_ITEM_INDICATOR_WIDTH)} solid ${
        theme.palette.secondary.main
      }`,
      backgroundColor: theme.palette.grey[300]
    },
    '&.Mui-expanded': {
      borderRight: `${theme.spacing(NAV_ITEM_INDICATOR_WIDTH)} solid ${
        theme.palette.secondary.main
      }`,
      backgroundColor: theme.palette.grey[300]
    },
    '& .MuiTreeItem-iconContainer': {
      width: '24px', // default set to 15px
      marginLeft: '24px',
      marginRight: '24px', // default set to 4px
      '& svg': {
        fontSize: '20px' // default set to 18px
      }
    },
    '& .MuiTreeItem-label': {
      paddingLeft: 0 // default set to 4px
    }
  }
}));

const CustomContent: ForwardRefRenderFunction<
  HTMLDivElement,
  TreeItemContentProps
> = (
  {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon
  },
  ref
) => {
  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    preventSelection(event);
  };

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    handleSelection(event);
  };

  const theme = useTheme();

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled
      })}
      onMouseDown={handleMouseDown}
      ref={ref}
    >
      <div className={classes.iconContainer}>{icon}</div>

      <Typography
        component={HiddenUnderlineLink}
        onClick={handleSelectionClick}
        className={classes.label}
        key={nodeId}
        href={{
          pathname: '/docs/[...slug]',
          query: { slug: nodeId.split('/') }
        }}
        prefetch={false}
        sx={{
          fontSize: '0.875rem',
          color: theme.palette.text.primary
        }}
      >
        {label}
      </Typography>

      <div className={classes.iconContainer} onClick={handleExpansionClick}>
        {expansionIcon}
      </div>
    </div>
  );
};

const CustomContentRef = forwardRef(CustomContent);

export const CustomTreeItem = (props: TreeItemProps) => (
  <StyledTreeItem ContentComponent={CustomContentRef} {...props} />
);
