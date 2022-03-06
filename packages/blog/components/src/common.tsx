import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Blurb = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(5, 0),
  fontFamily: "'Roboto Mono', monospace",
  fontWeight: 500
}));
