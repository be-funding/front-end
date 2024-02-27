'use client'

// @packages
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import StatusButtons from './StatusButtons';

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

export default function CustomTable<T>({ columns, rows, onChange, inputValues }: TableProps<T>) {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ backgroundColor: 'red' }}>
            <TableRow>
              {columns.map((column, index) => (
                <React.Fragment key={index}>
                  <TableCell sx={{ minWidth: column?.minWidth }}>
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
                        />
                      )}
                    </Box>
                  </TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
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
    </Paper>
  );
}
