'use client'

// @packages
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import DatePicker from '@/components/DatePicker';
import Paper from '@mui/material/Paper';
import React from 'react';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

// @components
import UploadFile from '@/components/UploadFile';

// @hooks
import useLoginData from '@/hooks/useLoginData';

// @interfaces
interface FilterControlsProps {
  createButton?: boolean;
  endDate: Date | null;
  handleApplyDateFilter: () => void;
  handleClearFilters: () => void;
  handleDownloadExcel: () => void;
  openForm?: () => void;
  service: string;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  startDate: Date | null;
  title: string;
  uploadButton?: boolean;
}

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(green[700]),
  backgroundColor: green[500],
  '&:hover': {
    backgroundColor: green[700],
  },
}));

export default function FilterControls({
  createButton,
  endDate,
  handleApplyDateFilter,
  handleClearFilters,
  handleDownloadExcel,
  openForm,
  service,
  setEndDate,
  setStartDate,
  startDate,
  title,
  uploadButton
}: FilterControlsProps) {
  const { storedUserData } = useLoginData();
  const theme = useTheme();

  const admin = storedUserData.username === 'be-funding-admin';
  
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        pb: 4
      }}
    >
      <Box sx={{ alignItems: 'center', display: "flex" }}>
        <Typography
          sx={{ fontWeight: 500, my: 2, mr: 2 }}
          variant="h4"
        >
          {title}
        </Typography>
          {createButton && (
            <Button
              sx={{ mr: 1 }}
              color="error" 
              onClick={openForm}
              variant="contained" 
            >
              <AddIcon />
            </Button>
          )}
          {(uploadButton && admin) && (
            <UploadFile service={service} />
          )}
      </Box>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          backgroundColor: theme.palette.primary.main,
          alignItems: "center",
          p: 1,
          gap: 1
        }}
      >
        <DatePicker
          label='Fecha inicio'
          value={startDate}
          onChange={date => setStartDate(date)}
        />
        <DatePicker
          label='Fecha fin'
          value={endDate}
          onChange={date => setEndDate(date)}
        />
        <ColorButton variant="contained" onClick={handleApplyDateFilter}>
          Filtrar por fecha
        </ColorButton>
        <ColorButton variant="contained" onClick={handleClearFilters}>
          Limpiar filtros
        </ColorButton>
      </Paper>
      <ColorButton variant="contained" onClick={handleDownloadExcel}>
        Descargar Excel
      </ColorButton>
    </Box>
  );
};
