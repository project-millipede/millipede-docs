import { Button, Menu, MenuItem, NoSsr, Tooltip } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import { useHoux } from 'houx';
import React, { SyntheticEvent, useCallback, useState } from 'react';

import { useTranslation } from '../../../../i18n';
import { LANGUAGES_LABEL } from '../constants';
import { LanguageActions } from '../redux/features/actionType';
import { changeUserLanguage } from '../redux/features/language/actions';
import { RootState } from '../redux/reducers';
import LanguageLabel from './LanguageLabel';

export const LanguageMenu = () => {
  const [languageMenu, setLanguageMenu] = useState<Element & EventTarget>(null);

  const {
    state: {
      language: { userLanguage }
    }
  }: { state: RootState } = useHoux();

  const { dispatch }: { dispatch: React.Dispatch<LanguageActions> } = useHoux();

  const { i18n, t } = useTranslation();

  const handleSelect = useCallback(
    (_event: React.SyntheticEvent, languageCode: string) => {
      dispatch(changeUserLanguage(languageCode));
      i18n.changeLanguage(languageCode);
      setLanguageMenu(null);
    },
    []
  );

  const handleLanguageIconClick = (event: SyntheticEvent) => {
    setLanguageMenu(event.currentTarget);
  };
  const handleLanguageMenuClose = () => {
    setLanguageMenu(null);
  };

  return (
    <>
      <Tooltip title={`${t('change-language')}`} enterDelay={300}>
        <Button
          color='inherit'
          aria-owns={languageMenu ? 'language-menu' : undefined}
          aria-haspopup='true'
          aria-label={`${t('change-language')}`}
          onClick={handleLanguageIconClick}
          data-ga-event-category='AppBar'
          data-ga-event-action='language'
        >
          <LanguageIcon />
          <LanguageLabel />
        </Button>
      </Tooltip>
      <NoSsr>
        <Menu
          id='language-menu'
          anchorEl={languageMenu}
          open={!!languageMenu}
          onClose={handleLanguageMenuClose}
        >
          {LANGUAGES_LABEL.map(language => (
            <MenuItem
              component='a'
              data-no-link='true'
              key={language.code}
              selected={userLanguage === language.code}
              onClick={event => handleSelect(event, language.code)}
              lang={language.code}
              hrefLang={language.code}
            >
              {language.text}
            </MenuItem>
          ))}
        </Menu>
      </NoSsr>
    </>
  );
};
