import React from 'react';
import type { Preview } from '@storybook/react';
import { MuiProvider } from '@/ui/providers/mui/mui-providers';
import { createPortalWrapper } from '@/ui/test-utils/factories';
import { StoreProvider } from '@/store';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@mui/icons-material';
const PortalWrapper = createPortalWrapper('storybook-portal-root');

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
      // Simulates the <html> tag of the app
      <div dir="rtl">
        <Story />
      </div>
    ),
    // Simulates the <body> tag of the app
    (Story) => (
      <PortalWrapper>
        <Story />
      </PortalWrapper>
    ),
    // Simulates the MuiProviders of the app
    (Story) => (
      <MuiProvider>
        <Story />
      </MuiProvider>
    ),
    (Story) => (
      <StoreProvider>
        <Story />
      </StoreProvider>
    ),
  ],
};

export default preview;
