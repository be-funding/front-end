'use client'

// @packages
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NextLink from 'next/link';
import { grey } from '@mui/material/colors';
import { usePathname } from 'next/navigation';

// @components
import MenuIcons from '@/components/MenuIcons';
import Logout from '@/components/Logout';

// @constants
import menu from '../constants/menu.json';

export default function Sidebar() {
  const path = usePathname();

  return (
    <List sx={{ borderRight: `2px solid ${grey[300]}`, minHeight: 'calc(100vh - 90px)', p: 0 }}>
      {menu.map((item) => (
        item.path !== '/logout' ? (
          <ListItem
            component={NextLink}
            disablePadding
            href={item.path}
            key={item.id}
            sx={{
              backgroundColor: item.path === path ? grey[300] : 'transparent',
              borderLeft: item.path === path ? '5px solid red' : 'transparent',
              color: 'black',
              py: 1
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <MenuIcons menu={item.path} isSelected={item.path === path} />
              </ListItemIcon>
              <ListItemText sx={{ color: grey[600] }} primary={item.name.toLocaleUpperCase()} />
            </ListItemButton>
          </ListItem>
        ) : (
          <Logout key={item.path} />
        )
      ))}
    </List>
  );
}