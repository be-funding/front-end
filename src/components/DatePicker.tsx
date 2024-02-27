'use client';

// @packages
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// @interfaces
interface DatePickerProps {
  label: string;
  onChange: (date: Date | null) => void;
  value: Date | null;
}

export default function DatePickerComponent({ label, onChange, value }: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        sx={{ backgroundColor: 'white' }}
      />
    </LocalizationProvider>
  );
}
