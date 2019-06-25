import { IconButton, Menu, MenuItem, NoSsr, Tooltip } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import { useHoux } from 'houx';
import React, { SyntheticEvent, useCallback, useState } from 'react';

import { LANGUAGES } from '../constants';
import { LanguageActions } from '../redux/features/actionType';
import { changeUserLanguage } from '../redux/features/language/actions';
import { RootState } from '../redux/reducers';

export const languages = [
  {
    code: 'en',
    text: '🇺🇸 English'
  },
  {
    code: 'de',
    text: '🇩🇪 Deutsch'
  }
];

const MenuLanguage = () => {
  const [languageMenu, setLanguageMenu] = useState<Element & EventTarget>(null);

  const { state }: { state: RootState } = useHoux();
  const { dispatch }: { dispatch: React.Dispatch<LanguageActions> } = useHoux();

  const handleSelect = useCallback((event: React.SyntheticEvent, languageCode: string) => {
    dispatch(changeUserLanguage(languageCode));
    setLanguageMenu(null);
  }, []);

  const handleLanguageIconClick = (event: SyntheticEvent) => {
    setLanguageMenu(event.currentTarget);
  };
  const handleLanguageMenuClose = () => {
    setLanguageMenu(null);
  };

  return (
    <>
      <Tooltip title='Change language' enterDelay={300}>
        <IconButton
          color='inherit'
          aria-owns={languageMenu ? 'language-menu' : undefined}
          aria-haspopup='true'
          aria-label='Change language'
          onClick={handleLanguageIconClick}
          data-ga-event-category='AppBar'
          data-ga-event-action='language'
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      <NoSsr>
        <Menu
          id='language-menu'
          anchorEl={languageMenu}
          open={!!languageMenu}
          onClose={handleLanguageMenuClose}
        >
          {languages
            .filter(language => LANGUAGES.indexOf(language.code) !== -1)
            .map(language => (
              <MenuItem
                // component={a}
                // data-no-link='true'
                // href={
                //   language.code === 'en'
                //     ? canonicalRef.current
                //     : `/${language.code}${canonicalRef.current}`
                // }
                key={language.code}
                selected={state.language.userLanguage === language.code}
                onClick={event => handleSelect(event, language.code)}
              >
                {language.text}
              </MenuItem>
            ))}
        </Menu>
      </NoSsr>
    </>
  );
};

export default MenuLanguage;
