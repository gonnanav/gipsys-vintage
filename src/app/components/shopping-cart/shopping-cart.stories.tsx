import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCart } from './shopping-cart';

const meta: Meta<typeof ShoppingCart> = {
  title: 'Components/ShoppingCart',
  component: ShoppingCart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ShoppingCart>;

export const Closed: Story = {
  args: {
    initialIsOpen: false,
  },
};

export const Open: Story = {
  args: {
    initialIsOpen: true,
  },
};
