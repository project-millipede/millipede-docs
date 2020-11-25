import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { IReadingTime } from 'reading-time-estimator';

interface AppContentSubHeaderProps {
  timeToRead?: IReadingTime;
}

const AppContentSubHeader: FC<AppContentSubHeaderProps> = ({
  timeToRead = {}
}) => {
  return (
    <>
      <Typography variant={'h4'}>{`Words: ${timeToRead.words}`}</Typography>
      <Typography variant={'h4'}>{`Minutes: ${timeToRead.minutes}`}</Typography>
    </>
  );
};

export default AppContentSubHeader;
