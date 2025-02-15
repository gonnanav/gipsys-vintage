import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import PageError from './error';

const meta = {
  title: 'Shop/Error',
  component: PageError,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    error: new Error('error'),
    reset: fn(),
  },
} satisfies Meta<typeof PageError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultError: Story = {};
