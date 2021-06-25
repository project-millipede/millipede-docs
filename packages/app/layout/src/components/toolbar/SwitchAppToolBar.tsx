import { Components } from '@app/render-utils';
import { Box, IconButton, Toolbar, Tooltip } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { GitHub, Menu } from '@material-ui/icons';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { AppBarProps } from '.';
import { TOOLBAR_HEIGHT } from '../../recoil/features/layout/reducer';
import { AppToolBar } from './AppToolBar';
import { AppToolBarMobile } from './AppToolBarMobile';
import { LanguageMenu } from './LanguageMenu';

const {
  Media: { Media }
} = Components;

export const SwitchAppToolBar: FC<AppBarProps> = ({
  isDrawerExpanded,
  handleDrawerOpen
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const toolBar = (
    <Toolbar
      sx={{
        minHeight: theme.spacing(TOOLBAR_HEIGHT),
        padding: theme.spacing(0, 3)
      }}
    >
      <IconButton
        edge='start'
        color='inherit'
        onClick={handleDrawerOpen}
        sx={{
          display: isDrawerExpanded && 'none',
          padding: theme.spacing(1.5)
        }}
      >
        <Menu />
      </IconButton>

      <Box sx={{ flexGrow: 1 }} />

      <LanguageMenu />

      <Tooltip title={t('common:github')} enterDelay={300}>
        <IconButton
          edge='end'
          component='a'
          color='inherit'
          href='https://github.com/project-millipede/millipede-docs'
          sx={{
            padding: theme.spacing(1.5)
          }}
        >
          <GitHub />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
  return (
    <>
      <Media lessThan='md'>
        <AppToolBarMobile>{toolBar}</AppToolBarMobile>
      </Media>
      <Media greaterThanOrEqual='md'>
        <AppToolBar isDrawerExpanded={isDrawerExpanded}>{toolBar}</AppToolBar>
      </Media>
    </>
  );
};
