import { PageTypes } from '@app/types';
import { Typography } from '@mui/material';
import { FC } from 'react';

interface AppContentSubHeaderProps {
  timeToRead?: PageTypes.ReadingTime;
}

export const AppContentSubHeader: FC<AppContentSubHeaderProps> = ({
  timeToRead = {}
}) => {
  return (
    <>
      <Typography variant='h4'>{`Words: ${timeToRead.words}`}</Typography>
      <Typography variant='h4'>{`Minutes: ${timeToRead.minutes}`}</Typography>
    </>
  );
};
