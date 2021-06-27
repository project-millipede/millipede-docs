import { Tabs as TabsComponent, TabsProps } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

export const StyledTabs = styled(TabsComponent)<TabsProps>(({ theme }) => ({
  '& .MuiTabs-flexContainer': {
    flexWrap: 'wrap'
  },
  '& .MuiTab-root': {
    '&.MuiTab-labelIcon': {
      minHeight: theme.spacing(6),
      '& .MuiTab-wrapper': {
        flexDirection: 'row'
      },
      '& svg': {
        marginBottom: 0,
        marginRight: theme.spacing(1)
      }
    }
  }
}));
