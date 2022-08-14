import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

export { SwitchDrawer } from './SwitchDrawer';

export interface DrawerProps {
  sx: SxProps<Theme>;
  className: string;
}
