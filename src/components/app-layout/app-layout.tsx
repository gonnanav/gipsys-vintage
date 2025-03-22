import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { AppHeader } from '../app-header/app-header';
import { NavDrawer } from '../nav-drawer/nav-drawer';
import { CartDrawer } from '../cart-drawer';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <AppHeader />
      <Box component="main" sx={{ padding: { xs: 2, sm: 3 } }}>
        {children}
      </Box>
      <NavDrawer />
      <CartDrawer />
    </>
  );
}
