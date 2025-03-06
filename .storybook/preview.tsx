import React from 'react';
import type { Preview } from '@storybook/react';
import { MuiProviders } from '@/app/mui-providers';
import { createPortalWrapper } from '@/app/test-utils';

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
      <PortalWrapper>
        <Story />
      </PortalWrapper>
    ),
    (Story) => (
      <MuiProviders>
        <Story />
      </MuiProviders>
    ),
  ],
};

export default preview;
