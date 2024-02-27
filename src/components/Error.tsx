import * as React from 'react';
import Box from '@mui/material/Box';
import ErrorIcon from '@mui/icons-material/Error';
import { Typography } from '@mui/material';

export default function Error() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 200px)' }}>
      <ErrorIcon sx={{ fontSize: 100, mr: 2 }} />
      <Typography variant="h4">Error al obtener los datos</Typography>
    </Box>
  );
};
