// @packages
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image'
import Typography from '@mui/material/Typography';

// @images
import image from '@/assets/images/red-logo.png';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static" sx={{ pb: 2 }}>
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <Image
            alt="logo"
            priority
            src={image}
            width={70}
          />
          <Typography sx={{ fontSize: 30, fontWeight: 600, fontFamily: 'monospace' }}>
            Be
          </Typography>
          <Typography sx={{ fontSize: 30, fontWeight: 600, color: 'red', fontFamily: 'monospace' }}>
            Funding
          </Typography>
        </Box>
      </AppBar>
    </Box>
  );
}
