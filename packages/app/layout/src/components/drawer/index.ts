import { Theme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';

export { MobileDrawer } from './MobileDrawer';
export { DesktopDrawer } from './DesktopDrawer';
export { SwitchDrawer } from './SwitchDrawer';

export interface DrawerProps {
  isDrawerExpanded: boolean;
  sx: SxProps<Theme>;
  handleDrawerOpen?: () => void;
  handleDrawerClose?: () => void;
}
