import { FC, useLayoutEffect } from 'react';
import { useTimer } from 'react-compound-timer';

interface CountUpProps {
  startTime: number;
  playing: boolean;
}

export const CountUp: FC<CountUpProps> = ({ playing, startTime }) => {
  const {
    controls: { setTime, start, getTimerState, stop },
    value
  } = useTimer({
    direction: 'forward',
    startImmediately: false,
    lastUnit: 's'
  });

  useLayoutEffect(() => {
    if (playing) {
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
  }, [playing, startTime]);

  return <>{value.s}</>;
};
