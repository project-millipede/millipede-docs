import { Area, Device, Szenario } from '@demonstrator/types';
import { action } from 'typesafe-actions';

import { CHANGE_AREA, CHANGE_DEVICE, CHANGE_SZENARIO } from './actionTypes';

export const changeDevice = (device: Device) =>
  action(CHANGE_DEVICE, { device });

export const changeSzenario = (szenario: Szenario) =>
  action(CHANGE_SZENARIO, { szenario });

export const changeArea = (area: Area) => action(CHANGE_AREA, { area });
