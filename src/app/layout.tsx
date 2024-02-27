'use client'

// @scripts
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles';
import { usePathname } from 'next/navigation';

// @components
import Navigation from '@/components/Navigation';

// @theme
import theme from '@/theme';

// @interfaces
interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const queryClient = new QueryClient();

  const path = usePathname();
  const isLogin = path === '/login';

  return (
    <Box component="html" lang="en">
      <Box component="body" suppressHydrationWarning={true}>
        <QueryClientProvider client={queryClient}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Navigation children={children} isLogin={isLogin} />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </QueryClientProvider>
      </Box>
    </Box>
  );
}
