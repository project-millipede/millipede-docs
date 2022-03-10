import { Language } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';

import { LANGUAGES_LABEL } from '../../constants';
import { LanguageLabel } from './LanguageLabel';

export const LanguageMenu: FC = () => {
  const [languageMenu, setLanguageMenu] = useState<Element & EventTarget>(null);

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

  const handleLanguageIconClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setLanguageMenu(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenu(null);
  };
  return (
    <>
      <Button color='inherit' onClick={handleLanguageIconClick}>
        <Language />
        <LanguageLabel label={locale} />
      </Button>

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
