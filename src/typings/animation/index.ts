import { RectReadOnly } from 'react-use-measure';
import { IRect } from 'react-viewport-utils';

export enum Device {
  Mobile,
  Desktop
}

export enum Szenario {
  Default,
  Pet,
  Pidp
}

export enum Area {
  Local,
  Global
}

export type Progress = Record<number, RectReadOnly>;
export type ProgressViewport = Record<number, IRect>;
