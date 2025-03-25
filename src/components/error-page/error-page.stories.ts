import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AppError } from './app-error';

const meta = {
  title: 'Error Page',
  component: AppError,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    error: new Error('error'),
    reset: fn(),
  },
} satisfies Meta<typeof AppError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultError: Story = {};
