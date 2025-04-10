import { MuiProvider } from '@/ui/mui';
import { StoreProvider } from '@/ui/store';

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
