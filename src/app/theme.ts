'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  direction: 'rtl',
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});

export default theme;
