import React from 'react';
import type { Preview } from '@storybook/react';
import { MuiProvider } from '@/components/mui-provider';
import { StoreProvider } from '@/store';
import { Header } from '@/components/header';
import { Main } from '@/components/main';
import { NavDrawer } from '@/components/nav-drawer';
import { CartDrawer } from '@/components/cart-drawer';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@mui/icons-material';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div lang="he" dir="rtl">
        <MuiProvider>
          <StoreProvider>
            <Header />
            <Main>
              <Story />
            </Main>
            <NavDrawer />
            <CartDrawer />
          </StoreProvider>
        </MuiProvider>
      </div>
    ),
  ],
};

export default preview;
