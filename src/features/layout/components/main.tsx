import { ReactNode } from 'react';
import Box from '@mui/material/Box';

export interface MainProps {
  children: ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <Box component="main" sx={{ padding: { xs: 2, sm: 3 } }}>
      {children}
    </Box>
  );
}
