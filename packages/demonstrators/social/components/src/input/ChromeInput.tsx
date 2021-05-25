import { appCompositionState } from '@demonstrator/navigation/src/recoil/features/app/reducers';
import { Box, createStyles, IconButton, InputAdornment, InputBase, makeStyles, Theme } from '@material-ui/core';
import { Fullscreen, FullscreenExit, InfoOutlined, ViewCarousel, ViewColumn } from '@material-ui/icons';
import React, { FC } from 'react';
import { FullScreenHandle } from 'react-full-screen';
import { useRecoilState } from 'recoil';

export const useStyles = makeStyles((_theme: Theme) => {
  const height = 48;
  const borderRadius = height / 2;
  return createStyles({
    input: {
      height: `${height}px`,
      backgroundColor: '#f1f3f4',
      borderRadius: `${borderRadius}px`
    }
  });
});

interface ChromInputProps {
  fullScreenHandle: FullScreenHandle;
}

export const ChromeInput: FC<ChromInputProps> = ({ fullScreenHandle }) => {
  const classes = useStyles();

  const [{ isMobile }, setAppComposition] = useRecoilState(appCompositionState);

  return (
    <InputBase
      className={classes.input}
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
              size={'small'}
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
              size={'small'}
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
