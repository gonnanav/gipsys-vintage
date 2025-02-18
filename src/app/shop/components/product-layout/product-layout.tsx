import React from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

type ProductLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export function ProductLayout({ title, children }: ProductLayoutProps) {
  return (
    <>
      <Typography variant="h1" sx={{ textAlign: 'center' }}>
        {title}
      </Typography>
      <Stack
        direction="row"
        spacing={{ xs: 2, sm: 3 }}
        useFlexGap
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          '& > *': {
            xs: {
              maxWidth: '300px',
              flex: '1 1 150px',
            },
            sm: {
              flexBasis: '240px',
            },
            md: {
              flexBasis: '300px',
            },
          },
        }}
      >
        {children}
      </Stack>
    </>
  );
}
