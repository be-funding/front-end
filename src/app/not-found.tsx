// @packages
import * as React from 'react';
import Box from '@mui/material/Box';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import Typography from '@mui/material/Typography';

export default function Error() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 200px)' }}>
      <SentimentDissatisfiedIcon sx={{ fontSize: 100, mr: 2 }} />
      <Typography variant="h4">Pagina no encontrada</Typography>
    </Box>
  );
};
