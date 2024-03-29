import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Anchor = styled('span')(({ theme }) => ({
  position: 'absolute',
  marginTop: theme.spacing(-10)
}));

export const StyledTypography = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    '& a': {
      display: 'none',
      padding: theme.spacing(0, 1),
      color: theme.palette.text.primary
    },
    ':hover': {
      '& a': {
        display: 'inline-block'
      }
    }
  })
);
