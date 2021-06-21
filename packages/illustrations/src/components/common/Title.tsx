import { Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

export const Title = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: theme.typography.fontWeightMedium,
  hyphens: 'auto',
  '-ms-hyphens': 'auto',
  '-moz-hyphens': 'auto',
  '-webkit-hyphens': 'auto'
}));

export const TitleUnstyled = styled(Typography)(() => ({}));
