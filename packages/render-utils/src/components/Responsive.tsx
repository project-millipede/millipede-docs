import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const isMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
};

export { isMobile };
