import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { AppHeader } from '../app-header/app-header';
import { ShoppingCartProvider } from '@/app/providers/shopping-cart/shopping-cart-provider';
interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <ShoppingCartProvider>
      <AppHeader />
      <Box component="main" sx={{ padding: { xs: 2, sm: 3 } }}>
        {children}
      </Box>
    </ShoppingCartProvider>
  );
}
