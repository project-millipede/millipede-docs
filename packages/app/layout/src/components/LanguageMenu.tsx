import { Button, Menu, MenuItem, Tooltip } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { FC, SyntheticEvent, useState } from 'react';

import { LANGUAGES_LABEL } from '../constants';
import { LanguageLabel } from './LanguageLabel';

export const LanguageMenu: FC = () => {
  const [languageMenu, setLanguageMenu] = useState<Element & EventTarget>(null);

  const { t } = useTranslation();

  const { push, pathname, locale, query } = useRouter();

  const handleSelect = (languageCode: string) => {
    push(
      {
        pathname,
        query
      },
      null,
      { locale: languageCode }
    );
    setLanguageMenu(null);
  };

  const handleLanguageIconClick = (event: SyntheticEvent) => {
    setLanguageMenu(event.currentTarget);
  };
  const handleLanguageMenuClose = () => {
    setLanguageMenu(null);
  };
  return (
    <>
      <Tooltip title={`${t('common:change-language')}`} enterDelay={300}>
        <Button color='inherit' onClick={handleLanguageIconClick}>
          <LanguageIcon />
          <LanguageLabel label={locale} />
        </Button>
      </Tooltip>
      <Menu
        anchorEl={languageMenu}
        open={!!languageMenu}
        onClose={handleLanguageMenuClose}
      >
        {LANGUAGES_LABEL.map(language => (
          <MenuItem
            key={language.code}
            selected={language.code === locale}
            onClick={_e => {
              handleSelect(language.code);
            }}
          >
            {language.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
