import _ from 'lodash';

import { Icon, IconType, Page } from '../../src/typings/data/import';

const lowerTextIncludes = (text: string, sub: string) =>
  _.includes(_.lowerCase(text), _.lowerCase(_.trimStart(sub)));

/* eslint-disable consistent-return */
export const loadPages = (pathname: string, currentPages: Array<Page>) => {
  const linkIncludesText = (link: Page) =>
    lowerTextIncludes(link.pathname, pathname);

  if (pathname === '/') {
    return [];
  }

  if (
    pagesPET.filter(link => {
      return _.some([link, ...(link.children || [])], linkIncludesText);
    }).length > 0
  ) {
    return [
      ...pagesCommon,
      ...pagesRethinkSecurity,
      ...pagesPET,
      ...pagesPerspective,
      ...pagesDiscoverMore
    ];
  }

  if (
    pagesPIDP.filter(link => {
      return _.some([link, ...(link.children || [])], linkIncludesText);
    }).length > 0
  ) {
    return [
      ...pagesCommon,
      ...pagesRethinkSecurity,
      ...pagesPIDP,
      ...pagesPerspective,
      ...pagesDiscoverMore
    ];
  }

  if (
    pagesRethinkSecurity.filter(link => {
      return _.some([link, ...(link.children || [])], linkIncludesText);
    }).length > 0
  ) {
    return [...currentPages];
  }

  if (
    pagesDiscoverMore.filter(link => {
      return _.some([link, ...(link.children || [])], linkIncludesText);
    }).length > 0
  ) {
    return [...currentPages];
  }

  if (
    pagesPerspective.filter(link => {
      return _.some([link, ...(link.children || [])], linkIncludesText);
    }).length > 0
  ) {
    return [...currentPages];
  }

  if (
    pagesCommon.filter(link => {
      return _.some([link, ...(link.children || [])], linkIncludesText);
    }).length > 0
  ) {
    return [...currentPages];
  }
};

export const defaultIcon: Icon = {
  type: IconType.MUI,
  name: 'star'
};

export const defaultFAIcon: Icon = {
  type: IconType.FA,
  name: ''
};

export const pagesCommon: Array<Page> = [
  {
    pathname: '/guides',
    icon: { ...defaultIcon, name: 'explore' },
    highlight: true,
    children: [
      {
        pathname: '/guides/landing',
        icon: defaultIcon,
        highlight: true
      },
      {
        pathname: '/guides/api',
        icon: { ...defaultIcon, name: 'code' },
        highlight: true
      }
    ]
  },
  {
    pathname: '/',
    displayNav: false
  }
];

export const pagesDiscoverMore: Array<Page> = [
  {
    pathname: '/discover-more',
    icon: { ...defaultIcon, name: 'info' },
    highlight: true,
    children: [
      {
        pathname: '/discover-more/support',
        icon: {
          ...defaultIcon,
          name: 'contact_support'
        },
        highlight: true
      },
      {
        pathname: '/discover-more/team',
        icon: {
          ...defaultIcon,
          name: 'group_work'
        },
        highlight: true
      },
      {
        pathname: '/discover-more/organisation',
        icon: {
          ...defaultIcon,
          name: 'business'
        },
        highlight: true
      }
    ]
  }
];

export const pagesPIDP: Array<Page> = [
  {
    pathname: '/pidp',
    icon: defaultIcon,
    children: [
      {
        pathname: '/pidp/approach',
        icon: { ...defaultIcon, name: 'filter_center_focus' }
      },
      {
        pathname: '/pidp/approach/byExample',
        icon: { ...defaultIcon, name: 'touch_app' }
      },
      {
        pathname: '/pidp/use-case',
        icon: { ...defaultIcon, name: 'extension' }
      },
      {
        pathname: '/pidp/use-case/recognition',
        icon: { ...defaultIcon, name: 'flip' }
      },
      {
        pathname: '/pidp/use-case/response',
        icon: { ...defaultIcon, name: 'create' }
      }
    ]
  }
];

export const pagesPET: Array<Page> = [
  {
    pathname: '/common',
    icon: defaultIcon,
    children: [
      {
        pathname: '/common/dataflow',
        icon: { ...defaultIcon, name: 'waves' }
      },
      {
        pathname: '/common/dataflow/comparison',
        icon: { ...defaultIcon, name: 'compare_arrows' }
      }
    ]
  }
];

export const pagesRethinkSecurity: Array<Page> = [
  {
    pathname: '/rethink-security',
    icon: { ...defaultIcon, name: 'security' },
    children: [
      {
        pathname: '/rethink-security/attackVectors',
        icon: { ...defaultIcon, name: 'bug_report' }
      },
      {
        pathname: '/rethink-security/attackVectors/comparison',
        icon: { ...defaultIcon, name: 'compare_arrows' }
      }
    ]
  }
];

export const pagesPerspective: Array<Page> = [
  {
    pathname: '/perspective',
    icon: { ...defaultIcon, name: 'layers' },
    children: [
      {
        pathname: '/perspective/strategy',
        icon: { ...defaultIcon, name: 'list' }
      },
      {
        pathname: '/perspective/cause',
        icon: { ...defaultIcon, name: 'warning' }
      },
      {
        pathname: '/perspective/shortsighted',
        icon: { ...defaultIcon, name: 'trending_down' }
      },
      {
        pathname: '/perspective/competence',
        icon: { ...defaultIcon, name: 'flash_on' }
      },
      {
        pathname: '/perspective/reference',
        icon: { ...defaultIcon, name: 'format_quote' }
      }
    ]
  }
];
