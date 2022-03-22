import { styled } from '@mui/material/styles';
import { CSSProperties, FC } from 'react';
import { FullScreenHandle } from 'react-full-screen';

import { ChromeInput } from '../input/ChromeInput';

const BrowserBar = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});

const CircleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(1)
}));

const Circle = styled('div')(({ theme }) => ({
  width: theme.spacing(1.5),
  height: theme.spacing(1.5),
  borderRadius: theme.spacing(1.5 / 2),
  marginLeft: theme.spacing(1.5 / 2)
}));

interface HeaderViewProps {
  fullScreenHandle: FullScreenHandle;
  style?: CSSProperties;
}

export const HeaderView: FC<HeaderViewProps> = ({
  fullScreenHandle,
  style
}) => {
  return (
    <BrowserBar sx={{ ...style }}>
      <CircleContainer>
        <Circle sx={{ bgcolor: '#e0383e' }} />
        <Circle sx={{ bgcolor: '#f7821b' }} />
        <Circle sx={{ bgcolor: '#62ba46' }} />
      </CircleContainer>
      <ChromeInput fullScreenHandle={fullScreenHandle} />
    </BrowserBar>
  );
};
