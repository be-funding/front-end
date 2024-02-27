// @packages
import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { green, red, yellow } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

// @interfaces
interface StatusButtonsProps {
  status: 'Done' | 'Cancelled' | 'Pending';
}

const CompletedButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(green[700]),
  backgroundColor: green[500],
  '&:hover': {
    backgroundColor: green[700],
  },
}));

const CancelledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(red[700]),
  backgroundColor: red[500],
  '&:hover': {
    backgroundColor: red[700],
  },
}));

const PendingButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(yellow[700]),
  backgroundColor: yellow[500],
  '&:hover': {
    backgroundColor: yellow[700],
  },
}));

export default function StatusButtons({ status }: StatusButtonsProps) {
  switch (status) {
    case 'Done':
      return <CompletedButton fullWidth>Done</CompletedButton>;
    case 'Cancelled':
      return <CancelledButton fullWidth>Cancelled</CancelledButton>;
    case 'Pending':
      return <PendingButton fullWidth>Pending</PendingButton>;
    default:
      return null;
  }
}
