import { atom } from 'recoil';

export interface Notification {
  isActive: boolean;
  message: string;
}

export const notificationState = atom<Notification>({
  key: 'notification',
  default: {
    isActive: false,
    message: null
  }
});
