import React from 'react';
import type { Preview } from '@storybook/react';
import { MuiProviders } from '@/app/mui-providers';

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
        <Story />
      </div>
    ),
    (Story) => (
      <MuiProviders>
        <Story />
      </MuiProviders>
    ),
  ],
};

export default preview;
