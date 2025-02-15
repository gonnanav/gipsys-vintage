'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import amber from '@mui/material/colors/amber';

const theme = createTheme({
  cssVariables: true,
  direction: 'rtl',
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: amber[200],
    },
  },
  typography: {
    h1: {
      fontSize: '3rem',
    },
  },
});

export default responsiveFontSizes(theme);
