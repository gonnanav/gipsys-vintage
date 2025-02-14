'use client';

import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function PageError({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (!error.digest) return;

    console.error('Error Digest:', error.digest);
  }, [error.digest]);

  return (
    <>
      <h1>שגיאה בטעינת העמוד</h1>
      <p>סליחה, אבל קרתה שגיאה בטעינת העמוד. בואי ננסה שוב ביחד.</p>
      <button onClick={reset}>נסי שוב</button>
    </>
  );
}
