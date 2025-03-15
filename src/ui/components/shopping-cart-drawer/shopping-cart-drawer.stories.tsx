import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCartProvider } from '@/ui/providers/shopping-cart/shopping-cart-provider';
import {
  productWithManyImages,
  productWithOneImage,
  productWithoutImages,
} from '@/fixtures/products';
import { ShoppingCartDrawer } from './shopping-cart-drawer';

const meta: Meta<typeof ShoppingCartDrawer> = {
  title: 'Global/ShoppingCartDrawer',
  component: ShoppingCartDrawer,
  parameters: {
    layout: 'centered',
  },
  args: {
    isOpen: true,
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
type Story = StoryObj<typeof ShoppingCartDrawer>;
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

export const EmptyCart: Story = {};
