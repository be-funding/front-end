'use client'

// @packages
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NextLink from 'next/link';
import { grey } from '@mui/material/colors';

// @components
import MenuIcons from '@/components/MenuIcons';

// @hooks
import useLoginData from '@/hooks/useLoginData';

export default function Sidebar() {
  const { removeLoginData } = useLoginData();

  const handleLogout = async () => {
    await removeLoginData();
  }

  return (
    <ListItem
      component={NextLink as any}
      disablePadding
      href="/login"
      key={6}
      onClick={handleLogout}
      sx={{
        backgroundColor: 'transparent',
        color: 'black' 
      }}
    >
      <ListItemButton>
        <ListItemIcon>
          <MenuIcons menu="/logout" isSelected={false} />
        </ListItemIcon>
        <ListItemText sx={{ color: grey[600] }} primary="LOGOUT" />
      </ListItemButton>
    </ListItem>
  );
}