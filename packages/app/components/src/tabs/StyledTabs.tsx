import { Tabs as TabsComponent, TabsProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTabs = styled(TabsComponent)<TabsProps>(({ theme }) => ({
  '& .MuiTabs-flexContainer': {
    flexWrap: 'wrap'
  },
  '& .MuiTab-root': {
    '&.MuiTab-labelIcon': {
      minHeight: theme.spacing(6),
      flexDirection: 'row',
      '& svg': {
        marginBottom: 0,
        marginRight: theme.spacing(1)
      }
    }
  }
}));
