import { Theme, useMediaQuery, useTheme } from '@material-ui/core';

const Mobile = ({ children }) => {
  const theme = useTheme();
  const tabletMaxWidth = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  return tabletMaxWidth ? children : null;
};

const Desktop = ({ children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.between('md', 'xl'));
  return isDesktop ? children : null;
};

const isMobile = (theme: Theme) => {
  return useMediaQuery(theme.breakpoints.between('xs', 'md'));
};

export { Mobile, Desktop, isMobile };
