// @packages
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image'

// @images
import image from '@/assets/images/login-logo.png';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static">
        <Toolbar sx={{ py: 2 }}>
          <Image
            alt="logo"
            priority
            src={image}
            width={200}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
