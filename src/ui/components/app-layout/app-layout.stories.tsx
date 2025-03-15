import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { AppLayout } from './app-layout';

const meta = {
  title: 'App/AppLayout',
  component: AppLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = () => (
  <Box
    sx={{
      height: 400,
      width: '100%',
      bgcolor: '#e3f2fd',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      typography: 'h6',
    }}
  >
    Demo Content
  </Box>
);

export const Default: Story = {
  args: {
    children: <DemoContent />,
  },
};
