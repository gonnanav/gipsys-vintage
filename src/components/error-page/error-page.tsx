'use client';

import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    if (!error.digest) return;

    console.error('Error Digest:', error.digest);
  }, [error.digest]);

  return (
    <Stack spacing={2} sx={{ p: { xs: 2, sm: 3 }, alignItems: 'center', textAlign: 'center' }}>
      <Typography variant="h1" sx={{ textAlign: 'center' }}>
        שגיאה בטעינת העמוד
      </Typography>
      <Typography>סליחה, אבל קרתה שגיאה בטעינת העמוד. בואי ננסה שוב ביחד.</Typography>
      <Button variant="contained" onClick={reset}>
        נסי שוב
      </Button>
    </Stack>
  );
}
