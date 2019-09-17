import { Page } from './modules/redux/features/navigation/type';

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

export const pagesCommon: Array<Page> = [
  // {
  //   pathname: '/common',
  //   icon: 'star',
  //   children: [
  //     {
  //       pathname: '/common/dataflow',
  //       icon: 'star'
  //     },
  //     {
  //       pathname: '/common/dataflow/comparison',
  //       icon: 'star'
  //     }
  //   ]
  // },
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
  }
];

export const pagesPIDP: Array<Page> = [
  ...pagesCommon,
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
  ...pagesCommon,

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

  // {
  //   pathname: '/guides',
  //   icon: 'star',
  //   children: [
  //     {
  //       pathname: '/guides/landing',
  //       icon: 'star'
  //     },
  //     {
  //       pathname: '/guides/api',
  //       icon: 'star'
  //     }
  //   ]
  // }
];
