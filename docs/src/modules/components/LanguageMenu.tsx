import { useHoux } from '@houx';
import { Button, Menu, MenuItem, NoSsr, Tooltip } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { Dispatch, FC, SyntheticEvent, useCallback, useState } from 'react';

import { LANGUAGES_LABEL } from '../constants';
import { LanguageActions } from '../redux/features/actionType';
import { changeUserLanguage } from '../redux/features/language/actions';
import { RootState } from '../redux/reducers';
import LanguageLabel from './LanguageLabel';

export const LanguageMenu: FC = () => {
  const [languageMenu, setLanguageMenu] = useState<Element & EventTarget>(null);

  const {
    state: {
      language: { userLanguage }
    }
  }: { state: RootState } = useHoux();

  const { dispatch }: { dispatch: Dispatch<LanguageActions> } = useHoux();

  const { t } = useTranslation();

  const router = useRouter();

  const handleSelect = useCallback(
    (_event: SyntheticEvent, languageCode: string) => {
      dispatch(changeUserLanguage(languageCode));
      router.push(router.route, router.route, { locale: languageCode });
      setLanguageMenu(null);
    },
    [router.route, router.locale]
  );

  const handleLanguageIconClick = (event: SyntheticEvent) => {
    setLanguageMenu(event.currentTarget);
  };
  const handleLanguageMenuClose = () => {
    setLanguageMenu(null);
  };

  return (
    <>
      <Tooltip title={`${t('common:change-language')}`} enterDelay={300}>
        <Button
          color='inherit'
          aria-owns={languageMenu ? 'language-menu' : undefined}
          aria-haspopup='true'
          aria-label={`${t('common:change-language')}`}
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
