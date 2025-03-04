import type { Meta, StoryObj } from '@storybook/react';
import { AppHeader } from './app-header';

const meta = {
  title: 'App/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
