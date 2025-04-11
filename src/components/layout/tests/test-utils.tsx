import { render } from '@testing-library/react';
import { StoreProvider, AppState } from '@/components/store';
import { AppLayout, AppLayoutProps } from '../layout';

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
