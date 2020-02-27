import InputAdornment from '@material-ui/core/InputAdornment';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';
import React from 'react';

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

const SimpleSearch = () => {
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
      placeholder={'Search Timeline'}
    />
  );
};

export default SimpleSearch;
