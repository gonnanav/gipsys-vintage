import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type ShopLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export function ShopLayout({ title, children }: ShopLayoutProps) {
  const spacing = { xs: 2, sm: 3 };

  return (
    <Stack spacing={spacing} sx={{ padding: spacing }}>
      <Typography variant="h1" sx={{ textAlign: 'center' }}>
        {title}
      </Typography>
      <Box>{children}</Box>
    </Stack>
  );
}
