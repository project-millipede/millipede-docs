import { Box, Collapse, IconButton, TableContainer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import LinkIcon from '@material-ui/icons/Link';
import { TFunction } from 'next-i18next-serverless';
import Link from 'next/link';
import React, { useState } from 'react';

import { useTranslation } from '../../../../../../i18n';
import { omitAtIndex } from '../../../../modules/utils/collection/array';

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

const getColumns = (rowDescriptor: RowDescriptor): Array<ColumnDescriptor> => [
  { id: 'expand', label: '', minWidth: 100 },
  { id: 'title', label: rowDescriptor.title, minWidth: 170 },
  {
    id: 'meta',
    label: rowDescriptor.meta,
    minWidth: 170
  },
  {
    id: 'reference',
    label: rowDescriptor.reference,
    minWidth: 170
  }
];

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

const useStyles = makeStyles({
  container: {
    maxHeight: 440
  }
});

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
});

const ExpandableRow = ({
  rowData,
  columns,
  header
}: {
  rowData: RowDescriptor;
  columns: Array<ColumnDescriptor>;
  header: RowDescriptor;
}) => {
  const [open, setOpen] = useState(false);
  const { root } = useRowStyles();

  return (
    <>
      <TableRow className={root}>
        <TableCell>
          <IconButton size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
            <Box margin={1}>
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

const ns = 'pages/guides/research/paper/index';

const generateContent = (t: TFunction): Array<HeadAndBody> | any => {
  const rows: Array<HeadAndBody> | string = t('rows', {
    returnObjects: true
  });
  if (rows === 'rows') {
    return [];
  }
  return rows;
};

export const StickyHeadTable = () => {
  const { t } = useTranslation(ns);

  const classes = useStyles();

  const rows = generateContent(t);

  const header: RowDescriptor = t('header', {
    returnObjects: true
  });

  const columns = getColumns(header);

  const columnsReduced = omitAtIndex(columns, 0);

  return (
    <TableContainer className={classes.container}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {rows.map(row => {
          const { head, body } = row;
          return (
            <>
              <TableHead>
                <TableRow>
                  <TableCell style={{ top: 57 }} colSpan={4}>
                    {head}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {body.map(row => (
                  <ExpandableRow
                    key={row.title}
                    rowData={row}
                    columns={columnsReduced}
                    header={header}
                  />
                ))}
              </TableBody>
            </>
          );
        })}
      </Table>
    </TableContainer>
  );
};

export default StickyHeadTable;
