import { MuiProvider } from '@/components/mui';
import { StoreProvider } from '@/components/store';

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
