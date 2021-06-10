import { useMediaQuery, useTheme } from '@material-ui/core';

const Mobile = ({ children }) => {
  const theme = useTheme();
  const tabletMaxWidth = useMediaQuery(theme.breakpoints.down('md'));
  return tabletMaxWidth ? children : null;
};

const Desktop = ({ children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  return isDesktop ? children : null;
};

const isMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
};

export { Mobile, Desktop, isMobile };
