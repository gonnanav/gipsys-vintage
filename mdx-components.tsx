import type { MDXComponents } from 'mdx/types';
import { Typography } from '@mui/material';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <Typography variant="h1" textAlign="center" mb={2}>
        {children}
      </Typography>
    ),
    h2: ({ children }) => (
      <Typography variant="h2" gutterBottom>
        {children}
      </Typography>
    ),
    p: ({ children }) => <Typography mb={2}>{children}</Typography>,
    ...components,
  };
}
