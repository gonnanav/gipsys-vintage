import React from 'react';
import type { Preview } from '@storybook/react';
import { MuiProvider } from '@/ui/providers/mui/mui-providers';
import { StoreProvider } from '@/store';
import { AppLayout } from '@/ui/components/app-layout/app-layout';

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
      <div dir="rtl">
        <MuiProvider>
          <StoreProvider>
            <AppLayout>
              <Story />
            </AppLayout>
          </StoreProvider>
        </MuiProvider>
      </div>
    ),
  ],
};

export default preview;
