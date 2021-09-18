import { Typography, TypographyProps } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

export const Anchor = styled('span')(({ theme }) => ({
  position: 'absolute',
  marginTop: theme.spacing(-12)
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
