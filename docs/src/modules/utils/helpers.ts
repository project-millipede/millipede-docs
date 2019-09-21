import _ from 'lodash';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

import { Page } from '../../../../src/typings/data/import';
import { LANGUAGES } from '../constants';

// import warning from 'warning';

export const titleize = (value: string) => {
  // warning(
  //   typeof value === "string" && value.length > 0,
  //   "titleize(string) expects a non empty string argument."
  // );

  return value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const pageToTitle = (page: Page) => {
  if (!page.title) {
    return null;
  }

  if (page.title) {
    return page.title;
  }

  const name = page.pathname.replace(/.*\//, '');

  if (page.pathname.indexOf('/api/') !== -1) {
    return upperFirst(camelCase(name));
  }

  return titleize(name);
};

export const pageToTitleI18n = (
  page: Page,
  _translate: (title: string, options: object) => string
) => {
  // return translate(`pages.${page.pathname}`, { ignoreWarning: true }) || pageToTitle(page);
  // return translate
  //   ? translate(`pages.${page.pathname}`, { ignoreWarning: true })
  //   : pageToTitle(page);
  return _.truncate(page.title, {
    length: 10,
    separator: ' '
  });

  // if (!page) {
  //   return null;
  // }

  // if (!page.title) {
  //   return null;
  // }

  // if (page.title) {
  //   return page.title;
  // }
};

export const getCookie = (name: string) => {
  const regex = new RegExp(`(?:(?:^|.*;*)${name}*=*([^;]*).*$)|^.*$`);
  return document.cookie.replace(regex, '$1');
};

export interface PathnameToLanguage {
  userLanguage: string;
  canonical: string;
}

export const pathnameToLanguage = (pathname: string): PathnameToLanguage => {
  const userLanguage = pathname.substring(1, 3);

  if (LANGUAGES.indexOf(userLanguage) !== -1 && pathname.indexOf(`/${userLanguage}/`) === 0) {
    return {
      userLanguage,
      canonical: userLanguage === 'en' ? pathname : pathname.substring(3)
    };
  }

  return {
    userLanguage: 'en',
    canonical: pathname
  };
};
