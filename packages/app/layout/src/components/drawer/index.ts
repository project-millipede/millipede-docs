import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

export { MobileDrawer } from './MobileDrawer';
export { DesktopDrawer } from './DesktopDrawer';
export { SwitchDrawer } from './SwitchDrawer';

export interface DrawerProps {
  isDrawerExpanded: boolean;
  sx: SxProps<Theme>;
  handleDrawerOpen?: () => void;
  handleDrawerClose?: () => void;
}
