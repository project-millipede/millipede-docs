import { FC, useEffect } from 'react';
import { useTimer } from 'react-compound-timer';

interface CountDownProps {
  startTime: number;
  playing: boolean;
  step?: number;
}

export const CountDown: FC<CountDownProps> = ({ playing, startTime, step }) => {
  const {
    controls: { setTime, start, getTimerState, stop },
    value
  } = useTimer({
    direction: 'backward',
    startImmediately: false,
    lastUnit: 's'
  });

  useEffect(() => {
    if (playing && startTime > 0) {
      setTime(startTime);
    }
    if (playing && getTimerState() === 'INITED') {
      start();
    }
    if (playing && getTimerState() === 'STOPPED') {
      start();
    }
    if (!playing && getTimerState() === 'PLAYING') {
      stop();
    }
  }, [playing, startTime, step]);

  return <>{value.s}</>;
};
