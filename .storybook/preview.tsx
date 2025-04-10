import React from 'react';
import type { Preview } from '@storybook/react';
import { AppProvider } from '@/features/provider';
import { AppLayout } from '@/features/layout';

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
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <div lang="he" dir="rtl">
        <AppProvider>
          <AppLayout>
            <Story />
          </AppLayout>
        </AppProvider>
      </div>
    ),
  ],
};

export default preview;
