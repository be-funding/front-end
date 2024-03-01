'use client'

// @packages
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import StatusButtons from './StatusButtons';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import { blueGrey, grey } from '@mui/material/colors';

// @scripts
import { convertToReadableDate } from '../utils/convertToReadableDate';

// @interfaces
interface TableColumn<T> {
  hasDetailsColors?: boolean;
  hasInput?: boolean;
  hasStatusColors?: boolean;
  isIbType?: boolean;
  id: keyof T;
  inputBelow?: boolean;
  label: string;
  minWidth?: number;
  isClientsStatus? : boolean;
}

interface TableData<T> {
  [key: string]: string | number | boolean | undefined;
}

interface TableProps<T> {
  columns: TableColumn<any>[];
  rows: TableData<T>[];
  onChange: (id: string, value: string) => void;
  inputValues: { [key: string]: string };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: blueGrey[400],
    color: theme.palette.common.white,
  }
}));

export default function CustomTable<T>({ columns, rows, onChange, inputValues }: TableProps<T>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <React.Fragment key={index}>
                  <StyledTableCell sx={{ minWidth: column?.minWidth }}>
                    <Box 
                      sx={{
                        alignItems: "center",
                        display: column?.inputBelow ? "block" : "flex",
                        fontSize: 16,
                        gap: 1
                      }}
                    >
                      {column.label}
                      {column.hasInput && (
                        <TextField
                          id={column.id.toString()}
                          onChange={(e) => onChange(column.id.toString(), e.target.value)}
                          placeholder={`Buscar ${column.label.toLowerCase()}`}
                          size="small"
                          value={inputValues[column.id.toString()] || ''}
                          variant="outlined"
                          sx={{ backgroundColor: grey[200] }}
                        />
                      )}
                    </Box>
                  </StyledTableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column, index) => {
                  const cellValue = (row as any)[column.id];
                  return (
                    <React.Fragment key={index}>
                      <TableCell>
                        {column?.isClientsStatus && (cellValue === 0 ? 'Disable' : 'Enable')}
                        {column?.hasStatusColors && <StatusButtons status={cellValue} />}
                        {column?.isIbType && 'Referral IB' }
                        {column.id === 'date' && convertToReadableDate(cellValue)}
                        {!column?.isClientsStatus && !column?.hasStatusColors && column.id != 'date' && cellValue}
                      </TableCell>
                    </React.Fragment>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
