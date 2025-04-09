import { render } from '@testing-library/react';
import { StoreProvider, AppState } from '@/ui/store';
import { AppLayout, AppLayoutProps } from './app-layout';

export function renderAppLayout(initialState?: Partial<AppState>, props?: Partial<AppLayoutProps>) {
  render(
    <AppLayout {...props}>
      <div />
    </AppLayout>,
    {
      wrapper: ({ children }) => (
        <StoreProvider initialState={initialState}>{children}</StoreProvider>
      ),
    },
  );
}
