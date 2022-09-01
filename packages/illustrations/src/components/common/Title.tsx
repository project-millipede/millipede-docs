import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Title = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: theme.typography.fontWeightMedium,
  // Hyphen
  hyphens: 'auto',
  msHyphens: 'auto',
  MozHyphens: 'auto',
  WebkitHyphens: 'auto',
  wordBreak: 'break-word'
}));

export const TitleUnstyled = styled(Typography)({});
