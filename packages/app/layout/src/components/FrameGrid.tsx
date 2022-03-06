import { styled } from '@mui/material/styles';

import { TOC_WIDTH } from '../constants';

interface AppFrameGridProps {
  hasToc: boolean;
  hasNavigation: boolean;
}

export const AppFrameGrid = styled('div', {
  shouldForwardProp: prop => prop !== 'hasToc' && prop !== 'hasNavigation'
})<AppFrameGridProps>(({ theme, hasToc, hasNavigation }) => {
  return {
    display: 'grid',
    gridTemplateAreas: `'app-center'`,
    gridTemplateColumns: 'minmax(0,1fr)',
    ...(hasNavigation && {
      [theme.breakpoints.up('md')]: {
        gridTemplateAreas: `'app-left app-center'`,
        gridTemplateColumns: `max-content minmax(0,1fr)`
      }
    }),
    ...(hasToc && {
      [theme.breakpoints.up('md')]: {
        gridTemplateAreas: `'app-center app-right'`,
        gridTemplateColumns: `minmax(0,1fr) ${theme.spacing(TOC_WIDTH)}`
      }
    }),
    ...(hasToc &&
      hasNavigation && {
        [theme.breakpoints.up('md')]: {
          gridTemplateAreas: `'app-left app-center app-right'`,
          gridTemplateColumns: `max-content minmax(0,1fr) ${theme.spacing(
            TOC_WIDTH
          )}`
        }
      })
  };
});
