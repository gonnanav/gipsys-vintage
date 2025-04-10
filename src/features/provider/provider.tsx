import { MuiProvider } from '@/features/mui';
import { StoreProvider } from '@/features/store';

export interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <MuiProvider>
      <StoreProvider>{children}</StoreProvider>
    </MuiProvider>
  );
}
