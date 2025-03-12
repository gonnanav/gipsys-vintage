import type { Meta, StoryObj } from '@storybook/react';
import { AppHeader } from './app-header';
import { ShoppingCartProvider } from '@/app/providers/shopping-cart/shopping-cart-provider';

const meta = {
  title: 'App/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ShoppingCartProvider>
        <Story />
      </ShoppingCartProvider>
    ),
  ],
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
