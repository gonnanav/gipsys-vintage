import { Meta, StoryObj } from '@storybook/react';
import Home from '@/app/page';

const meta: Meta<typeof Home> = {
  title: 'Homepage',
  component: Home,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Home>;

export const Default: Story = {};
