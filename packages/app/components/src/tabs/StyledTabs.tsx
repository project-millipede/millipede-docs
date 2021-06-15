import { Tabs as TabsComponent, TabsProps } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';

export const StyledTabs = styled(TabsComponent)<TabsProps>(({ theme }) => ({
  '& .MuiTabs-flexContainer': {
    flexWrap: 'wrap'
  },
  '& .MuiTab-root': {
    // confusing &.Mui compared to & .Mui
    '&.MuiTab-labelIcon': {
      minHeight: theme.spacing(6),
      // either
      '& .MuiTab-wrapper': {
        flexDirection: 'row',
        '& > *:first-child': {
          marginRight: theme.spacing(1),
          marginBottom: 0
        }
      }
    }
    // or
    // '& .MuiTab-wrapper': {
    //   flexDirection: 'row',
    //   '& > *:first-child': {
    //     marginRight: theme.spacing(1),
    //     marginBottom: 0
    //   }
    // }
  }
}));
