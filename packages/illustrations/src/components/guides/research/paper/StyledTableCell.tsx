import { TableCell, TableCellProps } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { isMobile, isSafari } from 'react-device-detect';

const StyledTableCell = styled(TableCell)<TableCellProps>(() => {
  return {
    top: !isMobile && !isSafari && '57px'
  };
});

export default StyledTableCell;
