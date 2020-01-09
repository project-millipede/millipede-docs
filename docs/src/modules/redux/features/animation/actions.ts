import { IRect } from 'react-viewport-utils';
import { action } from 'typesafe-actions';

import { Area, Device, Progress, Szenario } from '../../../../../../src/typings/animation';
import {
  CHANGE_AREA,
  CHANGE_DEVICE,
  CHANGE_SZENARIO,
  SET_PROGRESS_OFFSET_Y,
  SET_PROGRESS_VIEWPORT,
  UPDATE_PROGRESS,
} from './actionTypes';

export const changeDevice = (device: Device) =>
  action(CHANGE_DEVICE, { device });

export const changeSzenario = (szenario: Szenario) =>
  action(CHANGE_SZENARIO, { szenario });

export const changeArea = (area: Area) => action(CHANGE_AREA, { area });

export const updateProgress = (progress: Partial<Progress>) =>
  action(UPDATE_PROGRESS, { progress });

export const setProgressOffsetY = (progressOffsetY: number) =>
  action(SET_PROGRESS_OFFSET_Y, { progressOffsetY });

// export const setProgressViewport = (
//   progressViewport: Partial<ProgressViewport>
// ) => action(SET_PROGRESS_VIEWPORT, { progressViewport });

export const setProgressViewport = (index: number, progressViewport: IRect) =>
  action(SET_PROGRESS_VIEWPORT, { index, progressViewport });
