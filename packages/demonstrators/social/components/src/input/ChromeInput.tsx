import { INPUT_BORDER_RADIUS, INPUT_HEIGHT } from '@app/layout/src/recoil/features/layout/reducer';
import { appCompositionState } from '@demonstrator/navigation/src/recoil/features/app/reducers';
import { Box, IconButton, InputAdornment, InputBase } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Fullscreen, FullscreenExit, InfoOutlined, ViewCarousel, ViewColumn } from '@material-ui/icons';
import React, { FC } from 'react';
import { FullScreenHandle } from 'react-full-screen';
import { useRecoilState } from 'recoil';

interface ChromInputProps {
  fullScreenHandle: FullScreenHandle;
}
export const ChromeInput: FC<ChromInputProps> = ({ fullScreenHandle }) => {
  const theme = useTheme();

  const [{ isMobile }, setAppComposition] = useRecoilState(appCompositionState);

  return (
    <InputBase
      sx={{
        backgroundColor: '#F1F1F1',
        height: theme.spacing(INPUT_HEIGHT),
        borderRadius: theme.spacing(INPUT_BORDER_RADIUS)
      }}
      startAdornment={
        <InputAdornment position='start'>
          <IconButton>
            <InfoOutlined />
          </IconButton>
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position='end' style={{ marginRight: '8px' }}>
          <Box>
            <IconButton
              size='small'
              onClick={() => {
                setAppComposition(state => {
                  return {
                    ...state,
                    isMobile: !state.isMobile
                  };
                });
              }}
            >
              {isMobile ? <ViewCarousel /> : <ViewColumn />}
            </IconButton>
            <IconButton
              size='small'
              onClick={() => {
                fullScreenHandle.active
                  ? fullScreenHandle.exit()
                  : fullScreenHandle.enter();
              }}
            >
              {fullScreenHandle.active ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
          </Box>
        </InputAdornment>
      }
      placeholder={'https://bookface.com'}
    />
  );
};
