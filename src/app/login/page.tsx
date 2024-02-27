'use client'

// @packages
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import { grey, red } from '@mui/material/colors';

// @components
import Form from './Form';

// @images
import image from '@/assets/images/login-logo.png';

export default function Home() {
  return (
    <Box
      sx={{ 
        alignItems: 'center', 
        display: 'flex', 
        height: '100vh',
        justifyContent: 'center',
        backgroundImage: `linear-gradient(to right, ${red[800]}, black)`
      }} 
    >
      <Paper elevation={3} sx={{ width: 900 }}>
        <Grid container>
          <Grid item xs={6}>
            <Form />
          </Grid>
          <Grid item xs={6} sx={{ backgroundColor: grey[900], pt: 5, pl: 3 }}>
            <Image
              alt="logo"
              priority
              src={image}
              width={350}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
