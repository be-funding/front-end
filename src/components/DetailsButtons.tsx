// @packages
import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { green, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

// @interfaces
interface StatusButtonsProps {
  status: 'Details' | 'Process';
}

const ProcessButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(green[700]),
  backgroundColor: green[500],
  '&:hover': {
    backgroundColor: green[700],
  },
}));

const DetailsButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(red[700]),
  backgroundColor: red[500],
  '&:hover': {
    backgroundColor: red[700],
  },
}));

export default function DetailsButtons({ status }: StatusButtonsProps) {
  switch (status?.toLocaleLowerCase()) {
    case 'process':
      return <ProcessButton fullWidth>Procesar</ProcessButton>;
    case 'details':
      return <DetailsButton fullWidth>Detalles</DetailsButton>;
    default:
      return null;
  }
}
