import { createStyles, InputAdornment, InputBase, makeStyles } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import React, { FC } from 'react';

const useInputStyles = makeStyles(() => {
  const minHeight = 36;

  return createStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .04)',
      borderRadius: `${minHeight / 2}px`,
      width: '100%'
    },
    input: {
      boxSizing: 'border-box',
      minHeight: `${minHeight}px`
    }
  });
});

const useAdornStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingLeft: 12,
      '& svg': {
        color: 'rgba(0,0,0,0.38)'
      }
    }
  })
);

interface SimpleSearchProps {
  placeholder?: string;
}

const SimpleSearch: FC<SimpleSearchProps> = ({ placeholder = '' }) => {
  const inputStyles = useInputStyles();
  const adornStyles = useAdornStyles();
  return (
    <InputBase
      classes={inputStyles}
      startAdornment={
        <InputAdornment position={'start'} classes={adornStyles}>
          <Search />
        </InputAdornment>
      }
      placeholder={placeholder}
    />
  );
};

export default SimpleSearch;
