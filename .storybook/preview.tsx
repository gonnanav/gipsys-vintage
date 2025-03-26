import React from 'react';
import type { Preview } from '@storybook/react';
import { AppProviders, AppLayout } from '@/ui/app-layout';

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
        <AppProviders>
          <AppLayout>
            <Story />
          </AppLayout>
        </AppProviders>
      </div>
    ),
  ],
};

export default preview;
