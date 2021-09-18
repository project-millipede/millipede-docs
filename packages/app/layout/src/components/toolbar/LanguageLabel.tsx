import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { FC } from 'react';

interface LanguageLabelProps {
  label: string;
}

export const LanguageLabel: FC<LanguageLabelProps> = ({ label }) => {
  const theme = useTheme();

  return (
    <Typography
      sx={{
        margin: theme.spacing(0, 1.5, 0, 1.5),
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'block'
        }
      }}
    >
      {label?.toUpperCase()}
    </Typography>
  );
};
