import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { ReactNode } from 'react';

export { SwitchDrawer } from './SwitchDrawer';

export interface DrawerProps {
  sx: SxProps<Theme>;
  className: string;
  children: ReactNode;
}
