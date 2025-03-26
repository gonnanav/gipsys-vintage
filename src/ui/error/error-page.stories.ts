import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ErrorPage } from './error-page';

const meta = {
  title: 'Error Page',
  component: ErrorPage,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    error: new Error('error'),
    reset: fn(),
  },
} satisfies Meta<typeof ErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultError: Story = {};
