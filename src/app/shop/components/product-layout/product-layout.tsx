import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type ProductLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const spacing = { xs: 2, sm: 3 };

export function ProductLayout({ title, children }: ProductLayoutProps) {
  return (
    <Box sx={{ p: spacing }}>
      <Typography variant="h1" sx={{ textAlign: 'center', mb: spacing }}>
        {title}
      </Typography>
      <Stack
        direction="row"
        spacing={spacing}
        useFlexGap
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          '& > *': {
            xs: { maxWidth: '300px', flex: '1 1 150px' },
            sm: { flexBasis: '240px' },
            md: { flexBasis: '300px' },
          },
        }}
      >
        {children}
      </Stack>
    </Box>
  );
}
