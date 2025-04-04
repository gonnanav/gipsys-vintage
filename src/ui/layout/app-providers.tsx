import { MuiProvider } from '@/ui/mui';
import { StoreProvider } from '@/ui/store';

export interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MuiProvider>
      <StoreProvider>{children}</StoreProvider>
    </MuiProvider>
  );
}
