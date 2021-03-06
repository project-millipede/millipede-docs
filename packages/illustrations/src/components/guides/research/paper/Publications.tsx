import { CollectionUtil } from '@app/utils';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { KeyboardArrowDown, KeyboardArrowUp, Link as LinkIcon } from '@material-ui/icons';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React, { FC, Fragment, useState } from 'react';
import { isBrowser, isSafari } from 'react-device-detect';

interface ColumnDescriptor {
  id: string;
  label: string;
  minWidth: number;
}

interface RowDescriptor {
  title: string;
  meta: string;
  reference: string;
  description: string;
  structure: string;
}

interface HeadAndBody {
  head: string;
  body: Array<RowDescriptor>;
}

export const getColumns = (row: RowDescriptor): Array<ColumnDescriptor> => {
  const { title, meta, reference } = row;

  return [
    { id: 'expand', label: '', minWidth: 100 },
    { id: 'title', label: title, minWidth: 170 },
    {
      id: 'meta',
      label: meta,
      minWidth: 170
    },
    {
      id: 'reference',
      label: reference,
      minWidth: 170
    }
  ];
};

const StyledTable = styled(Table)(() => ({
  '& .MuiTableCell-root': {
    '&:nth-of-type(1)': {
      border: 0
    }
  }
}));

export const ExpandableRow = ({
  rowData,
  columns,
  header
}: {
  rowData: RowDescriptor;
  columns: Array<ColumnDescriptor>;
  header: RowDescriptor;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {columns.map(column => {
          const value = rowData[column.id];
          return (
            <TableCell key={column.id}>
              {column.id === 'reference' ? (
                <Link href={value}>
                  <IconButton color='primary'>
                    <LinkIcon />
                  </IconButton>
                </Link>
              ) : (
                value
              )}
            </TableCell>
          );
        })}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{header.description}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{rowData.description}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{header.structure}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{rowData.structure}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export const Publications: FC = () => {
  const { t } = useTranslation();

  const header = t<RowDescriptor>(
    'pages/guides/research/paper/index:header',
    {},
    {
      returnObjects: true
    }
  );

  const rows = t<Array<HeadAndBody>>(
    'pages/guides/research/paper/index:rows',
    {},
    {
      returnObjects: true
    }
  );

  const columns = getColumns(header);
  const columnsReduced = CollectionUtil.Array.omitAtIndex(columns, 0);

  return (
    <TableContainer sx={{ maxHeight: '440px' }}>
      <StyledTable stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={`header-${column.id}`}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => {
            const { head, body } = row;
            return (
              <Fragment key={`head-row-${head}-${index}`}>
                <TableRow>
                  <TableCell
                    variant={'head'}
                    style={{
                      top: isBrowser && !isSafari ? 57 : 0
                    }}
                    colSpan={4}
                  >
                    {head}
                  </TableCell>
                </TableRow>
                {body.map(row => {
                  return (
                    <ExpandableRow
                      key={row.title}
                      rowData={row}
                      columns={columnsReduced}
                      header={header}
                    />
                  );
                })}
              </Fragment>
            );
          })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};
