import { Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

export const Title = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: theme.typography.fontWeightMedium,
  // Hyphen
  hyphens: 'auto',
  msHyphens: 'auto',
  MozHyphens: 'auto',
  WebkitHyphens: 'auto'
}));

export const TitleUnstyled = styled(Typography)(() => ({}));
