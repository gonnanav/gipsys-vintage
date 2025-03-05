import React from 'react';
import type { Preview } from '@storybook/react';
import { ModalPortalRootContext } from '@/app/contexts';
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
    (Story) => {
      const [portalRoot, setPortalRoot] = React.useState<Element | null>(null);

      return (
        <div id="storybook-app-root" lang="he" dir="rtl" ref={setPortalRoot}>
          <ModalPortalRootContext.Provider value={portalRoot}>
            <Story />
          </ModalPortalRootContext.Provider>
        </div>
      );
    },
    (Story) => (
      <MuiProviders>
        <Story />
      </MuiProviders>
    ),
  ],
};

export default preview;
