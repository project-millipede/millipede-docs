import StarBorder from '@material-ui/icons/StarBorder';
import React from 'react';

import { Page } from './modules/redux/features/navigation/type';

const pages: Array<Page> = [
  {
    pathname: '/common',
    icon: <StarBorder />,
    children: [
      {
        pathname: '/common/landing',
        icon: <StarBorder />
      },
      {
        pathname: '/common/dataflow/comparison',
        icon: <StarBorder />
      }
    ]
  },
  {
    pathname: '/guides',
    icon: <StarBorder />,
    children: [
      {
        pathname: '/guides/landing',
        icon: <StarBorder />
      },
      {
        pathname: '/guides/api',
        icon: <StarBorder />
      }
    ]
  },
  {
    pathname: '/pidp',
    icon: <StarBorder />,
    children: [
      {
        pathname: '/pidp/landing',
        icon: <StarBorder />
      },
      {
        pathname: '/pidp/approach/byExample',
        icon: <StarBorder />
      }
    ]
  },
  {
    pathname: '/',
    displayNav: false
  }
];

export default pages;
