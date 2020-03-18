/* eslint-disable import/named */
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import Link from 'next/link';
import React, { useEffect } from 'react';

import { useTranslation } from '../../../../../i18n';
import { Icon, Page } from '../../../../../src/typings/data/import';
import CustomIcon from '../icon/CustomIcon';
import TreeItem, { TreeItemProps } from '../mui/TreeItem';
import TreeView from '../mui/TreeView';

interface LabelProps {
  labelText: string;
  icon: Icon;
}

interface TreeProps {
  data: Array<Page>;
  activePage: Page;
}

export const TransitionComponent = (props: TransitionProps) => {
  return <Collapse {...props} />;
};

const StyledTreeItem = withStyles((_theme: Theme) =>
  createStyles({
    group: {
      marginLeft: 0
    }
  })
)((props: TreeItemProps) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
));

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
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0)
    },
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1
    }
  })
);

const TreeLabel: React.FC<LabelProps> = ({ labelText, icon }) => {
  const classes = useStylesTreeLabel({});

  return (
    <ListItem button className={classes.listItemPadding}>
      <ListItemIcon>
        <CustomIcon icon={icon} />
      </ListItemIcon>
      <ListItemText secondary={labelText} />
    </ListItem>
  );
};

const generatePartialPathnames = (pathname: string): Array<string> =>
  (pathname || '')
    .split('/')
    .filter(s => !!s)
    .map((_name, index, arr) => `/${arr.slice(0, index + 1).join('/')}`);

export const Tree: React.FC<TreeProps> = ({ data, activePage }) => {
  const { t } = useTranslation();

  const [expanded, setExpanded] = React.useState<Array<string>>(undefined);
  const [selected, setSelected] = React.useState<string>(undefined);

  useEffect(() => {
    const pathnames = generatePartialPathnames(activePage.pathname);
    setExpanded(pathnames);
    setSelected(activePage.pathname);
  }, [activePage.pathname]);

  const createItem = ({ children, ...rest }: Page) => {
    const title = t(`pages.${rest.pathname}`);
    return (
      <Link href={rest.pathname} key={`link-${rest.pathname}`}>
        <StyledTreeItem
          key={rest.pathname}
          nodeId={rest.pathname}
          label={<TreeLabel labelText={title} icon={rest.icon} />}
        >
          {children && children.length > 0 ? children.map(createItem) : null}
        </StyledTreeItem>
      </Link>
    );
  };

  return expanded && selected ? (
    <TreeView
      defaultExpanded={expanded}
      defaultSelected={selected}
      expanded={expanded}
      selected={selected}
    >
      {data.map(createItem)}
    </TreeView>
  ) : null;
};
