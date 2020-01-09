import { Typography } from '@material-ui/core';
import React from 'react';
import { IReadingTime } from 'reading-time-estimator';

interface AppContentSubHeaderProps {
  timeToRead?: IReadingTime;
}

const AppContentSubHeader = ({ timeToRead }: AppContentSubHeaderProps) => {
  return (
    <>
      <Typography variant={'h4'}>{`Words: ${timeToRead.words}`}</Typography>
      <Typography variant={'h4'}>{`Minutes: ${timeToRead.minutes}`}</Typography>
    </>
  );
};

AppContentSubHeader.defaultProps = {
  timeToRead: {}
};

export default AppContentSubHeader;
