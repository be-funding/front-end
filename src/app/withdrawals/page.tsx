'use client';

// @packages
import * as React from 'react';
import Container from '@mui/material/Container';
import { useQuery } from '@tanstack/react-query'

// @components
import Error from '@/components/Error';
import FilterControls from '@/components/FilterControls';
import Loading from '@/components/Loading';
import Table from '@/components/Table';

// @hooks
import { useClientsExcelDownload } from '@/hooks/useClientsExcelDownload';

// @data
import columns from './columns.json';

export default function Clients() {
  const [inputValues, setInputValues] = React.useState<{ [key: string]: string }>({});
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [applyDateFilter, setApplyDateFilter] = React.useState<boolean>(false);

  const { isPending, error, data } = useQuery<any[]>({
    queryKey: ['withdrawals'],
    queryFn: () =>
      fetch('https://back-end-nine-rho.vercel.app/withdrawals').then((res) =>
        res.json(),
      ),
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
    return data.filter(row => {
      if (!row.date) {
        const matchesInputValues = Object.entries(inputValues).every(([key, filterValue]) =>
          row[key as keyof typeof row]?.toString().toLowerCase().includes(filterValue.toLowerCase())
        );
        return matchesInputValues;
      }
  
      const matchesInputValues = Object.entries(inputValues).every(([key, filterValue]) =>
        row[key as keyof typeof row]?.toString().toLowerCase().includes(filterValue.toLowerCase())
      );
  
      const dateParts: any[] = row.date.split(/\D/);
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
    name: 'withdrawals'
  });

  return (
    <Container maxWidth="xl">
      <FilterControls
        endDate={endDate}
        handleApplyDateFilter={handleApplyDateFilter}
        handleClearFilters={handleClearFilters}
        handleDownloadExcel={handleDownloadExcel}
        service="withdrawals"
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
        title='Withdrawals'
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
