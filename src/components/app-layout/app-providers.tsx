import { MuiProvider } from '../mui-provider';
import { StoreProvider } from '@/components/store';

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
