import { Link } from '@app/components';
import { styled } from '@material-ui/core/styles';

export const Anchor = styled('span')(({ theme }) => ({
  position: 'absolute',
  marginTop: theme.spacing(-12)
}));

export const CLASS_HEADER = 'InteractiveHeader';

export const HeaderLink = styled(Link)(({ theme }) => ({
  display: 'inline-block',
  padding: theme.spacing(0, 1),
  visibility: 'hidden',
  [`.${CLASS_HEADER}:hover &`]: {
    visibility: 'visible',
    color: theme.palette.text.secondary
  }
}));
