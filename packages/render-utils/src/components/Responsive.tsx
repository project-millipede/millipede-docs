import { useMediaQuery, useTheme } from '@material-ui/core';

const isMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
};

export { isMobile };
