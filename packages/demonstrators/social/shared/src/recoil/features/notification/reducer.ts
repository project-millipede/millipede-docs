import { atom } from 'recoil';

export interface ISnackbarProps {
  message: string;
  isActive: boolean;
}

export const snackbarState = atom<ISnackbarProps>({
  key: 'snackbarState',
  default: {
    isActive: false,
    message: null
  }
});

export const states = {
  snackbarState
};
