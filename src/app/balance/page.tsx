'use client';

// @packages
import * as React from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'

// @components
import Error from '@/components/Error';
import Loading from '@/components/Loading';

// @images
import image from '@/assets/images/red-logo.png';

export default function Home() {
  const { isPending, error, data } = useQuery<number>({
    queryKey: ['clients'],
    queryFn: async () =>
      await axios.get('https://back-end-nine-rho.vercel.app/api/balance')
        .then(res => res.data)
  });

  if (error) return <Error />
  if (isPending) return <Loading />

  const formattedCurrency = data.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <Paper elevation={3} sx={{ width: 500, ml: 3 }}>
      <Typography variant="h4" sx={{ p: '30px 0 0 30px' }}>
        Consulta de balance
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Image
          alt="logo"
          priority
          src={image}
          width={150}
        />
        <Box>
          <Typography variant="h5" mb={2}>
            Balance: {formattedCurrency}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
