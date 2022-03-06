import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const isMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'), {
    noSsr: true
  });
};

export { isMobile };
