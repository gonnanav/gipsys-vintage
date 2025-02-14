'use client';

type ErrorProps = {
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <>
      <h1>שגיאה בטעינת העמוד</h1>
      <p>סליחה, יקירה, אבל יש שגיאה בטעינת העמוד. בואי ננסה שוב ביחד.</p>
      <button onClick={reset}>נסי שוב</button>
    </>
  );
}
