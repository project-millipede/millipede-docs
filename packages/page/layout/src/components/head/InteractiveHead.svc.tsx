import { Link } from '@app/components';
import { experimentalStyled as styled } from '@material-ui/core';

export const Anchor = styled('span')({
  position: 'absolute',
  marginTop: -96
});

export const CLASS_HEADER = 'InteractiveHeader';

export const HeaderLink = styled(Link)(({ theme }) => ({
  display: 'inline-block',
  padding: theme.spacing(0, 1),
  // underline='none'
  visibility: 'hidden',
  [`.${CLASS_HEADER}:hover &`]: {
    visibility: 'visible',
    color: theme.palette.text.secondary
  }
}));
