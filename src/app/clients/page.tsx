'use client';

// @packages
import * as React from 'react';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';

// @components
import Error from '@/components/Error';
import FilterControls from '@/components/FilterControls';
import Loading from '@/components/Loading';
import Table from '@/components/Table';
import Form from './Form';

// @hooks
import { useClientsExcelDownload } from '@/hooks/useClientsExcelDownload';

// @data
import columns from './columns.json';

export default function Clients() {
  const [inputValues, setInputValues] = React.useState<{ [key: string]: string }>({});
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [applyDateFilter, setApplyDateFilter] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const theme = useTheme();

  const { isPending, error, data } = useQuery<any[]>({
    queryKey: ['clients'],
    queryFn: async () =>
      await axios.get('https://back-end-orpin-psi.vercel.app/api/clients')
        .then(res => res.data)
  });

  const handleClearFilters = () => {
    setInputValues({});
    setStartDate(null);
    setEndDate(null);
    setApplyDateFilter(false);
  };

  const handleChange = (id: string, value: string) => {
    setInputValues(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleApplyDateFilter = () => {
    setApplyDateFilter(true);
  };

  if (error) return <Error />
  if (isPending) return <Loading />

  const applyFilters = () => {
    const sortedRows = [...data].sort((a, b) => {
      const dateA = new Date(a.create_time);
      const dateB = new Date(b.create_time);
      
      if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
        return dateB.getTime() - dateA.getTime();
      } else {
        return 0;
      }
    });
  
    return sortedRows.filter(row => {
      if (!row.create_time) {
        const matchesInputValues = Object.entries(inputValues).every(([key, filterValue]) =>
          row[key as keyof typeof row]?.toString().toLowerCase().includes(filterValue.toLowerCase())
        );
        return matchesInputValues;
      }
        
      const matchesInputValues = Object.entries(inputValues).every(([key, filterValue]) =>
        row[key as keyof typeof row]?.toString().toLowerCase().includes(filterValue.toLowerCase())
      );
  
      const dateParts: any[] = row.create_time.split(/\D/);
      const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  
      const rowDate = new Date(date).getTime();
      const startDateTransformed = startDate && new Date(startDate).getTime();
      const endDateTransformed = endDate && new Date(endDate).getTime();
  
      const isWithinDateRange = !applyDateFilter || (
        (!startDateTransformed || rowDate >= startDateTransformed) &&
        (!endDateTransformed || rowDate <= endDateTransformed)
      );
  
      return matchesInputValues && isWithinDateRange;
    });
  };

  const { handleDownloadExcel } = useClientsExcelDownload({
    filteredData: applyFilters(),
    name: 'clients'
  });

  return (
    <Container maxWidth="xl">
      <Dialog
        onClose={() => {}}
        open={open}
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Form closeForm={() => setOpen(false)} />
      </Dialog>
      <FilterControls
        endDate={endDate}
        handleApplyDateFilter={handleApplyDateFilter}
        handleClearFilters={handleClearFilters}
        handleDownloadExcel={handleDownloadExcel}
        openForm={() => setOpen(true)}
        service="clients"
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
        title='Clients'
        uploadButton
      />
      <Table
        columns={columns}
        inputValues={inputValues}
        onChange={handleChange}
        rows={applyFilters()}
      />
    </Container>
  );
}
