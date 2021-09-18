import { TableCell, TableCellProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { isMobile, isSafari } from 'react-device-detect';

const StyledTableCell = styled(TableCell)<TableCellProps>(() => {
  return {
    top: !isMobile && !isSafari && '57px'
  };
});

export default StyledTableCell;
