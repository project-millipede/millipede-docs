import { CustomIcon } from '@app/components';
import { PageTypes } from '@app/types';
import { Collapse } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import useTranslation from 'next-translate/useTranslation';
import { FC, Fragment } from 'react';

import { CustomTreeItem } from './CustomTreeItem';

interface TreeContentProps {
  pages: Array<PageTypes.Page>;
  activePage: PageTypes.FlattenedPage;
}

export const TransitionComponent: FC<TransitionProps> = props => {
  return <Collapse {...props} />;
};

export const TreeContent: FC<TreeContentProps> = ({ pages }) => {
  const { t } = useTranslation();

  const createTree = (page: PageTypes.Page) => {
    const { pathname, children, icon } = page;

    const title = t(`common:pages.${pathname}`);

    return (
      <CustomTreeItem
        key={pathname}
        nodeId={pathname}
        icon={<CustomIcon icon={icon} />}
        label={title}
        TransitionComponent={TransitionComponent}
      >
        {Array.isArray(children)
          ? children.map((page: PageTypes.Page) => createTree(page))
          : null}
      </CustomTreeItem>
    );
  };

  return (
    <Fragment>
      {pages.map((page: PageTypes.Page) => {
        return createTree(page);
      })}
    </Fragment>
  );
};
