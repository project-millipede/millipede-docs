import { Page } from './modules/redux/features/navigation/type';

const pages: Array<Page> = [
  {
    pathname: '/common',
    icon: 'star',
    children: [
      {
        pathname: '/common/landing',
        icon: 'star'
      },
      {
        pathname: '/common/dataflow/comparison',
        icon: 'star'
      }
    ]
  },
  {
    pathname: '/guides',
    icon: 'star',
    children: [
      {
        pathname: '/guides/landing',
        icon: 'star'
      },
      {
        pathname: '/guides/api',
        icon: 'star'
      }
    ]
  },
  {
    pathname: '/pidp',
    icon: 'star',
    children: [
      {
        pathname: '/pidp/landing',
        icon: 'star'
      },
      {
        pathname: '/pidp/approach/byExample',
        icon: 'star'
      }
    ]
  },
  {
    pathname: '/',
    displayNav: false
  }
];

export default pages;
