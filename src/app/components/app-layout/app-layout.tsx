import { ReactNode } from 'react';
import Box from '@mui/material/Box';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Box component="main" sx={{ padding: { xs: 2, sm: 3 } }}>
      {children}
    </Box>
  );
}
