import { INPUT_BORDER_RADIUS, INPUT_HEIGHT } from '@app/layout/src/recoil/features/layout/reducer';
import { IconButton, InputAdornment, InputBase } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';
import React, { CSSProperties, FC } from 'react';

interface SimpleSearchProps {
  placeholder?: string;
  style?: CSSProperties;
}
export const SimpleSearch: FC<SimpleSearchProps> = ({
  placeholder = '',
  style
}) => {
  const theme = useTheme();

  return (
    <InputBase
      sx={{
        backgroundColor: '#F1F1F1',
        height: theme.spacing(INPUT_HEIGHT),
        borderRadius: theme.spacing(INPUT_BORDER_RADIUS),
        ...style
      }}
      startAdornment={
        <InputAdornment position={'start'}>
          <IconButton>
            <Search />
          </IconButton>
        </InputAdornment>
      }
      placeholder={placeholder}
    />
  );
};
