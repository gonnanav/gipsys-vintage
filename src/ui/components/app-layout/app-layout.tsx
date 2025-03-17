import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { AppHeader } from '../app-header/app-header';
import { AppStoreProvider } from '@/ui/providers/app-store-provider/app-store-provider';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppStoreProvider>
      <AppHeader />
      <Box component="main" sx={{ padding: { xs: 2, sm: 3 } }}>
        {children}
      </Box>
    </AppStoreProvider>
  );
}
