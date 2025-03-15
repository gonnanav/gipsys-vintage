import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCart } from './shopping-cart';
import { ShoppingCartProvider } from '@/ui/providers/shopping-cart/shopping-cart-provider';
import {
  productWithManyImages,
  productWithOneImage,
  productWithoutImages,
} from '@/fixtures/products';

const meta: Meta<typeof ShoppingCart> = {
  title: 'Components/ShoppingCart',
  component: ShoppingCart,
  parameters: {
    layout: 'centered',
  },
  args: {
    initialIsOpen: true,
  },
  decorators: [
    (Story) => (
      <ShoppingCartProvider>
        <Story />
      </ShoppingCartProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ShoppingCart>;

export const EmptyCart: Story = {};

const products = [productWithManyImages, productWithOneImage, productWithoutImages];

export const NonEmptyCart: Story = {
  decorators: [
    (Story) => (
      <ShoppingCartProvider initialCart={products}>
        <Story />
      </ShoppingCartProvider>
    ),
  ],
};
