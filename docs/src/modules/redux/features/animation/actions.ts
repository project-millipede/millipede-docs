/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';

import { Area, Device, Szenario } from '../../../../../../src/typings/animation';
import { CHANGE_AREA, CHANGE_DEVICE, CHANGE_SZENARIO } from './actionTypes';

export const changeDevice = (device: Device) =>
  action(CHANGE_DEVICE, { device });

export const changeSzenario = (szenario: Szenario) =>
  action(CHANGE_SZENARIO, { szenario });

export const changeArea = (area: Area) => action(CHANGE_AREA, { area });
