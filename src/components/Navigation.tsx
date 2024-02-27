'use client'

// @packages
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';

// @components
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

// @hooks
import useLoginData from '@/hooks/useLoginData';

// @interfaces
interface NavigationProps {
  children: React.ReactNode;
  isLogin: boolean;
}

export default function Navigation({ children, isLogin }: NavigationProps) {
  const { storedUserData } = useLoginData();

  const router = useRouter();
  const theme = useTheme();

  React.useEffect(() => {
    const token = storedUserData.token;
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <>
      {!isLogin ? (
        <>
          <Header />
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              <Grid item xs={1.5}>
                <Sidebar/>
              </Grid>
              <Grid
                item
                sx={{ backgroundColor: theme.palette.primary.main }}
                xs={10.5}
              >
                {children}
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
          <>
            {children}
          </>
      )}
    </>
  );
}
