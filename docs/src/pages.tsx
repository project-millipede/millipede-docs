import StarBorder from '@material-ui/icons/StarBorder';
import React from 'react';

import { Page } from './modules/redux/features/navigation/type';

const pages: Array<Page> = [
  {
    pathname: "/common",
    title: "Dataflow",
    icon: <StarBorder />,
    children: [
      {
        pathname: "/common/dataflow/comparison",
        title: "Comparison",
        icon: <StarBorder />
      },
      {
        pathname: "/common/dataflow/comparison",
        title: "Comparison",
        icon: <StarBorder />
      }
    ]
  },
  {
    pathname: "/pidp",
    title: "PID/P",
    icon: <StarBorder />,
    children: [
      {
        pathname: "/pidp/approach/byExample",
        title: "By example",
        icon: <StarBorder />
      },
      {
        pathname: "/pidp/approach/byExample",
        title: "By example",
        icon: <StarBorder />
      }
    ]
  },
  {
    pathname: "/",
    displayNav: false,
    title: ""
  }
];

export default pages;
