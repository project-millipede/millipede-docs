import _ from 'lodash';

import { Page } from '../../src/typings/data/import';

const lowerTextIncludes = (text: string, sub: string) =>
  _.includes(_.lowerCase(text), _.lowerCase(_.trimStart(sub)));

/* eslint-disable consistent-return */
export const getPages = (pathname: string) => {
  if (pathname === '/guides/api') {
    return pagesCommon;
  }
  if (pathname === '/common/dataflow/comparison') {
    return pagesPET;
  }
  if (pathname === '/pidp/approach/byExample') {
    return pagesPIDP;
  }
};

/* eslint-disable consistent-return */
export const loadPages = (pathname: string, currentPages: Array<Page>) => {
  const linkIncludesText = (link: Page) => lowerTextIncludes(link.pathname, pathname);

  if (pathname === '/') {
    return [];
  }

  if (
    pagesPET.filter(link => {
      return _.some([link, ...(link.children || [])], linkIncludesText);
    }).length > 0
  ) {
    return [...pagesCommon, ...pagesPET];
  }

  if (
    pagesPIDP.filter(link => {
      return _.some([link, ...(link.children || [])], linkIncludesText);
    }).length > 0
  ) {
    return [...pagesCommon, ...pagesPIDP];
  }

  if (
    pagesCommon.filter(link => {
      return _.some([link, ...(link.children || [])], linkIncludesText);
    }).length > 0
  ) {
    return [...currentPages];
  }
};

export const pagesCommon: Array<Page> = [
  {
    pathname: '/guides',
    icon: 'star',
    highlight: true,
    children: [
      {
        pathname: '/guides/landing',
        icon: 'star',
        highlight: true
      },
      {
        pathname: '/guides/api',
        icon: 'star',
        highlight: true
      }
    ]
  },
  {
    pathname: '/',
    displayNav: false
  },
  {
    pathname: '/discover-more',
    icon: 'star',
    highlight: true,
    children: [{ pathname: '/discover-more/team', icon: 'star', highlight: true }]
  }
];

export const pagesPIDP: Array<Page> = [
  {
    pathname: '/pidp',
    icon: 'star',
    children: [
      {
        pathname: '/pidp/approach',
        icon: 'star'
      },
      {
        pathname: '/pidp/approach/byExample',
        icon: 'star'
      }
    ]
  }
];

export const pagesPET: Array<Page> = [
  {
    pathname: '/common',
    icon: 'star',
    children: [
      {
        pathname: '/common/dataflow',
        icon: 'star'
      },
      {
        pathname: '/common/dataflow/comparison',
        icon: 'star'
      }
    ]
  }
];
