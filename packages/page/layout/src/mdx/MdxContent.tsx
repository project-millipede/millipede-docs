import { blue } from '@material-ui/core/colors';
import { styled } from '@material-ui/core/styles';

export const MdxContent = styled('div')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  '& h1': {
    fontSize: 48,
    fontWeight: theme.typography.fontWeightLight,
    margin: 'auto 0'
  },
  '& h2': {
    fontSize: 40,
    fontWeight: theme.typography.fontWeightLight,
    margin: theme.spacing(4, 0, 2)
  },
  '& h3': {
    fontSize: 32,
    fontWeight: theme.typography.fontWeightLight,
    margin: theme.spacing(3, 0, 2)
  },
  '& h4': {
    fontSize: 28,
    fontWeight: theme.typography.fontWeightLight,
    margin: theme.spacing(3, 0, 2)
  },
  '& h5': {
    fontSize: 24,
    fontWeight: theme.typography.fontWeightLight,
    margin: theme.spacing(3, 0, 2)
  },
  '& h6': {
    fontSize: 20,
    fontWeight: theme.typography.fontWeightLight,
    margin: theme.spacing(2, 0, 2)
  },
  '& blockquote': {
    borderLeft: `${theme.spacing(0.5)} solid ${blue[500]}`,
    backgroundColor: 'rgb(33, 150, 243, 0.2)',
    padding: theme.spacing(0.5, 3),
    margin: theme.spacing(3, 0),
    '& p': {
      marginTop: theme.spacing(2)
    }
  }
}));
